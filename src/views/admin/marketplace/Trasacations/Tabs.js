import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import Distribution from "./Distribution";
import DistributionTable from "./DistributionTable";
 
export function UnderlineTabs() {
  const [activeTab, setActiveTab] = React.useState("distribution");
  const data = [
    {
      label: "Distribution",
      value: "distribution",
      desc: <DistributionTable />,

    },
    {
      label: "Capital Calls",
      value: "capital-calls",
      desc: 'Capital Calls',
    },
    {
      label: "Vue",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  return (
    <Tabs value="distribution" 
    onChange={setActiveTab} 
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