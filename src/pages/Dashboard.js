import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ currentUser, isLoggedIn }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFoods = async () => {
    try {
      const res = await fetch(
        "https://freefood-backend-fdj6.onrender.com/api/food/all",
      );
      const data = await res.json();
      setFoods(Array.isArray(data) ? data : []);
    } catch (e) {
      alert("Failed to load foods");
    } finally {
      setLoading(false);
    }
  };
  const formatTime12Hour = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");
    let h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12 || 12; // 0 → 12
    return `${h}:${minute} ${ampm}`;
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleClaim = async (foodId) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/food/claim/${foodId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Unable to claim");
        return;
      }
      alert("Food claimed successfully");
      fetchFoods();
    } catch {
      alert("Server error");
    }
  };
  // User-location-first sorting
  const sortedFoods = currentUser
    ? [
        ...foods.filter((f) => f.location === currentUser.location),
        ...foods.filter((f) => f.location !== currentUser.location),
      ]
    : foods;

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-green-600"></div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-green-700">
        Available Food 🍱
      </h2>
      {sortedFoods.length === 0 && <p>No food available.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedFoods.map((food) => (
          <div
            key={food._id}
            className="bg-white rounded-lg shadow hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
          >
            <img
              loading="lazy"
              src={food.image}
              alt={food.title}
              className="w-full aspect-square object-cover rounded-t-lg"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold">{food.title}</h3>
              <span
                className={`inline-block mb-2 px-3 py-1 text-xs rounded-full ${
                  food.isClaimed
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {food.isClaimed ? "Claimed" : "Available"}
              </span>

              <p className="text-sm text-gray-600">Qty: {food.quantity}</p>
              <p className="text-sm text-gray-600">Location: {food.location}</p>
              {food.claimedBy && (
                <p className="text-sm text-orange-600 font-semibold">
                  Claimed by: {food.claimedBy.name}
                </p>
              )}

              <p className="text-sm text-gray-500 mt-1">
                👤 Shared by:{" "}
                {food.isAnonymous
                  ? "Anonymous Donor"
                  : food.createdBy?.name || "Community Member"}
              </p>

              {food.reason && (
                <p className="mt-2 text-sm text-gray-600 italic">
                  📝 {food.reason}
                </p>
              )}
              {food.pickupFrom && food.pickupTo && (
                <p className="text-sm text-gray-600 mt-1">
                  🕒 Pickup Time: {formatTime12Hour(food.pickupFrom)} –{" "}
                  {formatTime12Hour(food.pickupTo)}
                </p>
              )}
              {currentUser?.role === "receiver" &&
                (food.isClaimed ? (
                  <button
                    disabled
                    className="mt-3 w-full bg-gray-400 text-white py-2 rounded"
                  >
                    Claimed
                  </button>
                ) : (
                  <button
                    onClick={() => handleClaim(food._id)}
                    className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  >
                    Claim Food
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
