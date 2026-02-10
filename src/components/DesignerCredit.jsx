import { useNavigate } from "react-router-dom";

export default function DesignerCredit() {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 bg-[#0b0f14] border-t border-green-500/20 overflow-hidden text-center">
      {/* Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />

      <div onClick={() => navigate("https://www.instagram.com/sumitsoni_shk311/")} className="relative z-10">
        {/* Small Text */}
        <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-6">
          Designed & Developed By
        </p>

        {/* Signature Name */}
        <h1 className="text-3xl md:text-5xl font-signature text-green-400 drop-shadow-lg">
          Sumit Soni
        </h1>

        {/* Simple Name */}
        <p className="mt-6 text-lg font-semibold text-white tracking-wide">
          Sumit Soni
        </p>

        {/* Underline */}
        <div className="w-28 h-[2px] bg-green-500 mx-auto mt-3 rounded-full"></div>
      </div>
    </section>
  );
};

