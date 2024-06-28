import React, { useState, useEffect } from 'react';
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Switch } from "@material-tailwind/react";

import app from "Database/db";

const TABLE_HEAD = ["Name", "Type", "Shared With", "Last Modified", "Uploaded at", "Visibility", ""];

export function AuctionDoc() {
  const [tableRows, setTableRows] = useState([]);
  const [file, setFile] = useState(null);

  const FormatedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is 0-indexed
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    // Fetch files from Firestore and populate the table
    const db = getFirestore(app);
    const docRef = collection(db, 'files');

    getDocs(docRef)
      .then((querySnapshot) => {
        const files = [];
        querySnapshot.forEach((doc) => {
          files.push({
            name: doc.data().name,
            type: doc.data().type,
            uploadedAt: doc.data().uploadedAt,
            visibility: doc.data().visibility,
            sharedWith: doc.data().sharedWith,
            url: doc.data().url,
            id: doc.id,
          });
        });
        setTableRows(files);
        console.log('Files fetched successfully: ', files);
      })
      .catch((error) => {
        console.error('Error fetching files: ', error);
      });
  }, []);

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const storage = getStorage(app);
      const storageRef = ref(storage, 'files/' + selectedFile.name);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress, if needed
        },
        (error) => {
          console.error('Error uploading file: ', error);
        },
        () => {
          // File uploaded successfully, now get the download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              // Add file metadata to Firestore
              const db = getFirestore(app);
              const docRef = collection(db, 'files');

              addDoc(docRef, {
                name: selectedFile.name,
                type: selectedFile.type,
                uploadedAt: new Date(),
                visibility: 'Public', // Add any other relevant data
                url: downloadURL, // Store the download URL
              })
                .then((docRef) => {
                  // Update the table with the new file
                  setTableRows([...tableRows, {
                    name: selectedFile.name,
                    type: selectedFile.type,
                    uploadedAt: FormatedDate(),
                    visibility: 'Public', // Add any other relevant data
                    url: downloadURL,
                    id: docRef.id, // Store the unique ID
                  }]);
                })
                .catch((error) => {
                  console.error('Error adding document: ', error);
                });
            })
            .catch((error) => {
              console.error('Error getting download URL: ', error);
            });
        }
      );
    }
  };

  const encodedURL = (url) => {
    // console.log("Actual URL", url);
    return encodeURIComponent(url);
  }

  return (
    <Card className="h-full w-full">
      <input type="file" onChange={handleFileUpload} />
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((file) => (
            <tr key={file.id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <div className="flex items-center gap-4">
                  <DocumentArrowUpIcon className="w-6 h-6 text-red-400" />
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {file.name}
                  </Typography>
                </div>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {file.type}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {file.sharedWith}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {file.uploadedAt}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {file.uploadedAt}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {file.visibility === 'Public' ? (
                    <Switch color="gray" />
                  ) : (
                    <Switch color="indigo" inputProps={{ 'aria-label': 'controlled' }} />
                  )}
                </Typography>
              </td>
              <td className="p-4">
                <a
                  href={"/test/" + encodedURL(file.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-indigo-500"
                >
                  Open file
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
