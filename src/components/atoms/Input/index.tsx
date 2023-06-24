import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactElement;
  appendIcon?: React.ReactElement;
  label?: string;
  error?: string;
}

const Input = ({ icon, appendIcon, label, error, ...rest }: InputProps) => {
  return (
    <div className="mb-2">
      <label className="flex gap-2 items-center text-gray-600 mb-1">
        {icon || null}
        <p>{label}</p>
      </label>
      <div className="flex items-center gap-4">
        <div className="relative w-full">
          <input
            className={`border-2 p-2 rounded border-gray-300 focus:border-primary w-full pr-10 ${
              error ? "border-red" : ""
            }`}
            {...rest}
          />
          {appendIcon && (
            <div className="absolute inset-y-0 right-2 flex items-center pr-2 cursor-pointer">
              {appendIcon}
            </div>
          )}
        </div>
      </div>
      <p className="text-red text-xs mt-2">{error} </p>
    </div>
  );
};

export default Input;
