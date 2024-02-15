import Navbar from "./src/Navbar";
import Footer from "./src/Footer";

import { Link } from "react-router-dom";
export default function RouteDetail() {
  // Retrieve the JSON string from localStorage
  const responce = localStorage.getItem("responce");

  // Convert the JSON string back to a JavaScript array
  const busData = JSON.parse(responce);

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
