import assets from "../assets/assets";
import Title from "./Title";
import { motion } from "motion/react";

const testimonials = [
  {
    name: "Donald Jackman",
    location: "Barcelona, Spain",
    image: assets.testimonial_image_1,
    testimonial:
      "I've rented cars from various companies, but the experience with CarRental was exceptional.",
  },
  {
    name: "Ava Johnson",
    location: "New York, USA",
    image: assets.testimonial_image_2,
    testimonial:
      "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!",
  },
  {
    name: "John Smith",
    location: "Sydney, Australia",
    image: assets.testimonial_image_3,
    testimonial:
      "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.",
  },
];

const Testimonial = () => {
  return (
    <section className="px-6 py-24 md:px-10 lg:px-16 xl:px-24">
      <Title
        title="What Our Customers Say"
        subTitle="Discover why discerning travelers choose StayVenture for 
              their luxury accommodations around the world."
        align="center"
      />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 * index }}
            viewport={{ once: true, amount: 0.3 }}
            key={index}
            className="text-sm border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] 
        shadow-black/5 overflow-hidden hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex items-center max-sm:flex-col gap-4 px-5 py-4 bg-primary/10">
              <img
                className="h-12 w-12 rounded-full"
                src={testimonial.image}
                alt="userImage1"
              />
              <div>
                <h2 className="text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h2>
                <p className="text-gray-800/80">{testimonial.location}</p>
              </div>
            </div>
            <div className="px-5 max-sm:text-center">
              <div className="flex items-center max-sm:justify-center gap-1 mt-4">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <img key={index} src={assets.star_icon} alt="star-icon" />
                  ))}
              </div>
              <p className="text-gray-500 mt-4 max-sm:max-w-full max-w-90 text-[15px] font-light">
                "{testimonial.testimonial}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
