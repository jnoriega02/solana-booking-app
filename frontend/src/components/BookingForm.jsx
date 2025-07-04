import React, { useState } from "react";

const BookingForm = ({ provider }) => {
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    paymentMethod: "eth",
  });

  const [step, setStep] = useState(1);

  const services = [
    { id: "cut", name: "Haircut", price: "0.02 ETH", duration: "30 min" },
    {
      id: "style",
      name: "Hair Styling",
      price: "0.025 ETH",
      duration: "45 min",
    },
    { id: "combo", name: "Cut + Style", price: "0.04 ETH", duration: "75 min" },
    {
      id: "color",
      name: "Hair Coloring",
      price: "0.08 ETH",
      duration: "120 min",
    },
    {
      id: "treatment",
      name: "Hair Treatment",
      price: "0.06 ETH",
      duration: "60 min",
    },
  ];

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Submitted:", {
      providerId: provider.id,
      providerName: provider.name,
      ...form,
    });
    alert(
      `Booking with ${provider.name} confirmed! Payment will be processed via ${form.paymentMethod.toUpperCase()}.`,
    );
  };

  const selectedService = services.find((s) => s.id === form.service);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
        <div className="flex items-center space-x-4">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-white">{provider.name}</h2>
            <p className="text-purple-100 text-sm">{provider.description}</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center space-x-2 ${step >= 1 ? "text-purple-600" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-purple-600 text-white" : "bg-gray-200"}`}
            >
              1
            </div>
            <span className="font-medium">Service</span>
          </div>
          <div className="flex-1 h-px bg-gray-200"></div>
          <div
            className={`flex items-center space-x-2 ${step >= 2 ? "text-purple-600" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-purple-600 text-white" : "bg-gray-200"}`}
            >
              2
            </div>
            <span className="font-medium">Date & Time</span>
          </div>
          <div className="flex-1 h-px bg-gray-200"></div>
          <div
            className={`flex items-center space-x-2 ${step >= 3 ? "text-purple-600" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-purple-600 text-white" : "bg-gray-200"}`}
            >
              3
            </div>
            <span className="font-medium">Payment</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Select a Service</h3>
            <div className="grid gap-3">
              {services.map((service) => (
                <label
                  key={service.id}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                    form.service === service.id
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="service"
                      value={service.id}
                      checked={form.service === service.id}
                      onChange={handleChange}
                      className="text-purple-600"
                    />
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-gray-500">
                        {service.duration}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-purple-600">
                      {service.price}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={() => form.service && setStep(2)}
              disabled={!form.service}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
            >
              Continue to Date & Time
            </button>
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Select Date & Time</h3>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-purple-600 hover:text-purple-800"
              >
                Back
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Times
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <label
                    key={time}
                    className={`flex items-center justify-center p-2 border rounded-lg cursor-pointer transition-all ${
                      form.time === time
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="time"
                      value={time}
                      checked={form.time === time}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{time}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => form.date && form.time && setStep(3)}
              disabled={!form.date || !form.time}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {/* Step 3: Payment Method */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Payment Method</h3>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-purple-600 hover:text-purple-800"
              >
                Back
              </button>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-2">Booking Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span>{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{form.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>{form.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{selectedService?.duration}</span>
                </div>
                <div className="border-t pt-1 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-purple-600">
                      {selectedService?.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-3">
              <label
                className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer ${
                  form.paymentMethod === "eth"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="eth"
                  checked={form.paymentMethod === "eth"}
                  onChange={handleChange}
                  className="text-purple-600"
                />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">ETH</span>
                  </div>
                  <span className="font-medium">Ethereum</span>
                </div>
              </label>

              <label
                className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer ${
                  form.paymentMethod === "btc"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="btc"
                  checked={form.paymentMethod === "btc"}
                  onChange={handleChange}
                  className="text-purple-600"
                />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">₿</span>
                  </div>
                  <span className="font-medium">Bitcoin</span>
                </div>
              </label>

              <label
                className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer ${
                  form.paymentMethod === "usdc"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="usdc"
                  checked={form.paymentMethod === "usdc"}
                  onChange={handleChange}
                  className="text-purple-600"
                />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                  <span className="font-medium">USDC</span>
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 font-medium"
            >
              Confirm Booking & Pay {selectedService?.price}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
