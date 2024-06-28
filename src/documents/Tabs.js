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
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";

import {DealDoc} from "./DealsDoc";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
 
export function DocTabs() {
  const data = [
    {
      label: "Deal Documents",
      value: "DealDocuments",
      icon: Square3Stack3DIcon,
      desc: < DealDoc />,
    },
    {
      label: "Properties Documents",
      value: "PropertiesDocuments",
      icon: BuildingOffice2Icon,
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Offer Documents",
      value: "OfferDocuments",
      icon: BuildingLibraryIcon,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  return (
    <Tabs value="DealDocuments">
      <TabsHeader className="w-1/2">
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