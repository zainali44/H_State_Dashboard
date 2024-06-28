import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { getFirestore, collection, doc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import app from "Database/db";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";

function Assets() {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const db = getFirestore(app);
  const storage = getStorage(app);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [assets, setAssets] = useState([]);
  const [dealAssets, setDealAssets] = useState([]);

  const fetchAssets = async () => {
    const assetsCollection = collection(db, "properties");
    const assetsSnapshot = await getDocs(assetsCollection);
    const assetsList = assetsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAssets(assetsList);
  };

  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  const handleAttach = async () => {
    const docRef = doc(db, "tenants", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDealAssets(docSnap.data().assets || []);
    } else {
      console.log("No such document!");
    }
  };

  const AttachAsset = async (assetID) => {
    const docRef = doc(db, "tenants", id);

    if (dealAssets.includes(assetID)) {
      alert("Asset Already Attached");
      setOpen(false);
      return;
    }

    // Update the deal's assets array by adding the selected asset's ID
    await updateDoc(docRef, {
      assets: [...dealAssets, assetID],
    });
    // Close the dialog
    setOpen(false);
  };

  useEffect(() => {
    fetchAssets();
    handleAttach();
  }, [id]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between gap-8 mt-10">
        <Typography color="gray" className="text-center text-lg font-bold">
          Attach Assets
        </Typography>
        <Button
          color="indigo"
          className="mr-4"
          variant="filled"
          size="regular"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={handleOpen}
        >
          <div className="flex items-center gap-2">
          <BuildingOffice2Icon className="w-5 h-5" />
          Attach Units
          </div>
        </Button>
      </div>
      <hr className="my-6 w-full border-gray-300" />

      {/* Attached Assets */}
      {dealAssets.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {dealAssets.map((assetID) => {
            const asset = assets.find((a) => a.id === assetID);
            if (asset) {
              return (
                <Card key={asset.id} className="w-full max-w-[48rem] flex-row h-32">
                  <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
                    <img src={asset.coverImage} alt="card-image" className="h-full w-full object-cover" />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h" color="gray" className="mb-4 uppercase">
                      {asset.PropertyName}
                    </Typography>
                    <Typography variant="h10" color="gray" className="text-sm">
                      {asset.PropertyLocation}
                    </Typography>
                    <a href="#" className="inline-block">
                      <Typography variant="text" className="flex items-center gap-2 text-sm text-indigo-500 ml-auto mt-2 ml-24"
                       size="xs">
                        Learn More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </Typography>
                    </a>
                  </CardBody>
                </Card>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row justify-between items-center w-full h-full gap-4 mt-4">
              <div className="flex flex-col justify-center items-center w-full h-full mt-10">
                <BuildingOffice2Icon className="w-20 h-20 text-gray-400" />
                <Typography variant="h10" className="font-light text-gray-500 text-sm mb-4 mt-6">
                  Attach the assets that are part of this deal. No assets are attached to this deal.
                </Typography>
                <Button
                  color="lightBlue"
                  variant="outlined"
                  size="regular"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                  onClick={handleOpen}
                >
                  Attach Assets
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dialog for attaching assets */}
      <Dialog open={open} handler={handleOpen} size="xl">
        <Dialog.Header className="text-center">
          <Typography color="blue" text="xl" className="font-bold">
            Attach Assets
          </Typography>
        </Dialog.Header>
        <Dialog.Body>
          {/* Selection of the assets */}
          <div className="grid grid-cols-3 gap-4">
            {assets.map((asset) => (
              <Card key={asset.id} className="mt-6 w-96">
                <CardHeader color="blue-gray" className="relative h-56">
                  <img src={asset.coverImage} alt="card-image" />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {asset.PropertyName}
                  </Typography>
                  {/* Include other asset information here */}
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="outlined" color="gray" onClick={() => AttachAsset(asset.id)}>
                    Attach Asset
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Dialog.Body>
      </Dialog>
    </div>
  );
}

export default Assets;
