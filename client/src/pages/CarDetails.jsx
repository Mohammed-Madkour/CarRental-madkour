import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import assets from "../assets/assets";
import SyncLoader from "react-spinners/SyncLoader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const {
    navigate,
    axios,
    cars,
    currency,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  } = useAppContext();
  const [car, setCar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/booking/create", {
        car: id,
        pickupDate,
        returnDate,
      });
      if (data.statusMessage === "success") {
        toast.success(data.message);
        navigate("/my-bookings");

        setPickupDate("");
        setReturnDate("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    setCar(cars.find((car) => car._id === id));
  }, [id, cars]);
  return car ? (
    <section className="px-6 py-24 md:px-10 lg:px-16 xl:px-24">
      <button
        className="text-gray-500 flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <img
          src={assets.arrow_icon}
          alt="arrow-icon"
          className="rotate-180 opacity-65"
        />
        Back to all cars
      </button>
      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <div className=" lg:col-span-2 ">
          <div>
            <img
              src={car.image}
              alt={car.brand + " " + car.model}
              className="rounded-xl mb-6 w-full md:max-h-100 object-cover"
            />
            <h1 className="text-3xl font-bold">
              {car.brand} {car.model}
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              {car.year} • {car.category}
            </p>
          </div>
          <hr className="border-borderColor border-b my-8" />
          <div className=" flex flex-col md:flex-row gap-6 mt-8">
            {[
              {
                icon: assets.users_icon,
                text: `${car.seating_capacity} Seats`,
              },
              { icon: assets.fuel_icon, text: car.fuel_type },
              { icon: assets.car_icon, text: car.transmission },
              { icon: assets.location_icon, text: car.location },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center flex-col gap-1 text-sm bg-gray-100 
              w-full md:w-1/4 py-3 rounded-lg"
              >
                <img src={icon} className="h-4" alt={`${text}`} />
                <span className="text-gray-500 text-sm">{text}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-medium mt-5">Description</h2>
            <p className="text-gray-500 text-sm mt-2">{car.description}</p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-medium ">Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
              {[
                "Leather Seats",
                "Panoramic Sunroof",
                "Wireless Charging",
                "360 Camera",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <img src={assets.check_icon} alt="" />
                  <span className="text-sm text-gray-500">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="shadow-lg rounded-xl p-6 h-fit sticky top-24 left-0"
        >
          <div className="flex justify-between items-center border-b border-borderColor pb-6">
            <h4 className="text-2xl font-bold">
              {currency}
              {car.pricePerDay}
            </h4>
            <span className="text-gray-500">per day</span>
          </div>
          <div className="mt-6">
            <div>
              <label htmlFor="pickupDate" className="font-medium">
                Pickup Date
              </label>
              <input
                type="date"
                id="pickupDate"
                className="w-full mt-2 p-2 border border-borderColor rounded-lg"
                min={new Date().toISOString().split("T")[0]}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>
            <div className="mt-6">
              <label htmlFor="returnDate" className="font-medium">
                Return Date
              </label>
              <input
                type="date"
                id="returnDate"
                className="w-full mt-2 p-2 border border-borderColor rounded-lg"
                min={new Date().toISOString().split("T")[0]}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          </div>
          <button
            className="bg-primary text-white w-full py-3 
          rounded-xl font-medium mt-6 cursor-pointer 
          hover:bg-primary-dull transition duration-300"
          >
            Book Now
          </button>
          <p className="text-sm text-gray-500 text-center mt-6">
            No credit card required to reserve
          </p>
        </form>
      </div>
    </section>
  ) : (
    <SyncLoader
      color="#2563eb"
      cssOverride={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

export default CarDetails;
