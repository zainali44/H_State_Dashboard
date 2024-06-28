import { Typography } from "@material-tailwind/react";
import React from "react";

import {CreateEmail} from "./step";

export function EmailComponent() {
    return (
        <div className="h-full w-full mt-14">
            <div className="flex flex-col items-center justify-center">
                <Typography
                    variant="h3"
                    className="text-center text-blue-gray-700 font-bold"
                >
                    Create Email
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Please fill all the Steps correctly to create a new Email.
                </Typography>
            </div>
            <div className="mt-8 w-1/2 mx-auto">
                <CreateEmail />
            </div>
        </div>

    );
}