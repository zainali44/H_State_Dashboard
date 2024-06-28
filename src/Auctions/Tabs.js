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

import BidingSection from "./BidingSection";

import Document from "./document";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

export function TabsAuc() {
  const data = [
    {
      label: "Details",
      value: "details",
      icon: Square3Stack3DIcon,
      desc: <Details />,
    },
    {
      label: "BidingSection",
      value: "bidingsection",
      icon: Cog6ToothIcon,
      desc: <BidingSection />,
    },
    {
      label: "Document",
      value: "document",
      icon: DocumentArrowDownIcon,
      desc: <Document />,
    }

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