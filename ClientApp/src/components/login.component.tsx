import { Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { showErrorMessage } from "../services/user.service";
import { setBearerToken } from "../services/auth";

// import AuthService from "../services/auth.service";
// import { setFlagsFromString } from "v8";

interface RouterProps {
  history: string;
}
export interface userMeta {
  UserName: string
  RoleId: number
  UserId: number
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  username: string;
  password: string;
  loading: boolean;
  message: string;
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }

  // async handleLogin(formValue: { username: string; password: string }) {
  //   // const { username, password } = formValue;

  //   // console.log("username is ", username);
  //   // console.log("password is ", password);

  //   this.setState({
  //     message: "",
  //     loading: true,
  //   });

  //   // const loginPost = await axios.post("http://localhost:5002/login", {
  //   //   //actual url of  login post
  //   //   username: this.state.username,
  //   //   password: this.state.password,
  //   // });

  //   // if (loginPost) {
  //   localStorage.setItem("curUser", "hello");
  //   window.location.href = "/dashboard"; // to dash board page
  //   // }

  //   // AuthService.login(username, password).then(
  //   //   () => {
  //   //     this.props.history.push("/profile");
  //   //     window.location.reload();
  //   //   },
  //   //   error => {
  //   //     const resMessage =
  //   //       (error.response &&
  //   //         error.response.data &&
  //   //         error.response.data.message) ||
  //   //       error.message ||
  //   //       error.toString();

  //   //     this.setState({
  //   //       loading: false,
  //   //       message: resMessage
  //   //     });
  //   //   }
  //   // );
  // }

  async handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue;


    this.setState({
      message: "",
      loading: true,
    });

    const loginPost = await axios.post<any>("http://localhost:5002/login",{
      userName:username,
      password:password
    })

    if (loginPost) {
      setBearerToken(loginPost.data)
      window.location.href = "/dashboard"; // to dash board page
    }
    else {
      this.setState({ ...this.state, loading: false })
      showErrorMessage("Please use correct password")

    }
  }


  //   // AuthService.login(username, password).then(
  //   //   () => {
  //   //     this.props.history.push("/profile");
  //   //     window.location.reload();
  //   //   },
  //   //   error => {
  //   //     const resMessage =
  //   //       (error.response &&
  //   //         error.response.data &&
  //   //         error.response.data.message) ||
  //   //       error.message ||
  //   //       error.toString();

  //   //     this.setState({
  //   //       loading: false,
  //   //       message: resMessage
  //   //     });
  //   //   }
  //   // );
  // }

  render() {
    const { loading, message } = this.state;

    const initialValues = {
      username: "",
      password: "",
    };

    return (
      <div style={{ paddingTop: "30px" }}>
        <div className="header-title">
          <h2 style={{ textAlign: "center" }}>Leave Management System</h2>
        </div>
        <div style={{ display: "flex" }}>
          <div
            className="col-md-4"
            style={{ overflow: "hidden", marginLeft: "-100px" }}
          >
            <div
              className="card card-container background-form"
              style={{ overflowX: "hidden" }}
            >
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />

              <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.handleLogin}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="username" className="text-white">
                      Username
                    </label>
                    <Field
                      name="username"
                      type="text"
                      // onChange={(e: any) =>
                      //   this.setState({ username: e.target.value })
                      // }
                      // value={this.state.username}
                      className="form-control"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="text-white">
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      // onChange={(e: any) =>
                      //   this.setState({ password: e.target.value })
                      // }
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={loading}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Login</span>
                    </button>
                  </div>
                  {message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                  <div>
                    <Link to="/register">
                      <button className="btn btn-success w-100">
                        Register
                      </button>
                    </Link>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
          <div className="col-md-8">
            <div className="loginSide">
              <img
                src="https://biz30.timedoctor.com/images/2020/01/employee-management.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
