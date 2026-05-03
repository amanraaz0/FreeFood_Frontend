import { useEffect, useState } from "react";

export default function MyProducts() {

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ✅ FETCH MY PRODUCTS */
  const fetchMyProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/food/my-products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFoods(Array.isArray(data) ? data : []);

    } catch {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ CONFIRM PICKUP */
  const confirmPickup = async (claimId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/food/confirm-pickup/${claimId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Confirmation failed");
        return;
      }

      alert("Pickup confirmed ✅");

      // 🔥 REFRESH LIST
      fetchMyProducts();

    } catch {
      alert("Server error");
    }
  };

  /* ✅ LOAD ON PAGE OPEN */
  useEffect(() => {
    fetchMyProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-green-700">
        My Shared Foods 🍱
      </h2>

      {foods.length === 0 && <p>You haven't shared food yet.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food._id} className="bg-white rounded-lg shadow">

            <img
              src={`http://localhost:5000/uploads/${food.image}`}
              alt={food.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold">{food.title}</h3>
              <p className="text-sm">Qty: {food.quantity}</p>
              <p className="text-sm">Location: {food.location}</p>

              {food.claimedBy && (
                <p className="text-sm text-orange-600 font-semibold">
                  Claimed by: {food.claimedBy.name}
                </p>
              )}

              {food.claimStatus === "active" && (
                <button
                  onClick={() => confirmPickup(food.claimId)}
                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Confirm Pickup
                </button>
              )}

              {food.claimStatus === "picked" && (
                <p className="mt-2 text-green-600 font-semibold">
                  ✅ Pickup Completed
                </p>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
