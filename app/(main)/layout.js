import React from "react";
import DashboardProvider from "./provider";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <DashboardProvider>
        <div className="p-10 w-full">{children}</div>
      </DashboardProvider>
    </div>
  );
};

export default DashboardLayout;
