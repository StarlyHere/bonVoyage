import React from "react";
import { Link } from "react-router-dom"; // Ensure correct import

export default function Hotel({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>
      <div className="grid gap-4 mt-3">
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 flex flex-col md:flex-row gap-4 transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src="/placeholder.jpg"
                alt={hotel.name || "Hotel image"}
                className="rounded-lg w-full md:w-48 h-40 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{hotel.HotelName}</h3>
              <p className="text-gray-600">📍 {hotel.HotelAddress}</p>
              <p className="mt-2">{hotel.description}</p>
              <p className="font-bold mt-2 text-base">💸 {hotel.Price}</p>
              <p className="font-bold mt-2 text-gray-700 text-sm">
                ⭐ {hotel.rating}
              </p>
              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  hotel.HotelName + ", " + hotel.HotelAddress
                )}`}
                target="_blank"
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                🗺️ View on Map
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
