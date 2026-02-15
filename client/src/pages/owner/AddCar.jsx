import { useState } from "react";
import assets from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(carData));

      const { data } = await axios.post("/api/owner/add-car", formData);
      if (data.statusMessage === "success") {
        toast.success(data.message);
        setImage(null);
        setCarData({
          brand: "",
          model: "",
          year: 0,
          pricePerDay: 0,
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: "",
          location: "",
          description: "",
        });
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Title
        title="Add a Car"
        subTitle="Fill in details to list a new car for booking, 
        including pricing, availability, and car specifications."
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-6 text-gray-500 text-sm mt-8 max-w-xl"
      >
        {/* Car Image */}
        <div className="flex items-center flex-wrap gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              className="h-20 cursor-pointer rounded"
              alt=""
            />
            <input
              id="car-image"
              name="car-image"
              type="file"
              accept="image/*"
              className="absolute top-0 left-0"
              hidden={true}
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>

        {/* Car Brand & Model */}
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-6 mt-8">
          <div>
            <label className="font-medium text-base">Brand</label>
            <input
              type="text"
              value={carData.brand}
              className="w-full border-borderColor border outline-none px-3 py-2 rounded mt-2"
              required
              onChange={(e) =>
                setCarData({ ...carData, brand: e.target.value })
              }
              placeholder="e.g. BMW, Mercedes, Audi..."
            />
          </div>
          <div>
            <label className="font-medium text-base">Model</label>
            <input
              type="text"
              value={carData.model}
              className="w-full border-borderColor border outline-none px-3 py-2 rounded mt-2"
              required
              onChange={(e) =>
                setCarData({ ...carData, model: e.target.value })
              }
              placeholder="e.g. X5, E-Class, M4..."
            />
          </div>
        </div>

        {/* Car Year, Daily Price, Category */}
        <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div>
            <label className="text-base font-medium">Year</label>
            <input
              type="number"
              value={carData.year || ""}
              className="w-full border-borderColor border outline-none px-3 py-2 rounded mt-2"
              required
              onChange={(e) => setCarData({ ...carData, year: e.target.value })}
              min={0}
              placeholder={`${
                new Date().toISOString().split("T")[0].split("-")[0]
              }`}
            />
          </div>
          <div>
            <label className="font-medium text-base">
              Daily Price ({currency})
            </label>
            <input
              type="number"
              min={0}
              value={carData.pricePerDay || ""}
              className="w-full border-borderColor border outline-none px-3 py-2 rounded mt-2"
              required
              onChange={(e) =>
                setCarData({ ...carData, pricePerDay: e.target.value })
              }
              placeholder="100"
            />
          </div>
          <div>
            <label className="font-medium text-base">Category</label>
            <select
              value={carData.category}
              className="w-full border-borderColor border outline-none px-3 py-2 rounded mt-2"
              required
              onChange={(e) =>
                setCarData({ ...carData, category: e.target.value })
              }
            >
              <option value="" hidden>
                Select Category
              </option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* Car Transmission, Fuel Type, Seating Capacity */}
        <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div>
            <label className="text-base font-medium">Transmission</label>
            <select
              value={carData.transmission}
              className="w-full border-borderColor border outline-none px-3 py-2 rounded mt-2"
              required
              onChange={(e) =>
                setCarData({ ...carData, transmission: e.target.value })
              }
            >
              <option value="" hidden>
                Select Transmission
              </option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi Automatic</option>
            </select>
          </div>
          <div>
            <label className="font-medium text-base">Fuel Type</label>
            <select
              value={carData.fuel_type}
              className="w-full border-borderColor border outline-none px-3 py-2 rounded mt-2"
              required
              onChange={(e) =>
                setCarData({ ...carData, fuel_type: e.target.value })
              }
            >
              <option value="" hidden>
                Select a fuel type
              </option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybird">Hybird</option>
            </select>
          </div>
          <div>
            <label className="font-medium text-base">Seating Capacity</label>
            <input
              type="number"
              value={carData.seating_capacity || ""}
              className="w-full border-borderColor border outline-none px-3 py-2 rounded mt-2"
              required
              onChange={(e) =>
                setCarData({ ...carData, seating_capacity: e.target.value })
              }
              placeholder="5"
            />
          </div>
        </div>

        {/* Car Locaiton */}
        <div className="flex flex-col mt-8">
          <label className="text-base font-medium" htmlFor="car_location">
            Location
          </label>
          <select
            value={carData.location}
            className="w-full border-borderColor border outline-none px-3 py-2 rounded mt-2"
            required
            onChange={(e) =>
              setCarData({ ...carData, location: e.target.value })
            }
          >
            <option value="" hidden>
              Select a location
            </option>
            <option value="New York">New York</option>
            <option value="Los Angelos">Los Angelos</option>
            <option value="Houston">Houston</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>

        {/* Car Description */}
        <div className="flex flex-col mt-8">
          <label className="text-base font-medium" htmlFor="car_location">
            Description
          </label>
          <textarea
            value={carData.description}
            className="w-full resize-none border-borderColor border outline-none px-3 py-2 rounded mt-2"
            required
            rows={5}
            onChange={(e) =>
              setCarData({ ...carData, description: e.target.value })
            }
            placeholder="Describe your car, its condition, and any notable details..."
          ></textarea>
        </div>

        {/* Car List Button */}
        <button
          className="bg-primary text-white px-4 py-3 rounded-lg w-fit cursor-pointer 
        hover:bg-primary-dull transition duration-300 flex items-center gap-2"
          disabled={isLoading}
        >
          <img src={assets.tick_icon} alt="" />
          {isLoading ? "Listing..." : "List Your Car"}
        </button>
      </form>
    </>
  );
};

export default AddCar;
