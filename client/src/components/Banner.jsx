import assets from "../assets/assets";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const ListYourCar = () => {
  const { navigate ,user} = useAppContext();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-10 lg:px-14 xl:px-24 py-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] 
      mx-6 md:mx-8 lg:mx-16 xl:mx-24 rounded-2xl flex flex-col justify-between items-center md:flex-row"
    >
      <div className=" text-white flex flex-col gap-4">
        <h3 className="text-4xl font-bold">Do You Own a Luxury Car?</h3>
        <p className="max-w-130">
          Monetize your vehicle effortlessly by listing it on CarRental.
          <br /> We take care of insurance, driver verification and secure
          payments — so you can earn passive income, stress-free.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if(user) {
              navigate("/owner/add-car");
            } else {
              toast.error("User isn't logged in")
            }
          }}
          className="text-primary bg-white px-6 py-2 cursor-pointer w-fit rounded-lg 
          hover:bg-white/90 text-sm"
        >
          List Your Car
        </motion.button>
      </div>
      <motion.img
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        src={assets.banner_car_image}
        alt="Banner car"
        className="max-h-45 max-md:mt-10"
      />
    </motion.div>
  );
};

export default ListYourCar;
