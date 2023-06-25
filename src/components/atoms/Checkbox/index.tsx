import { Check, Minus } from "@phosphor-icons/react";
import { InputHTMLAttributes } from "react";

interface props extends InputHTMLAttributes<HTMLInputElement> {
  showClearIcon?: boolean;
  isChecked: boolean;
}

export const Checkbox = ({ showClearIcon, isChecked, ...res }: props) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={isChecked} className="hidden" {...res} />
      <div
        className={`h-5 w-5 dark:bg-gray-200  bg-white border border-gray-300 flex items-center justify-center rounded transition duration-150 ease-in-out ${
          (isChecked || isChecked) && "!bg-green border-none"
        }`}
      >
        {isChecked || isChecked ? (
          !showClearIcon ? (
            <Check weight="bold" />
          ) : (
            <Minus weight="bold" size={11} />
          )
        ) : null}
      </div>
    </label>
  );
};
