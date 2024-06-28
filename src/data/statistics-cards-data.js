import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "amber",
    icon: BanknotesIcon,
    title: "Total Investment",
    value: "$53k",
    footer: {
      color: "text-amber-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "amber",
    icon: UsersIcon,
    title: "Total Investors",
    value: "2,300",
    footer: {
      color: "text-amber-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "amber",
    icon: UserPlusIcon,
    title: "New Clients",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "amber",
    icon: ChartBarIcon,
    title: "Total Revenue",
    value: "$103,430",
    footer: {
      color: "text-amber-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
