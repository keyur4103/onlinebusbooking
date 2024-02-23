import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.error("Logged out successfully!");

    // Redirect to the home page
    navigate("/");
  };

  return (
    <>
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href="/admin" className="navbar-brand">
              Online Bus Booking
            </a>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <a
                  href="/admin/addroute"
                  id="lnkComplaint"
                  style={{ fontWeight: "bold" }}
                >
                  Add Bus
                </a>
              </li>
              <li>
                <a
                  href="/admin/routedetail"
                  id="A2"
                  style={{ fontWeight: "bold" }}
                >
                  Route Details
                </a>
              </li>
              <li>
                <a
                  href="/admin/bookingreport"
                  id="A4"
                  style={{ fontWeight: "bold" }}
                >
                  Booking Report
                </a>
              </li>
              <li>
                <a
                  href="/admin/updateroute"
                  id="A3"
                  style={{ fontWeight: "bold" }}
                >
                  Bus Details Report
                </a>
              </li>
              <li>
                <a
                  href="/admin/canclereq"
                  id="A3"
                  style={{ fontWeight: "bold" }}
                >
                  Cancel Ticket
                </a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#" style={{ fontWeight: "bold" }}>
                  Hello, Admin!
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  href=""
                  id="A1"
                  style={{ marginTop: "10px", fontWeight: "bold" }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminNavbar;
