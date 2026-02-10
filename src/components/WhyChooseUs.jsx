import React from "react";
import { FaBoxesPacking, FaTruckFast, FaStarOfLife } from "react-icons/fa6";

const WhyChooseUs = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-green-50 to-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-400/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-400/20 blur-[120px] rounded-full" />

      {/* Heading */}
      <h2 className="relative text-4xl md:text-5xl font-black mb-14 text-green-900 tracking-tight">
        Why <span className="text-green-600">2Quick</span> is the Smarter Choice  
        <br className="hidden md:block" />
        for Your Daily Groceries
      </h2>

      {/* Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {/* Card 1 */}
        <div className="group relative p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-green-200 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(34,197,94,0.25)]">
          <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-green-100 text-green-600 text-4xl mx-auto mb-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
            <FaBoxesPacking />
          </div>

          <h3 className="font-bold text-2xl mb-4 text-gray-800 group-hover:text-green-700 transition">
            Trusted Quality, Always Fresh
          </h3>

          <p className="text-gray-600 leading-relaxed text-sm">
            We carefully select <b>fresh groceries, premium packaged goods</b> and
            authentic spices from <b>trusted brands & local suppliers</b>, so you
            get quality you can trust every day.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group relative p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-green-200 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(34,197,94,0.25)]">
          <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-green-100 text-green-600 text-4xl mx-auto mb-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
            <FaTruckFast />
          </div>

          <h3 className="font-bold text-2xl mb-4 text-gray-800 group-hover:text-green-700 transition">
            Fast & Secure Delivery
          </h3>

          <p className="text-gray-600 leading-relaxed text-sm">
            From daily essentials to pooja items, get your complete grocery list
            <b> delivered quickly and safely</b> to your doorstep with zero hassle.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group relative p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-green-200 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(34,197,94,0.25)]">
          <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-green-100 text-green-600 text-4xl mx-auto mb-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
            <FaStarOfLife />
          </div>

          <h3 className="font-bold text-2xl mb-4 text-gray-800 group-hover:text-green-700 transition">
            All Essentials, One Place
          </h3>

          <p className="text-gray-600 leading-relaxed text-sm">
            From <b>masalas and kitchen staples</b> to personal care and pooja items,
            find everything you need in one <b>easy-to-use online store</b>.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
