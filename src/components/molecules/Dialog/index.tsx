import { X } from "@phosphor-icons/react";
import {
  Fragment,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";

export interface DialogHandlers {
  handleModal: () => void;
}

interface props {
  onClose?: () => void;
  children: React.ReactNode;
  title?: string;
}

const DialogCenter: React.ForwardRefRenderFunction<DialogHandlers, props> = (
  { children, title, onClose }: props,
  ref
) => {
  const dialogRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleModal = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  useImperativeHandle(ref, () => {
    return {
      handleModal,
    };
  });

  if (!isVisible) {
    return null;
  }

  return (
    <Transition.Root show={isVisible} as={Fragment}>
      <Dialog
        initialFocus={dialogRef}
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={!onClose ? () => handleModal() : () => onClose()}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
          </Transition.Child>

          <div
            className="bg-white rounded-lg p-5 w-11/12 lg:w-2/5 md:w-3/4 sm:w-4/5 z-20 dark:bg-gray-500"
            ref={dialogRef}
          >
            {title ? (
              <Dialog.Title
                as="h3"
                className="text-lg font-medium text-gray-900 mb-4 flex justify-between items-center"
              >
                <span>{title}</span>
                <X
                  className="hover:cursor-pointer"
                  size={18}
                  onClick={!onClose ? () => handleModal() : () => onClose()}
                />
              </Dialog.Title>
            ) : null}

            {children}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default forwardRef(DialogCenter);
