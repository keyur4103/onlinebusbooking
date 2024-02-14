import React from "react";
import AdminNavbar from "./AdminNavbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditRoute() {
  const { register, handleSubmit, reset } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { busid } = useParams();
  const [bus, setBus] = useState({});

  const navigate = useNavigate();

  const today = new Date();
  const dayAfter30days = new Date();
  dayAfter30days.setDate(dayAfter30days.getDate() + 30);

  function convertToDDMMYY(dateString) {
    const date = new Date(dateString);

    // Extract day, month, and year from the date object
    const day = date.getDate();
    const month = date.getMonth() + 1; // Note: Months are zero-based (January is 0), so add 1
    const year = date.getFullYear(); // Get last two digits of the year

    // Format day, month, and year to ensure they have leading zeros if necessary
    const formattedDay = (day < 10 ? "0" : "") + day;
    const formattedMonth = (month < 10 ? "0" : "") + month;
    const formattedYear = (year < 10 ? "0" : "") + year;

    // Combine formatted components to get the desired format (dd/mm/yy)
    const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear}`;

    return formattedDate;
  }

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/editbus/${busid}`
        );
        console.log("🚀 ~ fetchBusData ~ response:", response);
        if (!response.data) {
          throw new Error("Bus not found");
        }
        setBus(response.data);
      } catch (error) {
        console.error("Error fetching bus:", error);
      }
    };

    fetchBusData();
  }, [busid]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        startdate: convertToDDMMYY(startDate).toString(),
        enddate: convertToDDMMYY(endDate).toString(),
      };
      console.log("🚀 ~ onSubmit ~ formattedData:", formattedData);

      // Assuming you are using PUT or PATCH method to update the existing data
      await axios.put(
        `http://localhost:5000/api/update-route/${busid}`,
        formattedData
      );
      navigate("/admin/updateroute");
      toast.success("Bus detail updated successfully");
      reset();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
      reset();
    }
  };

  return (
    <>
      <AdminNavbar />
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div className="row centered-form" style={{ margintop: "5%" }}>
          <div className="col-lg-8 col-sm-8 col-md-2 col-sm-offset-2 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Add Bus Details</h3>
              </div>
              <div className="panel-body">
                <div
                  id="ContentPlaceHolder1_vsRegister"
                  className="alert alert-danger"
                  style={{ display: "none" }}
                ></div>
                <div id="ContentPlaceHolder1_divMessage" />
                <div className="col-xs-6 col-sm-6 col-md-6">
                  <div className="form-group">
                    <span
                      id="ContentPlaceHolder1_lblBus"
                      style={{ "font-weight": "bold" }}
                    >
                      Bus No
                    </span>
                    <input
                      {...register("busno", {
                        required: "Please enter busno.",
                      })}
                      type="text"
                      className="form-control input-sm floatlabel"
                      defaultValue={bus.busno}
                    />

                    <br />
                  </div>
                  <div className="form-group">
                    <span style={{ "font-weight": "bold" }}>startdate</span>
                    <br />
                    <DatePicker
                      selected={startDate}
                      placeholder="DD/MM/YYYY Format"
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd/MM/yyyy"
                      className="form-control input-sm floatlabel"
                      minDate={today}
                      maxDate={dayAfter30days}
                      defaultValue={bus.startdate}
                    />

                    <br />
                  </div>
                  <div className="form-group">
                    <span
                      id="ContentPlaceHolder1_Label1"
                      style={{ "font-weight": "bold" }}
                    >
                      Origin
                    </span>
                    <input
                      {...register("Origin", {
                        required: "Please enter Origin.",
                      })}
                      type="text"
                      id="txtOrigin"
                      className="form-control input-sm floatlabel"
                      defaultValue={bus.Origin}
                    />

                    <br />
                  </div>
                  <div className="form-group">
                    <span
                      id="ContentPlaceHolder1_Label3"
                      style={{ "font-weight": "bold" }}
                    >
                      BusName
                    </span>
                    <input
                      {...register("busname", {
                        required: "Please enter busname.",
                      })}
                      type="text"
                      id="txtBusName"
                      className="form-control input-sm floatlabel"
                      defaultValue={bus.busname}
                    />

                    <br />
                  </div>
                  <div className="form-group">
                    <span style={{ "font-weight": "bold" }}>arrivaltime</span>
                    <input
                      {...register("arrivaltime", {
                        required: "Please enter arrivaltime.",
                      })}
                      type="text"
                      id="arrivaltime"
                      className="form-control input-sm floatlabel"
                      placeholder="DD/MM/YYYY Format"
                      defaultValue={bus.arrivaltime}
                    />

                    <br />
                  </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6">
                  <div className="form-group">
                    <span
                      id="ContentPlaceHolder1_lblLastName"
                      style={{ "font-weight": "bold" }}
                    >
                      Bus Type
                    </span>
                    <select
                      {...register("bustype", {
                        required: "Please enter bustype.",
                      })}
                      id="ddlBusType"
                      className="form-control input-sm floatlabel"
                      defaultValue={bus.bustype}
                    >
                      <option disabled value={0}>
                        Select Bus Type
                      </option>
                      <option value={"Normal"}>Normal</option>
                      <option value={"AC"}>AC</option>
                    </select>

                    <br />
                  </div>
                  <div className="form-group">
                    <span
                      id="ContentPlaceHolder1_lblPassword"
                      style={{ "font-weight": "bold" }}
                    >
                      enddate
                    </span>
                    <br />

                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="dd/MM/yyyy"
                      className="form-control input-sm floatlabel"
                      minDate={today}
                      maxDate={dayAfter30days}
                      defaultValue={bus.enddate}
                    />
                    <br />
                  </div>
                  <div className="form-group">
                    <span
                      id="ContentPlaceHolder1_Label2"
                      style={{ "font-weight": "bold" }}
                    >
                      Destination
                    </span>
                    <input
                      {...register("Destination", {
                        required: "Please enter Destination.",
                      })}
                      type="text"
                      id="txtDetination"
                      className="form-control input-sm floatlabel"
                      defaultValue={bus.Destination}
                    />

                    <br />
                  </div>
                  <div className="form-group">
                    <span
                      id="ContentPlaceHolder1_Label2"
                      style={{ "font-weight": "bold" }}
                    >
                      Fare
                    </span>
                    <input
                      {...register("fare", {
                        required: "Please enter fare.",
                      })}
                      type="text"
                      id="fare"
                      className="form-control input-sm floatlabel"
                      defaultValue={bus.fare}
                    />

                    <br />
                  </div>
                  <div className="form-group">
                    <span
                      id="ContentPlaceHolder1_Label2"
                      style={{ "font-weight": "bold" }}
                    >
                      departuretime
                    </span>
                    <input
                      {...register("departuretime", {
                        required: "Please enter departuretime.",
                      })}
                      type="text"
                      id="deparuretime"
                      className="form-control input-sm floatlabel"
                      placeholder="DD/MM/YYYY Format"
                      defaultValue={bus.departuretime}
                    />

                    <br />
                  </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6">
                  <div className="form-group">
                    <button
                      type="submit"
                      id="ContentPlaceHolder1_btnSave"
                      className="btn btn-info "
                      style={{ width: "auto", margintop: "20px" }}
                    >
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditRoute;
