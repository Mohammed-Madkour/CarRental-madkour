import { useState } from "react";
import assets, { cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Hero = () => {
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();
  const [pickUpLocation, setPickUpLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickUpLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-[calc(100vh-75px)] pb-24 pt-[75px] flex flex-col items-center 
        justify-center gap-14 bg-light text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-semibold"
        >
          Luxury Cars
        </motion.h1>
        <motion.form
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-start md:items-center 
        justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 gap-4
        bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
        >
          <div
            className="flex flex-col md:flex-row items-start md:items-center
          gap-10 min-md:ml-8"
          >
            <div className="flex flex-col items-start gap-2">
              <select
                className="outline-none"
                required
                value={pickUpLocation}
                onChange={(e) => setPickUpLocation(e.target.value)}
              >
                <option value="">Pickup Location</option>
                {cityList.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <p className="px-1 text-sm text-gray-500">
                {pickUpLocation ? pickUpLocation : "Please Select Location"}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="pickup-date">Pick-up Date</label>
              <input
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                type="date"
                id="pickup-date"
                min={new Date().toISOString().split("T")[0]}
                className="text-sm text-gray-500"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="return-date">Return Date</label>
              <input
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                type="date"
                id="return-date"
                className="text-sm text-gray-500"
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white rounded-full px-8 py-3 cursor-pointer 
            hover:bg-primary-dull flex gap-1"
          >
            <img
              src={assets.search_icon}
              className="brightness-300"
              alt="search"
            />
            Search
          </motion.button>
        </motion.form>
        <motion.img
          initial={{ opacity: 0, y: 100 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          src={assets.main_car}
          alt="car"
          className="max-h-74"
        />
      </motion.section>
    </>
  );
};

export default Hero;
