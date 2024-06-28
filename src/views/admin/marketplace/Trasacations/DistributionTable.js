import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const DistributionTable = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace 'API_URL' with your actual API endpoint
        axios.get(`http://18.233.67.37:3000/api/v1/distribution/${id}/distributions`)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Spinner color="blue" size="xl" />
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold text-gray-900">Investments</h1>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => navigate(`/admin/distribution/${id}`)}
                    className="flex items-center gap-2 px-4 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200">
                        <PlusCircleIcon 
                        className="h-5 w-5 text-gray-700" />
                        New Distribution
                        </button>
                </div>
            </div>
            <div className="flex flex-col mt-4">
                <div className="overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg border-gray-300">
                            <table className="min-w-full rounded-xl">
                                <thead>
                                    <tr>
                                        <th className="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900 bg-gray-50">Title</th>
                                        <th className="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900">Period</th>
                                        <th className="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900 bg-gray-50">Date</th>
                                        <th className="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900">From</th>
                                        <th className="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900 bg-gray-50">To</th>
                                        <th className="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900">Gross Amount</th>
                                        <th className="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900 bg-gray-50">Settled</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {data.map((item, index) => (
                                        <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">{item.title}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">{item.period}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">{item.date}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">{item.from}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">{item.investorDistributions ? item.investorDistributions.length + ' investors'
                                             : 'N/A'}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">{item.gross_amount}$/</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">{item.settled ? 'Yes' : 'No'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DistributionTable;
