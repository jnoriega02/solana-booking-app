import React, { useState } from "react";
import "./App.css";
import { TempoInit } from "./tempo-init";
import ProviderCard from "./components/ProviderCard";
import BookingForm from "./components/BookingForm";

function App() {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const providers = [
    {
      id: 1,
      name: "CryptoSalon Elite",
      description:
        "Premium crypto-enabled beauty services with blockchain rewards",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80",
      rating: 4.9,
      reviews: 127,
      price: "0.05 ETH",
    },
    {
      id: 2,
      name: "Digital Cuts Studio",
      description:
        "Modern styling with NFT loyalty program and crypto payments",
      image:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80",
      rating: 4.8,
      reviews: 89,
      price: "0.03 ETH",
    },
    {
      id: 3,
      name: "Blockchain Beauty Bar",
      description: "Innovative beauty treatments with DeFi rewards system",
      image:
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80",
      rating: 4.7,
      reviews: 156,
      price: "0.04 ETH",
    },
  ];

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setShowBooking(true);
  };

  const handleBackToProviders = () => {
    setShowBooking(false);
    setSelectedProvider(null);
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
              <button className="text-gray-600 hover:text-gray-900">
                Sign In
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showBooking ? (
          <div>
            {/* Search and Filter Bar */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search for services, salons, or treatments..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
                  Search
                </button>
              </div>
            </div>

            {/* Providers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  {...provider}
                  onSelect={() => handleProviderSelect(provider)}
                />
              ))}
            </div>
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
            <div className="max-w-2xl mx-auto">
              <BookingForm provider={selectedProvider} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
