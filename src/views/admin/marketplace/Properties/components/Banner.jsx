import React from "react";
import avatar from "assets/img/avatars/avatar11.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import { useParams } from "react-router-dom";

import { useState } from 'react'
import { 
  Button, 
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography 
} from '@material-tailwind/react'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import Share from "./Share";
import { Spinner } from "@material-tailwind/react";


import { getFirestore, collection, addDoc } from "firebase/firestore";
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

const Banner = () => {

  const {id } = useParams();
  console.log(id);

  const db = getFirestore(app);

  const [loading, setLoading] = useState(false);

  const [PropertiesDetails, setPropertiesDetails] = useState([]);

  useEffect(() => {
    setLoading(true);
    const db = getFirestore(app);
    const getProperties = async () => {
      try {
        const data = await getDocs(collection(db, "properties"));
        const properties = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        for (let i = 0; i < properties.length; i++) {
          if (properties[i].id === id) {
            setPropertiesDetails(properties[i]);
          }
        }

        console.log(PropertiesDetails);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
      finally {
        setLoading(false);
      }
    };
    getProperties();
  }
  , []);

  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
       {loading && (
            <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-100 bg-opacity-75">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-900"></div>
            </div>
        )}
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-64 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${PropertiesDetails.coverImage})` }}
      >
      </div>
      <Button 
      size="sm"
      color="gray"
      variant="outlined" className="flex items-center gap-2 mt-10 font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
      onClick={handleOpen}
      >
        Share this Property{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Button>
    </Card>


    <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Your Attention is Required!
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <Share />
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" onClick={handleOpen}>
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
      </div>

  );
};

export default Banner;
