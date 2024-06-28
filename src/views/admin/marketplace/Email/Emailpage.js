import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

import React from "react";

import { useNavigate } from "react-router-dom";

import {EmailTable} from "./Email";

import {Emailstats} from "./Emailstats";


export default function Emailpage() {

    const navigate = useNavigate();

    const handleEmail = () => {
        navigate("/admin/CreateEmail");
    };

    return (
        <div className="h-full w-full mx-4 mt-10">
            <Emailstats />
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Email Lists
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Here you can manage your Email list
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button variant="outlined" className="flex items-center gap-3" size="sm" color="amber" onClick={handleEmail}>
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Create New Email
                        </Button>
                    </div>
                </div>
                <hr className="mb-4 border-gray-300 mx-4 border-1" />
                <EmailTable />
        </div>
    );
}

