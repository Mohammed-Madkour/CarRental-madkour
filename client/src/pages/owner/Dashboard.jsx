import { useEffect, useState } from "react";
import assets from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const DashboardCard = ({ label, value, icon }) => (
  <div className="flex justify-between items-center max-sm:flex-wrap border border-borderColor px-4 py-3 rounded-lg">
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
    <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
      <img className="w-4 h-4" src={icon} alt={label} />
    </div>
  </div>
);

const Dashboard = () => {
  const { axios, currency, isOwner } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.statusMessage === "success") {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  const dashboardCards = [
    { label: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    {
      label: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      label: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      label: "Completed",
      value: data.completedBookings,
      icon: assets.check_icon,
    },
  ];

  return (
    <>
      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including total cars, 
        bookings, revenue, and recent activities"
      />

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {dashboardCards.map((card) => (
          <DashboardCard key={card.label} {...card} />
        ))}
      </div>

      <div className="flex max-w-4xl gap-6 max-xl:flex-wrap items-start w-full mt-8">
        {/* Recent Bookings Section */}
        <div className="border border-borderColor rounded-lg w-full md:max-w-xl p-4 md:p-6">
          <p className="text-xl">Recent Bookings</p>
          <p className="text-gray-500 text-sm mt-2">Latest customer bookings</p>

          <div className="mt-8">
            {data.recentBookings
              .filter((booking) => booking.car)
              .map((booking) => (
                <div
                  key={booking._id}
                  className="flex justify-between mt-8 sm:items-center max-sm:flex-col max-sm:gap-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="bg-primary/10 max-sm:hidden rounded-full flex w-12 h-12
                  items-center justify-center"
                    >
                      <img
                        className="w-5 h-5"
                        src={assets.listIconColored}
                        alt="booking-icon"
                      />
                    </div>
                    <div>
                      <p>
                        {booking.car.brand} {booking.car.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.pickupDate.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    <span className="text-gray-500">{booking.price}</span>
                    <span
                      className={`px-3 py-0.5 rounded-full ${
                        booking.status === "confirmed"
                          ? "bg-green-400/15 text-green-600"
                          : "bg-[#FBBF2440] text-[#C1931A]"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Monthly Revenue Section */}
        <div className="border border-borderColor rounded-lg w-full md:max-w-xs p-4 h-fit md:p-6">
          <p className="text-xl">Monthly Revenue</p>
          <p className="text-gray-500 text-sm mt-2">
            Revenue for current month
          </p>
          <p className="text-3xl text-primary mt-8 font-bold">
            {currency}
            {data.monthlyRevenue}
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
