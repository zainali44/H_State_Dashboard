import Banner from "./components/Banner";
import General from "./components/General";
import Prospects from "./InvestorComponents/Prospects";
import tableDataTopInvestors from "views/admin/marketplace/variables/tableDataInvestor.json";
import { InvesotColumn } from "views/admin/marketplace/variables/InvestorColumns";
import TopCreatorTable from "../Properties/InvestorComponents/TableTopCreators";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";




const InvestorsDetails = () => {
    return (
        <div className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-5">
                <div className="col-span-8 lg:!mb-0">
                    <TopCreatorTable
                        extra="mb-5"
                        tableData={tableDataTopInvestors}
                        columnsData={InvesotColumn}
                    />
                </div>
                {/* <div className="col-span-4">
                    <Prospects
                        extra="mb-5"
                        tableData={tableDataTopCreators}
                        columnsData={tableColumnsTopCreators}
                    />
                </div> */}
            </div>
        </div>
    );
};

export default InvestorsDetails;
