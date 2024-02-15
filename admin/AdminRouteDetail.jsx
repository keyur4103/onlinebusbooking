import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";

function AdminRouteDetail() {
  // Define state to store the list of buses
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    // Function to fetch buses from MongoDB
    const fetchBuses = async () => {
      try {
        // Fetch data from MongoDB endpoint
        const response = await fetch(
          `${import.meta.env.VITE_LIVE_SERVER}/api/buses`
        ); // Update the endpoint URL accordingly
        if (!response.ok) {
          throw new Error("Failed to fetch buses");
        }
        const data = await response.json();
        // Update state with the retrieved buses
        setBuses(data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };

    // Call the fetchBuses function when the component mounts
    fetchBuses();

    // Cleanup function (optional)
    return () => {
      // Any cleanup code if needed
    };
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <>
      <AdminNavbar />

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
                  <th scope="col">Origin</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Fare</th>
                  <th scope="col">bustype</th>
                  <th scope="col">Action</th>
                </tr>
                {buses.map((bus, index) => (
                  <tr key={index}>
                    <td>
                      <span id={`BusName${index}`}>{bus.busname}</span>
                    </td>
                    <td>
                      <span id={`departure${index}`}>{bus.Origin}</span>
                    </td>
                    <td>
                      <span id={`Arrival${index}`}>{bus.Destination}</span>
                    </td>
                    <td>
                      <span id={`Fare${index}`}>{bus.fare}</span>
                    </td>
                    <td>
                      <span id={`bustype${index}`}>{bus.bustype}</span>
                    </td>
                    <td>
                      <a href={`addboarding/${bus._id}`}>Add boarding point</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminRouteDetail;
