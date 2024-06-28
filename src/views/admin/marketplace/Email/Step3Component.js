import React from "react";
import { Select, Typography, Option, Button } from "@material-tailwind/react";
import WcSharpIcon from '@mui/icons-material/WcSharp';
import { FiSend } from "react-icons/fi";

export default function Recipient() {
    return (
        <div className="h-full w-full mt-14">
            <div className="flex flex-col items-center justify-center">
            <WcSharpIcon sx={
                { fontSize: 150, color: "blue-gray-400" }
            } />


                <Typography 
                    variant="h3"
                    className="text-center text-blue-black-600 font-bold"
                >
                    Almost Done!
                </Typography>

                    

                <Button 
                    color="gray"
                    className="w-64 mt-20"
                    variant="outlined"
                >
                    Send
                </Button>
            </div>
            <div className="mt-8 w-3/4 mx-auto">
            </div>
        </div>
    )
}