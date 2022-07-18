import React from "react";
import App from "../components/dashBoard";
import EmployeeForm from "./EmployeeForm";

const Employee = () => {
  return (
    <div style={{ width: "100%", display: "inline-flex" }}>
      <App />
      <EmployeeForm />
    </div>
  );
};

export default Employee;
