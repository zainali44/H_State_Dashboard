import React, { useEffect, useState } from "react";
import axios from 'axios';
import { DirectboxSend, Message2, MessageAdd, MessageNotif } from "iconsax-react";
import { Avatar, Chip } from "@material-tailwind/react";
import { ArrowDropDown } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Email, Archive, ArrowSquareLeft } from '@mui/icons-material';
import { useParams } from "react-router-dom";

const Intraction = () => {
    const { id } = useParams();

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://18.233.67.37:3000/api/v1/messages/' + id);
                setMessages(response.data);
                console.log("Link: http://54.172.179.26:3000/api/v1/messages/" + id);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="min-h-screen p-6">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        <div className="flex items-center gap-2">
                            <MessageNotif size="24" color="#6B7280" />
                            Interaction
                        </div>
                    </h1>
                </div>
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <ActivityCard
                            key={index}
                            icon={<Message2 size="24" color="#6B7280" />}
                            heading={`Sent a message to ${message.receiverName}`}
                            content={`Message: ${message.msg}`}
                            date={`Sent: ${new Date(parseInt(message.sent)).toLocaleString()}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ActivityCard = ({ icon, heading, content, date }) => {
    return (
        <div className="flex gap-3 p-4 bg-white shadow rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
                {icon}
            </div>
            <div className="grid gap-3">
                <div className="grid gap-0.5">
                    <h2 className="text-gray-900 text-sm font-medium leading-snug">
                        {heading}
                    </h2>
                    <h3 className="text-gray-900 text-sm font-normal leading-4">{date}</h3>
                </div>
                <div className="w-fit p-3 bg-gray-50 rounded-lg flex gap-1">
                    <MessageAdd size="20" color="#6B7280" />
                    <Typography className="text-gray-900 text-sm font-bold leading-snug">
                        {content}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default Intraction;
