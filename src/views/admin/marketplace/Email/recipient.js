import React from "react";
import { Typography } from "@material-tailwind/react";

export default function Recipient() {
    return (
        <div className="h-full w-full mt-14">
            <div className="flex flex-col items-center justify-center">
                <Typography
                    variant="h3"
                    className="text-center text-blue-gray-700 font-bold"
                >
                    Recipient
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Please fill all the Steps correctly to create a new Email.
                </Typography>
            </div>
            <div className="mt-8 w-3/4 mx-auto">
            </div>
        </div>

    );
}