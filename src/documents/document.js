import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { DocumentCheckIcon, DocumentIcon } from "@heroicons/react/24/solid";

import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "Database/db";

import { DocTabs } from "./Tabs";

export default function Document() {

  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const FormatedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }


  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

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

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setProgress(progress);
          setLoading(true);
          if (progress === 100) {
            setLoading(false);
            alert("File Uploaded Successfully");
          }
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
                uploadedAt: FormatedDate(),
                visibility: 'Public', // Add any other relevant data
                url: downloadURL, // Store the download URL
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

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-between gap-8">
          <div className="flex gap-4 mt-10">
            <DocumentCheckIcon className="w-6 h-6 text-gray-400" />
            <Typography
              color="gray"
              className="text-center text-xl font-bold text-gray-400"
            >
              Documents Section
            </Typography>
          </div>

          <div className="flex gap-4 mt-10">
            {loading ? 
            <div className="flex gap-4 mt-10">
              <Spinner color="lightBlue" size="sm" />
              <Typography
                color="gray"
                className="text-center text-xl font-bold text-gray-400"
              >
                Uploading...
              </Typography>
            </div>
            :
              <Button variant="outlined" className="flex items-center gap-3" color="indigo" onClick={handleButtonClick}>
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
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Upload Files
            </Button>
            }
            <input
              type="file"
              onChange={handleFileUpload}
              //Hide the file input element
              className="hidden"
              id="fileInput"
            />
        </div>
        </div>
        <div className="flex flex-row w-full h-full mt-2">
          <p className="text-gray-500 text-sm font-semibold">
            <span className="text-yellow-900 text-sm font-bold">Note : </span> This System will only accept PDF files, Please make sure to upload only PDF files.
          </p>
        </div>
        <hr className="my-6 w-full border-gray-300" />

        <div className="flex flex-col w-full h-full">
          <div className="flex flex-col w-full h-full">
            <DocTabs />
          </div>
        </div>
      </div>
    </div>
  )
}
