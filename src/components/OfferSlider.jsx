import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OfferSlider() {
  const [offer, setOffer] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const savedOffer = JSON.parse(localStorage.getItem("offerData"));
    if (savedOffer) setOffer(savedOffer);
  }, []);

  // ⏳ COUNTDOWN LOGIC
  useEffect(() => {
    if (!offer?.endTime) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(offer.endTime).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("⛔ Offer Ended");
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${hours}h ${minutes}m ${seconds}s left`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [offer]);

  if (!offer) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm mb-4">
            ⏰ सीमित समय का ऑफर
          </span>

          <h2 className="text-4xl font-bold mb-2">
            आज के <span className="text-green-600">विशेष ऑफर्स</span>
          </h2>

          <p className="text-gray-500">
            जल्दी करें! ऑफर समाप्त होने वाला है
          </p>
        </div>

        {/* Offer Card */}
        <div className="bg-green-50 rounded-3xl shadow-xl p-8 grid md:grid-cols-2 gap-8 items-center">

          {/* LEFT */}
          <div>
            <p className="text-sm font-semibold text-red-600 mb-2">
              ⏳ {timeLeft}
            </p>

            <h3 className="text-3xl font-bold mb-2">
              {offer.title}
            </h3>

            <p className="text-gray-600 mb-6">
              {offer.description}
            </p>

            {/* 🔗 Redirect to Products */}
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
            >
              अभी खरीदें
            </Link>
          </div>

          {/* RIGHT */}
          <div className="relative bg-green-500 rounded-2xl h-64 flex items-center justify-center overflow-hidden">
            <span className="absolute top-4 right-4 bg-white text-green-600 font-bold px-4 py-2 rounded-xl shadow">
              {offer.discount}% तक
            </span>

            {offer.image ? (
              <img
                src={offer.image}
                alt="Offer"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-6xl">🥬</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
