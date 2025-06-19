import React from "react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow flex items-center justify-between px-8 py-4">
      <div className="text-2xl font-bold text-primary">FoodieXpress</div>
      <ul className="flex gap-8 text-lg font-medium">
        <li className="hover:text-primary cursor-pointer">Home</li>
        <li className="hover:text-primary cursor-pointer">Menu</li>
        <li className="hover:text-primary cursor-pointer">Cart</li>
        <li className="hover:text-primary cursor-pointer">Orders</li>
        <li className="hover:text-primary cursor-pointer">Login</li>
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-gradient-to-br from-primary to-yellow-100 min-h-[60vh]">
      <div className="max-w-xl">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight text-gray-900">
          Delicious Food, <span className="text-primary">Delivered Fast</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Order from your favorite restaurants and get it delivered to your
          doorstep in minutes.
        </p>
        <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-primary-dark transition">
          Order Now
        </button>
      </div>
      <img
        src="/header_img.png"
        alt="Food Delivery"
        className="w-96 rounded-3xl shadow-2xl hidden md:block"
      />
    </section>
  );
}

function FeaturedMenu() {
  return (
    <section className="px-8 py-16 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition"
          >
            <div className="w-32 h-32 bg-gray-200 rounded-full mb-4" />
            <h3 className="text-xl font-semibold mb-2">Food Item {item}</h3>
            <p className="text-gray-600 mb-4">Tasty and healthy. Try it now!</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-8 mt-16">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-lg font-bold">
          FoodieXpress &copy; {new Date().getFullYear()}
        </div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-primary">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary">
            Terms of Service
          </a>
          <a href="#" className="hover:text-primary">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="font-sans min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <FeaturedMenu />
      <Footer />
    </div>
  );
}

export default App;
