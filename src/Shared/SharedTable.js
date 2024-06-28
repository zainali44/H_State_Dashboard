import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";

import React, { useState } from 'react';

import { getFirestore, collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import app from "Database/db";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { HiLocationMarker } from "react-icons/hi";
import { ShareIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
 
const TABLE_HEAD = ["Details", "Property ID", "Date", "Status", "Type", "Actions"];
 

 
export function SharedTable() {

    const [loading, setLoading] = useState(false);
    const [SharedData, setSharedData] = useState([]);

    const db = getFirestore(app);

    // Timestamp
    React.useEffect(() => {
        setLoading(true);
        const db = getFirestore(app);
        const getShared = async () => {
            try {
                const data = await getDocs(collection(db, "notifications"));
                const shared = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log("shared details", shared);
                setSharedData(shared);
            } catch (error) {
                console.error("Error fetching shared:", error);
            } finally {
                setLoading(false);
            }
        };
        getShared();
    }
    , []);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Shared Deals
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last shared deals
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" color="gray">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className=" px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
            {loading ? (
              <tr>
                <td colSpan={6} className="p-4">
                  <div className="flex justify-center items-center gap-2">
                    <Spinner size="sm" color="lightBlue" />
                    <Typography color="blue-gray">Fetching Shared Deals...</Typography>
                  </div>
                </td>
              </tr>
            ) : (
              SharedData.map((shared) => (
                <tr key={shared.id} className="border-b border-blue-gray-100">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar
                        src={shared.avatar}
                        alt={shared.name}
                        size="lg"
                        color="lightBlue"
                      />
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          {shared.title}
                        </Typography>
                        <Typography color="gray" className="font-normal">
                          {shared.body}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Typography variant="h8" color="blue-gray">
                      {shared.PropertyID}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="h8" color="blue-gray">
                    {shared.time.toDate().toLocaleString()} {/* Convert Firestore Timestamp to JavaScript Date and format */}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Chip color="gray" size="sm">
                      {shared.status}
                    </Chip>
                  </td>
                  <td className="p-4">
                    {shared.type}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      
                    </div>
                  </td>
                </tr>
              ))
            )}
            
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}