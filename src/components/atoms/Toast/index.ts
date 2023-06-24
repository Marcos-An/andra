import { toast } from "react-toastify";

export const ErrorNotification = (message: string, time?: 2000) => {
  toast.error(message, {
    position: "bottom-left",
    autoClose: time,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored",
  });
};

export const WarnNotification = (message: string, time?: 2000) => {
  toast.warn(message, {
    position: "bottom-left",
    autoClose: time,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored",
  });
};

export const SuccessNotification = (message: string, time?: 2000) => {
  toast.success(message, {
    position: "bottom-left",
    autoClose: time,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored",
  });
};

export const InfoNotification = (message: string, time?: 2000) => {
  toast.info(message, {
    position: "bottom-left",
    autoClose: time,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored",
  });
};
