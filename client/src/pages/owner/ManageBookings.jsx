import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageBookings = () => {
  const { currency, axios } = useAppContext();

  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/owner");
      if (data.statusMessage === "success") {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const changeBookingsStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/booking/change-status", {
        bookingId,
        status,
      });
      if (data.statusMessage === "success") {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <>
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses"
      />

      <div className="border-borderColor overflow-x-auto max-w-3xl w-full border rounded-lg mt-8">
        <table className="w-full border-collapse text-sm text-left text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payment</th>
              <th className="p-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr className="border-t border-borderColor" key={index}>
                <td className="px-1 py-3 flex gap-3 items-center max-sm:flex-wrap">
                  <img
                    src={booking.car.image}
                    className="aspect-square w-12 h-12 rounded-md object-cover"
                    alt=""
                  />
                  <p className="text-sm">
                    {booking.car.brand} {booking.car.model}
                  </p>
                </td>
                <td className="p-3 max-md:hidden text-xs">
                  {booking.pickupDate.split("T")[0]} To{" "}
                  {booking.returnDate.split("T")[0]}
                </td>
                <td className="p-3">
                  {currency}
                  {booking.price}
                </td>
                <td className="p-3 max-md:hidden">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-400">
                    offline
                  </span>
                </td>
                <td className="p-3">
                  {booking.status === "pending" ? (
                    <button className="cursor-pointer">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          changeBookingsStatus(booking._id, e.target.value)
                        }
                        className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor 
                      rounded-md outline-none"
                      >
                        <option value="pending">pending</option>
                        <option value="cancelled">cancelled</option>
                        <option value="confirmed">confirmed</option>
                      </select>
                    </button>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageBookings;
