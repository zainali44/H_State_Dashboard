import CardMenu from "components/card/CardMenu";
import React from "react";
import Checkbox from "components/checkbox";
import { MdDragIndicator, MdCheckCircle } from "react-icons/md";
import Card from "components/card";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import app from "Database/db";
import { getDocs, collection } from "firebase/firestore";
import { Spinner } from "@material-tailwind/react";

const TaskCard = () => {
  const navigation = useNavigate();

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
      } finally {
        setLoading(false);
      }
    };
    const getTasks = async () => {
      try {
        const data = await getDocs(collection(db, "tasks"));
        const tasks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setTasks(tasks);
        console.log(" fetching tasks ", tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    getTasks();
    getProperties();
  }, []);

  return (
    <Card extra="pb-7 p-[20px]">
      {/* task header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
            <MdCheckCircle className="h-6 w-6 text-gray-500 dark:text-white" />
          </div>
          <h4 className="ml-4 text-xl font-bold text-navy-700 dark:text-white">
            Tasks
          </h4>
        </div>
        <CardMenu />
      </div>

      {/* task content */}
      <div className="min-h-[96px] overflow-y-auto">
        {Tasks.map((task) => (
          <div className="mt-5 flex items-center justify-between p-2" key={task.id}>
            <div className="flex items-center justify-center gap-2">
              <Checkbox />
              <p className="text-base font-bold text-navy-700 dark:text-white">
                {task.name}
              </p>
            </div>
            <div>
              <MdDragIndicator
                onClick={() => navigation("/admin/tasks")}
                className="h-6 w-6 text-navy-700 dark:text-white cursor-pointer"
              ></MdDragIndicator>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TaskCard;
