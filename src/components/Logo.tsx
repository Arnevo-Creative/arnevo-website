import React from "react";
// @ts-ignore
import logoImage from "../assets/images/arnevo_logo_1781642781355.jpg";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  inverse?: boolean; // If true, arnevo and creative studio text is white for dark bg
  size?: "sm" | "md" | "lg" | "xl";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  iconOnly = false,
  inverse = false,
  size = "md",
}) => {
  // Size map
  const heightClasses = {
    sm: "h-6 md:h-7",
    md: "h-8 md:h-9",
    lg: "h-11 md:h-12",
    xl: "h-14 md:h-16",
  };

  const selectedHeight = heightClasses[size];

  if (iconOnly) {
    return (
      <div className={`flex items-center select-none ${className}`}>
        {/* Dynamic Handcrafted High-Precision Arnevo Circle Icon */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${size === "lg" ? "h-12 w-12" : "h-9 w-9"} flex-shrink-0 animate-pulse-slow transition-transform duration-500 hover:rotate-180`}
        >
          {/* Outer concentric bold circle in Blaze Orange */}
          <circle cx="50" cy="50" r="43" stroke="#FF6321" strokeWidth="11" />
          
          {/* Artistic inner Art Nouveau wavy continuous curve (S-shaped interlocking flow) */}
          <path
            d="M 28 50 C 28 35, 42 35, 50 50 C 58 65, 72 65, 72 50 C 72 30, 60 22, 50 22 C 34 22, 22 34, 22 50 C 22 66, 34 78, 50 78"
            stroke="#FF6321"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  if (inverse) {
    return (
      <div className={`inline-flex items-center justify-center bg-white px-3.5 py-1.5 rounded-full shadow-sm hover:opacity-95 transition-opacity ${className}`}>
        <img
          src={logoImage}
          alt="Arnevo Creative Studio"
          className={`${selectedHeight} w-auto object-contain mix-blend-multiply`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoImage}
        alt="Arnevo Creative Studio"
        className={`${selectedHeight} w-auto object-contain mix-blend-multiply`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
