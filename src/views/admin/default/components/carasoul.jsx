import { HomeIcon, HomeModernIcon } from "@heroicons/react/24/outline";
import { Carousel } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { ArrowBackIosNewOutlined } from "@mui/icons-material";

import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import app from "Database/db";
import { getDocs, collection } from "firebase/firestore";
import { Spinner } from "@material-tailwind/react";

export function CarouselCustomNavigation() {

  const db = getFirestore(app);
  const storage = getStorage(app);

  const [loading, setLoading] = useState(false);
  const [PropertiesDetails, setPropertiesDetails] = useState([]);
  const [Tasks, setTasks] = useState([]);

  
  useEffect(() => {
    setLoading(true);
    const db = getFirestore(app);
    const getProperties = async () => {
      try {
        const data = await getDocs(collection(db, "properties"));
        const properties = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPropertiesDetails(properties);
        console.log(" fetching properties ", properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
      finally {
        setLoading(false);
      }
    };
    const getTasks = async () => {
      try {
        const data = await getDocs(collection(db, "tasks"));
        const tasks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setTasks(tasks);
        console.log(" fetching tasks ", tasks);
      }
      catch (error) {
        console.error("Error fetching tasks:", error);
      }
      finally {
        setLoading(false);
      }
    }
    getTasks();
    getProperties();
  }, []);

  return (
    <Carousel
      className="rounded-xl"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="blue-gray"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <ArrowBackIosNewOutlined />
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="blue-gray"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <ArrowBackIosNewOutlined style={{ transform: "rotate(180deg)" }} />
        </IconButton>
      )}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-gray-500" : "w-4 bg-gray-600"
                }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {PropertiesDetails.map((property, index) => (
        <Card key={index} className="w-full flex-row">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 shrink-0 rounded-r-none"
          >
            <img
              src={property.coverImage}
              alt="card-image"
              className="h-[350px] w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h6" color="gray" className="mb-4 uppercase">
              {property.Category}
            </Typography>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {property.PropertyName}
            </Typography>
            <Typography color="gray" className="mb-2 font-normal max-w-[350px] ">
              {property.PropertyLocation}
            </Typography>
            <Typography color="gray" className="mb-2 font-normal max-w-[350px]">
            Like so many organizations these days, Autodesk is a company in
            transition. It was until recently a traditional boxed software company
            selling licenses. Yet its own business model disruption is only part
            of the story
          </Typography>
            <a href="#" className="inline-block">
              <Button variant="text" className="flex items-center gap-2">
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </a>
          </CardBody>
        </Card>
      ))}
    </Carousel>
  );
}