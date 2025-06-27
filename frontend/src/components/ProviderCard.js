import React from "react";

const ProviderCard = ({
  id,
  name,
  description,
  image_url,
  category,
  location,
  wallet,
  email,
  phone,
  services = [],
  reviews = [],
  onSelect,
  onViewBookings,
  isProvider = false,
}) => {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const lowestPrice =
    services.length > 0 ? Math.min(...services.map((s) => s.price)) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
      {/* Image */}
      <div className="relative">
        <img src={image_url} alt={name} className="h-48 w-full object-cover" />
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 shadow-sm">
          <span className="text-sm font-semibold text-purple-600">
            From {lowestPrice} ETH
          </span>
        </div>
        <div className="absolute top-3 left-3 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        <p className="text-xs text-gray-500 mb-3 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {location}
        </p>

        {/* Services */}
        {services.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {services.slice(0, 3).map((service) => (
                <span
                  key={service.id}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {service.name}
                </span>
              ))}
              {services.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{services.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(averageRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-900">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">({reviews.length})</span>
          </div>

          {/* Crypto Badge */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-xs text-green-600 font-medium">Crypto</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {!isProvider ? (
            <button
              onClick={() =>
                onSelect({
                  id,
                  name,
                  description,
                  image_url,
                  category,
                  location,
                  wallet,
                  email,
                  phone,
                  services,
                  reviews,
                })
              }
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Book Now
            </button>
          ) : (
            <button
              onClick={() => onViewBookings(id)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Bookings
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
