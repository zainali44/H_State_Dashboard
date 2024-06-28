import { CurrencyDollarIcon, ShareIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Button, Typography, Checkbox } from "@material-tailwind/react";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import axios from "axios";

export default function LeaseManagement() {
    const tenantID = useParams().id;
    const [loading, setLoading] = React.useState(false);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [leaseType, setLeaseType] = React.useState('');
    const [monthlyRent, setMonthlyRent] = React.useState('');
    const [isLeaseActive, setIsLeaseActive] = React.useState(false);

    const fetchLeaseDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://18.233.67.37:8000/api/v1/tenants/${tenantID}/tenants`);
            const data = response.data;
            setStartDate(data[0].start_date|| "");
            setEndDate(data[0].end_date || "");
            setLeaseType(data[0].lease_type || "");
            setMonthlyRent(data[0].monthly_rent || "");
            setIsLeaseActive(data[0].isLeaseActive || false);

            console.log("Lease details fetched successfully:", data[0].start_date);

        } catch (error) {
            console.error("Error fetching lease details:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveLeaseDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`http://18.233.67.37:8000/api/v1/tenants/${tenantID}`, {
                start_date: startDate,
                end_date: endDate,
                lease_type: leaseType,
                monthly_rent: monthlyRent,
                isLeaseActive: isLeaseActive,
            });
            console.log("Lease details saved successfully:", response.data);
            toast.success('Lease Details Saved Successfully', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        } catch (error) {
            toast.error('Error saving lease details', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            console.error("Error saving lease details:", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchLeaseDetails();
    }, [tenantID]);

    return (
        <div className="flex flex-col w-full h-full p-4">
        {/* Loading*/}
        {loading && (
            <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-100 bg-opacity-75">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-900"></div>
            </div>
        )}
            <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col w-full">
                    <h1 className="text-2xl font-semibold text-gray-800 w-full">Lease Management</h1>
                </div>
                <div className="flex flex-row">
                    <button
                        color="indigo"
                        className="w-72 text-sm flex flex-row items-center justify-center gap-2 hover:bg-gray-100 border border-gray-300 rounded-md px-4 py-2"
                    >
                        <div className="flex flex-row items-center">
                            <ShareIcon className="h-5 w-5 mr-2" />
                            Share with Investors and Prospects
                        </div>
                    </button>
                </div>
            </div>

            <hr className="my-6 w-full border-gray-300" />

            <div className="flex flex-row gap-4 w-full justify-between">
                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">
                        Lease Start Date
                    </Typography>
                    <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input
                            type="date"
                            className="block w-full py-2 pl-10 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Pick Start Date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">
                        Lease End Date
                    </Typography>
                    <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input
                            type="date"
                            value={endDate}
                            className="block w-full py-2 pl-10 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Pick End Date"
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">
                        Lease Type
                    </Typography>
                    <div className="relative max-w-sm">
                        <select
                            className="block w-full py-2 pl-10 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                            id="lease_type"
                            value={leaseType}
                            onChange={(e) => setLeaseType(e.target.value)}
                        >
                            <option value="1">Residential</option>
                            <option value="2">Commercial</option>
                            <option value="3">Industrial</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-full justify-start">
                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">
                        Monthly Rent
                    </Typography>
                    <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <CurrencyDollarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </div>
                        <input
                            type="number"
                            className="block w-full py-2 pl-10 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Enter Monthly Rent"
                            id="monthly_rent"
                            value={monthlyRent}
                            onChange={(e) => setMonthlyRent(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <hr className="my-6 w-full border-gray-300" />

            <div className="flex flex-row w-full justify-start">
                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">
                        Active Lease
                    </Typography>
                    <div className="flex flex-row items-center">
                        <Checkbox
                            color="indigo"
                            checked={isLeaseActive}
                            onChange={(e) => setIsLeaseActive(e.target.checked)}
                        />
                        <p className="text-gray-800 dark:text-gray-200 ml-2">Yes, this lease is active</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-full mt-8">
                {
                    loading ? (
                        <Button
                            color="indigo"
                            variant="filled"
                            className="ml-auto"
                            disabled
                        >
                            <div className="flex flex-row items-center">
                                <CheckBadgeIcon className="h-5 w-5 mr-2" />
                                Saving...
                            </div>
                        </Button>
                    ) : (
                        <Button
                            color="indigo"
                            variant="filled"
                            className="ml-auto"
                            onClick={saveLeaseDetails}
                        >
                            <div className="flex flex-row items-center">
                                <CheckBadgeIcon className="h-5 w-5 mr-2" />
                                Save Lease Details
                            </div>
                        </Button>
                    )
                }
            </div>
            <ToastContainer />
        </div>
    );
}
