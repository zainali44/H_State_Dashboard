import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Activity, ArrangeHorizontalCircle, Calendar, Message2, Status, Task, User } from "iconsax-react";
import { Spinner } from "@material-tailwind/react";
import alertGhost from "@material-tailwind/react/theme/components/alert/alertGhost";

const TicketDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket] = useState(null);
    const [comment, setComment] = useState("");
    const [commentedBy, setCommentedBy] = useState("");

    const getTicketDetails = async () => {
        try {
            const response = await fetch(`http://18.233.67.37:3000/api/v1/tickets/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch ticket details");
            }
            const data = await response.json();
            setTicket(data);
        //    console.log("Ticket details:", data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching ticket details:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getTicketDetails();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const newComment = {
            commentedBy: 'Adminstration', // commentedBy,
            comment: comment,
            commentDate: new Date().toISOString()
        };

        console.log("New comment:", ticket._id);

        try {
            const response = await fetch( `
                http://18.233.67.37:3000/api/v1/tickets/${ticket._id}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newComment)
            });
            console.log("Comment added:", response.data);
            setTicket({
                ...ticket,
                TicketComments: [...ticket.TicketComments, newComment]
            });
            alertGhost("Comment added successfully", "success");
            setComment("");
            setCommentedBy("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spinner color="indigo" size="large" />
            </div>
        );
    }

    if (!ticket) {
        return <div className="flex justify-center items-center h-full">No ticket found</div>;
    }

    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
                <div className="flex justify-between items-center w-full space-x-4">
                    <h1 className="text-3xl lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800">{ticket.TicketId}</h1>
                    <button className="flex justify-center items-center py-2 px-4 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-gray-500 focus:ring-gray-500 border border-gray-200 font-medium text-base leading-4 text-gray-900 rounded-md">
                        <ArrangeHorizontalCircle size={20} />
                        <span className="ml-2">Assign to Agent</span>
                    </button>
                </div>
                <p className="text-base font-medium leading-6 text-gray-600">{new Date(ticket.TicketDate).toLocaleDateString()}</p>
                <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full ring-1 ring-gray-300 rounded-md">
                            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Ticket Details</p>
                            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-indigo-500">{ticket.TicketSubject}</h3>
                                        <div className="flex flex-col justify-start items-start w-full space-y-2 md:space-y-4 xl:space-y-6">
                                            <p className="text-sm leading-none text-indigo-500 font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <Task size={16} />
                                                    Ticket Type:
                                                    <div className="text-gray-500">{ticket.TicketType}</div>
                                                </div>
                                            </p>
                                            <p className="text-sm leading-none text-indigo-500">
                                                <div className="flex items-center gap-2">
                                                    <Activity size={16} />
                                                    Priority:
                                                    <span className="text-gray-500">{ticket.TicketPriority}</span>
                                                </div>
                                            </p>
                                            <p className="text-sm leading-none text-gray-800">
                                                <div className="flex items-center gap-2 text-indigo-500">
                                                    <Status size={16} />
                                                    Status:
                                                    <span className="text-gray-500">{ticket.TicketStatus}</span>
                                                </div>
                                            </p>
                                            <p className="text-sm leading-none text-gray-800">
                                                <div className="flex items-center gap-2 text-indigo-500">
                                                    <Calendar size={16} />
                                                    Due Date:
                                                    <span className="text-gray-500">
                                                        {new Date(ticket.TicketDueDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </p>
                                            <p className="text-sm leading-none text-gray-800">
                                                <div className="flex items-center gap-2 text-indigo-500">
                                                    <User size={16} />
                                                    Assigned To:
                                                    <span className="text-gray-500"> {ticket.TicketAssignedTo}
                                                    </span>
                                                </div>
                                            </p>
                                            <p className="text-sm leading-none text-gray-800">
                                                <div className="flex items-center gap-2 text-indigo-500">
                                                    <User size={16} />
                                                    Created By:
                                                    <span className="text-gray-500"> {ticket.TicketCreatedBy}
                                                    </span>
                                                </div>
                                            </p>
                                            {ticket.TicketClosedBy && (
                                                <p className="text-sm leading-none text-gray-800">
                                                    <div className="flex items-center gap-2 text-indigo-500">
                                                        <User size={16} />
                                                        Closed By:
                                                        <span className="text-gray-500"> {ticket.TicketClosedBy}
                                                        </span>
                                                    </div>
                                                </p>
                                            )}
                                            {ticket.TicketClosedDate && (
                                                <p className="text-sm leading-none text-gray-800">
                                                    <div className="flex items-center gap-2 text-indigo-500">
                                                        <Calendar size={16} />
                                                        Closed Date:
                                                        <span className="text-gray-500">
                                                            {new Date(ticket.TicketClosedDate).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-between items-start pb-8 space-y-4 md:space-y-0">
                                        <p className="text-base xl:text-lg leading-6 text-amber-500 font-semibold">Due Date: {new Date(ticket.TicketDueDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm leading-none text-gray-800">
                                    <span className="text-gray-500">Description: </span> {ticket.TicketDescription}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full ring-1 ring-gray-300 rounded-md">
                            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Ticket Attachments</p>
                            <div className="mt-4">
                                <p className="text-sm leading-none text-gray-800">{ticket.TicketAttachments}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full ring-1 ring-gray-300 rounded-md">
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-800">Ticket Comments</h3>
                                {ticket.TicketComments.length > 0 ? (
                                    <div className="mt-6 space-y-6">
                                        {ticket.TicketComments.map((comment, index) => (
                                            <div key={index} className="leading-6 text-gray-800 border-l-4 border-indigo-500 pl-4">
                                                <div className="flex justify-between items-center">
                                                    <h6 className="font-semibold text-gray-800">{comment.commentedBy}</h6>
                                                    <p className="text-md text-gray-800">
                                                        {new Date(comment.commentDate).toLocaleDateString()}</p>
                                                </div>
                                                <p className="text-lg text-gray-900 mt-2">{comment.comment}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600 mt-4">No comments available</p>
                                )}
                            </div>

                            <form onSubmit={handleCommentSubmit} className="mt-4 w-full">

                                <div className="flex flex-col space-y-2 mt-4">
                                    <label htmlFor="comment" className="text-gray-500">Comment</label>
                                    <textarea
                                        id="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mt-4 py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                                >
                                    Add Comment
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ring-1 ring-gray-300 rounded-md">
                        <h3 className="text-xl font-semibold leading-5 text-gray-800">Additional Information</h3>
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                <div className="flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base font-semibold leading-4 text-left text-gray-800">Ticket ID</p>
                                    <p className="text-sm leading-5 text-gray-600">{ticket.TicketId}</p>
                                </div>
                            </div>
                            <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-4 border-b border-gray-200">
                                <p className="text-sm leading-5 text-gray-800">Other Details</p>
                            </div>
                        </div>
                        <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                            <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-green-500 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800 rounded-md">
                                Mark as Completed
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketDetails;
