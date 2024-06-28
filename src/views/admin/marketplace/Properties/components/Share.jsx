import React from "react";
import { HiChevronDoubleRight } from "react-icons/hi";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {UnderlineTabs} from "./ShareTAB";

export default function Share() {

  
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        Share
                    </h1>
                    <p className="text-gray-700 dark:text-gray-400 text-sm mb-4">
                        Share your property with investors and Prospects
                    </p>
                    <div className="w-full">
                        <UnderlineTabs />
                    </div>
                </div>
            </div>
        </>
    );
}
