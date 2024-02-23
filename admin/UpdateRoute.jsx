import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import Axios from "axios"; // Import Axios for making HTTP requests
import toast from "react-hot-toast";

function UpdateRoute() {
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
  }, []);

  const deleteBus = async (e, id) => {
    e.preventDefault();
    try {
      // Ask for confirmation before deleting
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this bus?"
      );
      if (!confirmDelete) {
        return; // If user cancels, do nothing
      }

      const response = await Axios.delete(
        `${import.meta.env.VITE_LIVE_SERVER}/api/deletebus/${id}`
      );
      console.log("🚀 ~ deleteBus ~ response:", response);
      if (response.status === 200) {
        toast.success("bus route delete successfully");
        // If deletion is successful, remove the bus from the state
        setBuses(buses.filter((bus) => bus._id !== id));
        // Reload the page after successful deletion
      } else {
        toast.error("Failed to delete bus");
      }
    } catch (error) {
      toast.error("Error deleting bus:", error);
    }
  };

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
                  <th scope="col">Bus No</th>

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
                      <span id={`BusNo${index}`}>{bus.busno}</span>
                    </td>
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
                      <a href={`/admin/editroute/${bus._id}`}>updateroute</a>
                      &nbsp; &nbsp;
                      <a href="" onClick={(e) => deleteBus(e, bus._id)}>
                        Deleteroute
                      </a>
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

export default UpdateRoute;
