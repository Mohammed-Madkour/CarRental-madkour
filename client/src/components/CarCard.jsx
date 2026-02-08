import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => { navigate(`/car-details/${car._id}`); scroll(0,0); }}
        className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1
      transition-all duration-500 cursor-pointer"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={car.image}
            alt={car.brand + " " + car.model}
            className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
          />
          {car.isAvailable && (
            <p className="absolute top-4 left-4 px-2.5 bg-primary text-white text-xs py-1 rounded-full">
              Avaliable Now
            </p>
          )}
          <div className="absolute bottom-4 right-4 px-3 py-2 bg-black text-white text-xs rounded-lg backdrop-blur-sm">
            <span className="text-white font-bold text-lg">
              {currency}
              {car.pricePerDay}
            </span>
            <span className="text-white/80 text-xs">/ day</span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium">
              {car.brand} {car.model}
            </h3>
            <p className="text-muted-foreground text-sm">
              {car.category} • {car.year}
            </p>
          </div>
          <div className="grid grid-cols-2 mt-4 gap-y-2 text-gray-600">
            <div className="flex items-center text-sm">
              <img
                src={assets.users_icon}
                alt="Seats Icon"
                className="h-4 mr-2"
              />
              <span>{car.seating_capacity} Seats</span>
            </div>
            <div className="flex items-center text-sm">
              <img
                src={assets.fuel_icon}
                alt="fuel icon"
                className="h-4 mr-2"
              />
              <span>{car.fuel_type}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-4 gap-y-2 text-gray-600">
            <div className="flex items-center text-sm">
              <img
                src={assets.car_icon}
                alt={car.transmission}
                className="h-4 mr-2"
              />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center text-sm">
              <img
                src={assets.location_icon}
                alt="location icon"
                className="h-4 mr-2"
              />
              <span>{car.location}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarCard;
