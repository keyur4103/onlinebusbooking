import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import toast from "react-hot-toast";

const CancelTicket = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios
      .get(`${import.meta.env.VITE_LIVE_SERVER}/api/canclebookings`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching bookings:", error);
      });
  }, []);

  // const deleteTicket = (cancleid) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to cancel this ticket?"
  //   );
  //   if (!confirmDelete) {
  //     return; // If user cancels, do nothing
  //   }

  //   axios
  //     .delete(
  //       `${import.meta.env.VITE_LIVE_SERVER}/api/deleteticket/${cancleid}`
  //     )
  //     .then((response) => {
  //       toast.success("Ticket canceled successfully");

  //       // Refresh the bookings after deletion
  //       axios
  //         .get(`${import.meta.env.VITE_LIVE_SERVER}/api/canclebookings`)
  //         .then((response) => {
  //           setBookings(response.data);
  //         })
  //         .catch((error) => {
  //           toast.error("Error fetching bookings:", error);
  //         });
  //     })
  //     .catch((error) => {
  //       toast.error("Error canceling ticket:", error);
  //     });
  // };

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
              {/* <th>Actions</th> */}
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
                {/* <td>
                  <button
                    onClick={() => deleteTicket(booking.cancleid)}
                    disabled={booking.status === "success"}
                  >
                    Approve
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CancelTicket;
