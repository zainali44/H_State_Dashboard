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
    "Tenant ID",
    "Property Name",
    "Lease Start Date",
    "Lease End Date",
    "Monthly Rent",
    "Deposit",
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
            {/* Replace this SVG with the appropriate icon for "Tenant Management and Lease" */}
        </svg>
    );
}

export default function TenantManagementAndLeaseTable() {
    const [open, setOpen] = React.useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const [loading, setLoading] = useState(false);
    const [tenantsData, setTenantsData] = useState([]);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [loadingData, setLoadingData] = useState(true); // For data fetching
    const [success, setSuccess] = useState(false); // For success alert
    const [error, setError] = useState(false); // For error alert
    const [reloadData, setReloadData] = useState(false); // For triggering component reload

    const [tenantData, setTenantData] = useState({
        TenantID: "",
        PropertyName: "",
        LeaseStartDate: "",
        LeaseEndDate: "",
        MonthlyRent: 0,
        Deposit: 0,
        Status: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setTenantData({
            ...tenantData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRowClick = (rowId) => {
        setSelectedRowId(rowId);
        console.log("Row ID is: ", selectedRowId);
        navigate(`/Tenants/${rowId}`);
        // You may need to update the navigation logic here
        // Navigate to the details page for the selected tenant
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const db = getFirestore(app);
            const docRef = await addDoc(collection(db, "tenants"), {
                TenantID: tenantData.TenantID,
                PropertyName: tenantData.PropertyName,
                LeaseStartDate: tenantData.LeaseStartDate,
                LeaseEndDate: tenantData.LeaseEndDate,
                MonthlyRent: tenantData.MonthlyRent,
                Deposit: tenantData.Deposit,
                Status: tenantData.Status,
                Details: {
                    start_date: "",
                    end_date: "",
                    lease_type: "",
                    monthly_rent: "",
                    isLeaseActive: "",
                },
            });
            setLoading(false);
            setSuccess(true);
            setReloadData(true);
        } catch (error) {
            console.error("Error adding tenant:", error);
            setError(true);
        }
    };

    useEffect(() => {
        setLoadingData(true);
        const response = async () => {

            const response = await axios.get(`http://18.233.67.37:8000/api/v1/tenants/${tenantID}/tenants`);
            setTenantsData(response.data);
            console.log("Tenants data: ", tenantsData);
            setLoadingData(false);
        };
        response();
    }, [reloadData]);


    const TABLE_ROWS = tenantsData.map((tenant) => {
        return {
            TenantID: tenant.TenantID,
            PropertyName: tenant.PropertyName,
            LeaseStartDate: tenant.LeaseStartDate,
            LeaseEndDate: tenant.LeaseEndDate,
            MonthlyRent: tenant.MonthlyRent,
            Deposit: tenant.Deposit,
            Status: tenant.Status,
            id: tenant.id
        };
    });

    return (
        <React.Fragment>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Tenant Management and Lease
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all your tenants and leases
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
                                Add New Tenant
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
                                            TenantID,
                                            PropertyName,
                                            LeaseStartDate,
                                            LeaseEndDate,
                                            MonthlyRent,
                                            Deposit,
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
                                                key={TenantID}
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
                                                            {TenantID}
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
                                                            {PropertyName}
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
                                                            {LeaseStartDate}
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
                                                            {LeaseEndDate}
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
                                                            {MonthlyRent} $
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
                                                            {Deposit} $
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
                        Add New Tenant and Lease
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
                        <label htmlFor="TenantID" className="mb-2">
                            Tenant ID
                        </label>
                        <Input
                            id="TenantID"
                            type="text"
                            name="TenantID"
                            value={tenantData.TenantID}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="PropertyName" className="mb-2">
                            Property Name
                        </label>
                        <Input
                            id="PropertyName"
                            type="text"
                            name="PropertyName"
                            value={tenantData.PropertyName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <div className="flex gap-2 mb-2">
                            <CalendarDaysIcon className="h-5 w-5 text-blue-gray-400" />
                            <label htmlFor="LeaseStartDate" className="mb-2">
                                Lease Start Date
                            </label>
                        </div>
                        <Input
                            id="LeaseStartDate"
                            type="date"
                            name="LeaseStartDate"
                            value={tenantData.LeaseStartDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <div className="flex gap-2 mb-2">
                            <CalendarDaysIcon className="h-5 w-5 text-blue-gray-400" />
                            <label htmlFor="LeaseEndDate" className="mb-2">
                                Lease End Date
                            </label>
                        </div>
                        <Input
                            id="LeaseEndDate"
                            type="date"
                            name="LeaseEndDate"
                            value={tenantData.LeaseEndDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="MonthlyRent" className="mb-2">
                            Monthly Rent
                        </label>
                        <Input
                            id="MonthlyRent"
                            type="number"
                            name="MonthlyRent"
                            value={tenantData.MonthlyRent}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="Deposit" className="mb-2">
                            Deposit
                        </label>
                        <Input
                            id="Deposit"
                            type="number"
                            name="Deposit"
                            value={tenantData.Deposit}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="Status" className="mb-2">
                            Status
                        </label>
                        <Input
                            id="Status"
                            type="text"
                            name="Status"
                            value={tenantData.Status}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            color="lightBlue"
                            buttonType="link"
                            size="lg"
                            ripple="dark"
                        >
                            Add Tenant
                        </Button>
                    </div>
                </form>
            </Dialog>
                
                {/* Success alert */}   
                <Alert color="gray" open={success} onClose={() => setSuccess(false)}>
                    Tenant added successfully!
                </Alert>
                {/* Error alert */}
                <Alert color="red" open={error} onClose={() => setError(false)}>
                    Error adding tenant!
                </Alert>
        </React.Fragment>
    );
}