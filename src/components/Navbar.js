import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function Navbar({ isLoggedIn, handleLogout, currentUser }) {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef();
  const bellRef = useRef();

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://freefood-backend-fdj6.onrender.com/api/notifications/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
        setNotifications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Notification error:", error);
      }
    };

    if (isLoggedIn) fetchNotifications();
  }, [isLoggedIn]);

  // ✅ Outside click close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !bellRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `https://freefood-backend-fdj6.onrender.com/api/notifications/read/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setNotifications((prev) => prev.filter((n) => n._id !== id));
      setShowDropdown(false);
    } catch (error) {
      console.log("Read error:", error);
    }
  };

  return (
    <nav className="bg-green-600 px-4 md:px-6 py-4 relative">
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="FreeFood Logo" className="h-10 md:h-12" />
          <span className="text-white text-lg md:text-xl font-bold hidden sm:block">
            FreeFood
          </span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* 🔔 Mobile Notification (OUTSIDE) */}
          {isLoggedIn && (
            <div
              ref={bellRef}
              className="relative cursor-pointer text-xl text-white md:hidden"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
            >
              🔔
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                  {notifications.length}
                </span>
              )}
            </div>
          )}

          {/* HAMBURGER */}
          <button
            className="text-white text-2xl md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-4 items-center text-white relative">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>

            {isLoggedIn && (
              <>
                {currentUser?.role === "donor" && (
                  <Link to="/addfood">Add Food</Link>
                )}
                {currentUser?.role === "receiver" && (
                  <Link to="/my-claims">My Claims</Link>
                )}
                {currentUser?.role === "donor" && (
                  <Link to="/my-products">My Products</Link>
                )}
              </>
            )}

            {/* 🔔 Desktop Notification (INSIDE MENU) */}
            {isLoggedIn && (
              <div
                ref={bellRef}
                className="relative cursor-pointer text-xl hidden md:block"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}
              >
                🔔
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </div>
            )}

            {isLoggedIn ? (
              <>
                <span className="text-sm font-semibold">
                  Hi, {currentUser?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-green-600 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="flex flex-col gap-3 mt-4 text-white md:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>

          {isLoggedIn && currentUser?.role === "donor" && (
            <Link to="/addfood">Add Food</Link>
          )}
          {isLoggedIn && currentUser?.role === "receiver" && (
            <Link to="/my-claims">My Claims</Link>
          )}
          {isLoggedIn && currentUser?.role === "donor" && (
            <Link to="/my-products">My Products</Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-white text-green-600 px-3 py-1 rounded w-fit"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      )}

      {/* 🔔 Notification Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-2 md:right-6 top-16 w-[90%] md:w-80 bg-white text-black rounded-lg shadow-lg p-3 z-50"
        >
          <h3 className="font-bold mb-2 text-green-600">Notifications 🔔</h3>

          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">No notifications</p>
          ) : (
            <div className="max-h-60 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => handleNotificationClick(n._id)}
                  className="border-b py-2 cursor-pointer hover:bg-gray-100 rounded p-2"
                >
                  <p className="font-semibold text-sm">{n.title}</p>
                  <p className="text-xs text-gray-600">{n.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
