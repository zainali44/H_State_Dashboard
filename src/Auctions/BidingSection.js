import React from "react";
import { Typography } from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";

import {BidTable} from './BidTable.js';


export default function BidingSection() {
    return (
        <div className="h-full w-full">
            <div floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                   
                </div>
                <hr className="my-6 w-full border-gray-300" />
                <BidTable />
            </div>
        </div>
    );
}
