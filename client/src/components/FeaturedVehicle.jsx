import assets from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import CarCard from "./CarCard";
import Title from "./Title";
import { motion } from "motion/react";
import { useEffect } from "react";

const FeaturedVehicle = () => {
  const { fetchCars, cars, navigate } = useAppContext();

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-24 px-6 md:px-10 lg:px-16 xl:px-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventure."
          align="center"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 w-full"
      >
        {cars.slice(0, 6).map((car) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            key={car._id}
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onClick={() => {
          navigate("/cars");
          scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="border border-borderColor text-[#2B3441] px-6 py-2 mt-18 
      cursor-pointer rounded-md hover:bg-gray-50 transition duration-300
      flex items-center gap-2"
      >
        Explore all cars <img src={assets.arrow_icon} alt="arrow icon" />
      </motion.button>
    </motion.section>
  );
};

export default FeaturedVehicle;
