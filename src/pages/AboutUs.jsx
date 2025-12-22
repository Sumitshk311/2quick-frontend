import { FaCheckCircle, FaHeart, FaRocket } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-14 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-700">
            About Us
          </h1>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mt-3 rounded-full animate-pulse" />
          <p className="text-lg text-gray-600 mt-4">
            Welcome to <span className="font-semibold text-emerald-600">2Quick Grocery</span> – Your Fast & Reliable Grocery Partner.
          </p>
        </div>

        {/* Story */}
        <div className="space-y-6 text-gray-700 leading-relaxed text-[17px]">
          <p>
            We started our journey with a simple mission – to make grocery shopping fast, affordable, and hassle-free for everyone. In today&apos;s busy world, we understand the value of your time, which is why we&apos;re committed to delivering fresh and quality groceries to your doorstep.
          </p>
          <p>
            With a wide range of products, competitive prices, and lightning-fast delivery, <span className="font-medium text-emerald-600">2Quick Grocery</span> ensures that your everyday needs are met with just a few clicks.
          </p>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-dashed border-emerald-200" />

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: <FaCheckCircle className="text-emerald-600 text-4xl mb-3" />,
              title: "Quality Products",
              desc: "We promise to deliver only fresh and genuine products to your home.",
            },
            {
              icon: <FaHeart className="text-emerald-600 text-4xl mb-3" />,
              title: "Customer First",
              desc: "Your satisfaction is our priority. We are always here to assist you.",
            },
            {
              icon: <FaRocket className="text-emerald-600 text-4xl mb-3" />,
              title: "Quick Delivery",
              desc: "We aim to deliver your order as fast as possible, right to your doorstep.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {item.icon}
              <h3 className="font-semibold text-lg mb-2 text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Thank You */}
        <div className="mt-12 text-center text-gray-600 text-base">
          <p>
            Thank you for choosing <span className="font-semibold text-emerald-600">2Quick Grocery</span>. We&apos;re proud to serve you with speed, care, and quality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
