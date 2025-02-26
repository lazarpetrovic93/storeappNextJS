import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom";
}

export default function Tooltip({
  text,
  children,
  position = "top",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<
    "left" | "right" | "center"
  >("center");
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      if (rect.left < 0) {
        setTooltipPosition("right");
      } else if (rect.right > window.innerWidth) {
        setTooltipPosition("left");
      } else {
        setTooltipPosition("center");
      }
    }
  }, [isVisible]);

  const handleOnClick = () => {
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);
  };

  return (
    <div
      className="relative flex-1 min-w-0 flex items-center group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={handleOnClick}
    >
      <div className="w-full min-w-0 truncate">{children}</div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute ${
            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
          } max-w-[400px] bg-gray-800 text-white text-xs rounded p-2 min-h-[30px] shadow-lg text-center break-words whitespace-normal opacity-100 transition-opacity duration-300
          ${
            tooltipPosition === "left"
              ? "left-0"
              : tooltipPosition === "right"
              ? "right-0"
              : "left-1/2 -translate-x-1/2"
          }`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
