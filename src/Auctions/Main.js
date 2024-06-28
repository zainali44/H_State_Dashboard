import React from 'react';
import { Typography } from "@material-tailwind/react";
import { Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
import { openDrawer } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { UserPlusIcon, GiftTopIcon, GiftIcon, ClockIcon } from "@heroicons/react/24/outline";

import Table from './Table.js';

export default function Main() { // Change the component name to "Auction"
    return (
        <React.Fragment>
            <div className="h-full w-full">
                <div floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-4">
                                <ClockIcon className="h-8 w-8 text-yellow-800	" />
                                <Typography variant="h5" color="blue-gray">
                                    Auction Overview
                                </Typography>
                            </div>
                            <Typography color="gray" className="mt-1 font-normal">
                                See how your auctions are performing
                            </Typography>
                        </div>
                    </div>
                    <hr className="my-6 w-full border-gray-300" />
                    <Table />
                </div>
            </div>
        </React.Fragment>
    );
}
