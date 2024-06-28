import { Card, Typography } from "@material-tailwind/react";
 
const TABLE_HEAD = ["Subject", "Recipient", "Date", "Action"];
 
const TABLE_ROWS = [
  {
    Subject: "Please update the status of the project",
    From : "company@gmail.com",
    Date: "12/12/2021",
    Recipient: "Mosheadhan@gmail.com"
  },
  {
    Subject: "Have you completed the project?",
    From : "companay@gmail.com",
    Date: "12/12/2021",
    Recipient: "affa@gmail.com"
  },
  {
    Subject: "Have you completed the project?",
    From : "companay@gmail.com",
    Date: "12/12/2021",
    Recipient: "affa@gmail.com"
  },{
    Subject: "Have you completed the project?",
    From : "companay@gmail.com",
    Date: "12/12/2021",
    Recipient: "affa@gmail.com"
  },
  {
    Subject: "Have you completed the project?",
    From : "companay@gmail.com",
    Date: "12/12/2021",
    Recipient: "affa@gmail.com"
  }
];
 
export function EmailTable() {
  return (
    <Card className="h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ Subject, From, Date, Recipient }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={Subject}>
                <td className={classes}>
                  <Typography variant="sm" color="blue-gray" className="font-normal">
                    {Subject}
                  </Typography>
                  <Typography variant="xs" color="blue-gray-300" className="font-md">
                   Sent From : {From}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {Recipient}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {Date}
                  </Typography>
                </td>
                
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography as="a" href="#" variant="small" color="indigo" className="font-medium">
                    View Deatil
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}