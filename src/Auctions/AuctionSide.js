import React, { useState } from "react";
import {SidebarWithLogo} from "./Sidebar";
import Details from "./Details";

import BidingSection from "./BidingSection";

import Document from "./document";

function AuctionSide() {
  const [selectedTab, setSelectedTab] = useState("Details"); // Initial tab selection

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className="flex justify-between gap-8">
        <SidebarWithLogo onTabChange={handleTabChange} />
        {selectedTab === "Details" && <Details />}
        {selectedTab === "BidingSection" && <BidingSection />}
        {selectedTab === "Document" && <Document />}
        {/* Add other components for other tabs as needed */}
      </div>
    </div>
  );
}

export default AuctionSide;