import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddFood({ isLoggedIn }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [pickupFrom, setPickupFrom] = useState("");
  const [pickupTo, setPickupTo] = useState("");

  if (!isLoggedIn) {
    navigate("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 Frontend validation
    if (!title || !quantity || !location || !image) {
      alert("Please fill all fields and upload image");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("quantity", quantity);
    formData.append("location", location);
    formData.append("image", image);
    formData.append("reason", reason);
    formData.append("isAnonymous", isAnonymous);
    formData.append("pickupFrom", pickupFrom);
    formData.append("pickupTo", pickupTo);

    try {
      setLoading(true);

      const res = await fetch(
        "https://freefood-backend-fdj6.onrender.com/api/food/add",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add food");
        return;
      }

      alert("Food added successfully 🍱");
      navigate("/dashboard");
    } catch (error) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Add Food 🍱</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Food Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Quantity (e.g. 2 plates)"
          className="w-full border p-2 rounded"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br></br>
        <label className="text-sm font-semibold text-gray-700">
          Pickup Time Window
        </label>

        <div className="flex gap-3 mb-4">
          <input
            type="time"
            value={pickupFrom}
            onChange={(e) => setPickupFrom(e.target.value)}
            className="w-1/2 border p-2 rounded"
          />

          <input
            type="time"
            value={pickupTo}
            onChange={(e) => setPickupTo(e.target.value)}
            className="w-1/2 border p-2 rounded"
          />
        </div>

        <textarea
          placeholder="Why are you sharing this food? (optional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-green-400"
        />
        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm text-gray-700">
            Share food anonymously
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Uploading..." : "Add Food"}
        </button>
      </form>
    </div>
  );
}
