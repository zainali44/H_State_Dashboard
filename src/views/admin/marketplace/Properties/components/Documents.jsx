import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { Button, Typography } from '@material-tailwind/react';
import app from "Database/db";
import Card from "components/card";
import { Spinner } from "@material-tailwind/react";
import PDFIcon from "components/icons/WidgetIcon/PDFIcon";
import { DownloadDoneOutlined, UploadFileOutlined } from "@mui/icons-material";

const DocumentUpload = () => {
    const { id } = useParams();
    const db = getFirestore(app);

    const [loading, setLoading] = useState(false);
    const [propertyDetails, setPropertyDetails] = useState({});
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getPropertyDetails = async () => {
            try {
                const docRef = doc(db, "properties", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPropertyDetails({ ...docSnap.data(), id: docSnap.id });
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error("Error fetching property:", error);
            } finally {
                setLoading(false);
            }
        };
        getPropertyDetails();
    }, [id, db]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const storage = getStorage();
        const storageRef = ref(storage, `property_documents/${id}/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error('Error uploading file:', error);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    const propertyRef = doc(db, "properties", id);
                    await setDoc(propertyRef, {
                        documents: [...(propertyDetails.documents || []), { name: file.name, url: downloadURL }],
                    }, { merge: true });

                    const updatedDocSnap = await getDoc(propertyRef);
                    setPropertyDetails({ ...updatedDocSnap.data(), id: updatedDocSnap.id });
                    setUploadSuccess(true);
                } catch (error) {
                    console.error('Error updating Firestore:', error);
                } finally {
                    setUploadProgress(0);
                    setTimeout(() => setUploadSuccess(false), 3000); // Hide success message after 3 seconds
                }
            }
        );
    };

    const removeDocument = async (document) => {
        try {
            const storage = getStorage();
            const docRef = ref(storage, `property_documents/${id}/${document.name}`);
            
            // Delete file from storage
            await deleteObject(docRef);
            
            // Update Firestore document to remove the file reference
            const propertyRef = doc(db, "properties", id);
            const updatedDocuments = (propertyDetails.documents || []).filter(doc => doc.name !== document.name);
            await setDoc(propertyRef, { documents: updatedDocuments }, { merge: true });
            
            // Fetch updated property details
            const updatedDocSnap = await getDoc(propertyRef);
            setPropertyDetails({ ...updatedDocSnap.data(), id: updatedDocSnap.id });
        } catch (error) {
            console.error('Error removing document:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            {loading && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-100 bg-opacity-75">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-900"></div>
                </div>
            )}
            <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
                <div className="w-full p-4">
                    <Typography variant="h5" color="blue-gray">
                        Documents Section
                    </Typography>
                    <Typography variant="body1" color="blue-gray">
                        Upload documents for the property
                    </Typography>

                    <div className="flex flex-col items-center justify-center mt-4 rounded-lg p-4 border border-dashed border-gray-300 bg-gray-100">
                        <input type="file" onChange={handleFileUpload} className="!hidden" id="file-upload" />
                        <label htmlFor="file-upload" className="btn btn-primary cursor-pointer !w-auto !h-auto">
                            <UploadFileOutlined className="mr-2" />
                            Upload Document
                        </label>
                        {uploadProgress > 0 && (
                            <div className="w-full mt-4">
                                <div className="w-full bg-gray-200 rounded-full">
                                    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${uploadProgress}%` }}>{`${Math.round(uploadProgress)}%`}</div>
                                </div>
                            </div>
                        )}
                        {uploadSuccess && (
                            <Typography variant="body2" color="green" className="mt-2">
                                File uploaded successfully!
                            </Typography>
                        )}
                    </div>
                    {propertyDetails.documents ? (
                        <div className="flex flex-col gap-4 mt-4">
                            {propertyDetails.documents.map((document, index) => (
                                <div key={index} className="flex items-center justify-between w-full p-4 bg-gray-100 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <PDFIcon />
                                        <Typography variant="body1" color="blue" className="truncate cursor-pointer underline" 
                                        title={document.name} onClick={() => window.open(document.url, "_blank")}>
                                            {document.name}
                                        </Typography>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            color="red"
                                            size="sm"
                                            onClick={() => removeDocument(document)}
                                        >
                                            Delete
                                        </Button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-full h-32 bg-gray-100 rounded-lg">
                            <Typography variant="body1" color="blue-gray">
                                No documents uploaded yet
                            </Typography>
                        </div>
                    )}
                </div>
            </Card>


        </div>
    );
};

export default DocumentUpload;
