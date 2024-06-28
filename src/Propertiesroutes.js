import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import Properties from "views/admin/marketplace/Properties/New_Property";
import PropertiesDetails from "views/admin/marketplace/Properties/PropertiesPage";
import EditProperties from "views/admin/marketplace/Properties/Edit_Property";
import PropertyOverview from "views/admin/marketplace/PropertyOverview";
import Chat from "Chat/Chat";
import Task_Details from "views/admin/Tasks/components/task-details";
import DistributionCreation from "views/admin/marketplace/Trasacations/CreateDistribution";

import Stats from "views/admin/transaction/Stats";

import InvestorProfile from "views/admin/investor/InvestorProfile";

import { EmailComponent } from "views/admin/marketplace/Email/CreateEmail";

import TicketDetails from "views/admin/SupportTickets/Ticket_details";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import { FaHouseUser } from "react-icons/fa";

const PropertiesRoutes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Properties",
    layout: "/admin",
    path: "properties",
    icon: <FaHouseUser className="h-5 w-5" />,
    component: <NFTMarketplace />,
    secondary: true,
  },

  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "New Property",
    layout: "/admin",
    path: "new-property",
    icon: <BsBuilding className="h-6 w-6" />,
    component: <Properties />,
    secondary: true,
  },
  {
    name: "Property Details",
    layout: "/admin",
    path: "property-details/:id",
    icon: <BsBuilding className="h-6 w-6" />,
    component: <PropertiesDetails />,
    secondary: true,
  },
  {
    name: "Edit Property",
    layout: "/admin",
    path: "edit-property/:id",
    icon: <BsBuilding className="h-6 w-6" />,
    component: <EditProperties />,
    secondary: true,
  },
  {
    name: "Property Overview",
    layout: "/admin",
    path: "property-overview/:id",
    icon: <BsBuilding className="h-6 w-6" />,
    component: <PropertyOverview />,
    secondary: true,
  },
  {
    name: "Chat",
    layout: "/admin",
    path: "chat",
    icon: <BsBuilding className="h-6 w-6" />,
    component: <Chat />,
    secondary: true,
  },
  {
    name: "Task Details",
    layout: "/admin",
    path: "tasks/:id",
    icon: <BsBuilding className="h-6 w-6" />,
    component: <Task_Details />,
    secondary: true,
  },
  {
    name: "Stats",
    layout: "/admin",
    path: "prospects/:id",
    icon: <BsBuilding className="h-6 w-6" />,
    component: <Stats />,
    secondary: true,
  },
  {
    name: "Create Email",
    layout: "/admin",
    path: "CreateEmail",
    icon: <MdOutlineShoppingCart className="h-5 w-5" />,
    component: <EmailComponent />,
  },
  {
    name: "Investor Profile",
    layout: "/admin",
    path: "investor-profile/:id",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <InvestorProfile />,
  },
  {
    name: "Create Distribution",
    layout: "/admin",
    path: "distribution/:id",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <DistributionCreation />,
  },
  {
    name: "Ticket Details",
    layout: "/admin",
    path : "ticket-details/:id",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <TicketDetails />,
  }
];
export default PropertiesRoutes;
