export default function WhyChoose() {
  const topFeatures = [
    { icon: "⚡", title: "Fast Delivery", desc: "Same day delivery" },
    { icon: "🔒", title: "Secure Payment", desc: "100% safe" },
    { icon: "💚", title: "Fresh Quality", desc: "Guaranteed" },
    { icon: "🚚", title: "Free Shipping", desc: "Over ₹300" },
  ];

  const bottomFeatures = [
    {
      icon: "🛡️",
      title: "100% सुरक्षित",
      desc: "सुरक्षित भुगतान",
    },
    {
      icon: "🚚",
      title: "तेज़ डिलीवरी",
      desc: "उसी दिन डिलीवरी",
    },
    {
      icon: "🔄",
      title: "आसान रिटर्न",
      desc: "1 दिन की गारंटी",
    },
    {
      icon: "🏆",
      title: "बेस्ट क्वालिटी",
      desc: "प्रीमियम उत्पाद",
    },
    {
      icon: "🔐",
      title: "डेटा सुरक्षा",
      desc: "आपकी गोपनीयता सुरक्षित",
    //   highlight: true,
    },
    {
      icon: "🌿",
      title: "ताज़ा उत्पाद",
      desc: "ऑर्गेनिक विकल्प",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-20">
      <div className="container mx-auto px-4">

        {/* Top Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {topFeatures.map((item, i) => (
            <div
            //   key={i}
              className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-lg transition"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-2xl">
                {item.icon}
              </div>
              <h4 className="font-bold text-gray-900">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-green-200 mb-16" />

        {/* Bottom Features */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {bottomFeatures.map((item, i) => (
            <div
              key={i}
              className={`text-center p-6 rounded-2xl transition ${
                item.highlight
                  ? "bg-green-100 shadow-lg scale-105"
                  : "hover:bg-green-50"
              }`}
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-2xl">
                {item.icon}
              </div>
              <h4 className="font-bold mb-1">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
                {/* Divider */}
        <div className="h-px bg-green-200 mt-20" />
      </div>
    </section>
  );
}
