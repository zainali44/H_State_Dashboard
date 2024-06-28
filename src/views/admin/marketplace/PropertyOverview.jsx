import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Banner from "./components/Banner";
import { BsBuilding } from "react-icons/bs";
import { ChatBubbleBottomCenterIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Groups2Outlined, HouseSidingOutlined, ToggleOffOutlined } from "@mui/icons-material";
import { FaVoteYea } from "react-icons/fa";
import PropertiesDetails from "views/admin/marketplace/Properties/PropertiesPage";
import InvestorsDetails from "views/admin/marketplace/Properties/Investor";
import {Opentask} from "../Tasks/components/opentasks";
import Chat from "Chat/Chat";
import Transactions from "./Trasacations/Transactions";
import Teanants from "../Teant/Main";
import AuctionPage from "Auctions/AuctionTemplate";
import TopCreatorTable from "./components/TableTopCreators";
import HistoryCard from "./components/HistoryCard";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import app from "Database/db";

const PropertyOverview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const initialTab = query.get("tab") || "properties";
    const [selectedSection, setSelectedSection] = useState(initialTab);

    const handleSectionClick = (section) => {
        setSelectedSection(section);
        navigate(`?tab=${section}`);
    };

    const db = getFirestore(app);
    const storage = getStorage(app);

    const [loading, setLoading] = useState(false);
    const [PropertyData, setPropertyData] = useState([]);

    useEffect(() => {
        setLoading(true);
        const getProperties = async () => {
            try {
                const data = await getDocs(collection(db, "properties"));
                const properties = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setPropertyData(properties);
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };
        getProperties();
    }, [db]);

    useEffect(() => {
        const tab = query.get("tab");
        if (tab) {
            setSelectedSection(tab);
        }
    }, [location.search]);

    return (
        <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
                <Banner />
                <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
                    <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-2 2xl:!gap-12">
                        <li>
                            <a
                                className={`text-base font-medium ${
                                    selectedSection === "properties" ? "text-amber-500" : "text-gray-500"
                                } hover:text-gray-500 dark:text-white cursor-pointer`}
                                onClick={() => handleSectionClick("properties")}
                            >
                                <div className="flex items-center gap-2">
                                    <BsBuilding className="h-4 w-4" />
                                    Overview
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                className={`text-base font-medium ${
                                    selectedSection === "investors" ? "text-amber-500" : "text-gray-500"
                                } hover:text-gray-500 dark:text-white cursor-pointer`}
                                onClick={() => handleSectionClick("investors")}
                            >
                                <div className="flex items-center gap-2">
                                    <Groups2Outlined className="h-4 w-4" />
                                    Investors
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                className={`text-base font-medium ${
                                    selectedSection === "tasks" ? "text-amber-500" : "text-gray-500"
                                } hover:text-gray-500 dark:text-white cursor-pointer`}
                                onClick={() => handleSectionClick("tasks")}
                            >
                                <div className="flex items-center gap-2">
                                    <ToggleOffOutlined className="h-4 w-4" />
                                    Tasks
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                className={`text-base font-medium ${
                                    selectedSection === "chat" ? "text-amber-500" : "text-gray-500"
                                } hover:text-gray-500 dark:text-white cursor-pointer`}
                                onClick={() => handleSectionClick("chat")}
                            >
                                <div className="flex items-center gap-2">
                                    <ChatBubbleBottomCenterIcon className="h-4 w-4" />
                                    Conversations
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                className={`text-base font-medium ${
                                    selectedSection === "transactions" ? "text-amber-500" : "text-gray-500"
                                } hover:text-gray-500 dark:text-white cursor-pointer`}
                                onClick={() => handleSectionClick("transactions")}
                            >
                                <div className="flex items-center gap-2">
                                    <CurrencyDollarIcon className="h-4 w-4" />
                                    Transactions
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                className={`text-base font-medium ${
                                    selectedSection === "teanants" ? "text-amber-500" : "text-gray-500"
                                } hover:text-gray-500 dark:text-white cursor-pointer`}
                                onClick={() => handleSectionClick("teanants")}
                            >
                                <div className="flex items-center gap-2">
                                    <HouseSidingOutlined className="h-4 w-4" />
                                    Teanants
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                className={`text-base font-medium ${
                                    selectedSection === "auction" ? "text-amber-500" : "text-gray-500"
                                } hover:text-gray-500 dark:text-white cursor-pointer`}
                                onClick={() => handleSectionClick("auction")}
                            >
                                <div className="flex items-center gap-2">
                                    <FaVoteYea className="h-4 w-4" />
                                    Auction
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="z-20 grid grid-cols-1 gap-5">
                    {selectedSection === "properties" && <PropertiesDetails />}
                    {selectedSection === "investors" && <InvestorsDetails />}
                    {selectedSection === "tasks" && <Opentask />}
                    {selectedSection === "chat" && <Chat />}
                    {selectedSection === "transactions" && <Transactions />}
                    {selectedSection === "teanants" && <Teanants />}
                    {selectedSection === "auction" && <AuctionPage />}
                </div>
            </div>
            <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
                <TopCreatorTable
                    extra="mb-5"
                    tableData={tableDataTopCreators}
                    columnsData={tableColumnsTopCreators}
                />
                <HistoryCard />
            </div>
        </div>
    );
};

export default PropertyOverview;
