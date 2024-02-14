import React, { useState } from "react";
import "../frontend/css/style.css";
import "../frontend/css/bootstrap.min.css";
import photo from "../frontend/img/banner-home-1.jpg";

import Navbar from "./src/Navbar";
import Footer from "./src/Footer";

function Home() {
  return (
    <>
      <div>
        <Navbar />
        <div className="container" style={{ marginTop: "6%" }}>
          <div className="row">
            <div className="col-lg-12">
              <img
                src={photo}
                align="absmiddle"
                style={{ width: "100%" }}
                alt="Bus Banner"
              />
            </div>
            <div className="col-lg-12" style={{ marginTop: "2%" }}>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title">
                    <h3>Introduction About Online Bus Booking</h3>
                  </div>
                </div>
                <div className="panel-body">
                  <p style={{ fontSize: "large" }}>
                    Online Bus Booking System is a web-based application that
                    works within a centralized network. It provides facilities
                    to reserve seats and different types of inquiries that need
                    instant and quick reservation. Buses may be used for
                    scheduled bus transport, scheduled coach transport, school
                    transport, private hire, or tourism; promotional buses may
                    be used for political campaigns, and others are privately
                    operated for a wide range of purposes, including rock and
                    pop band tour vehicles.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-12" style={{ marginTop: "2%" }}>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title">
                    <h3>Why Online Bus Booking is Important?</h3>
                  </div>
                </div>
                <div className="panel-body" style={{ fontSize: "large" }}>
                  <ul>
                    <li>Fast & Easy Online bus booking.</li>
                    <li>
                      Zero booking fees - No Extra Charges for online booking.
                    </li>
                    <li>
                      100% Secure to book your bus tickets with Online Bus
                      Booking System.
                    </li>
                    <li>All Credit/Debit/Internet Banking Accepted.</li>
                    <li>Get tickets to your mobile.</li>
                    <li>Online cancellation and phone support available.</li>
                    <li>The fastest way to book bus tickets.</li>
                    <li>
                      Book bus tickets online for Major routes across India.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
}

export default Home;
