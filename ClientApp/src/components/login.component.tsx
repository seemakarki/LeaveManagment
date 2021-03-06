import { Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// import AuthService from "../services/auth.service";
import axios from "axios";
// import { setFlagsFromString } from "v8";

interface RouterProps {
  history: string;
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

  async handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue;

    // console.log("username is ", username);
    // console.log("password is ", password);

    this.setState({
      message: "",
      loading: true,
    });

    //const loginPost = await axios.post("url", {
    //  //actual url of  login post
    //  username: username,
    //  password: password,
    //});

      //if (loginPost) {
          localStorage.setItem("curUser", "hello");
          window.location.href = "/dashboard"; // to dash board page
    //}

    // AuthService.login(username, password).then(
    //   () => {
    //     this.props.history.push("/profile");
    //     window.location.reload();
    //   },
    //   error => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     this.setState({
    //       loading: false,
    //       message: resMessage
    //     });
    //   }
    // );
  }

  render() {
    const { loading, message } = this.state;

    const initialValues = {
      username: "",
      password: "",
    };

    return (
      <div className="col-md-12">
        <div className="card card-container background-form">
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
                <Field name="username" type="text" className="form-control" />
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
                  <button className="btn btn-success w-100">Register</button>
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}
