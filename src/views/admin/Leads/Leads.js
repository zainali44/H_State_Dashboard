import React, { useState, useEffect } from 'react';
import { Drawer, Placeholder } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const Leads = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://18.233.67.37:8000/api/v1/leads');
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
        if (selectedLead) {
            fetchComments(selectedLead.lead_id);
        }
    }, [selectedLead]);

    const fetchComments = async (leadId) => {
        try {
            const response = await fetch(`http://18.233.67.37:8000/api/v1/leads/${leadId}/comments`);
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

            try {
                await fetch(`http://18.233.67.37:8000/api/v1/leads/${selectedLead.lead_id}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(comment),
                });
            } catch (error) {
                console.error('Error sending comment:', error);
            }
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
                <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
                <p className="mt-2 text-sm text-gray-600">This is the list of leads</p>
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
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Buyer Name</th>
                                        <th scope="col" className="px-4 py-3">Buyer Email</th>
                                        <th scope="col" className="px-4 py-3">Offer Price</th>
                                        <th scope="col" className="px-4 py-3">Offer Date</th>
                                        <th scope="col" className="px-4 py-3">Property ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((lead) => (
                                        <tr key={lead.lead_id}
                                            onClick={() => {
                                                setSelectedLead(lead);
                                                setOpenDrawer(true);
                                            }}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200 ease-out hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:shadow-lg">
                                            <td className="px-4 py-3">{lead.buyer_info.first_name} {lead.buyer_info.last_name}</td>
                                            <td className="px-4 py-3">{lead.buyer_info.email}</td>
                                            <td className="px-4 py-3">${lead.offer_details.offer_price}</td>
                                            <td className="px-4 py-3">{new Date(lead.offer_details.offer_date).toLocaleString()}</td>
                                            <td className="px-4 py-3">{lead.property_id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <>
                <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                    <Drawer.Header>
                        <Drawer.Title>Lead Details</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body className="p-6">
                        {selectedLead ? (
                            <div className="flex flex-col space-y-6 bg-white p-6 rounded-lg shadow-md">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-900 font-semibold">Buyer Name:</span>
                                    <span className="text-gray-600">{selectedLead.buyer_info.first_name} {selectedLead.buyer_info.last_name}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-900 font-semibold">Buyer Email:</span>
                                    <span className="text-gray-600">{selectedLead.buyer_info.email}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-900 font-semibold">Phone:</span>
                                    <span className="text-gray-600">{selectedLead.buyer_info.phone}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-900 font-semibold">Property ID:</span>
                                    <span className="text-gray-600">{selectedLead.property_id}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-900 font-semibold">Offer Price:</span>
                                    <span className="text-gray-600">${selectedLead.offer_details.offer_price}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-900 font-semibold">Offer Date:</span>
                                    <span className="text-gray-600">{new Date(selectedLead.offer_details.offer_date).toLocaleString()}</span>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-900 font-semibold">Comments:</span>
                                    </div>
                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        <span className="text-gray-600">{selectedLead.comments}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Placeholder.Paragraph rows={10} />
                        )}
                    </Drawer.Body>

                </Drawer>
            </>
        </div>
    );
};

export default Leads;
