import { CurrencyDollarIcon, ShareIcon } from "@heroicons/react/24/solid";
import { Button, Card, Typography, Checkbox, Spinner } from "@material-tailwind/react";
import React from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import app from "Database/db";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Details() {
    const AuctionID = useParams().id;

    // console.log("Auction ID: ", AuctionID);  // "93WfJcDjCLmsI9iDPNqo

    const [start_date, setStartDate] = React.useState('');
    const [end_date, setEndDate] = React.useState('');
    const [auction_type, setAuctionType] = React.useState('');
    const [reserve_price, setReservePrice] = React.useState('');
    const [starting_price, setStartingPrice] = React.useState('');
    const [editor, setEditor] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    // Save Auction Details
    const saveAuctionDetails = async () => {
        if (start_date === "" || end_date === "" || auction_type === "" || reserve_price === "" || starting_price === "") {
            toast.error('Please fill in all the fields');
            return;
        }

        const auctionData = {
            start_date,
            end_date,
            auction_type,
            reserve_price,
            starting_price,
            editor,
        };
        try {
            setLoading(true);  // Set loading state to true
            // Send to backend API
            const response = await fetch('http://18.233.67.37:3000/api/v1/auctions/properties/' + AuctionID + '/auctions', 
                 {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(auctionData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            toast.success('Auction saved successfully');
        } catch (error) {
            console.error('There was an error!', error);
            toast.error('There was an error saving the auction');
        } finally {
            setLoading(false);  // Set loading state to false
        }
    };

    const fetchAuctionDetails = async () => {
        try {
            setLoading(true);  // Set loading state to true
            // Fetch from backend API
            const response = await fetch('http://18.233.67.37:3000/api/v1/auctions/properties/' + AuctionID + '/auctions');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log("Auction Details: ", responseData);
            setStartDate(responseData[0].start_date);  // responseData[0].start_date
            setEndDate(responseData[0].end_date);
            setAuctionType(responseData[0].auction_type);
            setReservePrice(responseData[0].reserve_price);
            setStartingPrice(responseData[0].starting_price);
            setEditor(responseData[0].editor);

        } catch (error) {
            console.error('There was an error!', error);
        } finally {
            setLoading(false);  // Set loading state to false
        }
    };

    

    React.useEffect(() => {
        fetchAuctionDetails();
    }, []);

    return (
        <div className="flex flex-col w-full h-full p-4">
            {loading && (
                <div className="flex justify-center items-center w-full h-full absolute top-0 left-0 bg-gray-50 bg-opacity-75 z-50">
                    <Spinner size="xl" />
                </div>
            )}
            <div className={`flex flex-row w-full justify-between ${loading ? "opacity-50" : ""}`}>
                <div className="flex flex-col w-full">
                    <h1 className="text-2xl font-semibold text-gray-800 w-full">Auction Details</h1>
                </div>
            </div>

            <hr className="my-6 w-full border-gray-300" />

            <div className="flex flex-row w-full justify-start gap-4">
                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">Start of Auction</Typography>
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
                            value={start_date}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">End of Auction</Typography>
                    <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input
                            type="date"
                            className="block w-full py-2 pl-10 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Pick End Date"
                            value={end_date}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">Auction Type</Typography>
                    <div className="relative max-w-sm">
                        <select
                            className="block w-full py-2 pl-10 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                            id="auction_type"
                            value={auction_type}
                            onChange={(e) => setAuctionType(e.target.value)}
                        >
                            <option value="">Select Auction Type</option>
                            <option value="Commercial">Commercial Auction</option>
                            <option value="Residential">Residential Auction</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-full justify-start">
                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">Reserve Price</Typography>
                    <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <CurrencyDollarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </div>
                        <input
                            type="number"
                            className="block w-full py-2 pl-10 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Reserve Price"
                            value={reserve_price}
                            onChange={(e) => setReservePrice(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">Starting Price</Typography>
                    <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <CurrencyDollarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </div>
                        <input
                            type="number"
                            className="block w-full py-2 pl-10 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Starting Price"
                            value={starting_price}
                            onChange={(e) => setStartingPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full justify-start mt-6">
                <Typography color="gray" className="mt-1 font-normal mb-2">Editor</Typography>
                <div className="relative max-w-lg">
                    <textarea
                        className="block w-full py-2 px-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                        rows="4"
                        placeholder="Editor"
                        value={editor}
                        onChange={(e) => setEditor(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-start mt-6">
                <Checkbox id="publish" label="Publish Auction" />
            </div>

            <div className="flex justify-start mt-6">
                <Button onClick={saveAuctionDetails}>Save</Button>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
                {/* Same as */}
                <ToastContainer />
        </div>
    );
}
