import React, { useEffect } from "react";
import NavbarOwner from "../../components/owner/NavbarOwner";
import SideBar from "../../components/owner/SideBar";
import Dashboard from "./Dashboard";
import { useLocation } from "react-router-dom";
import AddCar from "./AddCar";
import ManageCars from "./ManageCars";
import ManageBookings from "./ManageBookings";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const location = useLocation();
  const { isOwner, navigate } = useAppContext();

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner,navigate]);

  return (
    <>
      <NavbarOwner />
      <div className="flex">
        <SideBar />
        <div className="flex-1 mt-8 px-4 md:px-10 py-10 min-w-0">
          {location.pathname === "/owner" && <Dashboard />}
          {location.pathname === "/owner/add-car" && <AddCar />}
          {location.pathname === "/owner/manage-cars" && <ManageCars />}
          {location.pathname === "/owner/manage-bookings" && <ManageBookings />}
        </div>
      </div>
    </>
  );
};

export default Layout;
