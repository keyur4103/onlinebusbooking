import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using axios for HTTP requests
import AdminNavbar from "./AdminNavbar";
import toast from "react-hot-toast";

const CancelTicket = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios
      .get("http://localhost:5000/api/canclebookings") // Update the URL to match your backend API endpoint
      .then((response) => {
        // Add status field to each booking object
        const bookingsWithStatus = response.data.map((booking) => ({
          ...booking,
          status: "Pending",
        }));
        setBookings(bookingsWithStatus);
      })
      .catch((error) => {
        toast.error("Error fetching bookings:", error);
      });
  }, []);

  const deleteTicket = (cancleid, index) => {
    axios
      .delete(`http://localhost:5000/api/deleteticket/${cancleid}`)
      .then((response) => {
        toast.success("Ticket cancle successfully");
        // Update status to "Success" after deletion
        const updatedBookings = [...bookings];
        updatedBookings[index].status = "Success";
        setBookings(updatedBookings);
      })
      .catch((error) => {
        toast.error("Error deleting ticket:", error);
      });
  };

  return (
    <>
      <AdminNavbar />
      <br />
      <div className="container" style={{ marginTop: "50px" }}>
        <table
          className="table table-hover table-bordered"
          cellSpacing={0}
          rules="all"
          border={1}
          style={{ borderCollapse: "collapse" }}
        >
          <tbody>
            <tr>
              <th>cancleid</th>
              <th>Bus Name</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Date of journey</th>
              <th>Selected Seat</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>
                  <span id="BusName">{booking.cancleid}</span>
                </td>
                <td>
                  <span id="BusName">{booking.busname}</span>
                </td>
                <td>
                  <span id="departure">{booking.origin}</span>
                </td>
                <td>
                  <span id="departure">{booking.destination}</span>
                </td>
                <td>
                  <span id="Arrival">{booking.selecteddate}</span>
                </td>

                <td>
                  <span id="Fare">{booking.selectedseat}</span>
                </td>
                <td>
                  <span id="Status">{booking.status}</span>
                </td>
                <td>
                  <button
                    onClick={() => deleteTicket(booking.cancleid, index)}
                    disabled={booking.status === "Success"}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CancelTicket;
