import { useState } from "react";

export default function AdminOffer() {
  const [offer, setOffer] = useState({
    title: "Super Sunday Deal",
    description: "सभी जरूरी सामान पर भारी छूट",
    discount: 25,
    image: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setOffer({ ...offer, [e.target.name]: e.target.value });
  };

  // ✅ IMAGE UPLOAD HANDLER (FIX)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setOffer({ ...offer, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const saveOffer = () => {
    if (!offer.endTime) {
      alert("⏰ Please select offer end time");
      return;
    }

    if (!offer.image) {
      alert("🖼️ Please upload offer image");
      return;
    }

    localStorage.setItem("offerData", JSON.stringify(offer));
    alert("✅ Offer saved successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white max-w-xl w-full p-8 rounded-2xl shadow-xl">

        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          🎯 Manage Today’s Offer
        </h2>

        <div className="space-y-4">
          <input
            name="title"
            value={offer.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            placeholder="Offer Title"
          />

          <input
            name="description"
            value={offer.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            placeholder="Offer Description"
          />

          <input
            name="discount"
            type="number"
            value={offer.discount}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            placeholder="Discount %"
          />

          {/* ✅ IMAGE UPLOAD */}
          <div>
            <label className="block mb-2 font-semibold">
              Offer Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />

            {offer.image && (
              <img
                src={offer.image}
                alt="Offer Preview"
                className="mt-4 rounded-xl h-40 w-full object-cover"
              />
            )}
          </div>

          <label className="text-sm font-semibold text-gray-600">
            Offer End Time
          </label>
          <input
            type="datetime-local"
            name="endTime"
            value={offer.endTime}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <button
            onClick={saveOffer}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Save Offer
          </button>
        </div>
      </div>
    </div>
  );
}
