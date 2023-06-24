import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CaretUpDown, Check, CheckCircle } from "@phosphor-icons/react";

interface Option {
  label: string;
  [key: string]: any;
}

interface Props<T extends Option> {
  label: string;
  options: T[];
  defaultOption?: T;
  onSelect: (value: T) => void;
}

export const Selection = <T extends Option>({
  label,
  options,
  defaultOption,
  onSelect,
}: Props<T>) => {
  const [selected, setSelected] = useState(defaultOption || options[0]);

  useEffect(() => {
    if (defaultOption) {
      setSelected(defaultOption);
    }
  }, [defaultOption]);

  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <label className="flex items-center text-gray-600 dark:text-gray-200 mb-3">
          <p className="mr-2">{label}</p>
        </label>
        <div className="relative">
          <Listbox.Button className="flex items-center w-full rounded p-[0.70rem] ring-2 ring-gray-300 focus:outline-none sm:text-sm mb-4 mt-1 dark:bg-gray-600">
            <span className="truncate">{selected.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <CaretUpDown className="h-5 w-5 text-gray-400" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="dark:bg-gray-200 absolute z-50 -mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    ` relative select-none py-2 pl-3 pr-9 cursor-pointer hover:bg-gray-200 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  onClick={() => onSelect(option)}
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate dark:text-gray-600 ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 right-3 flex items-center text-green">
                          <CheckCircle className="h-5 w-5" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
