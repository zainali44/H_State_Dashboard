import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { BuildingOffice2Icon, ClockIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import app from "Database/db";

import {
  getFirestore,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

import { TabsAuc } from "./Tabs";

export default function AuctionPage() {
  const AuctionID = useParams().id;
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [auction_type, setAuctionType] = useState("");
  const [reserve_price, setReservePrice] = useState("");
  const [starting_price, setStartingPrice] = useState("");
  const [editor, setEditor] = useState("");
  const [isAuctionActive, setIsAuctionActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");
  const [auctionStatus, setAuctionStatus] = useState("");

  const db = getFirestore(app);

  const fetchAuctionDetails = async () => {
    try {
      const response = await fetch('http://18.233.67.37:8000/api/v1/auctions/properties/' + AuctionID + '/auctions');
      const data = await response.json();
      console.log("data Details", data[0].status);

      setStartDate(data[0].start_date);
      setEndDate(data[0].end_date);
      setAuctionType(data[0].auction_type);
      setReservePrice(data[0].reserve_price);
      setStartingPrice(data[0].starting_price);
      setEditor(data[0].editor);
      setAuctionStatus(data[0].status);

      if (data[0].status === "open") {
        setIsAuctionActive(true);
      }

    } catch (error) {
      console.log("Error fetching auction details", error);
    }
  };

  const toggleAuctionStatus = async () => {
    const newStatus = isAuctionActive ? "closed" : "open";
    const auctionRef = doc(db, "auctions", AuctionID);

    await updateDoc(auctionRef, {
      status: newStatus,
    });

    setIsAuctionActive(!isAuctionActive);
  };

  useEffect(() => {
    fetchAuctionDetails();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const endDate = new Date(end_date);
      const remainingTime = endDate - now;

      if (remainingTime < 0) {
        setRemainingTime("Auction Ended");
        setAuctionStatus("closed");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [end_date]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Typography color="gray" className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-gray-300 dark:bg-gray-800 p-2 rounded-lg">
          <BuildingOffice2Icon className="w-5 h-5" /> {
            auctionStatus === "open" ? "Auction is Active" : "Auction is Closed"
          }
        </Typography>

        <Typography color="gray" className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-gray-300 dark:bg-gray-800 p-2 rounded-lg border border-indigo-300 dark:border-indigo-300">
          Remaining Time: <span className="flex items-center gap-1">
            <ClockIcon className="w-5 h-5" /> {remainingTime}
          </span>
        </Typography>
      </div>

      <TabsAuc />
    </div>
  );
}
