import React from "react";
// import "../frontend/css/style.css";
// import "../frontend/css/bootstrap.min.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "./src/Footer";
import Navbar from "./src/Navbar";

export default function Login() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (event) => {
    event.preventDefault();

    const mobileNo = document.getElementById("txtUserId").value;
    const password = document.getElementById("txtPassword").value;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LIVE_SERVER}/api/login`,
        {
          mobileNo,
          password,
        }
      );
      console.log(response);

      if (response.data.success) {
        const name = response.data?.data;
        const userid = response.data?.userID;
        // Login successful, you can handle redirection or display a success message here
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("name", name);
        localStorage.setItem("userID", userid);

        console.log(userid);

        toast.success("Successful Logged in..");
        navigate("/home"); // Use navigate to redirect to the login page
      } else {
        // Login failed, handle the error or display an error message
        toast.error("Login failed. Please try again.");
        // console.error(response.data.message);
      }
    } catch (error) {
      // Handle network errors or other issues
      toast.error("Login failed. Please try again.");

      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div>
          <title>On Line Bus Booking</title>

          <form method="post" action="" id="form1" onSubmit={handleLogin}>
            <div>
              <div className="padding100" style={{ marginTop: "3%" }}>
                <div className="container">
                  <div
                    id="loginbox"
                    style={{ marginTop: "10%" }}
                    className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
                  >
                    <div className="panel panel-default">
                      <div className="panel-heading panel-heading-custom">
                        <div className="panel-title">Sign In</div>
                      </div>
                      <div
                        style={{ "padding-top": "30px" }}
                        className="panel-body"
                      >
                        <br />
                        <br />

                        <div
                          id="loginform"
                          className="form-horizontal"
                          role="form"
                        >
                          <div
                            style={{ "margin-bottom": "25px" }}
                            className="input-group"
                          >
                            <span className="input-group-addon">
                              <i className="glyphicon glyphicon-user" />
                            </span>
                            <input
                              type="text"
                              id="txtUserId"
                              className="form-control"
                              placeholder="Enter Mobile No"
                              defaultValue={"8238135039"}
                            />
                            <span
                              id=""
                              className="text-danger"
                              style={{ display: "none" }}
                            />
                            <br />
                          </div>
                          <div
                            style={{ "margin-bottom": "25px" }}
                            className="input-group"
                          >
                            <span className="input-group-addon">
                              <i className="glyphicon glyphicon-lock" />
                            </span>
                            <input
                              name=""
                              type="password"
                              id="txtPassword"
                              className="form-control"
                              placeholder="Enter Password Here"
                              defaultValue={"123456"}
                            />
                            <span
                              id=""
                              className="text-danger"
                              style={{ display: "none" }}
                            />
                          </div>

                          <div className="form-group">
                            <div className="col-sm-12 controls">
                              <input
                                type="submit"
                                name=""
                                defaultValue="Log in"
                                id="btnLogin"
                                className="btn btn-success"
                                style={{ width: "auto" }}
                              />
                              <br />
                              <br />
                              <a href="/register">Register as a new user</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
