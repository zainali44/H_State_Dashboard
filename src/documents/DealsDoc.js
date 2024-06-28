import React, { useState, useEffect } from 'react';
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Switch } from "@material-tailwind/react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import app from "Database/db";


// import { Modal } from '../Modal';

const TABLE_HEAD = ["Name", "Type", "Shared With", "Last Modified", "Uploaded at", "Visibility", ""];

export function DealDoc() {

  const [tableRows, setTableRows] = useState([]);
  const [file, setFile] = useState(null);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

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
                .then(() => {
                  // Update the table with the new file
                  setTableRows([...tableRows, {
                    name: selectedFile.name,
                    type: selectedFile.type,
                    uploadedAt: FormatedDate,
                    visibility: 'Public', // Add any other relevant data
                    url: downloadURL,
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
    <div className="flex flex-col w-full">
      <Card className="h-full w-full">
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
            {tableRows.map((file, index) => (
              <tr key={file.name} className="even:bg-blue-gray-50/50">
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
                    {
                      file.visibility === 'Public' ?
                        <Switch
                          color="gray"
                        /> :
                        <Switch
                          color="indigo"
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                    }
                  </Typography>
                </td>
                <td className="p-4">
                  <Button
                    variant='outlined'
                   
                    onClick={handleOpen}
                  >
                    Open Pdf File
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Long Dialog</DialogHeader>
        <DialogBody className="h-[42rem] overflow-scroll">
          <Typography className="font-normal">
            I&apos;ve always had unwavering confidence in my abilities, and I
            believe our thoughts and self-perception are the primary forces that
            shape us. Many people limit themselves by their own self-doubt,
            slowing their progress. Fortunately, I was raised with the belief
            that I could achieve anything.
            <br />
            <br />
            As we journey through life, we often encounter challenges that
            harden our hearts. Pain, insults, broken trust, and betrayal can
            make us hesitant to help others. Love can lead to heartbreak, and
            time can distance us from family. These experiences can gradually
            erode our optimism.
            <br /> <br />
            Life doesn&apos;t always place us where we want to be. We grow, make
            mistakes, and strive to express ourselves and fulfill our dreams. If
            we&apos;re fortunate enough to participate in life&apos;s journey,
            we should cherish every moment. Regrettably, some only recognize the
            value of a moment after it&apos;s passed.
            <br /> <br />
            One thing I&apos;ve learned is that I can excel at anything I set my
            mind to. My skill is my ability to learn. I&apos;m here to learn, to
            grow, and to inspire others to do the same. Don&apos;t fear making
            mistakes; they teach us far more than compliments ever will.
            Ultimately, what truly matters is how our actions inspire and
            motivate others. Some will be ignited by our endeavors, while others
            may be offended—it&apos;s all part of the process. I'm here to
            pursue my dreams and encourage others to do the same.
            <br /> <br />
            Now is the time to embrace greatness without fear of judgment. Some
            may resent those who shine brightly or stand out, but it&apos;s time
            to be the best version of ourselves. Do you have faith in your
            beliefs, even if you&apos;re the only one who does?
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="gray" onClick={handleOpen}>
            confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}