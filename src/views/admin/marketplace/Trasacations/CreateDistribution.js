import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Minus } from 'iconsax-react';
import { useParams } from 'react-router-dom';

const NewDistribution = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        period: '',
        date: '',
        class: '',
        settled: false,
        allocations: [], // Array to store allocation objects
    });
    const [data, setData] = useState([]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (index !== undefined) {
            const updatedAllocations = formData.allocations.map((allocation, i) => {
                if (i === index) {
                    return { ...allocation, [name]: value };
                }
                return allocation;
            });
            setFormData({
                ...formData,
                allocations: updatedAllocations,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const addAllocation = () => {
        const newAllocation = {
            allocationType: '',
            lpClass: '',
        };
        setFormData({
            ...formData,
            allocations: [...formData.allocations, newAllocation],
        });
    };

    const deleteAllocation = (index) => {
        const updatedAllocations = formData.allocations.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            allocations: updatedAllocations,
        });
    };

    const allocateProRata = () => {
        // Allocate pro rata to all investors based on their ownership percentage
        const totalOwnershipPercentage = data.reduce((acc, item) => acc + item.ownershipPercentage, 0);
        const totalAmount = formData.allocations.reduce((acc, allocation) => acc + parseFloat(allocation.lpClass), 0);
        const proRataAmount = totalAmount / totalOwnershipPercentage;
        const updatedData = data.map(item => {
            const allocatedAmounts = {};
            formData.allocations.forEach(allocation => {
                allocatedAmounts[allocation.allocationType] = allocation.lpClass * (item.ownershipPercentage / totalOwnershipPercentage);
            });
            return { ...item, allocatedAmounts };
        });
        setData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://18.233.67.37:8000/api/v1/distribution', formData);
            console.log('Distribution created:', response.data);
        } catch (error) {
            console.error('Error creating distribution:', error);
        }
        setLoading(false);
    };

    const formatNumberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://18.233.67.37:8000/api/v1/users/invest/${id}`);
                const result = await response.json();
                const formattedData = result.map(item => ({
                    name: item.userDetails.name,                    
                    investment_class: item.investors[0].investment_details.investment_class,
                    ownershipPercentage: item.investors[0].investment_details.ownershipPercentage,
                    actions: item.userDetails.id,
                    allocatedAmounts: {}, // Initialize allocatedAmounts
                }));
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className='px-4 md:px-6 2xl:px-10 2xl:container 2xl:mx-auto'>
            <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full ring-1 ring-gray-300 rounded-md">
                        <div className="flex flex-row justify-between items-center w-full space-x-4 md:space-x-6 xl:space-x-8">
                            <div className="flex flex-col justify-start items-start w-full space-y-2">
                                <label htmlFor="title" className="text-sm text-gray-600">Distribution Title</label>
                                <input type="text" name="title" id="title" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.title} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col justify-start items-start w-full space-y-2">
                                <label htmlFor="period" className="text-sm text-gray-600">Period</label>
                                <input type="text" name="period" id="period" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.period} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col justify-start items-start w-full space-y-2">
                                <label htmlFor="date" className="text-sm text-gray-600">Date</label>
                                <input type="date" name="date" id="date" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={formData.date} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col justify-start items-start w-full space-y-2">
                                <label htmlFor="class" className="text-sm text-gray-600">Class</label>
                                <select name="class" id="class" className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.class} onChange={handleChange}>
                                    <option value="1">Class A</option>
                                    <option value="2">Class B</option>
                                    <option value="3">Class C</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8 mt-6">
                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full ring-1 ring-gray-300 rounded-md">
                    <div className="flex flex-row justify-between items-center w-full space-x-4 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col justify-start items-start w-full space-y-2">
                            <p className="text-lg text-gray-900 font-semibold">Distributions Allocation</p>
                            <p className="text-sm text-gray-700">Allocate distributions to classes</p>
                        </div>
                    </div>
                    <div className="leading-8 border-t border-gray-300 w-full mt-4"></div>
                    {formData.allocations.map((allocation, index) => (
                        <div key={index} className="flex flex-col justify-start items-start w-full space-y-4 mt-4">
                            <div className="flex flex-row justify-between items-center w-full space-x-4 md:space-x-6 xl:space-x-8">
                                <div className="flex flex-col justify-start items-start w-full space-y-2">
                                    <label htmlFor="allocationType" className="text-sm text-gray-600">Allocation Type</label>
                                    <div className="flex flex-row justify-between items-center w-full space-x-4 md:space-x-6 xl:space-x-8">
                                        <select name="allocationType" id="allocationType" className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={allocation.allocationType} onChange={(e) => handleChange(e, index)}>
                                            <option value="Return of Capital">Return of Capital</option>
                                            <option value="Interest (Return on Capital)">Interest (Return on Capital)</option>
                                            <option value="Principal (Return on Capital)">Principal (Return on Capital)</option>
                                            <option value="Tax Withholding">Tax Withholding</option>
                                            <option value="Bank Fees">Bank Fees</option>
                                            <option value="Preferred Return">Preferred Return</option>
                                            <option value="Yield">Yield</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-start items-start w-full space-y-2">
                                    <label htmlFor="lpClass" className="text-sm text-gray-600">LP Class (USD Equivalent)</label>
                                    <input type="text" name="lpClass" id="lpClass" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={allocation.lpClass} onChange={(e) => handleChange(e, index)} />
                                </div>
                                <div className="flex flex-row justify-between items-center w-full space-x-4 md:space-x-6 xl:space-x-8 mt-6">
                                    <div className="flex flex-col justify-start items-start w-full space-y-2">
                                        <button className="px-4 py-2 rounded-md ring-1 ring-gray-300 hover:bg-gray-500" onClick={allocateProRata}>
                                            <PlusIcon className="h-4 w-4 inline-block" /> Allocate Pro Rata
                                        </button>
                                    </div>
                                    <div className="flex flex-col justify-start items-start w-full space-y-2">
                                        <button className="px-4 py-2 rounded-md ring-1 ring-gray-300 hover:bg-gray-500" onClick={() => deleteAllocation(index)}>
                                            <Minus className="h-4 w-4 inline-block" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-row justify-between items-center w-full space-x-4 md:space-x-6 xl:space-x-8 mt-6">
                        <p className="text-sm text-indigo-500 cursor-pointer font-semibold hover:underline" onClick={addAllocation}>
                            <PlusCircleIcon className="h-4 w-4 inline-block" /> Add Allocation Type
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8 mt-6">
                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full ring-1 ring-gray-300 rounded-md">
                    <div className="flex flex-row justify-between items-center w-full space-x-4 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col justify-start items-start w-full space-y-2">
                            <p className="text-lg text-gray-900 font-semibold">Allocation Table</p>
                            <p className="text-sm text-gray-700">View the distribution allocation table</p>
                        </div>
                    </div>
                    <div className="leading-8 border-t border-gray-300 w-full mt-4"></div>
                    <div className="flex flex-col justify-start items-start w-full space-y-4 mt-4">
                        <div className="flex flex-row justify-between items-center w-full space-x-4 md:space-x-6 xl:space-x-8">
                            <div className="flex flex-col justify-start items-start w-full space-y-2">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Investment Class</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Ownership Percentage</th>
                                            {formData.allocations.map((allocation, index) => (
                                                <th key={index} className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                                    {allocation.allocationType}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-4 py-2 text-sm font-medium text-gray-900">{item.name}</td>
                                                <td className="px-4 py-2 text-sm font-medium text-gray-900">{item.investment_class}</td>
                                                <td className="px-4 py-2 text-sm font-medium text-gray-900">{item.ownershipPercentage}%</td>
                                                {formData.allocations.map((allocation, allocIndex) => (
                                                    <td key={allocIndex} className="px-4 py-2 text-sm font-medium text-gray-900">
                                                        <input type="text" name="lpClass" id="lpClass" className="w-full px-4 py-2 border border-gray-500 rounded-md"
                                                        value=
                                                        {item.allocatedAmounts[allocation.allocationType] !== undefined 
                                                            ? `$${formatNumberWithCommas(item.allocatedAmounts[allocation.allocationType].toFixed(2))}`  
                                                            : 'N/A'} 
                                                        />

                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewDistribution;
