import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import toast from "react-hot-toast";

const MyBooking = ({ userId }) => {
  const [bookingData, setBookingData] = useState([]);
  const UserId = localStorage.getItem("userID");
  const [showTicketDetails, setShowTicketDetails] = useState(false);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/booking/${UserId}`);
        const data = await response.json();
        console.log("🚀 ~ fetchBookingData ~ data:", data);
        setBookingData(data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchBookingData();
  }, [userId, UserId]);

  const downloadTicket = async (booking) => {
    const pdfContent = `
    <div>

      <p>Bus Name: ${booking.busname}</p>
      <p>Origin: ${booking.origin}</p>
      <p>Destination: ${booking.destination}</p>
      <p>Date of journey: ${booking.selecteddate}</p>
      <p>Selected Seat: ${booking.selectedseat}</p>
    </div>
  `;

    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = pdfContent;
    document.body.appendChild(tempContainer);

    try {
      const blob = await html2pdf(tempContainer, {
        margin: 10,
        filename: "ticket.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          docBaseUrl: window.location.href,
        },
      });

      // Rest of the code...
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      document.body.removeChild(tempContainer);
    }
  };

  const cancelTicket = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/cancel/${bookingId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // You can pass additional data if needed
          body: JSON.stringify({ userId: UserId }),
        }
      );

      if (response.ok) {
        // Update booking data after cancellation

        toast.success("Ticket canceled successfully");
      } else {
        toast.error("Failed to cancel ticket");
      }
    } catch (error) {
      console.error("Error canceling ticket:", error);
      toast.error("Failed to cancel ticket");
    }
  };

  return (
    <div className="container" style={{ marginTop: "10px" }}>
      <table
        className="table table-hover table-bordered"
        cellSpacing={0}
        rules="all"
        border={1}
        style={{ borderCollapse: "collapse" }}
      >
        <tbody>
          <tr>
            <th>Bus Name</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Date of journey</th>
            <th>Selected Seat</th>
            <th>Actions</th>
          </tr>

          {bookingData.map((booking, index) => (
            <tr key={index}>
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
                <button onClick={() => downloadTicket(booking)}>
                  Download Ticket
                </button>
                <button onClick={() => cancelTicket(booking.bookingId)}>
                  Cancel Ticket
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooking;
