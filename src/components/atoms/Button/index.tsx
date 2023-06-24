import React, { ButtonHTMLAttributes } from "react";
import { DotsLoading } from "../DotsLoading";

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "ghost" | "solid" | "outlined";
}

export const Button = ({
  variant = "solid",
  fullWidth,
  isLoading,
  children,
  icon,
  size = "md",
  ...rest
}: props) => {
  const buttonStyles = {
    ghost: `border border-transparent text-${size} bg-transparent hover:bg-gray-200 dark:bg-opacity-10`,
    solid: `bg-green text-white text-${size} hover:bg-opacity-90`,
    outlined: `border-solid border border-primary text-${size}`,
  };

  return (
    <button
      {...rest}
      className={
        `flex items-center gap-2 justify-center py-2 px-4 rounded focus:outline-none min-w-max ${
          buttonStyles[variant]
        } ${fullWidth && "w-full"} disabled:bg-gray-300 max-h-10` +
        " " +
        rest.className
      }
    >
      {isLoading ? <DotsLoading color="white" /> : children}
    </button>
  );
};
