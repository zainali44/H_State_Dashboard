import Card from "components/card";
import Progress from "components/progress";
import React, { useMemo, useEffect, useState } from "react";
import { BsChat } from "react-icons/bs";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { UserAdd } from "iconsax-react";

function TopCreatorTable(props) {
  const { id } = useParams();

  const columnsData = useMemo(() => [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Commitment",
      accessor: "commitment",
    },
    {
      Header: "Contributed",
      accessor: "contributed",
    },
    {
      Header: "Distribution",
      accessor: "distribution",
    },
    {
      Header: "Class",
      accessor: "investment_class",
    },
    {
      Header: "Commitment Date",
      accessor: "commitment_date",
    },
    {
      Header: "Actions",
      accessor: "actions",
    }
  ], []);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetch starts
      try {
        const response = await fetch(`http://18.233.67.37:3000/api/v1/users/invest/${id}`);
        const result = await response.json();
        console.log("result", result);

        const formattedData = result.map(item => ({
          name: item.userDetails.name,
          commitment: item.investors[0].investment_details.committed_amount,
          contributed: item.investors[0].investment_details.contributed_amount,
          distribution: item.investors[0].investment_details.distribution_amount,
          investment_class: item.investors[0].investment_details.investment_class,
          commitment_date: item.investors[0].investment_details.commitment_date,
          actions: item.userDetails.id,
        }));
        
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchData();
  }, [id]);

  const tableInstance = useTable(
    {
      columns: columnsData,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Card extra={"h-[600px] w-full"}>
        {/* Top Creator Header */}
        <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 pt-4 pb-[20px] shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
          <h4 className="text-lg font-bold leading-6 text-navy-700 dark:text-white">
            Interested Investors
          </h4>
          <button
            onClick={handleOpen}
            className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-bold text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
          >
            Notify All
          </button>
        </div>

        {/* Top Creator Heading */}
        <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
          {loading ? ( // Show loading indicator if loading is true
            <div className="flex justify-center items-center h-full">
              <Spinner color="lightBlue" size="xl" />
            </div>
          ) : (
            <table
              {...getTableProps()}
              className="w-full min-w-[500px] overflow-x-scroll"
            >
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        key={index}
                      >
                        <div className="flex items-center justify-between pt-4 pb-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                          {column.render("Header")}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody {...getTableBodyProps()} className="px-4">
                {page.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={index}>
                      {row.cells.map((cell, index) => {
                        let data = "";
                        if (cell.column.Header === "Name") {
                          data = (
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-navy-700 dark:text-white">
                                {cell.value}
                              </p>
                            </div>
                          );
                        } else if (cell.column.Header === "Commitment") {
                          data = (
                            <p className="text-sm font-medium text-navy-700 dark:text-white">
                              $ {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "Contributed") {
                          data = (
                            <p className="text-sm font-medium text-navy-700 dark:text-white">
                              $ {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "Distribution") {
                          data = (
                            <p className="text-sm font-medium text-navy-700 dark:text-white">
                              $ {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "Class") {
                          data = (
                            <p className="text-sm font-medium text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "Commitment Date") {
                          data = (
                            <p className="text-sm font-medium text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "Actions") {
                          data = (
                            <div className="flex items-center justify-between">
                              <button
                                className="flex items-center justify-center rounded-full text-brand-400 dark:bg-white dark:text-brand-500 px-3 py-1 text-sm font-medium transition duration-200"
                                onClick={() => {
                                  navigate(`/admin/chat/${cell.value}`);
                                }}
                              >
                                <BsChat className="h-4 w-4 mr-1" />
                                Open Chat
                              </button>
                            </div>
                          );
                        }
                        return (
                          <td
                            className="py-3 text-sm"
                            {...cell.getCellProps()}
                            key={index}
                          >
                            {data}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </Card>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Notification
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="gray" variant="h4">
            Are you sure you want to notify all the investors?
          </Typography>
          <Input type="text" color="blue-gray" placeholder="Enter Message you want to send" />
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            Close
          </Button>
          <Button variant="gradient" onClick={handleOpen}>
            Notify All Investors
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default TopCreatorTable;
