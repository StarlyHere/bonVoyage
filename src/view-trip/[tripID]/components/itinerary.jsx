import React, { useEffect } from 'react';
import { Calendar, MapPin, Clock, Compass } from 'lucide-react';

export default function Itinerary({ trip }) {
  useEffect(() => {
    console.log("Itinerary Data:", trip?.tripData?.itinerary);
    console.log("Entries:", Object.entries(trip?.tripData?.itinerary || {}));
  }, [trip]);

  return (
    <div className='mt-[60px]'>
      <div >
        <h2 className="font-bold text-2xl text-indigo-700 flex items-center">
          <Compass className="mr-2 mt-30" size={24} />
          Exploration Guide
        </h2>
        <p className="text-gray-600 mt-1 italic">Your day-by-day adventure awaits</p>
      </div>

      <div className="space-y-8">
        {trip?.tripData?.itinerary ? (
          Object.entries(trip.tripData.itinerary).map(([day, details]) => (
            <div key={day} className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-gray-50 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-indigo-600 text-white p-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <Calendar className="mr-2" size={20} />
                  {day}
                </h3>
              </div>
              
              <div className="p-5">
                <div className="mb-4 bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-gray-700">
                    <span className="font-medium text-indigo-600">Theme:</span> {details?.theme || 'N/A'}
                  </p>
                  <p className="text-gray-700 flex items-center mt-2">
                    <Clock className="mr-2 text-amber-500" size={18} />
                    <span className="font-medium text-indigo-600">Best Time to Visit:</span> 
                    <span className="ml-2">{details?.best_time_to_visit || 'N/A'}</span>
                  </p>
                </div>

                {details?.places?.length > 0 ? (
                  <div className="space-y-4">
                    {details.places.map((place, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h4 className="font-semibold text-lg text-indigo-700 flex items-center">
                          <MapPin className="mr-2 text-red-500" size={18} />
                          {place.placeName}
                        </h4>
                        <p className="text-gray-600 mt-2 ml-6">{place.placeDetails}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center text-gray-500 italic">
                    No places listed for this day.
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-10 bg-gray-50 rounded-lg border border-gray-200">
            <Compass className="mx-auto text-gray-400" size={40} />
            <p className="mt-4 text-gray-500">No itinerary available</p>
          </div>
        )}
      </div>
    </div>
  );
}