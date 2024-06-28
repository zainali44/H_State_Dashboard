import Card from "components/card";
import { useNavigate } from "react-router-dom";

const Widget = ({ icon, title, subtitle, DashLink }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={
        () => navigate(DashLink)
      }
      extra="!flex-row flex-grow items-center rounded-[20px] hover:shadow-lg transition duration-300 ease-in-out cursor-pointer hover:border-2 hover:border-gray-500 dark:hover:border-white/20">
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
          <span className="flex items-center text-amber-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-gray-600">{title}</p>
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {subtitle}
        </h4>
      </div>
    </Card>
  );
};

export default Widget;
