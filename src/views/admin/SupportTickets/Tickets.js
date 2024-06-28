import React, { useState, useEffect } from 'react';
import { Drawer, Placeholder } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';

const Tickets = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openWithHeader, setOpenWithHeader] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://18.233.67.37:3000/api/v1/tickets');
                const result = await response.json();
                setTickets(result);
                console.log('Data:', result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleSendMessage = async () => {
        if (newMessage) {
            // Update ticket comments logic here
            setNewMessage("");
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
                <h1 className="text-2xl font-semibold text-gray-900">Ticket Information</h1>
                <p className="mt-2 text-sm text-gray-600">List of tickets</p>
            </div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Ticket ID</th>
                                        <th scope="col" className="px-4 py-3">User ID</th>
                                        <th scope="col" className="px-4 py-3">Type</th>
                                        <th scope="col" className="px-4 py-3">Status</th>
                                        <th scope="col" className="px-4 py-3">Priority</th>
                                        <th scope="col" className="px-4 py-3">Subject</th>
                                        <th scope="col" className="px-4 py-3">Date</th>
                                        <th scope="col" className="px-4 py-3">Due Date</th>
                                        <th scope="col" className="px-4 py-3">Assigned To</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket) => (
                                        <tr key={ticket.TicketId}
                                            onClick={() => {
                                                setSelectedTicket(ticket);
                                                navigate(`/admin/ticket-details/${ticket.TicketId}`);
                                                // setOpenWithHeader(true);
                                            }}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200 ease-out hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:shadow-lg">
                                            <td className="px-4 py-3">{ticket.TicketId}</td>
                                            <td className="px-4 py-3">{ticket.UserId}</td>
                                            <td className="px-4 py-3">{ticket.TicketType}</td>
                                            <td className="px-4 py-3">{ticket.TicketStatus}</td>
                                            <td className="px-4 py-3">{ticket.TicketPriority}</td>
                                            <td className="px-4 py-3">{ticket.TicketSubject}</td>
                                            <td className="px-4 py-3">{new Date(ticket.TicketDate).toLocaleString()}</td>
                                            <td className="px-4 py-3">{new Date(ticket.TicketDueDate).toLocaleString()}</td>
                                            <td className="px-4 py-3">{ticket.TicketAssignedTo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            {selectedTicket && (
                <Drawer
                    open={openWithHeader}
                    onClose={() => setOpenWithHeader(false)}
                    size="sm"
                >
                    <Drawer.Header>
                        <Drawer.Title>Ticket Details</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <div className="flex flex-col space-y-2">
                            <div className="text-lg font-semibold">Ticket ID: {selectedTicket.TicketId}</div>
                            <div className="text-sm text-gray-600">User ID: {selectedTicket.UserId}</div>
                            <div className="text-sm text-gray-600">Type: {selectedTicket.TicketType}</div>
                            <div className="text-sm text-gray-600">Status: {selectedTicket.TicketStatus}</div>
                            <div className="text-sm text-gray-600">Priority: {selectedTicket.TicketPriority}</div>
                            <div className="text-sm text-gray-600">Subject: {selectedTicket.TicketSubject}</div>
                            <div className="text-sm text-gray-600">Description: {selectedTicket.TicketDescription}</div>
                            <div className="text-sm text-gray-600">Date: {new Date(selectedTicket.TicketDate).toLocaleString()}</div>
                            <div className="text-sm text-gray-600">Due Date: {new Date(selectedTicket.TicketDueDate).toLocaleString()}</div>
                            <div className="text-sm text-gray-600">Assigned To: {selectedTicket.TicketAssignedTo}</div>
                            <div className="text-sm text-gray-600">Created By: {selectedTicket.TicketCreatedBy}</div>
                            <div className="text-sm text-gray-600">Closed By: {selectedTicket.TicketClosedBy}</div>
                            <div className="text-sm text-gray-600">Closed Date: {selectedTicket.TicketClosedDate}</div>
                            <div className="text-sm text-gray-600">Comments: {selectedTicket.TicketComments}</div>
                            <div className="text-sm text-gray-600">Attachments: {selectedTicket.TicketAttachments}</div>
                            <div className="text-sm text-gray-600">History: {selectedTicket.TicketHistory}</div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Add a comment..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </Drawer.Body>
                </Drawer>
            )}
        </div>
    );
};

export default Tickets;
