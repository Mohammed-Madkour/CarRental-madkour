import { useState } from "react";
import assets, { ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SideBar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState("");

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const {data} = await axios.post("/api/owner/update-image", formData);
      if (data.statusMessage === "success") {
        fetchUser();
        setImage("");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <aside
      className="relative min-h-screen md:flex flex-col items-center pt-8 
    max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm"
    >
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
            }
            alt="user-image"
            className="rounded-full h-9 w-9 md:h-14 md:w-14 object-cover mx-auto"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden={true}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div
            className="absolute top-0 left-0 right-0 bottom-0 hidden bg-black/10 rounded-full w-full 
          h-full group-hover:flex items-center
        justify-center cursor-pointer"
          >
            <img src={assets.edit_icon} alt="edit-icon" />
          </div>
        </label>
      </div>

      {image && (
        <button
          onClick={updateImage}
          className="bg-primary/10 text-primary absolute top-0 right-0 flex p-2 gap-1 cursor-pointer"
        >
          Save <img src={assets.check_icon} width={13} alt="check-icon" />
        </button>
      )}

      <p className="text-base mt-2 max-md:hidden">{user?.name}</p>
      <ul className="w-full mt-6">
        {ownerMenuLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.path}
              className={`flex gap-2 relative py-3 pl-3 items-center ${
                link.path === location.pathname
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600"
              }
            hover:bg-primary/10 transition duration-300`}
            >
              <img
                src={
                  link.path === location.pathname ? link.coloredIcon : link.icon
                }
                alt=""
              />
              <p className="max-md:hidden">{link.name}</p>
              <div
                className={`w-1.5 h-8 rounded-l absolute bg-primary right-0
              ${link.path === location.pathname ? "" : "hidden"}`}
              ></div>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
