import { Component, useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import IUser from "./types/user.type";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import EventBus from "./common/EventBus";
import DashBoard from "./components/dashBoard";
import Employee from "./InputForms/EmployeeTable";
import LeaveEmp from "./InputForms/LeaveData/LeaveEmp";
import SidebarMenu from "./components/SidebarMenu";
import EmployeeForm from "./InputForms/EmployeeForm";
import SalaryForm from "./InputForms/SalaryData/SalaryForm";
import LeaveForm from "./InputForms/LeaveData/LeaveForm";
import SalaryTable from "./InputForms/SalaryData/SalaryTable";
import EmployeeTable from "./InputForms/EmployeeTable";
import Department from "./InputForms/Department/Department";
import React from "react";
import { getMeta } from "./services/auth.service";

function App() {
  const [currUser, setCurrUser] = useState<string>('')

  return (
    <div>
      {currUser != "" ? <SidebarMenu /> : null}
      <div style={{ marginLeft: "256px" }}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path={["/dashboard", "/"]} component={DashBoard} />
          <Route exact path="/depart" component={Department} />
          <Route exact path="/employee" component={Employee} />
          <Route path="/employee/add/:id?" component={EmployeeForm} />
          <Route exact path="/leave" component={LeaveEmp} />
          <Route path="/leave/add" component={LeaveForm} />
          <Route exact path="/salary" component={SalaryTable} />
          <Route path="/salary/add" component={SalaryForm} />
        </Switch>
      </div>
    </div>

  );
}


export default App