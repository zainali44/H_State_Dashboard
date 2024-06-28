import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    Progress,
  } from "@material-tailwind/react";

  import TenantManagementAndLeaseTable from "./Table";
import { HomeModernIcon } from "@heroicons/react/24/outline";
  
  export default function TenantsOverview() {
    return (
      <div className="h-full w-full">
        <div floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-4">
                <HomeModernIcon className="h-8 w-8 text-indigo-800	" />
                <Typography variant="h5" color="blue-gray">
                  Tenants Overview
                </Typography>
              </div>
              <Typography color="gray" className="mt-1 font-normal">
                See how your tenants are performing
              </Typography>
            </div>
          </div>
          <hr className="my-6 w-full border-gray-300" />
          <TenantManagementAndLeaseTable />
        </div>
        </div>
    );
  }