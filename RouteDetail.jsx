import Navbar from "./src/Navbar";
import Footer from "./src/Footer";
import toast from "react-hot-toast";

import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
export default function RouteDetail() {
  // Retrieve the JSON string from localStorage
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Get the values of the query parameters
  const selectedOrigin = searchParams.get("origin");
  console.log("🚀 ~ RouteDetail ~ selectedOrigin:", selectedOrigin);
  const selectedDestination = searchParams.get("destination");
  const selectedDate = searchParams.get("traveldate");

  const [busData, setBusData] = useState([]);

  const handleClick = (busId) => {
    // Set the selected bus ID in local storage
    localStorage.setItem("selectedBusId", busId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_LIVE_SERVER
          }/api/busDetails?origin=${selectedOrigin}&destination=${selectedDestination}&traveldate=${selectedDate}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("🚀 ~ fetchData ~ data:", data);
          setBusData(data);
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          toast.error("Error fetching bus details. Please try again.");
          navigate("/searchbus");
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
        toast.error("Error fetching bus details. Please try again.");
        navigate("/searchbus");
      }
    };

    fetchData();
  }, [selectedOrigin, selectedDestination, selectedDate]);
  return (
    <>
      <Navbar />
      <div>
        <title>On Line Bus Booking</title>

        <form method="post" action="" id="form1">
          <div className="container" style={{ marginTop: "8%" }}>
            <table
              className="table table-hover table-bordered"
              cellSpacing={0}
              rules="all"
              border={1}
              style={{ borderCollapse: "collapse" }}
            >
              <tbody>
                <tr>
                  <th scope="col">Bus Name</th>
                  <th scope="col">Departure Time</th>
                  <th scope="col">Arrival Time</th>
                  <th scope="col">Fare</th>
                  <th scope="col">bustype</th>

                  <th scope="col">Action</th>
                </tr>
                {busData?.map((busDetails) => (
                  <tr key={busDetails._id}>
                    <td>
                      <span id="BusName">{busDetails.busname}</span>
                    </td>
                    <td>
                      <span id="departure">{busDetails.departuretime}</span>
                    </td>
                    <td>
                      <span id="Arrival">{busDetails.arrivaltime}</span>
                    </td>

                    <td>
                      <span id="Fare">{busDetails.fare}</span>
                    </td>

                    <td>
                      <span id="Fare">{busDetails.bustype}</span>
                    </td>
                    <td>
                      <Link
                        to={`/selectseat/${busDetails._id}`}
                        id="Selectbus"
                        title="Select Bus"
                        onClick={() => handleClick(busDetails._id)}
                      >
                        Select Bus
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
