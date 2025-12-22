import React from "react";
import { FaBoxesPacking, FaTruckFast, FaStarOfLife } from "react-icons/fa6";

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-green-800">
        Why 2Quick is the Smarter Choice for Your Daily Groceries
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <FaBoxesPacking className="text-green-600 text-5xl mb-4" />
          <h3 className="font-semibold text-2xl mb-3 text-gray-800">
            Trusted Quality, Always Fresh
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We carefully select <b>fresh groceries, premium packaged goods,</b>{" "}
            and authentic spices from <b>trusted brands and local suppliers</b>,
            so you get quality you can trust every day.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <FaTruckFast className="text-green-600 text-5xl mb-4" />
          <h3 className="font-semibold text-2xl mb-3 text-gray-800">
            Fast & Secure Delivery
          </h3>
          <p className="text-gray-600 leading-relaxed">
            From daily essentials to pooja items, get your complete grocery list
            <b> delivered quickly and safely</b> to your doorstep for a
            hassle-free experience.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <FaStarOfLife className="text-green-600 text-5xl mb-4" />
          <h3 className="font-semibold text-2xl mb-3 text-gray-800">
            All Essentials, One Place
          </h3>
          <p className="text-gray-600 leading-relaxed">
            From <b>masalas and kitchen staples</b> to personal care and pooja
            items, find everything you need in one <b>easy-to-use online store</b>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
