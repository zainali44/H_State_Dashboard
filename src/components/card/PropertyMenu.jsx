import React from "react";
import Dropdown from "components/dropdown";
import { AiOutlineUser } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineShop } from "react-icons/ai";
import { TiLightbulb } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc, removeDoc } from "firebase/firestore";

import { getFirestore, addDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import app from "Database/db";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";


function CardMenu({ PropertyID, ...props }) {
    const { transparent } = props;
    const [open, setOpen] = React.useState(false);

    console.log("PropertyID", PropertyID);

    const navigate = useNavigate();

    const deleteProperty = async () => {
        const db = getFirestore(app);
        const storage = getStorage(app);
        try {
            await deleteDoc(doc(db, "properties", PropertyID));
            alert("Property Deleted Successfully");
            window.location.reload();
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    }


    return (
        <Dropdown
            button={
                <button
                    onClick={() => setOpen(!open)}
                    open={open}
                    className={`flex items-center text-xl hover:cursor-pointer ${transparent
                        ? "bg-none text-white hover:bg-none active:bg-none"
                        : "bg-lightPrimary p-2 text-gray-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
                        } linear justify-center rounded-lg font-bold transition duration-200`}
                >
                    <BsThreeDots className="h-6 w-6" />
                </button>
            }
            animation={"origin-top-right transition-all duration-300 ease-in-out"}
            classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
            children={
                <div className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p
                        onClick={() => {
                            navigate(`/admin/property-details/${PropertyID}`);
                        }}
                        className="hover:text-black flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium">
                        <span>
                            <AiOutlineUser />
                        </span>
                        Property Page
                    </p>
                    <p 
                    onClick={() => {
                        navigate(`/admin/edit-property/${PropertyID}`);
                    }}
                    className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
                        <span>
                            <AiOutlineShop />
                        </span>
                        Edit Property
                    </p>
                    <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
                        <span>
                            <TiLightbulb />
                        </span>
                        Pasue Status
                    </p>
                    <p 
                    onClick={() => {
                        deleteProperty();
                    }}
                    className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-red-600 hover:font-medium">
                        <span>
                            <FiSettings />
                        </span>
                        Delete Property
                    </p>
                </div>
            }
        />
    );
}

export default CardMenu;
