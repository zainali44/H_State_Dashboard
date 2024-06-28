import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { CallToAction, Email, EmailOutlined, PendingActions, Task, TaskAltOutlined, TaskSharp } from "@mui/icons-material";

export const TaskDetails = [
  {
    color: "gray",
    icon: Email,
    title: "Total Emails Sent",
    value: "18,000",
    footer: {
      color: "text-gray-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: EmailOutlined,
    title: "Total Emails Opened",
    value: "2,300,000",
    footer: {
      color: "text-gray-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: ExclamationTriangleIcon,
    title: "Total Emails Clicked",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: PendingActions,
    title: "Total Emails Bounced",
    value: "103",
    footer: {
      color: "text-gray-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default TaskDetails;
