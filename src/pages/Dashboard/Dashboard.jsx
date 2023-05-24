import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAdminHotels } from "../../features/hotel/hotelSlice";

import "./Dashboard.scss";

import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/requests", { replace: true });
    }
  }, [location]);

  return (
    <>
      <div className="dashboard_page page">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
