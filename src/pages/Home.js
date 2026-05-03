import React from "react";

export default function Home({ isLoggedIn, currentUser }) {
  const feedbacks = [
    { name: "Ankush", feedback: "Amazing platform! Shared my extra food easily." },
    { name: "Amit", feedback: "Helped reduce wastage in my neighborhood." },
    { name: "Chirag", feedback: "User-friendly and very impactful!" },
    { name: "Aman", feedback: "Found fresh food nearby, highly recommend it!" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-300 flex flex-col items-center p-4">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center max-w-6xl w-full bg-white p-8 rounded-3xl shadow-lg mt-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-green-800 mb-4">
            FreeFood 🍲
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Share your extra food, help your community, and fight hunger together.
          </p>

          {/* Dynamic Login / Signup or User Greeting */}
          <div className="flex justify-center md:justify-start gap-4">
            {isLoggedIn && currentUser ? (
              <h2 className="text-xl font-semibold text-green-700">
                Hello, {currentUser.name}! 🎉
              </h2>
            ) : (
              <>
                <a
                  href="/signup"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Signup
                </a>
                <a
                  href="/login"
                  className="bg-white border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-100 transition"
                >
                  Login
                </a>
              </>
            )}
          </div>
        </div>
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
            alt="Community food sharing"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Impact Stats Section */}
      <div className="mt-12 max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-green-700 mb-2">+500</h2>
          <p className="text-gray-600">Meals Shared</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-green-700 mb-2">+300</h2>
          <p className="text-gray-600">Happy Users</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-green-700 mb-2">+50</h2>
          <p className="text-gray-600">Communities Helped</p>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="mt-12 max-w-6xl w-full text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-2">1. Share Food</h3>
            <p className="text-gray-600">
              Upload your extra food with details and image.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-2">2. Claim Food</h3>
            <p className="text-gray-600">
              Find available food nearby and claim it safely.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-2">3. Reduce Waste</h3>
            <p className="text-gray-600">
              Reduce food wastage and help those in need.
            </p>
          </div>
        </div>
      </div>

      {/* Positive Feedback Section */}
      <div className="mt-16 max-w-6xl w-full text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {feedbacks.map((fb, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-gray-700 mb-4">"{fb.feedback}"</p>
              <p className="font-semibold text-green-600 text-right">- {fb.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
