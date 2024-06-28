import React from "react";
import { Input, Textarea, Typography } from "@material-tailwind/react";
import {
    DocumentArrowUpIcon,
  } from "@heroicons/react/24/outline";

export default function Recipient() {
    return (
        <div className="h-full w-full mt-14">
            <div className="flex flex-col gap-4">
                <Input type="text" color="lightBlue" size="regular" outline={true} label="Sender Name" />
                <Input type="text" color="lightBlue" size="regular" outline={true} label="Sender Email" />
                <Input type="text" color="lightBlue" size="regular" outline={true} label="Subject"/>
                
                <Textarea color="lightBlue" size="regular" outline={true} label="Body" />

                {/* Attach File */}
                <div className="flex gap-4">
                    <DocumentArrowUpIcon className="h-6 w-6 text-blue-gray-400" />
                    
                    <div className="flex items-center justify-between gap-4">
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer"
                        >
                            <Typography color="blue-gray">Attach File</Typography>
                        </label>
                    </div>

                </div>

                <Textarea color="lightBlue" size="regular" outline={true} label="Your Signature" />
            </div>
        <hr className="my-4" />
        </div>
    );
}