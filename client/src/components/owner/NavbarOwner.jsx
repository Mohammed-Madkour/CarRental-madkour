import { NavLink, useLocation } from "react-router-dom";
import assets from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const NavbarOwner = () => {
  const location = useLocation();
  const { user } = useAppContext();

  return (
    <nav
      className={`flex justify-between items-center h-[75px] px-6 md:px-10 lg:px-16 xl:px-24
    text-gray-600 border-borderColor border-b flex-wrap transition-all w-full 
    ${location.pathname === "/" ? "bg-light" : "bg-white"}
    `}
    >
      <NavLink to={"/"}>
        <img src={assets.logo} alt="logo" className="h-8" />
      </NavLink>
      <p className="text-gray-500">Welcome, {user?.name || "Owner"}</p>
    </nav>
  );
};

export default NavbarOwner;
