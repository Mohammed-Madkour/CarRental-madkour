import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import assets from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageCars = () => {
  const { axios, isOwner, currency } = useAppContext();

  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/get-car");
      if (data.statusMessage === "success") {
        setCars(data.cars);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data.statusMessage === "success") {
        toast.success(data.message);
        fetchOwnerCars();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const deleteCar = async (carId) => {
    const confirm = window.confirm("Are you sure you want to delete this car?");

    if (!confirm) return null;

    try {
      const { data } = await axios.delete("/api/owner/delete-car", {
        data: { carId },
      });

      if (data.statusMessage === "success") {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  return (
    <>
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform"
      />
      <div className="border-borderColor overflow-x-auto max-w-3xl w-full border rounded-lg mt-8">
        <table className="w-full border-collapse text-sm text-left text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr className="border-t border-borderColor" key={index}>
                <td className="py-3 px-1 flex gap-3 items-center flex-wrap">
                  <img
                    src={car.image}
                    className="aspect-square w-12 h-12 rounded-md object-cover"
                    alt=""
                  />
                  <div>
                    <p className="text-sm">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {car.seating_capacity} seats • {car.transmission}
                    </p>
                  </div>
                </td>
                <td className="p-3 max-md:hidden">{car.category}</td>
                <td className="p-3">
                  {currency}
                  {car.pricePerDay}/day
                </td>
                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      car.isAvailable === true
                        ? "bg-green-400/15 text-green-600"
                        : "bg-[#FFBBBC80] text-[#DA282B]"
                    }`}
                  >
                    {car.isAvailable ? "Available" : "Not Available"}
                  </span>
                </td>
                <td className="p-3 flex items-center gap-3">
                  <button
                    className="cursor-pointer"
                    onClick={() => toggleAvailability(car._id)}
                  >
                    <img
                      src={
                        car.isAvailable
                          ? assets.eye_close_icon
                          : assets.eye_icon
                      }
                      className="min-w-10"
                      alt=""
                    />
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={() => deleteCar(car._id)}
                  >
                    <img src={assets.delete_icon} className="min-w-10" alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageCars;
