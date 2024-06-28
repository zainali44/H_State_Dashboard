import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { CallToAction, PendingActions, Task, TaskAltOutlined, TaskSharp } from "@mui/icons-material";

export const TaskDetails = [
  {
    color: "gray",
    icon: Task,
    title: "Total Tasks",
    value: "18",
    footer: {
      color: "text-gray-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: TaskAltOutlined,
    title: "Completed Tasks",
    value: "2,300",
    footer: {
      color: "text-gray-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: PendingActions,
    title: "Pending Tasks",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: CallToAction,
    title: "In Progress",
    value: "103",
    footer: {
      color: "text-gray-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default TaskDetails;
