import {
    Avatar, Button, Checkbox, Popover,
    PopoverHandler,
    PopoverContent,
    Input
} from '@material-tailwind/react';
import { NotificationAdd, Timer3 } from '@mui/icons-material';
import React, { useState } from 'react';

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon, ClockIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import NotificationStats from './Notificationstats';

const Notification = () => {
    const [message, setMessage] = useState('');
    const [date, setDate] = useState(new Date());

    const investors = [
        {
            name: 'Investor 1',
            property: 'Property 1',
        },
        {
            name: 'Investor 2',
            property: 'Property 2',
        },
        {
            name: 'Investor 3',
            property: 'Property 3',
        },
        {
            name: 'Investor 4',
            property: 'Property 4',
        },
        {
            name: 'Investor 5',
            property: 'Property 5',
        },
        {
            name: 'Investor 6',
            property: 'Property 6',
        },
        {
            name: 'Investor 7',
            property: 'Property 7',
        },
        {
            name: 'Investor 8',
            property: 'Property 8',
        },
        {
            name: 'Investor 9',
            property: 'Property 9',
        },
        {
            name: 'Investor 10',
            property: 'Property 10',
        },
        {
            name: 'Investor 11',
            property: 'Property 11',
        },
        {
            name: 'Investor 12',
            property: 'Property 12',
        },
        {
            name: 'Investor 13',
            property: 'Property 13',
        },
        {
            name: 'Investor 14',
            property: 'Property 14',
        },
        {
            name: 'Investor 15',
            property: 'Property 15',
        },
        {
            name: 'Investor 16',
            property: 'Property 16',
        },
        {
            name: 'Investor 17',
            property: 'Property 17',
        },
        {
            name: 'Investor 18',
            property: 'Property 18',
        },
        {
            name: 'Investor 19',
            property: 'Property 19',
        },
        {
            name: 'Investor 20',
            property: 'Property 20',
        },
        {
            name: 'Investor 21',
            property: 'Property 21',
        },
        {
            name: 'Investor 22',
            property: 'Property 22',
        },
        {
            name: 'Investor 23',
            property: 'Property 23',
        },
        {
            name: 'Investor 24',
            property: 'Property 24',
        },
        {
            name: 'Investor 25',
            property: 'Property 25',
        },
        {
            name: 'Investor 26',
            property: 'Property 26',
        },
        {
            name: 'Investor 27',
            property: 'Property 27',
        },
        {
            name: 'Investor 28',
            property: 'Property 28',
        },
        {
            name: 'Investor 29',
            property: 'Property 29',
        },
        {
            name: 'Investor 30',
            property: 'Property 30',
        },
        {
            name: 'Investor 31',
            property: 'Property 31',
        },
        {
            name: 'Investor 32',
            property: 'Property 32',
        },
        {
            name: 'Investor 33',
            property: 'Property 33',
        },
        {
            name: 'Investor 34',
            property: 'Property 34',
        },
    ]

    const sendNotification = () => {
        toast.success('Notification Sent Successfully', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
    };

    const scheduleNotification = () => {
        toast.info('Notification Scheduled Successfully', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
    };

    return (
        <>
            <NotificationStats />

            <div className="flex flex-col w-full h-full mt-10 items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full bg-white rounded-lg shadow-lg p-4">
                    <div className="flex flex-row items-center justify-center w-full gap-4">
                        <NotificationAdd className="text-6xl" />
                        <h1 className="text-2xl font-bold">
                            Send Notifications to Investors</h1>
                    </div>
                    <p className="text-gray-500 my-2">
                        Enter the message you want to send to investors
                    </p>
                    <div className="flex flex-col w-full items-center justify-center">
                        <textarea
                            className="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-500 whitespace-pre-wrap w-3/4"
                            rows="4"
                            placeholder='Enter your message here...'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        {/* select the investors you want to send the notification to */}
                        <div className="grid grid-cols-8 gap-4 mt-4">
                            {investors.map((investor, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center gap-2"
                                >
                                    <Avatar src="https://images.unsplash.com/photo-1499887142886-791eca5918cd?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" size="lg" alt="avatar" />
                                    <Checkbox label={investor.name} color="gray" />
                                </div>
                            ))}
                        </div>

                        {/* line */}
                        <div className="w-full border-b-2 border-gray-200 my-4" />

                        {/* send notification button */}

                        <Button
                            onClick={sendNotification}
                            variant='outlined'
                            className="flex items-center gap-3">
                            <NotificationAdd className="h-5 w-5" />
                            Send Notification
                        </Button>

                        {/* line */}
                        <div className="w-full border-b-2 border-gray-200 my-4" />
                        {/* Schedule Notification */}
                        <div className="flex flex-row items-center  gap-4 mt-4">
                            <p className="text-gray-500">Schedule Notification</p>
                            <div className="p-24">
                                <Popover placement="bottom">
                                    <PopoverHandler>
                                        <Input
                                            label="Select a Date"
                                            onChange={() => null}
                                            value={date ? format(date, "PPP") : ""}
                                        />
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <DayPicker
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            showOutsideDays
                                            className="border-0"
                                            classNames={{
                                                caption: "flex justify-center py-2 mb-4 relative items-center",
                                                caption_label: "text-sm font-medium text-gray-900",
                                                nav: "flex items-center",
                                                nav_button:
                                                    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                                nav_button_previous: "absolute left-1.5",
                                                nav_button_next: "absolute right-1.5",
                                                table: "w-full border-collapse",
                                                head_row: "flex font-medium text-gray-900",
                                                head_cell: "m-0.5 w-9 font-normal text-sm",
                                                row: "flex w-full mt-2",
                                                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                day: "h-9 w-9 p-0 font-normal",
                                                day_range_end: "day-range-end",
                                                day_selected:
                                                    "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                                day_today: "rounded-md bg-gray-200 text-gray-900",
                                                day_outside:
                                                    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                                day_disabled: "text-gray-500 opacity-50",
                                                day_hidden: "invisible",
                                            }}
                                            components={{
                                                IconLeft: ({ ...props }) => (
                                                    <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                                                ),
                                                IconRight: ({ ...props }) => (
                                                    <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                                                ),
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <input
                                type="time"
                                className="border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-500"
                            />

                            {/* schedule notification button */}
                            <Button
                                onClick={scheduleNotification}
                                variant='outlined'
                                className="flex items-center gap-3">
                                <ClockIcon className="h-5 w-5" />
                                Schedule Notification
                            </Button>
                        </div>

                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Notification;
