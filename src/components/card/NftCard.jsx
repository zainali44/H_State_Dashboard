import { IoHeart, IoHeartOutline, IoLocateOutline } from "react-icons/io5";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { HiLocationMarker } from "react-icons/hi";
import CardMenu from "components/card/PropertyMenu";



import { useNavigate } from "react-router-dom";
import { HouseOutlined } from "@mui/icons-material";


const NftCard = ({ title, author, price, image, bidders, extra, PropertyID, Category }) => {
  const navigate = useNavigate();

  const [heart, setHeart] = useState(true);
  return (
    <Card className="relative h-full w-full rounded-xl shadow-sm hover:shadow-lg transition"> 
      <div className="h-full w-full">
        <div className="relative w-full">
          <CardHeader
            floated={false}
            color="gray"
            className="mx-0 mt-0 mb-4 h-64 xl:h-40"
          >
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <button
            onClick={() => setHeart(!heart)}
            className="absolute top-3 right-3 flex items-center justify-center rounded-full p-2 text-brand-500 hover:cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full text-sm hover:bg-gray-50 dark:text-navy-900">
              <CardMenu PropertyID={PropertyID} />
            </div>
          </button>
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <CardBody className="py-0 px-1">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              {author}
            </Typography>
            <Typography
              variant="h6"
              color="gray"
              className="mt-1 mb-2"
            >
              {title}
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              <HouseOutlined className="h-3 w-3 text-blue-gray-500 mr-1" />
              {Category}
            </Typography>
          </CardBody>
        </div>

          <CardFooter className="mt-2 flex items-center justify-between py-2 px-3">

            <Button variant="outlined" size="sm" color="indigo"
              onClick={() => {
                navigate(`/admin/property-overview/${PropertyID}`);
              }
              }
            >
              View Details
            </Button>
            <div>
              {bidders.map((img, key) => (
                <Tooltip key={key} title="Avatar Name">
                  <Avatar
                    src={img}
                    size="xs"
                    variant="circular"
                    className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                      }`}
                  />
                </Tooltip>
              ))}
            </div>
          </CardFooter>
        </div>
    </Card>
  );
};

export default NftCard;
