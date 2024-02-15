import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Navbar from "./src/Navbar";
import Footer from "./src/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export default function SearchBus() {
  const localServer = import.meta.env.VITE_LIVE_SERVER;

  console.log(localServer);
  const navigate = useNavigate();
  const [cities, setCities] = useState({
    originValues: [],
    destinationValues: [],
  });
  const [selectedOrigin, setSelectedOrigin] = useState(0); // Add this line
  const [selectedDestination, setSelectedDestination] = useState(0); // Add this line
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();
  const dayAfter30days = new Date();
  dayAfter30days.setDate(dayAfter30days.getDate() + 30);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleOriginChange = (event) => {
    setSelectedOrigin(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setSelectedDestination(event.target.value);
  };

  const handlesearch = async () => {
    try {
      // Format the selected date to match the expected format in the API request
      const formattedDate = selectedDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      console.log(formattedDate);

      // Fetch data from the API based on user input
      const response = await fetch(
        `${
          import.meta.env.VITE_LIVE_SERVER
        }/api/busDetails?origin=${selectedOrigin}&destination=${selectedDestination}&traveldate=${selectedDate}`
      );

      // Check if the response is successful (status code 200)
      if (response.ok) {
        const data = await response.json();
        // Check if any data is returned
        if (data.length > 0) {
          const responce = JSON.stringify(data);
          localStorage.setItem("responce", responce);
          localStorage.setItem("selecteddate", formattedDate);

          navigate("/detail");
        } else {
          toast.error("No bus details found. Please try again.");
          console.error("No matching bus details found.");
        }
      } else {
        // Handle non-200 response status
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    const fetchCitiesFromAPI = async () => {
      try {
        // Fetch data from the API
        const response = await fetch(
          `${import.meta.env.VITE_LIVE_SERVER}/api/cities`
        );
        const data = await response.json();

        // Update state with the retrieved data
        setCities(data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    // Call the function to fetch data
    fetchCitiesFromAPI();
  }, []);

  return (
    <>
      <div>
        <title>On Line Bus Booking</title>
        <div method="post" action="" id="form1">
          <Navbar />
          <div className="container" style={{ marginTop: "50px" }}>
            <div className="row ">
              <div
                className="col-lg-4 col-sm-4 col-md-2 col-sm-offset-2 col-md-offset-2"
                style={{ "margin-left": "30%" }}
              >
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Search For Available Buses</h3>
                  </div>
                  <div className="panel-body">
                    <div id="ContentPlaceHolder1_divMessage" />

                    <div>
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <span id="Label1" style={{ fontWeight: "bold" }}>
                            From
                          </span>
                          <select
                            id="ddlOrigin"
                            className="form-control input-sm floatlabel"
                            onChange={handleOriginChange}
                          >
                            <option value={0}>-Select City--</option>
                            {cities.originValues.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <span id="Label1" style={{ fontWeight: "bold" }}>
                            To
                          </span>
                          <select
                            id="ddlDestination"
                            className="form-control input-sm floatlabel"
                            onChange={handleDestinationChange}
                          >
                            <option value={0}>-Select City--</option>
                            {cities.destinationValues.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <span id="lblDate" style={{ fontWeight: "bold" }}>
                            Travel Date
                          </span>
                          <br />

                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            placeholder="DD/MM/YYYY Format"
                            className="form-control input-sm floatlabel"
                            minDate={today}
                            maxDate={dayAfter30days}
                          />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <input
                            type="submit"
                            name=""
                            defaultValue="Search Buses"
                            id="btnSearch"
                            className="btn btn-info btn-block"
                            onClick={() => handlesearch()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
