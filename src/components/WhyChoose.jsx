import React from "react"; // ✅ React import karna zaroori hai cloneElement ke liye
import { motion } from "framer-motion";
import { 
  Zap, ShieldCheck, Leaf, Truck, 
  RotateCcw, Star, Lock, BadgeCheck 
} from "lucide-react";

export default function WhyChoose() {
  const features = [
    { 
      icon: <Zap className="w-7 h-7" />, 
      title: "Fast Delivery", 
      desc: "Same day delivery",
      color: "bg-orange-500",
      light: "bg-orange-50"
    },
    { 
      icon: <ShieldCheck className="w-7 h-7" />, 
      title: "Secure Payment", 
      desc: "100% safe transactions",
      color: "bg-blue-500",
      light: "bg-blue-50"
    },
    { 
      icon: <Leaf className="w-7 h-7" />, 
      title: "Fresh Quality", 
      desc: "Guaranteed organic",
      color: "bg-green-500",
      light: "bg-green-50"
    },
    { 
      icon: <Truck className="w-7 h-7" />, 
      title: "Free Shipping", 
      desc: "On orders over ₹300",
      color: "bg-purple-500",
      light: "bg-purple-50"
    },
  ];

  const bottomFeatures = [
    { icon: <RotateCcw />, title: "आसान रिटर्न", desc: "1 दिन की गारंटी" },
    { icon: <Star />, title: "बेस्ट क्वालिटी", desc: "प्रीमियम उत्पाद" },
    { icon: <Lock />, title: "डेटा सुरक्षा", desc: "गोपनीयता सुरक्षित" },
    { icon: <BadgeCheck />, title: "100% सुरक्षित", desc: "Verified Payments" },
  ];

  return (
    <section className="relative bg-[#f8fafc] py-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-green-200/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-200/20 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
          >
            हमारा <span className="text-green-600">वादा</span>
          </motion.h2>
          <div className="w-20 h-1.5 bg-green-500 mx-auto rounded-full" />
        </div>

        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden transition-all"
            >
              <div className={`absolute inset-0 ${item.light} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0`} />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl ${item.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-current/30 rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Minimal Features */}
        <div className="bg-white/40 backdrop-blur-md rounded-[3rem] p-10 border border-white/50 shadow-inner">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {bottomFeatures.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-green-600 mb-4 bg-green-100 p-4 rounded-full ring-8 ring-green-50">
                  {/* ✅ FIXED: React.cloneElement use kiya hai instead of Object.cloneElement */}
                  {React.cloneElement(item.icon, { size: 28, strokeWidth: 2.5 })}
                </div>
                <h5 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h5>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}