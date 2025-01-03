import React from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../assets/images/testimonials-1.jpg";
import img2 from "../assets/images/testimonials-2.jpg";
import img3 from "../assets/images/testimonials-3.jpg";
import img4 from "../assets/images/testimonials-4.jpg";
import img5 from "../assets/images/testimonials-5.jpg";
import bgImage from "../assets/images/testimonials-bg.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Saul Goodman",
      role: "Ceo & Founder",
      image: img1,
      review:
        "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus.",
    },
    {
      name: "Sara Wilsson",
      role: "Designer",
      image: img2,
      review:
        "Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum.",
    },
    {
      name: "Jena Karlis",
      role: "Store Owner",
      image: img3,
      review:
        "Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam.",
    },
    {
      name: "Matt Brandon",
      role: "Freelancer",
      image: img4,
      review:
        "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat.",
    },
    {
      name: "John Larson",
      role: "Entrepreneur",
      image: img5,
      review:
        "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam.",
    },
  ];

  return (
    <motion.section
      id="testimonials"
      className="relative py-8 bg-gray-900 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-10 opacity-30"
      />
      <div className="container mx-auto z-20 relative">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg">
            Our customers' satisfaction is our top priority. Hear what they have
            to say about our services.
          </p>
        </motion.div>

        <Carousel
          infiniteLoop={true} // Enable infinite looping of slides
          autoPlay={true} // Enable autoplay
          interval={3000} // Set autoplay interval to 3 seconds
          showStatus={false} // Disable status showing (current slide number)
          showThumbs={false} // Disable thumbnail previews
          showArrows={false} // Disable arrow navigation buttons
          transitionTime={600} // Set transition speed between slides
          // className="carousel-container"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className=" text-center p-6 pb-10  "
              >
                <div className="text-center w-24 mx-auto rounded-lg shadow-lg">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-img w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white align-center" // Smaller size
                  />
                </div>

                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <h4 className="text-sm text-yellow-50 mb-4">
                  {testimonial.role}
                </h4>
                <div className="stars mb-4">
                  {[...Array(5)].map((_, starIndex) => (
                    <i
                      key={starIndex}
                      className="bi bi-star-fill text-yellow-400"
                    />
                  ))}
                </div>
                <p className="italic text-gray-300 relative">
                  {/* Adding Quote Marks Around the Review */}
                  <span className=" top-1/2 transform -translate-y-1/2 text-4xl text-gray-400">
                    “
                  </span>
                  {testimonial.review}
                  <span className=" top-1/2 transform -translate-y-1/2 text-4xl text-gray-400">
                    ”
                  </span>
                </p>
              </motion.div>
            </div>
          ))}
        </Carousel>
      </div>
    </motion.section>
  );
};

export default Testimonials;
