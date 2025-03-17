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
  const parentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isVisible || !tooltipRef.current || !parentRef.current) return;

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const parentRect = parentRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    if (tooltipRect.left < 0) {
      setTooltipPosition("right");
    } else if (tooltipRect.right > viewportWidth) {
      setTooltipPosition("left");
    } else {
      setTooltipPosition("center");
    }
  }, [isVisible]);

  return (
    <div
      ref={parentRef}
      className="relative flex-1 min-w-0 flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(true)}
      role="tooltip"
    >
      <div className="w-full min-w-0 truncate">{children}</div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 max-w-[400px] bg-gray-800 text-white text-xs rounded p-2 shadow-lg text-center break-words whitespace-normal opacity-100 transition-opacity duration-300
            ${position === "top" ? "bottom-full mb-2" : "top-full mt-2"}
            ${
              tooltipPosition === "left"
                ? "left-0"
                : tooltipPosition === "right"
                ? "left-3"
                : "left-1/2 -translate-x-1/2"
            }
          `}
        >
          {text}
        </div>
      )}
    </div>
  );
}
