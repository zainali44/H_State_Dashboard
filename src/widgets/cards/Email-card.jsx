import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
  import PropTypes from "prop-types";
  
  export function EmailCard({ color, icon, title, value, footer }) {
    return (
      <Card className="border border-blue-gray-500 shadow-sm">
        <CardHeader
          variant="gradient"
          color="white"
          floated={false}
          shadow={false}
          className="absolute grid h-12 w-12 place-items-center"
        >
            {icon}
        </CardHeader>
        <CardBody className="p-4 text-right">
          <Typography variant="small" className="font-normal text-blue-gray-600">
            {title}
          </Typography>
          <Typography variant="h4" color="blue-gray">
            {value}
          </Typography>
        </CardBody>
        {footer && (
          <CardFooter className="border-t border-blue-gray-50 p-4">
            {footer}
          </CardFooter>
        )}
      </Card>
    );
  }

  
  EmailCard.displayName = "/src/widgets/cards/Tasks-card.jsx";
  
  export default EmailCard;
  