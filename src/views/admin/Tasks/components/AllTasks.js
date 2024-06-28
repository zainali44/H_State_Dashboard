import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import Taskcard from "widgets/cards/Task-card";
import StatisticsChart from "widgets/charts/statistics-chart";

import TaskDetails from "data/Tasks-data";
import statisticsChartsData from "data/statistics-charts-data";
import projectsTableData from "data/projects-table-data";

import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

export function AllTasks() {
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {TaskDetails.map(({ icon, title, footer, ...rest }) => (
          <Taskcard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default AllTasks;