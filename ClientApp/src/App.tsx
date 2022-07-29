import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
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

type Props = {};

type State = {
  showModeratorBoard: boolean;
  showAdminBoard: boolean;
  currentUser?: string | undefined;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: localStorage.getItem("curUser") || '',
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <div>
          {currentUser != '' ? <SidebarMenu /> : null}

          <div style={{ marginLeft: "256px" }}>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/dashboard" component={DashBoard} />
              <Route exact path="/employee" component={Employee} />
              <Route path="/employee/add/:id?" component={EmployeeForm} />
              <Route exact path="/leave" component={LeaveEmp} />
              <Route path="/leave/add" component={LeaveForm} />
              <Route exact path="/salary" component={SalaryTable} />
              <Route path="/salary/add" component={SalaryForm} />
            </Switch>
          </div>
        </div>
        {/*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
