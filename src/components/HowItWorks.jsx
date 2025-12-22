import { Search, ShoppingCart, Truck, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: <Search className="w-8 h-8 text-white" />,
      title: "उत्पाद खोजें",
      desc: "हज़ारों ताज़ा उत्पादों में से चुनें",
      bg: "bg-blue-500",
    },
    {
      id: 2,
      icon: <ShoppingCart className="w-8 h-8 text-white" />,
      title: "कार्ट में जोड़ें",
      desc: "अपने पसंदीदा आइटम चुनें",
      bg: "bg-green-500",
    },
    {
      id: 3,
      icon: <Truck className="w-8 h-8 text-white" />,
      title: "तेज़ डिलीवरी",
      desc: "घर पर प्राप्त करें",
      bg: "bg-orange-500",
    },
    {
      id: 4,
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      title: "आनंद लें",
      desc: "ताज़ा उत्पादों का आनंद लें",
      bg: "bg-purple-500",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm mb-4">
            ⚡ सरल प्रक्रिया
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            यह <span className="text-green-600">कैसे काम करता है</span>
          </h2>
          <p className="text-gray-500 text-lg">
            बस 4 आसान चरणों में अपनी ग्रोसरी ऑर्डर करें
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Line (desktop only) */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-green-200" />

          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-white rounded-2xl shadow-lg p-8 text-center z-10 hover:shadow-xl transition"
            >
              {/* Step number */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                {step.id}
              </div>

              {/* Icon */}
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${step.bg}`}
              >
                {step.icon}
              </div>

              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
