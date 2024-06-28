import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "Database/db";
import { Activity, Calendar, Message2, Status, Task, User } from "iconsax-react";

const Task_Details = () => {
    const TaskID = useParams().id;
    const [loading, setLoading] = useState(true);
    const [Data, setData] = useState([]);

    const getTasks = async () => {
        const db = getFirestore(app);
        const data = await getDocs(collection(db, "tasks"));
        const filteredData = data.docs
            .filter((doc) => doc.id === TaskID)
            .map((doc) => ({ ...doc.data(), id: doc.id }));

        setData(filteredData);
        setLoading(false);
    };

    useEffect(() => {
        getTasks();
    }, [TaskID]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            {Data.map((task) => (
                <div key={task.id} className="flex justify-start item-start space-y-2 flex-col">
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">{task.title}</h1>
                    <p className="text-base font-medium leading-6 text-gray-600">{task.dueDate}</p>
                    <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full ring-1 ring-gray-300 rounded-md">
                                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Task Details</p>
                                <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                                            <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-indigo-500">{task.name}</h3>
                                            <div className="flex flex-col justify-start items-start w-full space-y-2 md:space-y-4 xl:space-y-6">
                                                <p className="text-sm leading-none text-indigo-500 font-semibold">
                                                    <div className="flex items-center gap-2">
                                                        <Task size={16} />
                                                        Task Type:
                                                        <div className="text-gray-500">{task.type}</div>
                                                    </div>
                                                </p>
                                                <p className="text-sm leading-none text-indigo-500">
                                                    <div className="flex items-center gap-2">
                                                        <Activity size={16} />
                                                        Priority:
                                                        <span className="text-gray-500">{task.priority}</span>
                                                    </div>
                                                </p>
                                                <p className="text-sm leading-none text-gray-800">
                                                    <div className="flex items-center gap-2 text-indigo-500">
                                                        <Status size={16} />
                                                        Status:
                                                        <span className="text-gray-500">{task.status}</span>
                                                    </div>
                                                </p>
                                                <p className="text-sm leading-none text-gray-800">
                                                    <div className="flex items-center gap-2 text-indigo-500">
                                                        <Calendar size={16} />
                                                        Start Date:
                                                        <span className="text-gray-500">
                                                            {task.createddate}
                                                        </span>
                                                    </div>
                                                </p>
                                                <p className="text-sm leading-none text-gray-800">
                                                    <div className="flex items-center gap-2 text-indigo-500">
                                                        <User size={16} />
                                                        Assigned To:
                                                        <span className="text-gray-500"> {task.assignedTo}
                                                        </span>
                                                    </div>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-between items-start pb-8 space-y-4 md:space-y-0">
                                            <p className="text-base xl:text-lg leading-6 text-amber-500 font-semibold">Due Date: {task.dueDate}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm leading-none text-gray-800">
                                        <span className="text-gray-500">Description: </span> {task.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full ring-1 ring-gray-300 rounded-md">
                                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Task Attachments</p>
                                <div className="mt-4">
                                    <p className="text-sm leading-none text-gray-800">{task.attachments}</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full ring-1 ring-gray-300 rounded-md">
                                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Task Comments</p>
                                <div className="mt-4">
                                    <div className="flex items-center gap-2">

                                        <Message2 size={18} color="#6B7280" />

                                        <p className="text-sm leading-none text-gray-800">{task.comments}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ring-1 ring-gray-300 rounded-md">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Additional Information</h3>
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-base font-semibold leading-4 text-left text-gray-800">Task ID</p>
                                        <p className="text-sm leading-5 text-gray-600">{task.id}</p>
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
                    </div >
                </div >
            ))}
        </div >
    );
};

export default Task_Details;
