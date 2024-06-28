import React from "react";
import { Select, Typography, Option } from "@material-tailwind/react";

export default function Recipient() {
    return (
        <div className="h-full w-full mt-14">
            <div className="flex flex-col items-center justify-center">
                <Select color="lightBlue" size="regular" outline={true} label="Select Email List">
                    <Option value="1">rana5542123@gmail.com </Option>
                    <Option value="2">Customer 3Email</Option>
                </Select>
            </div>
            <div className="mt-8 w-3/4 mx-auto">
            </div>
        </div>

    );
}