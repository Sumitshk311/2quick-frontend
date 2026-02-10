import { Search, ShoppingCart, Truck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: <Search className="w-10 h-10 text-white" />,
      title: "उत्पाद खोजें",
      desc: "हज़ारों ताज़ा उत्पादों में से चुनें",
      color: "from-blue-400 to-blue-600",
      shadow: "shadow-blue-200",
    },
    {
      id: 2,
      icon: <ShoppingCart className="w-10 h-10 text-white" />,
      title: "कार्ट में जोड़ें",
      desc: "अपने पसंदीदा आइटम चुनें",
      color: "from-green-400 to-green-600",
      shadow: "shadow-green-200",
    },
    {
      id: 3,
      icon: <Truck className="w-10 h-10 text-white" />,
      title: "तेज़ डिलीवरी",
      desc: "घर पर प्राप्त करें",
      color: "from-orange-400 to-orange-600",
      shadow: "shadow-orange-200",
    },
    {
      id: 4,
      icon: <CheckCircle className="w-10 h-10 text-white" />,
      title: "आनंद लें",
      desc: "ताज़ा उत्पादों का आनंद लें",
      color: "from-purple-400 to-purple-600",
      shadow: "shadow-purple-200",
    },
  ];

  return (
    <section className="py-24 bg-[#fcfdfb] overflow-hidden relative">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 opacity-60" />

      <div className="container mx-auto px-4 relative">
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-green-50 text-green-700 font-bold text-xs uppercase tracking-widest mb-6 border border-green-100 shadow-sm"
          >
            ⚡ सरल प्रक्रिया
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 leading-tight">
            यह <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">कैसे काम करता है</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            बस 4 आसान चरणों में अपनी ग्रोसरी ऑर्डर करें और अपना समय बचाएं।
          </p>
        </motion.div>

        {/* Steps Container */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Animated Connecting Path (Desktop) */}
          <svg className="hidden lg:block absolute top-24 left-0 w-full h-20 pointer-events-none" style={{ zIndex: 0 }}>
            <motion.path
              d="M 100 40 Q 300 80 500 40 T 900 40"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeDasharray="10,10"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative group z-10"
            >
              {/* Card Body */}
              <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-10 text-center border border-gray-100 shadow-xl shadow-gray-200/50 group-hover:shadow-2xl transition-all duration-300">
                
                {/* Step Index Circle */}
                <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center text-lg font-black border border-gray-100 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                  {step.id}
                </div>

                {/* Icon Wrapper with Floating Animation */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center mb-8 bg-gradient-to-br ${step.color} ${step.shadow} shadow-2xl rotate-3 group-hover:rotate-6 transition-transform duration-300`}
                >
                  <div className="-rotate-3 group-hover:-rotate-6 transition-transform duration-300">
                    {step.icon}
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-black mb-3 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              {/* Decorative Glow on Hover */}
              <div className={`absolute -inset-2 bg-gradient-to-r ${step.color} rounded-[3rem] blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}