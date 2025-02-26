import React from "react";
interface ButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "";
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  variant = "",
  isLoading = false,
  disabled = false,
  children,
  onClick,
}) => {
  const variantClasses = {
    primary:
      "bg-primary text-white px-4 py-2 rounded transition-all  hover:bg-indigo-400 hover:text-white hover:border-indigo-400 active:bg-indigo-600 focus:ring-2 focus:ring-indigo-300 focus:outline-none",
    secondary:
      "bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded transition-all",
    danger:
      "bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded transition-all",
    "": "",
  };

  return (
    <button
      className={`flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed 
        ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3v-4z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
