import React, { useState, useEffect } from "react";
import {
  ChevronUpDownIcon,
  MagnifyingGlassCircleIcon,
  PencilIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Input,
  IconButton,
  Tooltip,
  Drawer,
  Button,
  Alert,
  Dialog,
  Avatar,
  Spinner,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from "Database/db";
import axios from "axios";

const TABS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const TABLE_HEAD = [
  "Member",
  "Monthly Rent",
  "Lease Start Date",
  "Lease End Date",
  "Current Status",
  "Date Paid",
  "Actions",
];

export function TeanantsTable() {
  const TeantID = useParams().id;
  console.log("TeantID is: ", TeantID);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tenantsData, setTenantsData] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [loadingData, setLoadingData] = useState(true); // For data fetching
  const [success, setSuccess] = useState(false); // For success alert
  const [error, setError] = useState(false); // For error alert
  const [reloadData, setReloadData] = useState(false); // For triggering component reload

  const [tenantData, setTenantData] = useState({
    Member: "",
    MonthlyRent: 0,
    LeaseStartDate: "",
    LeaseEndDate: "",
    CurrentStatus: "",
    AccountNumber: "",
    DatePaid: "",
    identificationDoc: "",
    signedContractDoc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTenantData({
      ...tenantData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRowClick = (rowId) => {
    setSelectedRowId(rowId);
    console.log("Row ID is: ", rowId);
    navigate(`/TenantsTemplate/${rowId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const db = getFirestore(app);
      await addDoc(collection(db, "tenants", TeantID, "NewTeants"), tenantData);
      setLoading(false);
      setSuccess(true);
      setReloadData(true);
    } catch (error) {
      console.error("Error adding tenant:", error);
      setError(true);
    }
  };

  useEffect(() => {
    setLoadingData(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://18.233.67.37:8000/api/v1/tenants/${TeantID}/tenants`);
        setTenantsData(response.data);
        console.log("Tenants data: ", response.data);
      } catch (error) {
        console.error("Error fetching tenants data:", error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, [reloadData]);

  const TABLE_ROWS = tenantsData.map((tenant) => ({
    ...tenant,
    id: tenant.id,
  }));

  // console.log("Tenants ROW: ", TABLE_ROWS);

  return (
    <React.Fragment>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Tenants
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all your tenants
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => setOpen(true)}
                className="flex items-center gap-3"
                size="sm"
                variant="outlined"
              >
                Add New Tenant
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassCircleIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>

        <CardBody className="px-0">
          {loadingData ? (
            <Spinner color="blue" size="lg" className="mx-auto" />
          ) : (
            <table className="mt-4 w-full min-w-max table-auto text-left dark:border-gray-700">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-200 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(
                  (
                    {
                      member,
                      monthlyRent,
                      leaseStartDate,
                      leaseEndDate,
                      currentStatus,
                      datePaid,
                      id,
                    },
                    index
                  ) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr
                        key={id}
                        onClick={() => handleRowClick(id)}
                        className="cursor-pointer transition-colors hover:bg-blue-gray-50"
                      >
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {member}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {monthlyRent}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {leaseStartDate}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {leaseEndDate}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {currentStatus}
                          </Typography>
                        </td>
                        
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {datePaid}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip
                            content="Edit Tenant"
                            placement="top"
                            className="cursor-pointer"
                          >
                            <PencilIcon
                              strokeWidth={2}
                              className="h-5 w-5 text-blue-gray-500"
                            />
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} placement="right">
        <div className="mb-2 flex items-center justify-between p-4 border-b border-blue-gray-100 rounded-full">
          <Typography variant="h5" color="">
            <div className="flex items-center gap-6">
              <UserGroupIcon className="h-8 w-8" />
              Add New Tenant
            </div>
          </Typography>
          <IconButton variant="text" color="" onClick={() => setOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit}>
          <div className="flex flex-row gap-4">
            <Input
              name="Member"
              label="Member"
              value={tenantData.Member}
              onChange={handleChange}
            />
            <Input
              name="MonthlyRent"
              label="Monthly Rent"
              value={tenantData.MonthlyRent}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row gap-4">
            <Input
              name="LeaseStartDate"
              type="date"
              label="Lease Start Date"
              value={tenantData.LeaseStartDate}
              onChange={handleChange}
            />
            <Input
              name="LeaseEndDate"
              type="date"
              label="Lease End Date"
              value={tenantData.LeaseEndDate}
              onChange={handleChange}
            />
          </div>
          <Input
            name="CurrentStatus"
            label="Current Status"
            value={tenantData.CurrentStatus}
            onChange={handleChange}
          />
          <Input
            name="AccountNumber"
            label="Account Number"
            value={tenantData.AccountNumber}
            onChange={handleChange}
          />
          <Input
            name="DatePaid"
            type="date"
            label="Date Paid"
            value={tenantData.DatePaid}
            onChange={handleChange}
          />
          <Input
            name="identificationDoc"
            label="Identification Document"
            value={tenantData.identificationDoc}
            onChange={handleChange}
          />
          <Input
            name="signedContractDoc"
            label="Signed Contract Document"
            value={tenantData.signedContractDoc}
            onChange={handleChange}
          />
          <div className="flex flex-row gap-4">
            <Button
              type="submit"
              color="indigo"
              variant="outlined"
              size="regular"
            >
              Add Tenant
            </Button>
            <Button
              color="red"
              variant="text"
              size="regular"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
