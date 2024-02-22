import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [humburgerOpen, setHumburgerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const name = localStorage.getItem("name");
  // const googleRes = localStorage.getItem("googleRes");
  // const accessToken = JSON.parse(googleRes);
  // console.log("🚀 ~ Navbar ~ googleRes:", accessToken.access_token);
  // const [profile, setProfile] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  // const data = location.state;

  // useEffect(() => {
  //   if (googleRes) {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken.access_token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         setIsLoggedIn(true);
  //         console.log(res.data);
  //         setProfile(res.data?.name);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [googleRes]);

  function handlelogout() {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    toast.success("Logged out.");

    navigate("/login");
  }

  return (
    <div className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse"
            onClick={() => setHumburgerOpen((a) => !a)}
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          {humburgerOpen && (
            <div className={`navbar-collapse vertical-nav `}>
              <ul className="nav navbar-nav">
                <li>
                  <a href="/" style={{ fontWeight: "bold" }}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="/aboutus" style={{ fontWeight: "bold" }}>
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/searchbus"
                    id="A2"
                    style={{ fontWeight: "bold" }}
                    title="Search Buses"
                  >
                    Search Buses
                  </a>
                </li>
                {isLoggedIn && (
                  <li>
                    <a
                      href="/booking/:UserId"
                      id="A2"
                      style={{ fontWeight: "bold" }}
                      title="Search Buses"
                    >
                      My booking
                    </a>
                  </li>
                )}
              </ul>

              <ul className="nav navbar-nav navbar-right">
                {!isLoggedIn && (
                  <li>
                    <a
                      href="/register"
                      id="linkRegister"
                      style={{ fontWeight: "bold" }}
                    >
                      <i className="glyphicon glyphicon-user"></i> Registration
                    </a>
                  </li>
                )}
                {!isLoggedIn && (
                  <li>
                    <a
                      href="/login"
                      id="linkLogin"
                      style={{ fontWeight: "bold" }}
                      title="Login"
                    >
                      Login
                    </a>
                  </li>
                )}
                <li>
                  <p style={{ fontWeight: "bold", margin: "15px" }}>
                    Login As: {isLoggedIn ? "name" : "Guest"}
                  </p>
                </li>
                {isLoggedIn && (
                  <li>
                    <button style={{ margin: "15px" }} onClick={handlelogout}>
                      logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
          <a href="/" className="navbar-brand">
            Online Bus Booking
          </a>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li>
              <a href="/" style={{ fontWeight: "bold" }}>
                Home
              </a>
            </li>
            <li>
              <a href="/aboutus" style={{ fontWeight: "bold" }}>
                About Us
              </a>
            </li>
            <li>
              <a
                href="/searchbus"
                id="A2"
                style={{ fontWeight: "bold" }}
                title="Search Buses"
              >
                Search Buses
              </a>
            </li>
            {isLoggedIn && (
              <li>
                <a
                  href="/booking/:UserId"
                  id="A2"
                  style={{ fontWeight: "bold" }}
                  title="Search Buses"
                >
                  My booking
                </a>
              </li>
            )}
          </ul>

          <ul className="nav navbar-nav navbar-right">
            {!isLoggedIn && (
              <li>
                <a
                  href="/register"
                  id="linkRegister"
                  style={{ fontWeight: "bold" }}
                >
                  <i className="glyphicon glyphicon-user"></i> Registration
                </a>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <a
                  href="/login"
                  id="linkLogin"
                  style={{ fontWeight: "bold" }}
                  title="Login"
                >
                  Login
                </a>
              </li>
            )}
            <li>
              <p style={{ fontWeight: "bold", margin: "15px" }}>
                Login As: {isLoggedIn ? name : "Guest"}
              </p>
            </li>
            {isLoggedIn && (
              <button style={{ margin: "15px" }} onClick={handlelogout}>
                logout
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
