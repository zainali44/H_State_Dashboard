import Card from "components/card";
import React from "react";
import { useParams } from "react-router-dom";

import { useState } from 'react'
import { Button, Input, Typography } from '@material-tailwind/react'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect } from "react";

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

const Details = () => {
  const {id } = useParams();

  const db = getFirestore(app);
  const storage = getStorage(app);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [propertyID, setPropertyID] = useState(id);
  const [loading, setLoading] = useState(false);

  const [SubCollectionID, setSubCollectionID] = useState(""); // Use useState to handle SubCollectionID

  const [propertyDetails, setPropertyDetails] = useState({
    PropertyName: "",
    PropertyType: "",
    Description: "",
    AskingPrice: "",
    PropertySize: "",
    PropertySizeUnit: "",
    StreetAddress: "",
    City: "",
    Map: "",
    State: "",
    Zip: "",
    Country: "",
    Bedrooms: "",
    Bathrooms: "",
    Dimensions: "",
    YearBuilt: "",
    Category: "",
    PropertyStatus: "",
    AuctionDate: "",
    AuctionTime: "",
  });

  useEffect(() => {
    // Fetch SubCollectionID first
    fetchSubCollectionID();
  }, []);


  useEffect(() => {
    // When SubCollectionID changes, fetch property details
    if (SubCollectionID) {
      fetchPropertyDetails();
    }
    else {
      console.log("SubCollectionID is empty!");
    }
  }, [SubCollectionID]);


  const fetchSubCollectionID = async () => {
    try {
      const detailsCollectionRef = collection(db, 'properties', propertyID, 'Details');
      const snapshot = await getDocs(detailsCollectionRef);

      // Assuming there's only one document in the sub-collection, get its ID
      snapshot.forEach((doc) => {
        setSubCollectionID(doc.id);
      });
    } catch (error) {
      console.error('Error fetching sub-collection ID: ', error);
    }

  };

  console.log("Let us see the sub-collection ID: ", SubCollectionID);


  const fetchPropertyDetails = async () => {

    console.log("Sub-collection ID: ", SubCollectionID);
    console.log("Property ID is: ", propertyID);
    const detailsDocRef = doc(db, "properties", propertyID, "Details", SubCollectionID);

    try {
      const detailsDocSnapshot = await getDoc(detailsDocRef);

      if (detailsDocSnapshot.exists()) {
        const data = detailsDocSnapshot.data();
        setPropertyDetails({
          PropertyName: data.PropertyName,
          PropertyType: data.PropertyType,
          Description: data.Description,
          AskingPrice: data.AskingPrice,
          PropertySize: data.PropertySize,
          PropertySizeUnit: data.PropertySizeUnit,
          StreetAddress: data.StreetAddress,
          City: data.City,
          State: data.State,
          Zip: data.Zip,
          Map: data.Map,
          Country: data.Country,
          Bedrooms: data.Bedrooms,
          Bathrooms: data.Bathrooms,
          Dimensions: data.Dimensions,
          YearBuilt: data.YearBuilt,
          Category: data.Category,
          PropertyStatus: data.PropertyStatus,
          AuctionDate: data.AuctionDate,
          AuctionTime: data.AuctionTime,

        });

        console.log("Sub-collection data: ", data);

      } else {
        console.log("No such document exists!");
      }
    } catch (error) {
      console.error("Error fetching property details: ", error);
    }
  };



  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            Property Details
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          As we live, our hearts turn colder. Cause pain is what we go through
          as we become older. We get insulted by others, lose trust for those
          others. We get back stabbed by friends. It becomes harder for us to
          give others a hand. We get our heart broken by people we love, even
          that we give them all...
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Property title</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {propertyDetails.PropertyName}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Property Location</p>
          <p className="font-bold text-indigo-700 dark:text-white cursor-pointer"
          onClick={() => window.open(`${propertyDetails.Map}`, "_blank")}
          >{
            console.log("Map URL: ", propertyDetails)
          }
            {propertyDetails.StreetAddress}, {propertyDetails.City}, {propertyDetails.State}, {propertyDetails.Zip}, {propertyDetails.Country}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Catagory</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {propertyDetails.Category}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Property Type</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {propertyDetails.PropertyType}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Property Size</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {propertyDetails.PropertySize} {propertyDetails.PropertySizeUnit}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Asking Price</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {propertyDetails.AskingPrice} $
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Bedrooms</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
                {propertyDetails.Bedrooms}
            </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Dimensions</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
                {propertyDetails.Dimensions}
            </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Year Built</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
                {propertyDetails.YearBuilt}
            </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Property Status</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
                {propertyDetails.PropertyStatus}
            </p>
        </div>

    
        
      </div>
    </Card>
  );
};

export default Details;
