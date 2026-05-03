import { useEffect, useState } from "react";

export default function MyClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const cancelClaim = async (claimId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`https://freefood-backend-fdj6.onrender.com/api/food/cancel-claim/${claimId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Cancel failed");
        return;
      }

      alert("Claim cancelled ✅");

      // reload claims
      setClaims((prev) => prev.filter((c) => c._id !== claimId));
    } catch {
      alert("Server error");
    }
  };

  useEffect(() => {
    const fetchMyClaims = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("https://freefood-backend-fdj6.onrender.com/api/food/my-claims", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setClaims(Array.isArray(data) ? data : []);
      } catch (error) {
        alert("Failed to load claim history");
      } finally {
        setLoading(false);
      }
    };

    fetchMyClaims();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-green-700">
        My Claimed Foods 🍽️
      </h2>

      {claims.length === 0 && <p>No claimed food yet.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {claims.map((claim) => (
          <div key={claim._id} className="bg-white rounded-lg shadow">
            <img
              src={claim.food.image}
              alt={claim.food.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold">{claim.food.title}</h3>
              <p className="text-sm">Qty: {claim.food.quantity}</p>
              <p className="text-sm">Location: {claim.food.location}</p>
              {claim.status === "picked" && (
                <p className="text-sm text-green-600 font-semibold">
                  ✅ Picked Up
                </p>
              )}

              <span className="inline-block mt-3 px-3 py-1 text-sm bg-green-100 text-green-700 rounded">
                ✔ Claimed
              </span>
              {claim.status === "active" && (
                <button
                  onClick={() => cancelClaim(claim._id)}
                  className="mt-2 w-full bg-red-500 text-white py-2 rounded"
                >
                  Cancel Claim
                </button>
              )}

              {claim.status === "picked" && (
                <p className="mt-2 text-green-600 font-semibold">
                  ✔ Pickup confirmed by donor
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
