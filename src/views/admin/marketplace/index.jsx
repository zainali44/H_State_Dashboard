import Banner from "./components/Banner";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";


import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import app from "Database/db";
import { getDocs, collection } from "firebase/firestore";
import { Spinner } from "@material-tailwind/react";

const Marketplace = () => {

  const db = getFirestore(app);
  const storage = getStorage(app);

  const [loading, setLoading] = useState(false);

  const [PropertiesDetails, setPropertiesDetails] = useState([]);
  
  useEffect(() => {
    setLoading(true);
    const db = getFirestore(app);
    const getProperties = async () => {
      try {
        const data = await getDocs(collection(db, "properties"));
        const properties = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPropertiesDetails(properties);
        console.log("properties details", properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
      finally {
        setLoading(false);
      }
    };
    getProperties();
  }, []);

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* NFt Banner */}
        <Banner />

        {/* NFt Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            All Properties for Sale
          </h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                All
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                Buy Now
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                Make Offer
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                <a href=" ">
                 On Auction
                </a>
              </a>
            </li>
          </ul>
        </div>

        {/* NFTs trending card */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {loading && <div className="flex justify-center items-center text-sm font-bold text-navy-700 dark:text-white">
            <Spinner size="xs" className="mr-3"/> Please wait while we fetch the properties...
            </div>}
          {PropertiesDetails.map((property) => (
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title={property.PropertyName}
              author={property.PropertyLocation}
              price={property.price}
              image={property.coverImage}
              PropertyID={property.id}
              Category={property.Category}
            />
          ))}
        </div>
      </div>

      {/* right side section */}

      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <TopCreatorTable
          extra="mb-5"
          tableData={tableDataTopCreators}
          columnsData={tableColumnsTopCreators}
        />
        <HistoryCard />
      </div>
    </div>
  );
};

export default Marketplace;
