import React from "react";
import App from "../../App";
import SidebarMenu from "../../components/SidebarMenu";
import TopBar from "../TopBar";
import LeaveForm from "./LeaveForm";
import LeaveTable from "./LeaveTable";

const LeaveEmp = () => {
  return (
    <>
      <TopBar />
      <div style={{ width: "100%", display: "inline-flex" }}>
        {/* <App /> */}
        {/* <LeaveForm /> */}
        <LeaveTable />
      </div>
    </>
  );
};

export default LeaveEmp;
