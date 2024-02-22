// SeatBookingComponent.js
import React, { useState, useEffect } from "react";
import styles from "./selectseat.module.css"; // Import CSS module for styling
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const SeatBookingComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const selectedbusid = localStorage.getItem("selectedBusId");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedBus, setBusDetail] = useState(null);

  const navigate = useNavigate();
  const { busId } = useParams();
  // const selectedBus = busData?.find((bus) => bus._id === busId);
  const selecteddate = localStorage.getItem("selecteddate");
  const handleSeatClick = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  const [selectedBoarding, setSelectedBoarding] = useState({
    point: "",
    time: "",
  });

  const handleBoardingPointChange = (event) => {
    const selectedValue = event.target.value;
    const selectedTime =
      selectedBus.bordingpoint.find(
        (item) => item.boardingplace === selectedValue
      )?.boradingtime || "";

    setSelectedBoarding({
      point: selectedValue,
      time: selectedTime,
    });
  };

  const BacktoBusdtl = () => {
    navigate("/detail");
  };

  const checkLogin = () => {
    console.log(isLoggedIn);
    const destination = selectedBus.Destination;
    const origin = selectedBus.Origin;
    const busname = selectedBus.busname;
    const busId = selectedBus._id;
    const totalamount = selectedSeats.length * selectedBus.fare;
    const BoardingPlace = selectedBoarding.point;
    const BoardingTime = selectedBoarding.time;
    const confirmseat = selectedSeats;
    const UserId = localStorage.getItem("userID");

    console.log(confirmseat);
    const confirmbooking = [
      {
        busId,
        UserId: UserId,
        busname: busname,
        destination: destination,
        origin: origin,
        totalamount: totalamount,
        selecteddate: selecteddate,
        BoardingPlace: BoardingPlace,
        BoardingTime: BoardingTime,
        confirmseat: confirmseat,
      },
    ];
    const responce = JSON.stringify(confirmbooking);

    const bookingdetail = localStorage.setItem("bookingdetail", responce);

    if (isLoggedIn) {
      // User is logged in, navigate to /passengerdetail
      navigate("/passengerdetail");
    } else {
      // User is not logged in, navigate to /login
      toast.error("please login first..");
      navigate("/login");
    }
  };
  useEffect(() => {
    console.log("object121454");
    const fetchBusDetail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LIVE_SERVER}/api/selectedbusDetails/${busId}`
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log("🚀 ~ fetchBusDetail ~ data:", data);
          setBusDetail(data);
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          // Handle error as needed
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
        // Handle error as needed
      }
    };

    fetchBusDetail();
  }, []);
  useEffect(() => {
    // Fetch confirmed seats for the selected date when the component mounts
    const fetchConfirmedSeats = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_LIVE_SERVER
          }/api/fetch-confirmed-seats/${busId}?date=${selecteddate}`
        );
        console.log("🚀 ~ fetchConfirmedSeats ~ response:", response);

        setBookedSeats(response.data.bookedSeats);
      } catch (error) {
        console.error("Error fetching confirmed seats:", error);
      }
    };

    fetchConfirmedSeats();
  }, [busId, selecteddate]);

  const isSeatBooked = (seatNumber) => {
    return bookedSeats.includes(seatNumber);
  };

  console.log(bookedSeats);
  if (!selectedBus) {
    <div>Loading......</div>;
  }
  const totalSeats = 30;
  return (
    <div className={styles.container1}>
      <div>
        <h3>SELECT SEATS:</h3>

        <div className={styles.seatContainer}>
          <div className={styles.column}>
            {[...Array(11)].map((_, index) => (
              <div
                key={`column-1-seat-${index + 1}`}
                className={`${styles.seat} ${
                  isSeatBooked(index + 1) ? styles.disabled : ""
                } ${selectedSeats.includes(index + 1) ? styles.selected : ""}`}
                onClick={() => handleSeatClick(index + 1)}
              >
                {index + 1}
              </div>
            ))}
          </div>

          <div className={styles.column}>
            {[...Array(11)].map((_, index) => (
              <div
                key={`column-2-seat-${index + 12}`}
                className={`${styles.seat} ${
                  isSeatBooked(index + 12) ? styles.disabled : ""
                } ${selectedSeats.includes(index + 12) ? styles.selected : ""}`}
                onClick={() => handleSeatClick(index + 12)}
              >
                {index + 12}
              </div>
            ))}
          </div>
          <div className={styles.singleSeat}>
            <div
              key={`column-3-seat-1`}
              className={`${styles.seat} ${
                isSeatBooked(23) ? styles.disabled : ""
              } ${selectedSeats.includes(23) ? styles.selected : ""}`}
              onClick={() => handleSeatClick(23)}
            >
              23
            </div>
          </div>
          <div className={styles.column}>
            {[...Array(11)].map((_, index) => (
              <div
                key={`column-4-seat-${index + 24}`}
                className={`${styles.seat} ${
                  isSeatBooked(index + 24) ? styles.disabled : ""
                } ${selectedSeats.includes(index + 24) ? styles.selected : ""}`}
                onClick={() => handleSeatClick(index + 24)}
              >
                {index + 24}
              </div>
            ))}
          </div>
          <div className={styles.column}>
            {[...Array(11)].map((_, index) => (
              <div
                key={`column-5-seat-${index + 35}`}
                className={`${styles.seat} ${
                  isSeatBooked(index + 35) ? styles.disabled : ""
                } ${selectedSeats.includes(index + 35) ? styles.selected : ""}`}
                onClick={() => handleSeatClick(index + 35)}
              >
                {index + 35}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-lg-4" style={{ overflow: "auto" }}>
        <div className="panel panel-danger">
          <div className="panel panel-heading">
            <div className="panel panel-title">
              <h2>Journey Details </h2>
            </div>
          </div>
          <div className="panel-body">
            <button
              type="submit"
              onClick={BacktoBusdtl}
              className="btn btn-success"
            >
              back to busDetails
            </button>
            <p>Onward Journey From</p>
            <p style={{ "font-weight": "bold" }}>
              BUS NAME : {selectedBus?.busname}
            </p>
            <span
              id="ContentPlaceHolder1_lblForm"
              style={{ "font-weight": "bold" }}
            >
              {selectedBus?.Origin}
            </span>
            &nbsp; To &nbsp;
            <span
              id="ContentPlaceHolder1_lblTo"
              style={{ "font-weight": "bold" }}
            >
              {selectedBus?.Destination}
            </span>
            <br />
            on &nbsp;
            <span
              id="ContentPlaceHolder1_lbldate"
              style={{ "font-weight": "bold" }}
            >
              {selecteddate}
            </span>
            <br />
            <br />
            <div className="col-lg-12">
              <table className="table-bordered">
                <tbody>
                  <tr>
                    <td>Selected Seat No</td>
                    <td>
                      <span
                        id="lblSelectedSeat"
                        style={{ "font-weight": "bold" }}
                      >
                        {selectedSeats.join(", ")}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Per Seat Fare</td>
                    <td>
                      <span>
                        <i className="fa fa-rupee" />
                      </span>
                      <span id="lblPerSeat" style={{ "font-weight": "bold" }}>
                        {selectedBus?.fare}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Amount</td>
                    <td>
                      <span>
                        <i className="fa fa-rupee" />
                      </span>
                      <span id="lbltotal" style={{ "font-weight": "bold" }}>
                        {selectedSeats.length * selectedBus?.fare}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ margintop: "5%" }} className="col-lg-12">
              <span id="BoardingPoint" style={{ "font-weight": "bold" }}>
                Boarding Points
              </span>

              <select
                id="ddlBoardingpoints"
                style={{ width: "100%" }}
                onChange={handleBoardingPointChange}
              >
                <option value={0}>Select Boarding Points</option>
                {selectedBus?.bordingpoint.map((item, i) => (
                  <option key={i} value={item.boardingplace}>
                    {item.boardingplace} - {item.boradingtime}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <span style={{ "font-weight": "bold", display: "none" }}>
                Dropping Points
              </span>
              <select
                id="Droppingpoints"
                style={{ display: "none", width: "70%" }}
              >
                <option value="">Select Dropping Point</option>
              </select>
              <br />
              <br />
              <button
                type="submit"
                id="btnPayment"
                onClick={checkLogin}
                className="btn btn-success"
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatBookingComponent;
