import { Message, People } from 'iconsax-react';
import React, { useState, useEffect } from 'react';
import { Drawer, Placeholder } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import axios from 'axios';

const Updates = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openWithHeader, setOpenWithHeader] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://18.233.67.37:8000/api/v1/users/AllRequests/users');
                const result = await response.json();
                setData(result);
                console.log('Data:', result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedRequest) {
            fetchComments(selectedRequest.id);
        }
    }, [selectedRequest]);


    // Fetch Comments
    const fetchComments = async (requestId) => {
        try {
            const response = await fetch(`http://18.233.67.37:8000/api/v1/users/requests/${requestId}/comments`);
            const result = await response.json();
            setComments(result);
            console.log('Comments:', result);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };



    const handleSendMessage = async () => {
        if (newMessage) {
            const comment = {
                text: newMessage,
                response: null,
            };
            setComments([...comments, { ...comment, userType: 'user' }]);
            setNewMessage("");

            // Send the comment to the API
            try {
                await fetch(`http://18.233.67.37:8000/api/v1/users/requests/${selectedRequest.id}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(comment),
                });
                await sendNotification(selectedRequest);
            } catch (error) {
                console.error('Error sending comment:', error);
            }
        }
    };

    const sendNotification = async (selectedRequest) => {
        try {
            console.log("selectedRequest", selectedRequest);
            await new Promise((resolve) => setTimeout(resolve, 5000));
            axios.post("http://18.233.67.37:8000/api/v1/notifications", {
                PropertyID: selectedRequest.property_id,
                userID : selectedRequest.userDetails.id,
                title: "Update on your request",    
                body: "Hi, your request has been encountered with an update, you can check it out now. If you have any questions, feel free to ask.",

            });
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    };


    if (loading) {
        return (
            <div className="container mx-auto">
                <div className="flex items-center justify-center h-screen">
                    <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="gray" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="black" d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2zm2 8a8 8 0 018-8h2a10 10 0 00-10 10v-2z"></path>
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-start justify-between mt-6">
                <h1 className="text-2xl font-semibold text-gray-900">Investors Requests</h1>
                <p className="mt-2 text-sm text-gray-600">This is the list of investors requests</p>
            </div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Add Request
                                </button>
                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                        <svg className="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                        Actions
                                    </button>
                                    <div id="actionsDropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                            <li>
                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                                        </div>
                                    </div>
                                    <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L13 10.414V17a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                        </svg>
                                        Filter
                                        <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Name</th>
                                        <th scope="col" className="px-4 py-3">Email</th>
                                        <th scope="col" className="px-4 py-3">Category</th>
                                        <th scope="col" className="px-4 py-3">Date</th>
                                        <th scope="col" className="px-4 py-3">Property</th>
                                        <th scope="col" className="px-4 py-3">Update Request</th>
                                        <th scope="col" className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((request) => (
                                        <tr key={request.id}
                                            onClick={() => {
                                                setSelectedRequest(request);
                                                setOpenWithHeader(true);
                                            }}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200 ease-out hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:shadow-lg">
                                            <td className="px-4 py-3">{request.userDetails.name}</td>
                                            <td className="px-4 py-3">{request.userDetails.email}</td>
                                            <td className="px-4 py-3">{request.requested_category}</td>
                                            <td className="px-4 py-3">{new Date(request.date).toLocaleString()}</td>
                                            <td className="px-4 py-3">{request.property_id}</td>
                                            <td className="px-4 py-3">{request.details.question}</td>
                                            <td className="px-4 py-3">{request.details.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <>
                <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
                    <Drawer.Header>
                        <Drawer.Title>Request Details</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        {selectedRequest ? (
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-900 font-semibold">Name:</span>
                                    <span className="text-gray-600">{selectedRequest.userDetails.name}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-900 font-semibold">Email:</span>
                                    <span className="text-gray-600">{selectedRequest.userDetails.email}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-900 font-semibold">Property ID:</span>
                                    <span className="text-gray-600">{selectedRequest.property_id}</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Comments and Responses</h3>
                                    <div className="leading-relaxed text-gray-600 dark:text-gray-600 mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                                        {selectedRequest.details.question}</div>
                                    <div className="space-y-2 mt-2">
                                        {comments.map((comment, index) => (
                                            <div key={index} className="p-4 border rounded-lg shadow-sm bg-gray-100 dark:bg-gray-700">
                                                <p className="text-gray-900 dark:text-gray-100">
                                                    <Message className="w-5 h-5 mr-2 inline-block" />
                                                    {comment.text}</p>
                                                {comment.response && (
                                                    <div className="mt-2 ml-4 pl-4 border-l-2 border-gray-300 dark:border-gray-600">
                                                        <p className="text-gray-700 dark:text-gray-400">{comment.response}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Placeholder.Paragraph />
                        )}
                    </Drawer.Body>
                    <Drawer.Footer>
                        <div className="flex space-x-4 items-center mt-4">
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message here"
                                className="w-full p-2 border rounded-lg text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <button
                                type="button"
                                onClick={handleSendMessage}
                                className="bg-primary-700 hover:bg-primary-800 text-white font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700"
                            >
                                Send
                            </button>
                        </div>
                    </Drawer.Footer>
                </Drawer>
            </>
        </div>
    );
};

export default Updates;
