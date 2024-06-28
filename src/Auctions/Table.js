import React, { useState, useEffect } from "react";
import {
    CalendarDaysIcon,
    ChevronUpDownIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Input,
    IconButton,
    Tooltip,
    Drawer,
    Alert,
    Avatar,
    Dialog,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import MagnifyingGlassCircleIcon from "@heroicons/react/24/outline";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
} from "firebase/firestore";
import app from "../db";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Active",
        value: "active",
    },
    {
        label: "Inactive",
        value: "inactive",
    },
];

const TABLE_HEAD = [
    "Auction ID",
    "Owning Property",
    "Starting Date",
    "End Date",
    "Bid Received",
    "Highest Bid",
    "Remaining Time",
    "Status",
];

function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
        >
            {/* Replace this SVG with the appropriate icon for "Auctions" */}
        </svg>
    );
}

export default function AuctionsTable() {
    const [open, setOpen] = React.useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const [loading, setLoading] = useState(false);
    const [auctionsData, setAuctionsData] = useState([]);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [loadingData, setLoadingData] = useState(true); // For data fetching
    const [success, setSuccess] = useState(false); // For success alert
    const [error, setError] = useState(false); // For error alert
    const [reloadData, setReloadData] = useState(false); // For triggering component reload

    const [auctionData, setAuctionData] = useState({
        AuctionID: "",
        OwingProperty: "",
        StartingDate: "",
        EndDate: "",
        BidReceived: 0,
        HighestBid: 0,
        RemainingTime: "",
        Status: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setAuctionData({
            ...auctionData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRowClick = (rowId) => {
        setSelectedRowId(rowId);
        console.log("Row ID is: ", selectedRowId);
        navigate(`/Auctions/${rowId}`);
        // You may need to update the navigation logic here
        // Navigate to the details page for the selected auction
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const db = getFirestore(app);
            const docRef = await addDoc(collection(db, "auctions"), {
                AuctionID: auctionData.AuctionID,
                OwingProperty: auctionData.OwingProperty,
                StartingDate: auctionData.StartingDate,
                EndDate: auctionData.EndDate,
                BidReceived: auctionData.BidReceived,
                HighestBid: auctionData.HighestBid,
                RemainingTime: auctionData.RemainingTime,
                Status: auctionData.Status,
                Details: {
                    start_date : "",
                    end_date : "",
                    auction_type : "",
                    reserve_price : "",
                    starting_price : "",
                    editor : "",
                },
            });
            setLoading(false);
            setSuccess(true);
            setReloadData(true);
        } catch (error) {
            console.error("Error adding auction:", error);
            setError(true);
        }
    };

    useEffect(() => {
        setLoadingData(true);
        const db = getFirestore(app);
        const getAuctions = async () => {
            try {
                const data = await getDocs(collection(db, "auctions"));
                const auctions = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setAuctionsData(auctions);
            } catch (error) {
                console.error("Error fetching auctions:", error);
            } finally {
                setLoadingData(false);
            }
        };
        getAuctions();
    }, [reloadData]);

    const TABLE_ROWS = auctionsData.map((auction) => {
        return {
            AuctionID: auction.AuctionID,
            OwingProperty: auction.OwingProperty,
            StartingDate: auction.StartingDate,
            EndDate: auction.EndDate,
            BidReceived: auction.BidReceived,
            HighestBid: auction.HighestBid,
            RemainingTime: auction.RemainingTime,
            Status: auction.Status,
            id: auction.id,
        };
    });

    return (
        <React.Fragment>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Auctions
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all your auctions
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button
                                onClick={openDrawer}
                                className="flex items-center gap-3"
                                size="sm"
                                variant="filled"
                                color="amber"
                            >
                                <PlusIcon className="h-5 w-5" />
                                Create New Auction
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab key={value} value={value}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                    </div>
                </CardHeader>

                <CardBody className="overflow-scroll px-0">
                    {loadingData ? (
                        <Spinner color="blue" size="lg" className="mx-auto" />
                    ) : (
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head, index) => (
                                        <th
                                            key={head}
                                            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                            >
                                                {head}{" "}
                                                {index !== TABLE_HEAD.length - 1 && (
                                                    <ChevronUpDownIcon
                                                        strokeWidth={2}
                                                        className="h-4 w-4"
                                                    />
                                                )}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE_ROWS.map(
                                    (
                                        {
                                            AuctionID,
                                            OwingProperty,
                                            StartingDate,
                                            EndDate,
                                            BidReceived,
                                            HighestBid,
                                            RemainingTime,
                                            Status,
                                            id,
                                        },
                                        index
                                    ) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr
                                                key={AuctionID}
                                                onClick={() => handleRowClick(id)}
                                                className="cursor-pointer transition-colors hover:bg-blue-gray-50"
                                            >
                                                <td className={classes}>
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="indigo"
                                                            className="font-semibold"
                                                        >
                                                            {AuctionID}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            <Avatar
                                                                src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&q=80&w=1910&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                                color="lightBlue"
                                                                size="sm"
                                                                className="hidden md:inline-flex mx-2"
                                                            />
                                                            {OwingProperty}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {StartingDate}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="w-max">
                                                        <Typography
                                                            variant="small"
                                                            color="red"
                                                            className="font-normal"
                                                        >
                                                            {EndDate}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="w-max">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {BidReceived}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="w-max">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {HighestBid} $
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {RemainingTime}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="w-max">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {Status}
                                                        </Typography>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    )}
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page 1 of 10
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm">
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm">
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <Dialog open={open} onClose={closeDrawer} placement="right">
                <div className="mb-2 flex items-center justify-between p-4">
                    <Typography variant="h5" color="blue-gray">
                        Add New Auction
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>

                <form className="px-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="AuctionID" className="mb-2">
                            Auction ID
                        </label>
                        <Input
                            id="AuctionID"
                            type="text"
                            name="AuctionID"
                            value={auctionData.AuctionID}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="OwingProperty" className="mb-2">
                            Owing Property
                        </label>
                        <select
                            id="OwingProperty"
                            name="OwingProperty"
                            value={auctionData.OwingProperty}
                            onChange={handleChange}
                            required
                            className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                        >
                            <option value="">Select</option>
                            <option value="Property 1">Property 1</option>
                            <option value="Property 2">Property 2</option>
                            <option value="Property 3">Property 3</option>
                        </select>
                    </div>
                    <div className="flex flex-col mb-4">
                        <div className="flex gap-2 mb-2">
                            <CalendarDaysIcon className="h-5 w-5 text-blue-gray-400" />
                            <label htmlFor="StartingDate" className="mb-2">
                                Starting Date
                            </label>
                        </div>
                        <Input
                            id="StartingDate"
                            type="date"
                            name="StartingDate"
                            value={auctionData.StartingDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <div className="flex gap-2 mb-2">
                            <CalendarDaysIcon className="h-5 w-5 text-blue-gray-400" />
                            <label htmlFor="EndDate" className="mb-2">
                                End Date
                            </label>
                        </div>
                        <Input
                            id="EndDate"
                            type="date"
                            name="EndDate"
                            value={auctionData.EndDate}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="flex flex-col mb-4">
                        <label htmlFor="Status" className="mb-2">
                            Status
                        </label>
                        <select
                            id="Status"
                            name="Status"
                            value={auctionData.Status}
                            onChange={handleChange}
                            required
                            className="w-full h-10 pl-3 pr-24 text-base placeholder-gray-600 border-2 rounded-lg appearance-none focus:shadow-outline"
                        >
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>


                    <Button
                        type="button"
                        className="mt-4 justify-center items-center mb-4"
                        variant="outlined"
                        color="blue-gray"
                        onClick={handleSubmit}>

                        {loading ? (
                            <Spinner color="white" className="mx-auto" />
                        ) : (
                            "Add New Auction"
                        )}
                    </Button>
                </form>
                {success && (
                    <Alert
                        icon={<Icon />}
                        className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
                    >
                        Auction added successfully!
                    </Alert>
                )}
                {error && (
                    <Alert
                        icon={<Icon />}
                        className="rounded-none border-l-4 border-[#f44336] bg-[#f44336]/10 font-medium text-[#f44336]"
                    >
                        Error adding auction!
                    </Alert>
                )}
            </Dialog>
        </React.Fragment>
    );
}
