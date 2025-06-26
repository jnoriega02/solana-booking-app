import React, { useState } from "react";

const BookingForm = ({ provider }) => {
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
  });

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
    alert(`Booking with ${provider.name} confirmed!`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold">Book with {provider.name}</h2>

      <select
        name="service"
        onChange={handleChange}
        value={form.service}
        required
        className="w-full p-2 border"
      >
        <option value="">Select Service</option>
        <option value="cut">Haircut</option>
        <option value="style">Styling</option>
        <option value="combo">Cut + Style</option>
      </select>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        className="w-full p-2 border"
      />

      <input
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
        required
        className="w-full p-2 border"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Confirm Booking
      </button>
    </form>
  );
};

export default BookingForm;
