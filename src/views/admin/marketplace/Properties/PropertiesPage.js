import Banner from "./components/Banner";
import General from "./components/General";
import Details from "./components/Details";
import DocumentUpload from "./components/Documents";


const PropertiesDetails = () => {
    return (
        <div className="flex w-full flex-col gap-5">
            <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
                <div className="col-span-4 lg:!mb-0">
                    <Banner />
                </div>
                <div className="col-span-8">
                    <General />
                </div>
            </div>
            <div className="w-full flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
                <div className="col-span-12">
                    <Details />
                </div>
            </div>
            <div className="w-full flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
                <div className="col-span-12">
                    <DocumentUpload />
                </div>
            </div>
        </div>
    );
};

export default PropertiesDetails;
