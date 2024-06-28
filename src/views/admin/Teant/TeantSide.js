import React, { useState } from "react";
import Details from "./Details";

import Teanants from "./Teants";

import Assets from "./Assets";

import Document from "./document";

function TeanantSide() {
  const [selectedTab, setSelectedTab] = useState("Details"); // Initial tab selection

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className="flex justify-between gap-8">
        {selectedTab === "Details" && <Details />}
        {selectedTab === "Teanants" && <Teanants />}
        {selectedTab === "AddUnits" && <Assets />}
        {selectedTab === "Document" && <Document />}
        {/* Add other components for other tabs as needed */}
      </div>
    </div>
  );
}

export default TeanantSide;