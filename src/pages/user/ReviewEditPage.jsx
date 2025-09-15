// src/pages/user/ReviewEditPage.jsx
import React from "react";
import { SubHeader } from "../../components/SubHeader";
import ReviewForm from "../../components/ReviewForm";

export default function ReviewEditPage() {
  const dummyProduct = {
    id: "123456789",
    name: "여름블루 롱 원피스",
    price: 50000,
    image: "https://via.placeholder.com/120x150",
  };

  return (
    <div className="bg-white min-h-screen w-full">
      <SubHeader />
      <ReviewForm mode="edit" product={dummyProduct} />
    </div>
  );
}
