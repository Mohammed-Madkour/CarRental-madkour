import { useEffect, useState } from "react";
import assets, { menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Navbar = () => {
  const { logout, setShowLogin, user, isOwner, axios, setIsOwner } =
    useAppContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.statusMessage === "success") {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex justify-between items-center h-[75px] px-6 md:px-10 lg:px-16 xl:px-24
    text-gray-600 border-borderColor border-b  transition-all 
    top-0 left-0 w-full sticky z-50 ${scrolled && "shadow-md"}
    ${location.pathname === "/" ? "bg-light" : "bg-white"}
    `}
    >
      <Link to={"/"} onClick={() => setOpen(false)} className="sm:mr-2">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={assets.logo}
          alt="logo"
          className="h-8"
        />
      </Link>
      <ul
        className={`max-sm:fixed max-sm:h-screen 
      max-sm:w-full max-sm:top-16 max-sm:border-t 
      border-borderColor right-0 flex flex-col 
      sm:flex-row items-start sm:items-center gap-4
      max-sm:p-4 transition-all duration-300 
      text-[15px]
      z-50
      ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}
      ${open && "bg-light"}`}
      >
        {menuLinks.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              onClick={() => {
                setOpen(false);
                scrollTo(0, 0);
              }}
            >
              {link.name}
            </Link>
          </li>
        ))}
        <li
          className=" hidden lg:flex items-center gap-2 
          border text-sm px-3 rounded-full border-borderColor"
        >
          <input
            type="text"
            className="py-1.5 w-full bg-transparent placeholder-gray-500 outline-none text-[14px]"
            placeholder="Search cars"
          />
          <img src={assets.search_icon} alt="Search" />
        </li>
        <li className="flex max-sm:flex-col items-start sm:items-center gap-6">
          <button
            onClick={() => {
              isOwner ? navigate("/owner") : changeRole();

              setOpen(false);
            }}
            className="cursor-pointer"
          >
            {isOwner ? "Dashboard" : "List Cars"}
          </button>
          <button
            onClick={() => (user ? logout() : setShowLogin(true))}
            className="bg-primary cursor-pointer px-8 py-2 text-white
            hover:bg-primary-dull rounded-lg transition-all duration-300"
          >
            {user ? "Logout" : "Login"}
          </button>
        </li>
        <li
          className="flex lg:hidden items-center gap-2 
          border text-sm px-3 py-3 rounded-full border-borderColor cursor-pointer"
        >
          <img src={assets.search_icon} alt="Search" />
        </li>
      </ul>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="cursor-pointer sm:hidden"
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </button>
    </motion.nav>
  );
};

export default Navbar;
