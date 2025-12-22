export default function NewThings() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-28 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-green-100 text-green-700 font-semibold text-sm shadow-sm">
          ✨ Free Delivery on Orders Over ₹499 ✨
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          <span className="text-green-600">Fresh Groceries</span>
          <br />
          <span className="text-gray-900">Delivered to Your Door</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl mb-10">
          Shop from our wide selection of fresh produce, dairy, meat,
          and more.{" "}
          <span className="text-green-600 font-semibold">
            Fast delivery, great prices!
          </span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-green-600 text-white font-semibold text-lg shadow-lg hover:bg-green-700 transition">
            🛒 Start Shopping
            <span className="text-xl">→</span>
          </button>

          <button className="px-8 py-4 rounded-xl bg-green-500/10 text-green-700 font-semibold text-lg hover:bg-green-500/20 transition">
            Browse Categories
          </button>
        </div>
      </div>

      {/* Soft background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.15),_transparent_60%)]" />
    </section>
  );
}
