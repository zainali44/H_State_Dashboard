import nft1 from "assets/img/nfts/NftBanner1.png";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";


const Banner1 = () => {

  const navigate = useNavigate();

  return (
    <div
      className="flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px]"
      style={
        { backgroundImage: `url('https://images.unsplash.com/photo-1576731753569-3e93a228048c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` ,
        backgroundPosition: "center",}
      }
    >
      <div className="w-full">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Welcome to the Property Management System
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-white md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
         Here you can manage your properties.
         You can also manage your Deals for Selling and Leasing properties.
        </p>

        <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
          <button 
          onClick={() => navigate("/admin/new-property")}
          className="text-black linear rounded-xl bg-white px-4 py-2 text-center text-base font-semibold transition duration-200 hover:!bg-white/80 active:!bg-white/70">
            Add a new property
          </button>
          <button
            className="text-base font-medium text-lightPrimary hover:text-lightPrimary 2xl:ml-2"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner1;
