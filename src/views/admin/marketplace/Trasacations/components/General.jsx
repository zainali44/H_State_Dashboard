import Card from "components/card";
import React from "react";

const General = () => {
    return (
        <Card extra={"w-full h-full p-3"}>
            {/* Header */}
            <div className="mt-2 mb-8 w-full">
                <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                    Transactions will be carried out once we connect Mobile Application
                </h4>
                <p className="mt-2 px-2 text-base text-gray-600">
                    This Section is under construction, You will be able to see all the transactions here.

                </p>
            </div>
            {/* Cards */}
        </Card>
    );
};

export default General;
