import BarChart from "components/charts/BarChart";
import { barChartDataDailyTraffic } from "variables/charts";
import { barChartOptionsDailyTraffic } from "variables/charts";
import { MdArrowDropUp } from "react-icons/md";
import Image1 from "assets/img/avatars/avatar3.png";
import Image2 from "assets/img/avatars/avatar4.png";
import Image3 from "assets/img/avatars/avatar5.png";
import Image4 from "assets/img/avatars/avatar6.png";
import Image5 from "assets/img/avatars/avatar7.png";
import Card from "components/card";
import { Chip } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";

const ChatData = [
  {
    id: 1,
    name: "John Doe",
    img: Image1,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    time: "10:00 AM"
  },
  {
    id: 2,
    name: "Jane Doe",
    img: Image2,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    time: "10:00 AM"
  },
  {
    id: 3,
    name: "John Doe",
    img: Image3,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    time: "10:00 AM"
  },
  {
    id: 4,
    name: "Jane Doe",
    img: Image4,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    time: "10:00 AM"
  },
  {
    id: 5,
    name: "John Doe",
    img: Image5,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    time: "10:00 AM"
  }

]

const DailyTraffic = () => {

  const navigate = useNavigate();

  return (
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <p className="text-sm font-medium leading-4 text-gray-600">
            Conversation
          </p>
          
        </div>
        <div className="mt-2 flex items-start">
          <div className="flex items-center text-sm text-gray-500">
            <MdArrowDropUp className="h-5 w-5" />
            <p className="font-bold"> +2.45% </p>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full pt-5 pb-0">
        {ChatData.map((data) => (
          <div className="flex flex-row justify-between items-center mb-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <div className="flex flex-row items-center">
              <div className="h-[50px] w-[50px] rounded-full bg-gray-200 flex items-center justify-center" onClick={() => navigate("/admin/chat")}>
                <img
                  src={data.img}
                  className="h-[40px] w-[40px] rounded-full"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-bold leading-4 text-gray-800">
                  {data.name}
                </p>
                <p className="text-[14px] font-medium leading-6 text-gray-600">
                  {data.message}
                </p>
              </div>
            </div>
        
            <div className="text-xs font-semibold leading-4 text-gray-600 dark:text-white mr-5">
              {data.time}
            </div>
          </div>
        ))}

      </div>
    </Card>
  );
};

export default DailyTraffic;
