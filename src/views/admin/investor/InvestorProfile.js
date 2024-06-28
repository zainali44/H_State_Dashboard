import { Avatar, Chip } from "@material-tailwind/react";
import { ArrowDropDown } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Collapse } from "@material-tailwind/react";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { UnderlineTabs } from "./Tabs";
import { useParams } from "react-router-dom";
// Admin Imports

const InvestorProfile = () => {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [investorData, setInvestorData] = useState(null); // State to hold fetched data

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://18.233.67.37:3000/api/v1/users/investors/' + id); // Fetch data from API
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log("Link: http://18.233.67.37:3000/api/v1/users/investors/" + id);

                setInvestorData(data); // Set fetched data to state
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error state if needed
            }
        };

        fetchData(); // Call fetchData on component mount
    }, []); // Empty dependency array ensures useEffect runs only once

    const toggleOpen = () => setOpen((cur) => !cur);
    const toggleOpen1 = () => setOpen1((cur) => !cur);
    return (
        <div class="bg-gray-100">
            <div class="container mx-auto py-8">
                <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div class="col-span-4 sm:col-span-3">
                        <div class="bg-white shadow rounded-lg p-6">
                            <div class="flex flex-col items-center">
                                <img src= {investorData?.image || "https://via.placeholder.com/150"}
                                class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">
                                </img>
                                <h1 class="text-xl font-bold">{investorData?.name}</h1>

                                <Chip
                                    color="green"
                                    value="Investor"
                                    size="sm"
                                    rounded={true}
                                    outline={true}
                                    className="mt-2"
                                    variant="ghost"

                                />
                            </div>
                            <div class="mt-6 border-t border-b border-gray-400 py-3">
                                <div class="flex flex-row items-center gap-2 justify-between">
                                    <span class="text-gray-700 uppercase font-bold tracking-wider text-sm">Balance Manager</span>
                                    <span class="text-md font-bold text-green-500">$2,500,000</span>
                                </div>
                            </div>
                            <div class="mt-4 border-b border-gray-400 py-3">
                                {/* // status */}
                                <div class="flex flex-row items-center gap-2 justify-between">
                                    <span class="text-gray-700 uppercase font-bold tracking-wider text-sm">Status</span>
                                    <span class="text-md font-bold text-green-500">Active</span>
                                </div>
                            </div>

                            <div class="mt-4 border-b border-gray-400 py-3">
                                {/* // Contact Details Collapsible */}
                                <div class="flex flex-row items-center gap-2 justify-between cursor-pointer" 
                                onClick={() => toggleOpen()}>
                                    <span class="text-gray-700 uppercase font-bold tracking-wider text-sm">Contact Details</span>
                                    <ArrowDropDown />
                                </div>

                                <Collapse open={open}>
                                    <div class="mt-2">
                                        <div class="flex flex-row items-center gap-2 justify-between">
                                            <span class="text-gray-700 uppercase font-regular tracking-wider text-sm">Email</span>
                                            <span class="text-sm font-bold text-gray-500">
                                                Test@gmail.com
                                            </span>
                                        </div>

                                        <div class="flex flex-row items-center gap-2 justify-between mt-2">
                                            <span class="text-gray-700 uppercase font-regular tracking-wider text-sm">Phone</span>
                                            <span class="text-sm font-bold text-gray-500">
                                                +1 234 567 890
                                            </span>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>

                            <div class="mt-4 border-b border-gray-400 py-3">
                                {/* // Address Collapsible */}
                                <div class="flex flex-row items-center gap-2 justify-between cursor-pointer"  
                                onClick={() => toggleOpen1()}>
                                    <span class="text-gray-700 font-bold tracking-wider text-sm">Address</span>
                                    <ArrowDropDown />
                                </div>
                            </div>

                            <Collapse open={open1}>
                                <div class="mt-2">
                                    <div class="flex flex-row items-center gap-2 justify-between">
                                        <span class="text-gray-700 font-regular tracking-wider text-sm">City</span>
                                        <span class="text-sm font-bold text-gray-500">
                                            New York
                                        </span>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 justify-between mt-2">
                                        <span class="text-gray-700 font-regular tracking-wider text-sm">Country</span>
                                        <span class="text-sm font-bold text-gray-500">
                                            USA
                                        </span>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 justify-between mt-2">
                                        <span class="text-gray-700 font-regular tracking-wider text-sm">Zip Code</span>
                                        <span class="text-sm font-bold text-gray-500">
                                            10001
                                        </span>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 justify-between mt-2">
                                        <span class="text-gray-700 font-regular tracking-wider text-sm">Address</span>
                                        <span class="text-sm font-bold text-gray-500">
                                            1234 Street, 5th Avenue
                                        </span>
                                    </div>

                                </div>
                            </Collapse>
                        </div>
                        
                    </div>

                    <div class="col-span-4 sm:col-span-9">
                        <div class="bg-white shadow rounded-lg p-6">
                            <UnderlineTabs />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorProfile;