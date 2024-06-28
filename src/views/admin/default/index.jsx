import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import { CarouselCustomNavigation } from "views/admin/default/components/carasoul";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import Conversation from "views/admin/default/components/Conversation";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { CurrencyExchange, TaskAlt, TimelapseOutlined } from "@mui/icons-material";

import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import app from "Database/db";
import { getDocs, collection } from "firebase/firestore";
import { Spinner } from "@material-tailwind/react";

const Dashboard = () => {

  const db = getFirestore(app);
  const storage = getStorage(app);

  const [loading, setLoading] = useState(false);

  const [PropertiesDetails, setPropertiesDetails] = useState([]);
  const [Tasks, setTasks] = useState([]);
  const NumberOfProperties = PropertiesDetails.length;
  const PropertiesOnAuction = PropertiesDetails.filter((property) => property.Category === "For Auction").length;
  const PropertiesOnMakeOffer = PropertiesDetails.filter((property) => property.Category === "Make Offer").length;
  const PropertiesOnBuyNow = PropertiesDetails.filter((property) => property.Category === "Buy Now").length;
  const NumberofTasks = Tasks.length;

  console.log("Number of properties", NumberOfProperties);
  console.log("Properties on auction", PropertiesOnAuction);

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
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Properties"}
          subtitle={NumberOfProperties}
          DashLink={"/admin/properties"}
        />
        <Widget
          icon={<TimelapseOutlined className="h-6 w-6" />}
          title={"On Auctions"}
          subtitle={PropertiesOnAuction}
          DashLink={"/admin/properties"}
        />
        <Widget
          icon={<CurrencyExchange className="h-7 w-7" />}
          title={"Buy Now"}
          subtitle={PropertiesOnBuyNow}
          DashLink={"/admin/properties"}
        />
        <Widget
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          title={"Make Offer"}
          subtitle={PropertiesOnMakeOffer}
          DashLink={"/admin/properties"}
        />
        <Widget
          icon={<TaskAlt className="h-7 w-7" />}
          title={"Number of Tasks"}
          subtitle={NumberofTasks}
          DashLink={"/admin/tasks"}
        />
        <Widget
          icon={<UserCircleIcon className="h-6 w-6" />}
          title={"Investors"}
          subtitle={"45"}
          DashLink={"/admin/data-tables"}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          < CarouselCustomNavigation />
        </div>
        <Conversation />

        {/* Traffic chart & Pie Chart */}



        {/* Complex Table , Task & Calendar */}

        <CheckTable
          columnsData={columnsDataCheck}
          tableData={tableDataCheck}
        />

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
