import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Demo from "./Demo";
import toast from "react-hot-toast";
import "./demo.css";

const PassengerDetails = () => {
  const { register, handleSubmit, control, reset, getValues } = useForm();
  const { append, remove } = useFieldArray({
    control,
    name: "passengers",
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);

  const confirmdetail = JSON.parse(localStorage.getItem("bookingdetail"))[0];

  const navigate = useNavigate();
  const confirmSeatsArray = confirmdetail.confirmseat;
  console.log("🚀 ~ PassengerDetails ~ confirmSeatsArray:", confirmSeatsArray);

  useEffect(() => {
    if (paymentSuccess && !apiCalled) {
      setIsLoading(true);
      setApiCalled(true); // Set apiCalled to true to indicate that API call is made
      const passengersData = getValues("passengers").map((passengerData) => ({
        firstname: passengerData.firstname,
        lastname: passengerData.lastname,
        age: passengerData.age,
        gender: passengerData.gender,
      }));

      console.log("Passengers Data:", passengersData);

      // Perform API call when payment is successful
      const sendData = async () => {
        try {
          // setIsLoading(true);

          console.log("object");

          const data = {
            busId: confirmdetail.busId,
            userId: confirmdetail.UserId,
            confirmseats: confirmdetail.confirmseat,
            busname: confirmdetail.busname,
            destination: confirmdetail.destination,
            origin: confirmdetail.origin,
            selecteddate: confirmdetail.selecteddate,
            totalamount: confirmdetail.totalamount,
            BoardingPlace: confirmdetail.BoardingPlace,
            BoardingTime: confirmdetail.BoardingTime,
            passengers: passengersData,
          };

          const createPassengerResponse = await axios.post(
            "http://localhost:5000/api/passengerDetails",
            data
          );

          const passengerId = createPassengerResponse.data.id;

          // Now, use the obtained passengerId in the /sendTicketByEmail endpoint
          const sendTicketResponse = await axios.post(
            `http://localhost:5000/sendTicketByEmail/${passengerId}`
          );
          const sendTicketsms = await axios.post(
            `http://localhost:5000/sendTicketBysms/${passengerId}`
          );

          // setIsLoading(false);

          reset();
          localStorage.removeItem("bookingdetail");
          localStorage.removeItem("responce");
          localStorage.removeItem("selecteddate");

          navigate("/home");
          setIsLoading(false);
          toast.success(
            "Your ticket will be sent to your registered email or download your ticket from mybooking",
            { autoClose: 3000 } // Set autoClose to 3000 milliseconds (3 seconds)
          );
        } catch (error) {
          console.error("Error saving passenger details:", error);
          toast.error(error.message);
          setIsLoading(false);
        }
      };

      sendData();
    }
  }, [paymentSuccess, confirmdetail, navigate, reset, getValues, apiCalled]);

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
  };

  const onSubmit = (data) => {
    console.log("Form Data submitted:", data);
  };

  const renderPassengerRows = () => {
    return confirmSeatsArray.map((seatNumber, index) => (
      <tr key={index}>
        <td>{seatNumber}</td>
        <td>
          <input
            {...register(`passengers.${index}.firstname`)}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            {...register(`passengers.${index}.lastname`)}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            {...register(`passengers.${index}.age`)}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            {...register(`passengers.${index}.gender`)}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </td>
      </tr>
    ));
  };

  if (isLoading) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              border: "4px solid rgba(0, 0, 0, 0.1)",
              borderTopColor: "#09f",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <h2>Please Wait...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container" style={{ margintop: "8%" }}>
        <form onChange={handleSubmit(onSubmit)}>
          <table
            cellSpacing={0}
            rules="all"
            border={1}
            id="PassengerDetails"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <tbody>
              <tr>
                <th scope="col">seat Number</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>
                <th scope="col">Action</th>
              </tr>
              {renderPassengerRows()}
            </tbody>
          </table>
        </form>
        <Demo onPaymentSuccess={handlePaymentSuccess} />
      </div>
    </>
  );
};

export default PassengerDetails;
