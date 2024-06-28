// YourReactComponent.js
import { Spinner } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const YourReactComponent = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [language, setLanguage] = useState('');
    const [timezone, setTimezone] = useState('');
    const [generalInfo, setGeneralInfo] = useState({
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        address: '',
        email: '',
        phoneNumber: '',
        birthday: '',
        organization: '',
        role: '',
        department: '',
        zipCode: '',
    });
    const [disabledFields, setDisabledFields] = useState(true); // State to manage field disabling

    useEffect(() => {
        fetch('http://18.233.67.37:3000/api/v1/users/prospects/' + id)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGeneralInfo(data);
                setProfile(data);
                // setLanguage(data.language);
                // setTimezone(data.timezone);
                // setGeneralInfo(data.generalInfo);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!profile) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex items-center space-x-2 text-primary-700 dark:text-primary-500">
                <Spinner color="lightBlue" />
                <p>Loading...</p>
                </div>
            </div>
        );
    }

    const handleDisableFields = () => {
        setDisabledFields(!disabledFields);
    };

    return (
        <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
            <div className="col-span-full xl:col-auto">
                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                        <img
                            className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                            src={profile.image || `https://ui-avatars.com/api/?name=${profile.name}`}
                            alt="Profile"
                        />
                        <div>
                            <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Profile picture</h3>
                            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                JPG, GIF or PNG. Max size of 800K
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2 -ml-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
                                        <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
                                    </svg>
                                    Upload picture
                                </button>
                                <button
                                    type="button"
                                    className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-semibold dark:text-white">Language & Time</h3>
                    <div className="mb-4">
                        <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Select language
                        </label>
                        <select
                            id="settings-language"
                            name="languages"
                            className={`bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${disabledFields ? 'pointer-events-none opacity-50' : ''}`}
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            disabled={disabledFields}
                        >
                            <option>English (US)</option>
                            <option>Italiano</option>
                            <option>Français (France)</option>
                            <option>正體字</option>
                            <option>Español (España)</option>
                            <option>Deutsch</option>
                            <option>Português (Brasil)</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="settings-timezone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Time Zone
                        </label>
                        <select
                            id="settings-timezone"
                            name="timezones"
                            className={`bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${disabledFields ? 'pointer-events-none opacity-50' : ''}`}
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            disabled={disabledFields}
                        >
                            <option>GMT+0 Greenwich Mean Time (GMT)</option>
                            <option>GMT+1 Central European Time (CET)</option>
                            <option>GMT+2 Eastern European Time (EET)</option>
                            <option>GMT+3 Moscow Time (MSK)</option>
                            <option>GMT+5 Pakistan Standard Time (PKT)</option>
                            <option>GMT+8 China Standard Time (CST)</option>
                            <option>GMT+10 Eastern Australia Standard Time (AEST)</option>
                        </select>
                    </div>
                    <div>
                        <button
                            className="text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            type="button"
                            onClick={handleDisableFields}
                        >
                            {disabledFields ? 'Enable fields' : 'Disable fields'}
                        </button>
                    </div>
                </div>

                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="flow-root">
                        <h3 className="text-xl font-semibold dark:text-white">Other accounts</h3>
                        <ul className="mb-6 divide-y divide-gray-200 dark:divide-gray-700">
                           
                        </ul>
                        <div className="text-sm">
                            <a
                                className="inline-flex items-center font-medium text-primary-700 hover:underline dark:text-primary-500"
                                href="#"
                            >
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-9a1 1 0 011 1v3a1 1 0 11-2 0v-1H8v1a1 1 0 11-2 0v-3a1 1 0 011-1h6zM9 8a1 1 0 100-2h2a1 1 0 100 2H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Connect new account
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-full xl:col-span-2">
                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-semibold dark:text-white">General information</h3>
                    <form action="#">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            {Object.entries(generalInfo).map(([key, value]) => (
                                <div key={key}>
                                    <label
                                        htmlFor={`general-info-${key}`}
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                                    >
                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                    </label>
                                    <input
                                        type="text"
                                        id={`general-info-${key}`}
                                        className={`bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${disabledFields ? 'pointer-events-none opacity-50' : ''}`}
                                        value={value}
                                        onChange={(e) =>
                                            setGeneralInfo({ ...generalInfo, [key]: e.target.value })
                                        }
                                        disabled={disabledFields}
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <button
                                className="text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                type="submit"
                            >
                                Save all
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default YourReactComponent;
