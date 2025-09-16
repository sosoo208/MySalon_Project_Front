import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Screen from "../screens/Screen/Screen";
import arrowIcon from "../assets/icons/arrow.png";

export default function LandingWithShop() {
  const [isLeaving, setIsLeaving] = useState(false);
  const navigate = useNavigate();

  const handleGoToShop = () => {
    setIsLeaving(true);
    setTimeout(() => navigate("/shop"), 600); // 0.6초 후 페이지 이동
  };

  return (
    <AnimatePresence>
      {!isLeaving && (
        <motion.div
          className="relative h-screen w-full overflow-hidden bg-[#e3e2e2]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }} // ✅ 위로 사라지면서 페이드아웃
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Screen />

          {/* 아래 화살표 버튼 */}
          <button
            onClick={handleGoToShop}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
          >
            <img
              src={arrowIcon}
              alt="아래로"
              className="w-6 h-6 opacity-70 hover:opacity-100 transition"
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
