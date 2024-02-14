import React from "react";
// import "../frontend/css/style.css";
// // import "../frontend/css";
// import "../frontend/css/bootstrap.min.css";
import Navbar from "./src/Navbar";

function AboutUs() {
  return (
    <>
      <Navbar />

      <div className="container" style={{ margintop: "6%" }}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title">
              <h3>About Us</h3>
            </div>
          </div>
          <div className="panel-body">
            <p style={{ fontSize: "large" }}>
              We are among the top 10 Service Providers for Online Bus Booking
              in India, with branches in all major cities. Our services are fast
              and efficient, offering a good service environment to our users.
              We provide 24x7 support and aim to resolve all queries within a
              day.
            </p>
          </div>
        </div>
      </div>

      <footer
        className="navbar navbar-default navbar-static-top"
        style={{
          textAlign: "center",
          fontWeight: "bold",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
      >
        <section style={{ width: "49%", textAlign: "right" }}>
          Copyright © 2024
        </section>
      </footer>
    </>
  );
}

export default AboutUs;
