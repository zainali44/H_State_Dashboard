import React from 'react';
import { Typography } from "@material-tailwind/react";
import { Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
import { openDrawer } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { UserPlusIcon, GiftTopIcon, GiftIcon, ClockIcon } from "@heroicons/react/24/outline";

import {TabsWithIcon} from "./Sidebar";
import { HomeModernIcon } from '@heroicons/react/24/solid';
import Sidebar from 'components/sidebar';

export default function Teanants() { // Change the component name to "Auction"
    return (
        <React.Fragment>
            <div className="h-full w-full">
                <div floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex items-center justify-between gap-8 mt-4 mx-10">
                        <div>
                            <div className="flex items-center gap-4">
                                <HomeModernIcon className="h-8 w-8 text-indigo-800	" />
                                <Typography variant="h5" color="blue-gray">
                                    Tenants Overview
                                </Typography>
                            </div>
                            <Typography color="gray" className="mt-1 font-normal">
                                See how your tenants are performing
                            </Typography>
                        </div>
                    </div>
                    <hr className="my-6 w-full border-gray-300" />
                    <TabsWithIcon />
                </div>
            </div>
        </React.Fragment>
    );
}
