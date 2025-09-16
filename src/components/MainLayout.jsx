import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SharedHeader } from "./SharedHeader";

export const MainLayout = ({ children }) => {
  const [showScrollNav, setShowScrollNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollNav(true);
      } else {
        setShowScrollNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <SharedHeader />
      {showScrollNav && (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-40 flex justify-center items-center h-16">
          <nav className="flex gap-8">
            <button
              onClick={() => navigate("/category/상의")}
              className="[font-family:'SF_Pro-Bold',Helvetica] font-bold text-xs text-black hover:text-[#a40202] transition-colors"
            >
              상의
            </button>
            <button
              onClick={() => navigate("/category/아우터")}
              className="[font-family:'SF_Pro-Bold',Helvetica] font-bold text-xs text-black hover:text-[#a40202] transition-colors"
            >
              아우터
            </button>
          </nav>
        </div>
      )}
      <main>{children}</main>
    </div>
  );
};
