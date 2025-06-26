// This component represents a card for each provider in the list.
// It displays the provider's name, description, and image.
// The `onSelect` function is called when the card is clicked, allowing the parent component
// to handle the selection of a provider.
// The card has a hover effect that enhances the shadow for better visual feedback.
// The component uses Tailwind CSS for styling, ensuring a consistent and modern look.
// The image is set to cover the card's width and maintain aspect ratio, ensuring a clean
// and professional appearance.



import React from "react";

const ProviderCard = ({ name, description, image, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer bg-white"
    >
      <img src={image} alt={name} className="h-32 w-full object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default ProviderCard;
