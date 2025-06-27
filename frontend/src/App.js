import React, { useState, useEffect } from "react";
import "./App.css";
import { TempoInit } from "./tempo-init";
import ProviderCard from "./components/ProviderCard";
import BookingForm from "./components/BookingForm";

function App() {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showProviderBookings, setShowProviderBookings] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [userWallet, setUserWallet] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userMode, setUserMode] = useState("customer"); // "customer" or "provider"
  const [showReviews, setShowReviews] = useState(false);
  const [selectedProviderReviews, setSelectedProviderReviews] = useState(null);

  // Mock data - in a real app, this would come from your database
  const providers = [
    {
      id: 1,
      name: "CryptoSalon Elite",
      description:
        "Premium crypto-enabled beauty services with blockchain rewards",
      image_url:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80",
      category: "Hair Salon",
      location: "Downtown, NYC",
      wallet: "0x1234567890123456789012345678901234567890",
      email: "elite@cryptosalon.com",
      phone: "+1-555-0101",
      created_at: new Date().toISOString(),
      services: [
        {
          id: 1,
          provider_id: 1,
          name: "Premium Haircut",
          description: "Professional styling with premium products",
          price: 0.05,
          duration: 60,
          active: true,
        },
        {
          id: 2,
          provider_id: 1,
          name: "Hair Coloring",
          description: "Full color treatment with organic dyes",
          price: 0.12,
          duration: 120,
          active: true,
        },
        {
          id: 3,
          provider_id: 1,
          name: "Hair Treatment",
          description: "Deep conditioning and repair treatment",
          price: 0.08,
          duration: 90,
          active: true,
        },
      ],
      reviews: [
        {
          id: 1,
          booking_id: 1,
          rating: 5,
          comment:
            "Amazing service! Very professional and the results were perfect.",
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          booking_id: 2,
          rating: 5,
          comment: "Best crypto salon in the city. Will definitely come back!",
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          booking_id: 3,
          rating: 4,
          comment: "Great experience, quick service and fair pricing.",
          created_at: new Date().toISOString(),
        },
      ],
    },
    {
      id: 2,
      name: "Digital Cuts Studio",
      description:
        "Modern styling with NFT loyalty program and crypto payments",
      image_url:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80",
      category: "Hair Salon",
      location: "Midtown, NYC",
      wallet: "0x2345678901234567890123456789012345678901",
      email: "info@digitalcuts.com",
      phone: "+1-555-0102",
      created_at: new Date().toISOString(),
      services: [
        {
          id: 4,
          provider_id: 2,
          name: "Modern Cut",
          description: "Trendy cuts with latest techniques",
          price: 0.03,
          duration: 45,
          active: true,
        },
        {
          id: 5,
          provider_id: 2,
          name: "Beard Trim",
          description: "Professional beard styling and trim",
          price: 0.02,
          duration: 30,
          active: true,
        },
      ],
      reviews: [
        {
          id: 4,
          booking_id: 4,
          rating: 5,
          comment: "Love the modern approach and crypto payments!",
          created_at: new Date().toISOString(),
        },
        {
          id: 5,
          booking_id: 5,
          rating: 4,
          comment: "Good service, reasonable prices.",
          created_at: new Date().toISOString(),
        },
      ],
    },
    {
      id: 3,
      name: "Blockchain Beauty Bar",
      description: "Innovative beauty treatments with DeFi rewards system",
      image_url:
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80",
      category: "Beauty Spa",
      location: "Brooklyn, NYC",
      wallet: "0x3456789012345678901234567890123456789012",
      email: "hello@blockchainbeauty.com",
      phone: "+1-555-0103",
      created_at: new Date().toISOString(),
      services: [
        {
          id: 6,
          provider_id: 3,
          name: "Facial Treatment",
          description: "Rejuvenating facial with organic products",
          price: 0.06,
          duration: 75,
          active: true,
        },
        {
          id: 7,
          provider_id: 3,
          name: "Massage Therapy",
          description: "Relaxing full body massage",
          price: 0.08,
          duration: 90,
          active: true,
        },
        {
          id: 8,
          provider_id: 3,
          name: "Manicure",
          description: "Professional nail care and styling",
          price: 0.04,
          duration: 60,
          active: true,
        },
      ],
      reviews: [
        {
          id: 6,
          booking_id: 6,
          rating: 5,
          comment:
            "Incredible spa experience! The DeFi rewards are a nice bonus.",
          created_at: new Date().toISOString(),
        },
        {
          id: 7,
          booking_id: 7,
          rating: 4,
          comment: "Very relaxing and professional service.",
          created_at: new Date().toISOString(),
        },
      ],
    },
  ];

  // Mock availability data
  const availability = [
    {
      id: 1,
      provider_id: 1,
      weekday: 1,
      start_time: "09:00",
      end_time: "17:00",
    }, // Monday
    {
      id: 2,
      provider_id: 1,
      weekday: 2,
      start_time: "09:00",
      end_time: "17:00",
    }, // Tuesday
    {
      id: 3,
      provider_id: 1,
      weekday: 3,
      start_time: "09:00",
      end_time: "17:00",
    }, // Wednesday
    {
      id: 4,
      provider_id: 1,
      weekday: 4,
      start_time: "09:00",
      end_time: "17:00",
    }, // Thursday
    {
      id: 5,
      provider_id: 1,
      weekday: 5,
      start_time: "09:00",
      end_time: "17:00",
    }, // Friday
    {
      id: 6,
      provider_id: 2,
      weekday: 1,
      start_time: "10:00",
      end_time: "18:00",
    },
    {
      id: 7,
      provider_id: 2,
      weekday: 2,
      start_time: "10:00",
      end_time: "18:00",
    },
    {
      id: 8,
      provider_id: 2,
      weekday: 3,
      start_time: "10:00",
      end_time: "18:00",
    },
    {
      id: 9,
      provider_id: 2,
      weekday: 4,
      start_time: "10:00",
      end_time: "18:00",
    },
    {
      id: 10,
      provider_id: 2,
      weekday: 5,
      start_time: "10:00",
      end_time: "18:00",
    },
    {
      id: 11,
      provider_id: 3,
      weekday: 1,
      start_time: "08:00",
      end_time: "16:00",
    },
    {
      id: 12,
      provider_id: 3,
      weekday: 2,
      start_time: "08:00",
      end_time: "16:00",
    },
    {
      id: 13,
      provider_id: 3,
      weekday: 3,
      start_time: "08:00",
      end_time: "16:00",
    },
    {
      id: 14,
      provider_id: 3,
      weekday: 4,
      start_time: "08:00",
      end_time: "16:00",
    },
    {
      id: 15,
      provider_id: 3,
      weekday: 5,
      start_time: "08:00",
      end_time: "16:00",
    },
  ];

  // Mock bookings data
  const [bookings] = useState([
    {
      id: 1,
      user_wallet: "0x9876543210987654321098765432109876543210",
      provider_id: 1,
      service_id: 1,
      start_at: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      status: "confirmed",
      paid: true,
      tx_hash: "0xabcdef1234567890",
      notes: "Please use organic products",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      user_wallet: "0x8765432109876543210987654321098765432109",
      provider_id: 1,
      service_id: 2,
      start_at: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
      status: "pending",
      paid: false,
      tx_hash: null,
      notes: "",
      created_at: new Date().toISOString(),
    },
  ]);

  const categories = [...new Set(providers.map((p) => p.category))];

  // Filter providers based on search and category
  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.services.some(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      !selectedCategory || provider.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setShowBooking(true);
    setShowProviderBookings(false);
    setShowReviews(false);
  };

  const handleViewBookings = (providerId) => {
    setSelectedProviderId(providerId);
    setShowProviderBookings(true);
    setShowBooking(false);
    setShowReviews(false);
  };

  const handleViewReviews = (provider) => {
    setSelectedProviderReviews(provider);
    setShowReviews(true);
    setShowBooking(false);
    setShowProviderBookings(false);
  };

  const handleBackToProviders = () => {
    setShowBooking(false);
    setShowProviderBookings(false);
    setShowReviews(false);
    setSelectedProvider(null);
    setSelectedProviderId(null);
    setSelectedProviderReviews(null);
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserWallet(accounts[0]);
      } else {
        alert("Please install MetaMask or another Web3 wallet");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet");
    }
  };

  const getProviderBookings = (providerId) => {
    return bookings
      .filter((booking) => booking.provider_id === providerId)
      .map((booking) => {
        const provider = providers.find((p) => p.id === booking.provider_id);
        const service = provider?.services.find(
          (s) => s.id === booking.service_id,
        );
        return { ...booking, provider, service };
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TempoInit />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">CryptoBooksy</h1>
              <span className="ml-2 text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                Web3
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setUserMode(
                      userMode === "customer" ? "provider" : "customer",
                    )
                  }
                  className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200"
                >
                  {userMode === "customer"
                    ? "Switch to Provider"
                    : "Switch to Customer"}
                </button>
              </div>
              {!userWallet ? (
                <button
                  onClick={connectWallet}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="text-sm text-gray-600">
                  {userWallet.slice(0, 6)}...{userWallet.slice(-4)}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showBooking && !showProviderBookings && !showReviews ? (
          <div>
            {/* Search and Filter Bar */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search for services, salons, or treatments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {searchTerm && (
                <p className="text-sm text-gray-600 mb-4">
                  Found {filteredProviders.length} provider(s) matching &quot;
                  {searchTerm}&quot;
                </p>
              )}
            </div>

            {/* Providers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <div key={provider.id} className="relative">
                  <ProviderCard
                    {...provider}
                    onSelect={handleProviderSelect}
                    onViewBookings={handleViewBookings}
                    isProvider={userMode === "provider"}
                  />
                  {userMode === "customer" && (
                    <button
                      onClick={() => handleViewReviews(provider)}
                      className="absolute top-2 left-2 bg-white bg-opacity-90 text-purple-600 px-2 py-1 rounded text-xs font-medium hover:bg-opacity-100"
                    >
                      Reviews ({provider.reviews.length})
                    </button>
                  )}
                </div>
              ))}
            </div>

            {filteredProviders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No providers found matching your search criteria.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Back Button */}
            <button
              onClick={handleBackToProviders}
              className="mb-6 flex items-center text-purple-600 hover:text-purple-800"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to providers
            </button>

            {/* Booking Form */}
            {showBooking && (
              <div className="max-w-2xl mx-auto">
                <BookingForm
                  provider={selectedProvider}
                  availability={availability.filter(
                    (a) => a.provider_id === selectedProvider?.id,
                  )}
                  userWallet={userWallet}
                />
              </div>
            )}

            {/* Provider Bookings */}
            {showProviderBookings && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Your Bookings
                </h2>
                <div className="space-y-4">
                  {getProviderBookings(selectedProviderId).map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white rounded-lg shadow-sm border p-6"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.service?.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Customer: {booking.user_wallet.slice(0, 6)}...
                            {booking.user_wallet.slice(-4)}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            Date:{" "}
                            {new Date(booking.start_at).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            Time:{" "}
                            {new Date(booking.start_at).toLocaleTimeString()}
                          </p>
                          {booking.notes && (
                            <p className="text-sm text-gray-600 mb-2">
                              Notes: {booking.notes}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </span>
                          <p className="text-sm font-semibold text-purple-600 mt-2">
                            {booking.service?.price} ETH
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              booking.paid ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {booking.paid ? "Paid" : "Unpaid"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {getProviderBookings(selectedProviderId).length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No bookings found.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reviews */}
            {showReviews && selectedProviderReviews && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Reviews for {selectedProviderReviews.name}
                </h2>
                <div className="space-y-4">
                  {selectedProviderReviews.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white rounded-lg shadow-sm border p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
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
                            <span className="ml-2 text-sm font-medium text-gray-900">
                              {review.rating}/5
                            </span>
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {selectedProviderReviews.reviews.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No reviews yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
