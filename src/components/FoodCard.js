import React from "react";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ food, user }) => {
  const navigate = useNavigate();

  const handleClaim = () => {
    if (!user) {
      alert("Please login/signup first to claim food!");
      navigate("/login");
      return;
    }
    alert(`You have successfully claimed ${food.title}!`);
    // Backend integration to mark as claimed can be done here
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <img
        src={food.image}
        alt={food.title}
        className="w-full h-48 object-cover rounded mb-2"
      />
      <h2 className="text-xl font-bold">{food.title}</h2>
      <p>Quantity: {food.quantity}</p>
      <p>Location: {food.location}</p>
      <button
        onClick={handleClaim}
        className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Claim
      </button>
    </div>
  );
};

export default FoodCard;
