import {
    CheckIcon,
    CurrencyDollarIcon,
    CursorArrowRaysIcon,
    MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { GiftIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    Avatar,
    Dialog,
    DialogHeader,
    DialogBody,
    Tabs,
    DialogFooter
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TabsHeader, Tab } from "@material-tailwind/react";

const TABS = [
    { label: "All", value: "all" },
    { label: "Monitored", value: "monitored" },
    { label: "Unmonitored", value: "unmonitored" }
];

const TABLE_HEAD = ["Bidder ID", "Bid Amount", "Created At", "Action"];

export function BidTable() {
    const AuctionID = useParams().id;
    const [bidStatus, setBidStatus] = useState({});
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const updateBidStatus = (id, status) => {
        setBidStatus({ ...bidStatus, [id]: status });
    };

    const handleOpen = () => setOpen(!open);
    const handleOpen2 = () => setOpen2(!open2);

    const fetchBidDetails = async () => {
        try {
            const response = await fetch(`http://18.233.67.37:8000/api/v1/auctions/properties/${AuctionID}/bids`);
            const data = await response.json();
            // Ensure data is an array
            if (Array.isArray(data)) {
                setBids(data);
            } else {
                setBids([]);
            }
            console.log('Bids fetched successfully:', data);
        } catch (error) {
            console.error('Error fetching bids:', error);
            setBids([]); // Set bids to empty array in case of error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBidDetails();
    }, []);

    const createBidder = () => {
        const newRow = {
            auctionId: AuctionID,
            bidAmount: document.getElementById("bidderAmount").value,
            bidderId: document.getElementById("bidderId").value,
            createdAt: new Date().toISOString()
        };
        setBids([...bids, newRow]);
        setOpen(false);
    };

    const OfferCounter = () => {
        toast.success(`Counter Offer of ${document.getElementById("bidderCounterOffer").value} sent to Bidder`);
        setOpen2(false);
    };

    return (
        <>
            <Card className="h-full w-full max-w-full justify-center">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                All Bidders
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See how your bids are performing
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button
                                size="sm"
                                className="flex items-center gap-3"
                                variant="outlined"
                                color="indigo"
                                onClick={handleOpen}
                            >
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Create a Fake Bidder from the Admin Panel
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
                <CardBody className="px-0">
                    {loading ? (
                        <div className="flex justify-center">
                            <Typography variant="h6">Loading...</Typography>
                        </div>
                    ) : (
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(bids) && bids.length > 0 ? (
                                    bids.map(({ bidderId, bidAmount, createdAt }, index) => {
                                        const key = `${bidderId}-${index}`; // Generate a unique key using bidderId and index

                                        const isLast = index === bids.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={key}>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {bidderId}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="w-max">
                                                        <Chip
                                                            variant="ghost"
                                                            size="sm"
                                                            color="gray"
                                                            value={bidAmount}
                                                        />
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {new Date(createdAt).toLocaleString()}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    {bidStatus[bidderId] === "accepted" ? (
                                                        <span>Accepted</span>
                                                    ) : bidStatus[bidderId] === "declined" ? (
                                                        <span>Declined</span>
                                                    ) : (
                                                        <div className="flex">
                                                            <Button
                                                                color="gray"
                                                                variant="text"
                                                                onClick={() => updateBidStatus(bidderId, "accepted")}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <CheckIcon className="h-5 w-5" />
                                                                    Accept
                                                                </div>
                                                            </Button>
                                                            <Button
                                                                color="red"
                                                                variant="text"
                                                                onClick={() => updateBidStatus(bidderId, "declined")}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <CursorArrowRaysIcon className="h-5 w-5" />
                                                                    Decline
                                                                </div>
                                                            </Button>
                                                            <Button
                                                                color="indigo"
                                                                variant="text"
                                                                onClick={handleOpen2}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <GiftIcon className="h-5 w-5" />
                                                                    Counter Offer
                                                                </div>
                                                            </Button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-4 text-center">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                No bids available
                                            </Typography>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </CardBody>
            </Card>

            <Dialog open={open} size="xs" handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        <Typography className="mb-1" variant="h4">
                            Creating a Fake Bidder
                        </Typography>
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                        onClick={handleOpen}
                    >
                        <path
                            fillRule="evenodd"
                            d="M15.78 8.22a.75.75 0 0 0-1.06-1.06L12 9.94 9.28 7.22a.75.75 0 1 0-1.06 1.06L10.94 12l-2.72 2.72a.75.75 0 0 0 1.06 1.06L12 14.06l2.72 2.72a.75.75 0 0 0 1.06-1.06L13.06 12l2.72-2.72z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody divider className="grid place-items-center gap-4">
                    <div className="w-full p-1">
                        <Input
                            id="bidderId"
                            color="indigo"
                            label="Bidder ID"
                        />
                    </div>
                    <div className="w-full p-1">
                        <Input
                            id="bidderAmount"
                            color="indigo"
                            label="Amount"
                        />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-3">
                    <Button
                        variant="outlined"
                        color="indigo"
                        onClick={handleOpen}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="indigo"
                        onClick={createBidder}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </Dialog>

            <Dialog open={open2} size="xs" handler={handleOpen2}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        <Typography className="mb-1" variant="h4">
                            Counter Offer
                        </Typography>
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                        onClick={handleOpen2}
                    >
                        <path
                            fillRule="evenodd"
                            d="M15.78 8.22a.75.75 0 0 0-1.06-1.06L12 9.94 9.28 7.22a.75.75 0 1 0-1.06 1.06L10.94 12l-2.72 2.72a.75.75 0 0 0 1.06 1.06L12 14.06l2.72 2.72a.75.75 0 0 0 1.06-1.06L13.06 12l2.72-2.72z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody divider className="grid place-items-center gap-4">
                    <div className="w-full p-1">
                        <Input
                            id="bidderCounterOffer"
                            color="indigo"
                            label="Counter Offer"
                        />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-3">
                    <Button
                        variant="outlined"
                        color="indigo"
                        onClick={handleOpen2}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="indigo"
                        onClick={OfferCounter}
                    >
                        Send
                    </Button>
                </DialogFooter>
            </Dialog>
            <ToastContainer />
        </>
    );
}
