import {
  Card,
  CardHeader,
  Typography,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import React from "react";

import { getFirestore, collection, addDoc, doc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import app from "Database/db"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import SearchIcon from "components/icons/SearchIcon";
import { BsArrow90DegUp, BsArrowBarDown } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import AllTasks from "./AllTasks";

import { Task_Details } from "./task-details";

const TABLE_HEAD = ["Title", "Type", "Related Contact", "Assigned To", "Due Date", "Priority", "Status"];

export function Opentask() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

  const getTasks = async () => {
    const db = getFirestore(app);
    const data = await getDocs(collection(db, "tasks"));
    setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  }

  useEffect(() => {
    getTasks();
  }, []);

 
  const [open, setOpen] = React.useState(false);

  const [open2, setOpen2] = React.useState(false);

  const [selectedTask, setSelectedTask] = useState(null); // Store the selected task for viewing details

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  const db = getFirestore(app);
  const storage = getStorage(app);

  const handleViewDetails = (task) => {
    navigate(`/admin/tasks/${task.id}`);
  };

  const addTask = async () => {
    setLoading(true);
    const name = document.getElementById("name").value;
    const dueDate = document.getElementById("duedate").value;
    const dueTime = document.getElementById("duetime").value;
    const description = document.getElementById("description").value;
    const type = document.getElementById("Type").value;
    const priority = document.getElementById("Priority").value;
    const status = document.getElementById("Status").value;
    const relatedContact = document.getElementById("RelatedContact").value;
    const assignedTo = document.getElementById("AssignedTo").value;
    const relatedDeal = document.getElementById("relateddeal").value;
    const note = document.getElementById("note").value;

    try {

      const docRef = await addDoc(collection(db, "tasks"), {
        name,
        dueDate,
        dueTime,
        description,
        type,
        priority,
        status,
        relatedContact,
        assignedTo,
        relatedDeal,
        note,
      });
      setLoading(false);
      setAlertMessage("Your Task has been Created Successfully, If you want to add more task, please click on the create new task button");
      setAlertOpen(true);
      console.log("Document written with ID: ", docRef.id);
      handleOpen(); // Close the dialog after successfully adding the task.
    } catch (error) {
      setLoading(false);
      setAlertMessage("Error adding task: " + error.message);
      setAlertOpen(true);
      console.error("Error adding document: ", error);
    }
    
  };


  return (
    <>
      <AllTasks />
      <Card className="h-full w-full dark:bg-gray-800 dark:text-white overflow-x-auto dark:border-gray-700 dark:border-opacity-60">
        <CardHeader floated={false} shadow={false} className="rounded-none dark:bg-gray-800 dark:text-white">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex flex-col gap-1 ml-4">
              <Typography variant="h5" color="blue-gray">
                Open Tasks
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Open tasks are tasks that are in progress.
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <input
                  label="Search"
                  icon={<SearchIcon className="h-5 w-5" />}
                  placeholder="Search"
                  className="w-full h-10 pl-5 pr-4 text-sm border border-blue-gray-200 rounded-lg focus:outline-none focus:border-blue-gray-400 dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:border-opacity-60"
                />
              </div>
              <Button className="flex items-center gap-3 mr-2 dark:bg-gray-700 dark:text-white" color="lightBlue"
                onClick={handleOpen}
                size="sm" variant="outlined">
                <BsArrow90DegUp strokeWidth={1} className="h-4 w-4" /> New Task
              </Button>
            </div>
          </div>
        </CardHeader>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Data.map((task) => (
              <tr key={task.id}>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {task.name}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {task.type}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {task.relatedContact}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-2">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {task.assignedTo}
                    </Typography>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {task.dueDate}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  {task.priority === "High" ? (
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span class="h-full w-full shrink-0 rounded-full bg-red-500">
                      </span>
                    </span>
                  ) : task.priority === "Medium" ? (
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span class="h-full w-full shrink-0 rounded-full bg-yellow-500">
                      </span>
                    </span>
                  ) : (
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                      <span class="h-full w-full shrink-0 rounded-full bg-gray-500">
                      </span>
                    </span>
                  )
                  }
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {task.status}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <button as="a"
                    onClick={() => handleViewDetails(task)} // Call handleViewDetails with the selected task
                    variant="small" color="indigo" className="font-medium cursor-pointer">
                    View details
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Dialog open={open} size="s" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h6">
              Create new task
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <Typography className="mb-10 -mt-7 " color="gray" variant="body2">
            Fill in the form below to create a new task.
          </Typography>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-gray-600">
                Task name
              </label>
              <Input id="name" label="Task name" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="duedate" className="text-sm text-gray-600">
                Due date
              </label>
              <Input id="duedate" label="Due date" type="date" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="duetime" className="text-sm text-gray-600">
                Due time
              </label>
              <Input id="duetime" label="Due time" type="time" />
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="description" className="text-sm text-gray-600">
              Description
            </label>
            <Textarea id="description" label="Description" />
          </div>
          <div className="grid grid-cols-3 gap-6 mt-4">
            <div className="flex flex-col">
              <label htmlFor="Type" className="text-sm text-gray-600">
                Type
              </label>
              <select id="Type" label="Type" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" >
                <option value="Call">Call</option>
                <option value="Email">Email</option>
                <option value="Meeting">Meeting</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="Priority" className="text-sm text-gray-600">
                Priority
              </label>
              <select id="Priority" label="Priority" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="Status" className="text-sm text-gray-600">
                Status
              </label>
              <select id="Status" label="Status" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col">
              <label htmlFor="RelatedContact" className="text-sm text-gray-600">
                Related Contact
              </label>
              <select id="RelatedContact" label="Related Contact" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" >
                <option value="John Doe">John Doe</option>
                <option value="Alexa Liras">Alexa Liras</option>
                <option value="Michael Levi">Michael Levi</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="AssignedTo" className="text-sm text-gray-600">
                Assigned To
              </label>
              <select id="AssignedTo" label="Assigned To" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" >
                <option value="John Doe">John Doe</option>
                <option value="Alexa Liras">Alexa Liras</option>
                <option value="Michael Levi">Michael Levi</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-col">
            <label htmlFor="relateddeal" className="text-sm text-gray-600">
              Related Deal
            </label>
            <select id="relateddeal" label="Related Deal" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" >
              <option value="Deal 1">Deal 1</option>
              <option value="Deal 2">Deal 2</option>
              <option value="Deal 3">Deal 3</option>
            </select>
          </div>

          <div className="mt-4 flex flex-col">
            <Textarea id="note" label="Note" />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="outlined" color="indigo" onClick={addTask}>
            Create New Task
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={open2} size="s" handler={handleOpen2}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h6">
              Task Details
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen2}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <Typography className="mb-10 -mt-7 " color="gray" variant="body2">
            Here you can view the details of the task.
          </Typography>
          {selectedTask && (
            <>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm text-gray-600">
                    Task name
                  </label>
                  <input id="name" label="Task name" value={selectedTask.name} readOnly disabled className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="duedate" className="text-sm text-gray-600">
                    Due date
                  </label>
                  <Input id="duedate" label="Due date" type="date" value={selectedTask.dueDate} readOnly disabled className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="duetime" className="text-sm text-gray-600">
                    Due time
                  </label>
                  <Input id="duetime" label="Due time" type="time" value={selectedTask.dueTime} readOnly disabled className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none" />
                </div>
              </div>
              <div className="mt-4 flex flex-col">
                <label htmlFor="description" className="text-sm text-gray-600">
                  Description
                </label>
                <Textarea id="description" label="Description" value={selectedTask.description} readOnly  disabled/>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-4">
                <div className="flex flex-col">
                  <label htmlFor="Type" className="text-sm text-gray-600">
                    Type
                  </label>
                  <select id="Type" label="Type" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none" value={selectedTask.type} readOnly disabled >
                    <option value="Call">Call</option>
                    <option value="Email">Email</option>
                    <option value="Meeting">Meeting</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="Priority" className="text-sm text-gray-600">
                    Priority
                  </label>
                  <select id="Priority" label="Priority" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none" value={selectedTask.priority} disabled >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="Status" className="text-sm text-gray-600">
                    Status
                  </label>
                  <select id="Status" label="Status" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none" value={selectedTask.status} disabled >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="flex flex-col">
                  <label htmlFor="RelatedContact" className="text-sm text-gray-600">
                    Related Contact
                  </label>
                  <select id="RelatedContact" label="Related Contact" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none" value={selectedTask.relatedContact} disabled >
                    <option value="John Doe">John Doe</option>
                    <option value="Alexa Liras">Alexa Liras</option>
                    <option value="Michael Levi">Michael Levi</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="AssignedTo" className="text-sm text-gray-600">
                    Assigned To
                  </label>
                  <select id="AssignedTo" label="Assigned To" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none" value={selectedTask.assignedTo} disabled >
                    <option value="John Doe">John Doe</option>
                    <option value="Alexa Liras">Alexa Liras</option>
                    <option value="Michael Levi">Michael Levi</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-col">
                <label htmlFor="relateddeal" className="text-sm text-gray-600">
                  Related Deal
                </label>
                <select id="relateddeal" label="Related Deal" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none" value={selectedTask.relatedDeal} disabled >
                  <option value="Deal 1">Deal 1</option>
                  <option value="Deal 2">Deal 2</option>
                  <option value="Deal 3">Deal 3</option>
                </select>
              </div>

              <div className="mt-4 flex flex-col">
                <Textarea id="note" label="Note" value={selectedTask.note} readOnly disabled />
              </div>
            </>
          )}
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen2}>
            cancel
          </Button>
          <Button variant="outlined" color="indigo" onClick={handleOpen2}>
            Edit Task
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
