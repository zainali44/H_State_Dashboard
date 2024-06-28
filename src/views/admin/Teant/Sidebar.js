import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

import Details from "./Details";

import Teanants from "./Teants";

import Assets from "./Assets";

import Document from "./document";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
 
export function TabsWithIcon() {
  const data = [
    {
      label: "Details",
        value: "details",
        icon: Square3Stack3DIcon,
        desc: <Details />,
    },
    {
      label: "Teanants",
        value: "teanants",
        icon: UserCircleIcon,
        desc: <Teanants />,
    },
    {
      label: "Document",
        value: "document",
        icon: DocumentArrowUpIcon,
        desc: <Document />,
    },
  ];
  return (
    <Tabs value="details">
      <TabsHeader className="dark:bg-gray-800 w-1/2">
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}