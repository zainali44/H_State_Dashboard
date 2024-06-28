import {
    Avatar, Button, Checkbox, Popover,
    PopoverHandler,
    PopoverContent,
    Input
} from '@material-tailwind/react';
import { Share, Timer3 } from '@mui/icons-material';
import React, { useState } from 'react';

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon, ClockIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import SharedStats from './Sharedstats';
import { SharedTable } from './SharedTable';

const Shared = () => {
    const [message, setMessage] = useState('');
    const [date, setDate] = useState(new Date());

    const sendShared = () => {
        toast.success('Shared Sent Successfully', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
    };

    const scheduleShared = () => {
        toast.info('Shared Scheduled Successfully', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
    };

    return (
        <>
            <SharedStats />

            <div className="flex flex-col w-full h-full mt-10 items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full bg-white rounded-lg shadow-lg p-4">
                <SharedTable />
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Shared;
