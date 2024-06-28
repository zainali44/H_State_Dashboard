import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import Activities from "./Activities";
import Investments from "./investments";
import Intraction from "./Intractions";
 
export function UnderlineTabs() {
  const [activeTab, setActiveTab] = React.useState("activities");
  const data = [
    {
      label: "Activities",
      value: "activities",
      desc: <Activities />,
    },
    {
      label: "Investments",
      value: "investments",
      desc: <Investments />,
    },
    {
      label: "Interaction",
      value: "interaction",
      desc: <Intraction />,
    },
  ];
  return (
    <Tabs value="activities" onChange={setActiveTab} 
    className="bg-transparent">
      <TabsHeader
        className="bg-transparent border-b border-gray-200 w-1/2"
        indicatorProps={{
          className: "bg-gray-900/10 shadow-none !text-gray-900",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
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