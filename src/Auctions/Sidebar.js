import React from "react";
import { useState } from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Alert,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    DocumentCheckIcon,
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    CubeTransparentIcon,
    ClockIcon,
    DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";

export function SidebarWithLogo({ onTabChange }) {
    const [open, setOpen] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(true);

    const [selectedTab, setSelectedTab] = useState("Details"); // Initial tab selection

    const handleTabClick = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab); // Notify the parent component about the selected tab
  };

    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 border-r-2 border-gray-100">
            <div className="mb-2 flex items-center gap-4 p-4">
                <ClockIcon className="h-8 w-8 text-gray-800	" />
                <Typography variant="h5" color="gray">
                    Auctions
                </Typography>
            </div>
            <List>
                <hr className="my-2 border-blue-gray-50" />
                <ListItem onClick={() => handleTabClick("Details")} className={selectedTab === "Details" ? "bg-gray-100" : ""}>
                    <ListItemPrefix>
                        <DocumentArrowUpIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Details
                  
                </ListItem>
                <ListItem onClick={() => handleTabClick("BidingSection")} className={selectedTab === "BidingSection" ? "bg-gray-100" : ""}>
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Biding Section
                    <ListItemSuffix>
                        <Chip value="14" size="sm" color="gray" className="rounded-full" />
                    </ListItemSuffix>
                </ListItem>
                <ListItem onClick={() => handleTabClick("Document")} className={selectedTab === "Document" ? "bg-gray-100" : ""}>
                    <ListItemPrefix>
                        <DocumentCheckIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Documents
                </ListItem>
            </List>
            <Alert open={openAlert} className="mt-auto bg-[#040720]"
            onClose={() => setOpenAlert(false)}>
                <CubeTransparentIcon className="mb-4 h-12 w-12" />
                <Typography variant="h6" className="mb-1">
                    Upgrade to PRO
                </Typography>
                <Typography variant="small" className="font-normal opacity-80">
                    Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features
                    and premium.
                </Typography>
                <div className="mt-4 flex gap-3">
                    <Typography
                        as="a"
                        href="#"
                        variant="small"
                        className="font-medium opacity-80"
                        onClick={() => setOpenAlert(false)}
                    >
                        Dismiss
                    </Typography>
                    <Typography as="a" href="#" variant="small" className="font-medium">
                        Upgrade Now
                    </Typography>
                </div>
            </Alert>
        </Card>
    );
}