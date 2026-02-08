import { useEffect, useState } from "react";
import assets from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { currency, axios,user } = useAppContext();

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/user");
      if (data.statusMessage === "success") {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    user && fetchBookings();
  }, [user]);
  return (
    <>
      <section className="px-6 py-24 md:px-10 lg:px-16 xl:px-24">
        <Title
          title="My Bookings"
          subTitle="View and manage your car bookings"
          align="left"
        />
        <div className="mt-6 flex flex-col gap-6 max-md:items-center">
          {bookings.map((booking, index) => {
            return (
              <div
                key={booking._id}
                className="p-6 border border-borderColor rounded-xl flex justify-between flex-col 
                md:flex-row max-md:gap-6 max-md:items-start"
              >
                <div className="flex items-start gap-6 flex-col md:flex-row">
                  {/* Car Image And Info */}
                  <div>
                    <div>
                      <img
                        src={booking.car.image}
                        className="rounded-xl object-cover aspect-video w-full md:max-w-50"
                        alt="alo"
                      />
                    </div>
                    <h3 className="text-md font-semibold mt-3">
                      {booking.car.brand} {booking.car.model}
                    </h3>
                    <p className="text-sm mt-1 text-gray-500">
                      {booking.car.year} • {booking.car.category} •{" "}
                      {booking.car.location}
                    </p>
                  </div>
                  {/* Booking Data */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="bg-light px-3 py-1.5 rounded-lg">
                        Booking#{index + 1}
                      </span>
                      <span
                        className={` px-3 py-1.5 rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-400/15 text-green-600"
                            : "bg-[#FBBF2440] text-[#C1931A]"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <img
                        className="w-4 h-4 mt-1"
                        src={assets.calendar_icon_colored}
                        alt="calendar-icon"
                      />
                      <div>
                        <p className="text-gray-500">Rental Period</p>
                        <p>{booking.pickupDate.split("T")[0]}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start">
                      <img
                        className="w-4 h-4 mt-1"
                        src={assets.location_icon_colored}
                        alt="location-icon"
                      />
                      <div>
                        <p className="text-gray-500">Pick-up Location</p>
                        <p>{booking.car.location}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start">
                      <img
                        className="w-4 h-4 mt-1"
                        src={assets.location_icon_colored}
                        alt="location-icon"
                      />
                      <div>
                        <p className="text-gray-500">Return Location</p>
                        <p>{booking.car.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Price</p>
                  <h4 className="font-bold text-primary text-xl">
                    {currency}
                    {booking.price}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Booked on {booking.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default MyBookings;
