import React from "react";
import { HiChevronDoubleRight } from "react-icons/hi";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Prospects() {

    const [Prospectss, setProspectss] = React.useState([
        {
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Prospects 1",
            email: "zain@gmail.com",
            phone: "03001234567",
            status: "Not Shared",
        },
        {
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Prospects 2",
            email: "zain@gmail.com",
            phone: "03001234567",
            status: "Not Shared",
        },
        {
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1080&auto=format&fit=crop",
            name: "Prospects 3",
            email: "test@gmail.com",
            phone: "03001234567",
            investment: "500000 $",
            status: "Not Shared",
        },
        {
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1080&auto=format&fit=crop",
            name: "Prospects 3",
            email: "test@gmail.com",
            phone: "03001234567",
            status: "Not Shared",
        },
        {
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1080&auto=format&fit=crop",
            name: "Prospects 3",
            email: "test@gmail.com",
            phone: "03001234567",
            status: "Not Shared",
        }
    ]);

    const handleShare = (index) => {
        // Update the status to "Shared" for the clicked Prospects
        const updatedProspectss = [...Prospectss];
        updatedProspectss[index].status = "Shared";
        setProspectss(updatedProspectss);

        // Show success toast
        toast.success('Shared Successfully!');
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Share
                    </h1>
                    <p className="text-gray-700 dark:text-gray-400 text-sm mb-4">
                        Share your property with Prospectss
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
                                            <th className="px-4 py-3">Investment</th>
                                            <th className="px-4 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                        {Prospectss.map((Prospects, index) => (
                                            <tr key={Prospects.email} className="text-gray-700 dark:text-gray-400">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center text-sm">
                                                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                            <img
                                                                className="object-cover w-full h-full rounded-full"
                                                                src={Prospects.avatar}
                                                                alt=""
                                                                loading="lazy"
                                                            />
                                                            <div
                                                                className="absolute inset-0 rounded-full shadow-inner"
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">{Prospects.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm">{Prospects.email}</td>
                                                <td className="px-4 py-3 text-sm">{Prospects.phone}</td>
                                                <td className="px-4 py-3 text-xs">
                                                    <span
                                                        className={`px-2 py-1 font-semibold leading-tight rounded-full ${Prospects.status === "Pending"
                                                            ? "text-yellow-700 bg-yellow-100"
                                                            : Prospects.status === "Shared"
                                                                ? "text-gray-700 bg-gray-100"
                                                                : "text-red-700 bg-red-100"
                                                            }`}
                                                    >
                                                        {Prospects.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center space-x-4 text-sm">
                                                        <button
                                                            onClick={() => handleShare(index)}
                                                            className={`flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-gray-700 ${Prospects.status === "Shared" ? "cursor-not-allowed" : ""}`}
                                                            disabled={Prospects.status === "Shared"}
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
