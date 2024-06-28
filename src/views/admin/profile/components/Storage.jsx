import Card from "components/card";
import CardMenu from "components/card/CardMenu";
import React from "react";
import { BsCloudCheck, BsPerson } from "react-icons/bs";
const Storage = () => {
  return (
    <Card extra={"w-full h-full p-4"}>
      <div className="ml-auto">
        <CardMenu />
      </div>
      {/* Your storage */}
      <div className="mb-auto flex flex-col items-center justify-center">
        <div className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[26px] text-5xl font-bold text-gray-500 dark:!bg-navy-700 dark:text-white">
          <BsPerson />
        </div>
        <h4 className="mb-px mt-3 text-2xl font-bold text-navy-700 dark:text-white">
          Profile Completed
        </h4>
        <p className="px-5 text-center text-base font-normal text-gray-600 md:!px-0 xl:!px-8">
          Here you can find more details about your Deals. Keep you user engaged
        </p>
      </div>

      {/* Progress bar */}

      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="text-sm font-medium text-gray-600">48 %</p>
          <p className="text-sm font-medium text-gray-600">52 %</p>
        </div>
        <div className="mt-2 flex h-3 w-full items-center rounded-full bg-lightPrimary dark:!bg-navy-700">
          <span className="h-full w-1/2 rounded-full bg-gray-500 dark:!bg-white" />
        </div>
      </div>
    </Card>
  );
};

export default Storage;
