import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    Avatar,
    Tabs,
    TabsHeader,
    Spinner,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

// Constants for the table headers
const TABS = [
    { label: "All", value: "all" },
    { label: "Monitored", value: "monitored" },
    { label: "Unmonitored", value: "unmonitored" },
];

const TABLE_HEAD = ["Member", "Related Property", "Investment", "Last Activity", "View Details"];

export function MembersTable() {
    const navigate = useNavigate();
    const [investors, setInvestors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from the API
    useEffect(() => {
        const fetchInvestors = async () => {
            try {
                const response = await fetch("http://18.233.67.37:3000/api/v1/users/investors");
                const data = await response.json();
                setInvestors(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching investors:", error);
                setLoading(false);
            }
        };
        fetchInvestors();
    }, []);

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Investor list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all Investor members
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button variant="outlined" size="sm">
                            view all
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max">
                        <TabsHeader>
                            <div className="flex items-center justify-between w-full px-2">
                                <div className="flex items-center gap-2">
                                    <Typography variant="small" color="blue-gray">
                                        Show
                                    </Typography>
                                    <div className="w-24">
                                        <Input
                                            type="number"
                                            color="lightBlue"
                                            size="sm"
                                            outline={false}
                                            defaultValue={8}
                                        />
                                    </div>
                                    <Typography variant="small" color="blue-gray">
                                        entries
                                    </Typography>
                                </div>
                            </div>
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
                    <div className="flex items-center justify-center w-full h-full">    
                        <Spinner color="lightBlue" size="xl" />
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
                            {investors.map((investor, index) => {
                                const isLast = index === investors.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr key={investor.id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={investor.image} alt={investor.name} size="sm" />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {investor.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {investor.email}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {investor.related_property || "N/A"}
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
                                                    {investor.investment || "N/A"}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {new Date(investor.last_active).toLocaleDateString() || "N/A"}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Typography
                                                    onClick={() => navigate(`/admin/investor-profile/${investor.id}`)}
                                                    variant="small"
                                                    color="gray"
                                                    className="font-semibold cursor-pointer"
                                                >
                                                    View Details
                                                </Typography>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </CardBody>
        </Card>
    );
}
