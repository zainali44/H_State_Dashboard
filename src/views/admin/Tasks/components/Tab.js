import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import {Opentask} from "./opentasks";
 
export function TaskTab() {
  const [activeTab, setActiveTab] = React.useState("html");
  const data = [
    {
        label: "Open Tasks",
        value: "open",
        desc: <Opentask />
    },
    {
        label: "Completed Tasks",
        value: "completed",
        desc: "Completed tasks are tasks that have been completed and are no longer in progress."
    },
    {
        label: "Over Due Tasks",
        value: "overdue",
        desc: "Overdue tasks are tasks that have not been completed by the due date."
    },
    {
        label: "Due Today Tasks",
        value: "duetoday",
        desc: "Due today tasks are tasks that are due today."
    }
  ];
  return (
    <Tabs value={"open"}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-3/4 mx-auto"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-indigo-400 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-indigo-400 font-semibold" : ""}
          >
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