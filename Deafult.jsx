import React from "react";
import { Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import RouteDetail from "./RouteDetail";
import SeatBookingComponent from "./src/SeatBookingComponent";
import PassangerDetail from "./src/PassangerDetail";
import MyBooking from "./src/MyBooking";
import Demo from "./src/Demo";
import AddRoute from "./admin/AddRoute";
import AdminRouteDetail from "./admin/AdminRouteDetail";
import BookingReport from "./admin/BookingReport";
import AddBoarding from "./admin/AddBoarding";
import UpdateRoute from "./admin/UpdateRoute";
import EditRoute from "./admin/EditRoute";
import AdminHome from "./admin/AdminHome";
import CancelTicket from "./admin/CancleTicket";
import Home from "./Home";
import AboutUs from "./AboutUs";
import SearchBus from "./SearchBus";
import Register from "./Register";
import Login from "./Login";

export default function Default() {
  return (
    <>
      <Routes>
        <Route path="/admin">
          <Route path="" element={<AdminHome />} />
          <Route path="addroute" element={<AddRoute />} />
          <Route path="routedetail" element={<AdminRouteDetail />} />
          <Route path="bookingreport" element={<BookingReport />} />
          <Route path="addboarding/:busid" element={<AddBoarding />} />
          <Route path="updateroute" element={<UpdateRoute />} />
          <Route path="editroute/:busid" element={<EditRoute />} />
          <Route path="canclereq" element={<CancelTicket />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<RouteDetail />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/searchbus" element={<SearchBus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/selectseat/:busId" element={<SeatBookingComponent />} />
        <Route path="/passengerdetail" element={<PassangerDetail />} />
        <Route path="/booking/:UserId" element={<MyBooking />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
      <Toaster position="top-center" autoClose="4000" />
    </>
  );
}
