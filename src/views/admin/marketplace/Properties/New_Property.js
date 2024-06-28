import { useState } from 'react'
import { Button, Input, Typography } from '@material-tailwind/react'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect } from "react";

import { Spinner } from "@material-tailwind/react";

import { useParams } from 'react-router-dom';

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import app from "Database/db";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";


function generateFirebaseId() {
  // Characters that can be used in the ID
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // Length of the ID
  const idLength = 20;

  let randomId = '';

  for (let i = 0; i < idLength; i++) {
    // Generate a random index to pick a character from the 'chars' string
    const randomIndex = Math.floor(Math.random() * chars.length);

    // Append the randomly selected character to the ID
    randomId += chars.charAt(randomIndex);
  }

  return randomId;
}



export default function Properties() {
  //Generate a random Firebase ID for the property
  const id = generateFirebaseId();
  console.log("Property ID: ", id);

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

        populateDATA(data);
      } else {
        console.log("No such document exists!");
      }
    } catch (error) {
      console.error("Error fetching property details: ", error);
    }
  };

  const populateDATA = (propertyDetails) => {

    document.getElementById("propertyName").value = propertyDetails.PropertyName;
    document.getElementById("propertyType").value = propertyDetails.PropertyType;
    document.getElementById("description").value = propertyDetails.Description;
    document.getElementById("askingPrice").value = propertyDetails.AskingPrice;
    document.getElementById("propertySize").value = propertyDetails.PropertySize;
    document.getElementById("propertySizeUnit").value = propertyDetails.PropertySizeUnit;
    document.getElementById("streetAddress").value = propertyDetails.StreetAddress;
    document.getElementById("city").value = propertyDetails.City;
    document.getElementById("Map").value = propertyDetails.Map;
    document.getElementById("state").value = propertyDetails.State;
    document.getElementById("zip").value = propertyDetails.Zip;
    document.getElementById("country").value = propertyDetails.Country;
    document.getElementById("bedrooms").value = propertyDetails.Bedrooms;
    document.getElementById("bathrooms").value = propertyDetails.Bathrooms;
    document.getElementById("Dimensions").value = propertyDetails.Dimensions;
    document.getElementById("YearBuilt").value = propertyDetails.YearBuilt;
    document.getElementById("category").value = propertyDetails.Category;
    document.getElementById("propertyStatus").value = propertyDetails.PropertyStatus;
    document.getElementById("auctionDate").value = propertyDetails.AuctionDate;
    document.getElementById("auctionTime").value = propertyDetails.AuctionTime;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (SubCollectionID !== "") {

      // Check if the sub-collection already exists      
      const detailsDocRef = doc(db, "properties", propertyID, "Details", SubCollectionID);

      const detailsDocSnapshot = await getDoc(detailsDocRef);
      if (detailsDocSnapshot.exists()) {
        // Sub-collection exists, update the data
        try {
          await setDoc(detailsDocRef, {
            PropertyName: document.getElementById("propertyName").value,
            PropertyName: document.getElementById("propertyName").value,
            PropertyType: document.getElementById("propertyType").value,
            Description: document.getElementById("description").value,
            AskingPrice: document.getElementById("askingPrice").value,
            PropertySize: document.getElementById("propertySize").value,
            StreetAddress: document.getElementById("streetAddress").value,
            Map: document.getElementById("Map").value,
            City: document.getElementById("city").value,
            State: document.getElementById("state").value,
            Zip: document.getElementById("zip").value,
            Country: document.getElementById("country").value,
            Bedrooms: document.getElementById("bedrooms").value,
            Dimensions: document.getElementById("Dimensions").value,
            YearBuilt: document.getElementById("YearBuilt").value,
            Category: document.getElementById("category").value,
            PropertyStatus: document.getElementById("propertyStatus").value,
            Image: url,
          });

          alert("Property details updated successfully!");
        } catch (error) {
          alert("Error updating document in sub-collection: ", error);
          console.error("Error updating document in sub-collection: ", error);
        }
      }
    } else {

      const detailsCollectionRef = collection(db, "properties", propertyID, "Details");
      const detailsDocRef = doc(db, "properties", propertyID);

      // Sub-collection doesn't exist, create a new one
      try {
        await addDoc(detailsCollectionRef, {
          PropertyName: document.getElementById("propertyName").value,
          PropertyName: document.getElementById("propertyName").value,
          PropertyType: document.getElementById("propertyType").value,
          Description: document.getElementById("description").value,
          AskingPrice: document.getElementById("askingPrice").value,
          PropertySize: document.getElementById("propertySize").value,
          StreetAddress: document.getElementById("streetAddress").value,
          City: document.getElementById("city").value,
          State: document.getElementById("state").value,
          Map: document.getElementById("Map").value,
          Zip: document.getElementById("zip").value,
          Country: document.getElementById("country").value,
          Bedrooms: document.getElementById("bedrooms").value,
          Dimensions: document.getElementById("Dimensions").value,
          YearBuilt: document.getElementById("YearBuilt").value,
          Category: document.getElementById("category").value,
          PropertyStatus: document.getElementById("propertyStatus").value,
          Image: url,
        });
        setLoading(false);
        console.log("Document added to sub-collection successfully!");
        await setDoc(detailsDocRef, {
          "coverImage": url,
          "PropertyFor": document.getElementById("propertyFor").value,
          "Details": true,
          "Category": document.getElementById("category").value,
          "PropertyName": document.getElementById("propertyName").value,
          "PropertyLocation": document.getElementById("streetAddress").value + ", " + document.getElementById("city").value + ", " + document.getElementById("state").value + ", " + document.getElementById("zip").value + ", " + document.getElementById("country").value,
        }, { merge: true });
        alert("Property details added successfully!");

      } catch (error) {
        setLoading(false);
        console.error("Error adding document to sub-collection: ", error);
      }
    }
  };

  return (
    <div className="max-w-8xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 border-2 border-gray-200 rounded-xl shadow-xl">
      <div className="w-full mx-auto border-b-2 border-gray-200 pb-4 mb-4">
        <div className="flex justify-between">
          <div className="flex gap-x-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Property ID: {propertyID}</p>
              <p className="text-sm font-medium text-red-500 mt-4">Note : <span className="text-gray-600 font-light">This Information will be displayed to all the investors and prospects, please make sure to enter the correct information.</span></p>
            </div>
          </div>

          {/* upload image */}
          <div className="flex gap-x-4">

            <div>
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                Upload Image
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />

                <Button
                  color="gray"
                  buttonType="filled"
                  size="regular"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                  onClick={async () => {
                    setLoading(true);
                    const storageRef = ref(storage, `properties/${propertyID}`);
                    const uploadTask = uploadBytesResumable(storageRef, image);
                    uploadTask.on(
                      "state_changed",
                      (snapshot) => {
                        const progress = Math.round(
                          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                      },
                      (error) => {
                        console.log(error);
                      },
                      () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                          setUrl(url);
                          console.log(url);
                          addDoc(collection(db, "properties", propertyID), {
                            coverImage: url,
                          });
                          setLoading(false);
                        });
                      }
                    );
                  }}
                >
                  Upload
                </Button>
                {progress === 100 && (
                  <div className="flex items-center justify-center">
                    <Typography
                      color="gray"
                      className="text-center text-xl font-semibold text-gray-600"
                    >
                      Image Uploaded
                    </Typography>
                  </div>
                )}
              </div>
            </div>
            </div>



              </div>
            </div>
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Property Information</h2>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="propertyName" className="block text-sm font-medium leading-6 text-gray-900">
                        Property Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="propertyName"
                          id="propertyName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-5"
                          placeholder="My Beautiful House"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="propertyType" className="block text-sm font-medium leading-6 text-gray-900">
                        Property Type
                      </label>
                      <div className="mt-2">
                        <select
                          id="propertyType"
                          name="propertyType"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-5"
                        >
                          <option>House</option>
                          <option>Apartment</option>
                          <option>Condo</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="propertyTaxID" className="block text-sm font-medium leading-6 text-gray-900">
                        Property Tax ID
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="propertyTaxID"
                          id="propertyTaxID"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-5"
                          placeholder="123-456-789"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="InsuranceID" className="block text-sm font-medium leading-6 text-gray-900">
                        Insurance ID
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="InsuranceID"
                          id="InsuranceID"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-5"
                          placeholder="123-456-789"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="InsepectionDate" className="block text-sm font-medium leading-6 text-gray-900">
                        Inspection Date
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="InsepectionDate"
                          id="InsepectionDate"
                          autoComplete="InsepectionDate"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-2 pr-5"
                          placeholder="MM/DD/YYYY"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-5"
                          defaultValue={''}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">Provide a description of the property.</p>
                    </div>

                    {/* Add more property-specific fields here */}
                    <div className="sm:col-span-2">
                      <label htmlFor="askingPrice" className="block text-sm font-medium leading-6 text-gray-900">
                        Asking Price
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="askingPrice"
                          id="askingPrice"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-5"
                          placeholder="Enter the price"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="propertySize" className="block text-sm font-medium leading-6 text-gray-900">
                        Property Size
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="propertySize"
                          id="propertySize"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-5"
                          placeholder="Enter the size"
                        />
                      </div>
                    </div>

                    {/* // For Rent or Sale */}
                    <div className="sm:col-span-2">
                      <label htmlFor="propertyFor" className="block text-sm font-medium leading-6 text-gray-900">
                        Property For
                      </label>
                      <div className="mt-2">
                        <select
                          id="propertyFor"
                          name="propertyFor"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-5"
                        >
                          <option>Sale</option>
                          <option>Rent</option>

                        </select>
                        </div>
                        </div>
                  </div>
                </div>



                <div className="border-b border-gray-900/10 pb-12">
                  <Typography
                    color="gray"
                    className="text-center text-xl font-semibold text-gray-600"
                  >
                    Property Location
                  </Typography>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="propertyImage" className="block text-sm font-medium leading-6 text-gray-900">
                        Property Location
                      </label>
                    </div>
                  </div>
                  <hr className="my-6 w-full border-gray-400" />

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
                        Street Address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="streetAddress"
                          id="streetAddress"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-5"
                          placeholder="123 Main St"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-5"
                          placeholder="San Francisco"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="state"
                          id="state"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-5"
                          placeholder="CA"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="zip" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="zip"
                          id="zip"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-5"
                          placeholder="94103"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Country
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="country"
                          id="country"
                          autoComplete="country"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-5"
                          placeholder="United States"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="Map" className="block text-sm font-medium leading-6 text-gray-900">
                        Map
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="Map"
                          id="Map"
                          autoComplete="Map"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6 pl-5"
                          placeholder="Paste the map link here"
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Add more property-specific sections here */}
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Property Details</h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-2">
                      <label htmlFor="bedrooms" className="block text-sm font-medium leading-6 text-gray-900">
                        Bedrooms
                      </label>
                      <div className="mt-2">
                        <select
                          id="bedrooms"
                          name="bedrooms"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6 pl-5"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>

                        <div className="sm:col-span-2">
                          <div className="sm:col-span-2">
                            <label htmlFor="Dimensions" className="block text-sm font-medium leading-6 text-gray-900">
                              Dimensions
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="Dimensions"
                                id="Dimensions"
                                autoComplete="Dimensions"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6 pl-5"
                                placeholder="2"
                              />

                              <div className="sm:col-span-2">
                                <label htmlFor="YearBuilt" className="block text-sm font-medium leading-6 text-gray-900">
                                  Year Built
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="Date"
                                    name="YearBuilt"
                                    id="YearBuilt"
                                    autoComplete="YearBuilt"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6 pl-5"
                                    placeholder="2"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Category</h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                      <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                        Category
                      </label>
                      <div className="mt-2">
                        <select
                          id="category"
                          name="category"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6 pl-5"
                        >
                          <option>For Auction</option>
                          <option>Buy Now</option>
                          <option>Make Offer</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="propertyStatus" className="block text-sm font-medium leading-6 text-gray-900">
                        Property Status
                      </label>
                      <div className="mt-2">
                        <select
                          id="propertyStatus"
                          name="propertyStatus"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6 pl-5"
                        >
                          <option>Active</option>
                          <option>Under Contract</option>
                          <option>Sold</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Continue adding other sections or fields as needed */}

                {/* Personal Information and Notifications sections can remain unchanged */}
                {/* ... */}

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold leading-6 text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
          )
}


