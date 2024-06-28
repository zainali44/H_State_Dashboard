import React from "react";
import { HiChevronDoubleRight } from "react-icons/hi";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

import { getFirestore, collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import app from "Database/db";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { HiLocationMarker } from "react-icons/hi";
import { ShareIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

// axios
import axios from "axios";

export default function Investor() {
    const {id } = useParams();
    console.log("id", id);
  
    const db = getFirestore(app);
  
    const [loading, setLoading] = useState(false);
    const [investors, setInvestors] = React.useState([]);

    // Fetch investors
    React.useEffect(() => {
        setLoading(true);
        const db = getFirestore(app);
        const getInvestors = async () => {
            try {
                const data = await getDocs(collection(db, "users"));
                const investors = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setInvestors(investors);
                console.log(" fetching investors ", investors);
            } catch (error) {
                console.error("Error fetching investors:", error);
            }
            finally {
                setLoading(false);
            }
        };
        getInvestors();
    }, []);

    const handleShare = async (index) => {
        setLoading(true);
        const investorToUpdate = investors[index];
        const investorRef = doc(db, "users", investorToUpdate.id);
        const updatedSharedArray = [...investorToUpdate.Shared, id];

        console.log("Investor to update:", investorToUpdate.id);

    
        try {
            await updateDoc(investorRef, {
                Shared: updatedSharedArray
            });
            // Show success toast
            toast.success('Shared Successfully!');
            await new Promise((resolve) => setTimeout(resolve, 5000));
            axios.post("http://18.233.67.37:3000/api/v1/notifications", {
                PropertyID: id,
                userID : investorToUpdate.id,
                title: "Property Shared",
                body: "You have received a new property"

            });
            setLoading(false);
            // Update the state with the updated investor
            const updatedInvestors = [...investors];
            updatedInvestors[index].Shared = updatedSharedArray;
            setInvestors(updatedInvestors);
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };
    

    return (
        <>
            {loading && <div className="flex items-center justify-center w-full h-full"><Spinner color="blue" size="large" /></div>}
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Share
                    </h1>
                    <p className="text-gray-700 dark:text-gray-400 text-sm mb-4">
                        Share your property with investors
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="flex flex-col w-full">
                        <div className="w-full overflow-hidden rounded-lg shadow-xs">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full whitespace-no-wrap">
                                    <thead>
                                        <tr
                                            className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                                        >
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">Phone</th>
                                            <th className="px-4 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                        {investors.map((investor, index) => (
                                            <tr key={investor.email} className="text-gray-700 dark:text-gray-400">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center text-sm">
                                                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                            <img
                                                                className="object-cover w-full h-full rounded-full"
                                                                src={investor.image}
                                                                alt=""
                                                                loading="lazy"
                                                            />
                                                            <div
                                                                className="absolute inset-0 rounded-full shadow-inner"
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">{investor.full_name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm">{investor.email}</td>
                                                <td className="px-4 py-3 text-sm">{investor.gender}</td>
                                                <td className="px-4 py-3 text-xs">
                                                    <span
                                                        // If Shared array is empty, show "Not Shared" else show "Shared"
                                                        className={`px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full ${investor.status === "Shared" ? "bg-gray-200" : ""}`}

                                                    >
                                                        {investor.Shared !== "" ? "Shared" : "Not Shared"}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center space-x-4 text-sm">
                                                        <button
                                                            onClick={() => handleShare(index)}
                                                            className={`flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-gray-700 ${investor.status === "Shared" ? "cursor-not-allowed" : ""}`}
                                                            disabled={investor.status === "Shared"}
                                                        >
                                                            <span>Share</span>
                                                        </button>
                                                        <ToastContainer
                                                            position="top-center"
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
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="flex flex-row items-center justify-between w-full p-4 bg-white rounded-lg dark:bg-gray-800">
                                    <div className="flex items-center">


                                        <p className="mx-2 text-sm text-gray-600 dark:text-gray-300">
                                            Showing 1 to 10 of 50 Entries
                                        </p>

                                        <div className="flex items-center mx-2 text-sm text-gray-600 dark:text-gray-300">
                                            <span>Show</span>
                                            <select
                                                className="mx-2 outline-none"
                                                aria-label="Selected tab"
                                            >
                                                <option value={10}>10</option>
                                                <option value={25}>25</option>
                                                <option value={50}>50</option>
                                                <option value={100}>100</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
