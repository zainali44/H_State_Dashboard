// YourReactComponent.js
import { Spinner } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const Prospect = () => {

    const navigation = useNavigate();

    const [prospects, setProspects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchProspects = async () => {
            try {
                const response = await fetch('http://18.233.67.37:8000/api/v1/users/prospects'); // Replace with your API endpoint
                const data = await response.json();
                setProspects(data);
            } catch (error) {
                console.error('Error fetching the prospects:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProspects();
    }, []);

    if (isLoading) {
        return (

            <div className="flex items-center justify-center h-screen">
                <Spinner color="blue" />
            </div>
        )
    }

    return (
        <div>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <nav className="flex mb-5" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                                <li className="inline-flex items-center">
                                    <a href="#" className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                                        <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                        <a href="#" className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">Users</a>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                        <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">List</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All users</h1>
                    </div>
                    <div className="sm:flex">
                        <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                            <form className="lg:pr-3" action="#" method="GET">
                                <label htmlFor="users-search" className="sr-only">Search</label>
                                <div className="relative mt-1 lg:w-64 xl:w-96">
                                    <input type="text" name="email" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for users" />
                                </div>
                            </form>
                            <div className="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
                                <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                                </a>
                                <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                </a>
                                <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 116 0 3 3 0 01-6 0z"></path><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.086-9.586a2 2 0 11-2.828-2.828 2 2 0 012.828 2.828z" clipRule="evenodd"></path></svg>
                                </a>
                                <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 000 2h1.268l.21 1.422a5.001 5.001 0 002.74 3.623l.542.217.214.537A4.998 4.998 0 0010 15a4.998 4.998 0 004.026-2.001l.214-.537.542-.217a5.001 5.001 0 002.74-3.623L15.732 5H17a1 1 0 100-2H3zm8 10a3 3 0 11-6 0 3 3 0 016 0z" clipRule="evenodd"></path></svg>
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                            <a href="#" className="inline-flex items-center justify-center w-1/2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700">
                                <svg className="w-3.5 h-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.086-9.586a2 2 0 11-2.828-2.828 2 2 0 012.828 2.828z" clipRule="evenodd"></path><path fillRule="evenodd" d="M10 12a1 1 0 00-1 1v.5a.5.5 0 001 0V13a1 1 0 000-2v-.5a.5.5 0 10-1 0V11a1 1 0 011 1z" clipRule="evenodd"></path></svg>
                                Share
                            </a>
                            <a href="#" className="inline-flex items-center justify-center w-1/2 px-4 py-2 text-sm font-medium text-white bg-primary-700 border border-transparent rounded-lg sm:w-auto hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                                <svg className="w-3.5 h-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"></path></svg>
                                Add User
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full text-sm text-gray-500">
                    <thead>
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Region</th>
                            <th className="p-4">Partner</th>
                            <th className="p-4">Sub-Region</th>
                            <th className="p-4">LOB</th>
                            <th className="p-4">Country</th>
                            <th className="p-4">Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prospects.map(prospect => (
                            <tr key={prospect.id} className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md dark:hover:shadow-md transition duration-150 ease-in-out sm:rounded-lg sm:shadow-md sm:dark:border-gray-700 sm:dark:hover:shadow-lg cursor-pointer"
                                onClick={() => navigation(`/admin/prospects/${prospect.id}`)}>
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10">
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src={prospect.image && prospect.image !== "null" && prospect.image !== ""
                                                    ? prospect.image
                                                    : "https://ui-avatars.com/api/?name=" + encodeURIComponent(prospect.name)}
                                                alt={prospect.name}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{prospect.name}</div>
                                            <div className="text-sm text-gray-500">{prospect.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">{prospect.status}</td>
                                <td className="p-4">{prospect.region}</td>
                                <td className="p-4">{prospect.partner}</td>
                                <td className="p-4">{prospect.subRegion}</td>
                                <td className="p-4">{prospect.lob}</td>
                                <td className="p-4">{prospect.country}</td>
                                <td className="p-4">{prospect.owner}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default Prospect;
