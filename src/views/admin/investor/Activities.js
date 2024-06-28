import { Avatar, Chip } from "@material-tailwind/react";
import { ArrowDropDown } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { Email } from '@mui/icons-material';
import { Archive, ArrowSquareLeft, DirectboxSend } from "iconsax-react";

// Admin Imports

const Activities = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Activities</h1>        
        </div>
        <div className="space-y-4">
          <ActivityCard
            icon={<DirectboxSend
              size="28"
              color="#6B7280"
             /> }
            heading="You sent an email to John Doe"
            content="Subject: Quarterly Report"
            date="Sent: Aug 9, 2023"
          />
          <ActivityCard
            icon={<Archive />}
            heading="You sent an email to John Doe"
            content="Subject: Quarterly Report"
            date="Sent: Aug 9, 2023"
          />
          <ActivityCard
            icon={<ArrowSquareLeft />}
            heading="You sent an email to John Doe"
            content="Subject: Quarterly Report"
            date="Sent: Aug 9, 2023"
          />
        </div>
      </div>
    </div>
  );
};

const ActivityCard = ({ icon, heading, content, date }) => {
  return (
    <div class="flex gap-3 p-4 bg-white shadow rounded-lg">
      <div class="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
        {icon}
      </div>
      <div class="grid gap-3">
        <div class="grid gap-0.5">
          <h2 class="text-gray-900 text-sm font-medium leading-snug">
            {heading}
          </h2>
          <h3 class="text-gray-500 text-xs font-normal leading-4">Account | {date}</h3>
        </div>
        <div class="w-fit p-3 bg-gray-50 rounded-lg flex gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
            <g id="File">
              <path id="icon" d="M26.902 9.01473L27.4999 8.48324V8.48324L26.902 9.01473ZM24.3573 6.15194L23.7594 6.68343L23.7594 6.68343L24.3573 6.15194ZM22.555 4.49865L22.2273 5.22845V5.22845L22.555 4.49865ZM28.1484 10.6953L27.4006 10.9796V10.9796L28.1484 10.6953ZM27.0885 28.5052L27.6542 29.0709H27.6542L27.0885 28.5052ZM20.5961 9.76109L21.3807 9.60502L20.5961 9.76109ZM22.8223 11.9872L22.6662 12.7719L22.8223 11.9872ZM9.91667 17.6167C9.47484 17.6167 9.11667 17.9748 9.11667 18.4167C9.11667 18.8585 9.47484 19.2167 9.91667 19.2167V17.6167ZM21.25 19.2167C21.6918 19.2167 22.05 18.8585 22.05 18.4167C22.05 17.9748 21.6918 17.6167 21.25 17.6167V19.2167ZM9.91667 21.8667C9.47484 21.8667 9.11667 22.2248 9.11667 22.6667C9.11667 23.1085 9.47484 23.4667 9.91667 23.4667V21.8667ZM17 23.4667C17.4418 23.4667 17.8 23.1085 17.8 22.6667C17.8 22.2248 17.4418 21.8667 17 21.8667V23.4667ZM19.8333 28.95H14.1667V30.55H19.8333V28.95ZM6.46667 21.25V12.75H4.86667V21.25H6.46667ZM27.5333 12.7795V21.25H29.1333V12.7795H27.5333ZM14.1667 5.05H20.122V3.45H14.1667V5.05ZM20.122 5.05C21.4462 5.05 21.8664 5.06639 22.2273 5.22845L22.8827 3.76886C22.1362 3.43361 21.3035 3.45 20.122 3.45V5.05ZM24.9552 5.62045C24.1702 4.73732 23.6293 4.10411 22.8827 3.76886L22.2273 5.22845C22.5882 5.3905 22.8796 5.69371 23.7594 6.68343L24.9552 5.62045ZM29.1333 12.7795C29.1333 11.7738 29.1454 11.0667 28.8962 10.411L27.4006 10.9796C27.5212 11.2969 27.5333 11.6549 27.5333 12.7795H29.1333ZM26.3041 9.54623C27.0512 10.3868 27.28 10.6623 27.4006 10.9796L28.8962 10.411C28.6469 9.75537 28.168 9.23486 27.4999 8.48324L26.3041 9.54623ZM14.1667 28.95C12.1406 28.95 10.7015 28.9483 9.60986 28.8015C8.54124 28.6579 7.92614 28.3885 7.47715 27.9395L6.34578 29.0709C7.1416 29.8667 8.15062 30.2197 9.39667 30.3873C10.6197 30.5517 12.1858 30.55 14.1667 30.55V28.95ZM4.86667 21.25C4.86667 23.2309 4.86497 24.797 5.02941 26.02C5.19693 27.266 5.54997 28.2751 6.34578 29.0709L7.47715 27.9395C7.02817 27.4905 6.75881 26.8754 6.61514 25.8068C6.46837 24.7152 6.46667 23.2761 6.46667 21.25H4.86667ZM19.8333 30.55C21.8142 30.55 23.3803 30.5517 24.6033 30.3873C25.8494 30.2197 26.8584 29.8667 27.6542 29.0709L26.5229 27.9395C26.0739 28.3885 25.4588 28.6579 24.3901 28.8015C23.2985 28.9483 21.8594 28.95 19.8333 28.95V30.55ZM27.5333 21.25C27.5333 23.2761 27.5316 24.7152 27.3849 25.8068C27.2412 26.8754 26.9718 27.4905 26.5229 27.9395L27.6542 29.0709C28.45 28.2751 28.8031 27.266 28.9706 26.02C29.135 24.797 29.1333 23.2309 29.1333 21.25H27.5333ZM6.46667 12.75C6.46667 10.7239 6.46837 9.28483 6.61514 8.19319C6.75881 7.12457 7.02817 6.50946 7.47715 6.06048L6.34578 4.92911C5.54997 5.72492 5.19693 6.73395 5.02941 7.98C4.86497 9.20303 4.86667 10.7691 4.86667 12.75H6.46667ZM14.1667 3.45C12.1858 3.45 10.6197 3.4483 9.39667 3.61273C8.15062 3.78026 7.1416 4.1333 6.34578 4.92911L7.47715 6.06048C7.92614 5.6115 8.54124 5.34214 9.60986 5.19847C10.7015 5.0517 12.1406 5.05 14.1667 5.05V3.45ZM19.7417 4.25V8.5H21.3417V4.25H19.7417ZM24.0833 12.8417H28.3333V11.2417H24.0833V12.8417ZM19.7417 8.5C19.7417 9.11992 19.7378 9.54671 19.8115 9.91716L21.3807 9.60502C21.3455 9.42808 21.3417 9.19661 21.3417 8.5H19.7417ZM24.0833 11.2417C23.3867 11.2417 23.1553 11.2378 22.9783 11.2026L22.6662 12.7719C23.0366 12.8455 23.4634 12.8417 24.0833 12.8417V11.2417ZM19.8115 9.91716C20.0982 11.3585 21.2249 12.4852 22.6662 12.7719L22.9783 11.2026C22.1717 11.0422 21.5412 10.4116 21.3807 9.60502L19.8115 9.91716ZM9.91667 19.2167H21.25V17.6167H9.91667V19.2167ZM9.91667 23.4667H17V21.8667H9.91667V23.4667ZM27.4999 8.48324L24.9552 5.62045L23.7594 6.68343L26.3041 9.54623L27.4999 8.48324Z" fill="#6B7280" />
            </g>
          </svg>
          <div class="grid gap-0.5">
            <div class="text-gray-900 text-xs font-medium leading-4">Competitors analysis</div>
            <div class="text-gray-500 text-xs font-normal leading-4">56 Mb</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Activities;