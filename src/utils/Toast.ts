import {
  CheckCircleOutline,
  CloseOutlined,
  ErrorOutlineOutlined,
  PriorityHighOutlined,
  WarningOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";

const activeToasts = new Set<string>(); // Track active toast IDs

const toastStyle: React.CSSProperties = {
  minHeight: 10,
  padding: 10,
  marginBottom: 5,
  paddingRight: 30,
  width: "fit-content",
  textAlign: "center",
};

export const showToast = {
  success: (message: string) => showUniqueToast("success", message),
  error: (message: string) => showUniqueToast("error", message),
  info: (message: string) => showUniqueToast("info", message),
  warning: (message: string) => showUniqueToast("warning", message),
};

const showUniqueToast = (
  type: "success" | "error" | "info" | "warning",
  message: string
) => {
  const toastId = `${type}-${message}`; // Unique toast ID based on type and message

  if (!activeToasts.has(toastId)) {
    activeToasts.add(toastId); // Add toastId to the active set

    const toastOptions = {
      icon: getIcon(type),
      closeButton: false,
      style: getToastStyle(type),
      onClose: () => activeToasts.delete(toastId), // Remove toastId when the toast closes
    };

    switch (type) {
      case "success":
        toast.success(message, toastOptions);
        break;
      case "error":
        toast.error(message, toastOptions);
        break;
      case "info":
        toast.info(message, toastOptions);
        break;
      case "warning":
        toast.warning(message, toastOptions);
        break;
    }
  }
};

const getIcon = (type: string) => {
  switch (type) {
    case "success":
      return CheckCircleOutline;
    case "error":
      return ErrorOutlineOutlined;
    case "info":
      return PriorityHighOutlined;
    case "warning":
      return WarningOutlined;
    default:
      return undefined;
  }
};

const getToastStyle = (type: string) => {
  switch (type) {
    case "success":
      return { color: "#1e4620", backgroundColor: "#edf7ed", ...toastStyle };
    case "error":
      return { color: "#5f2120", backgroundColor: "#fdeded", ...toastStyle };
    case "info":
      return { color: "#014361", backgroundColor: "#e5f6fd", ...toastStyle };
    case "warning":
      return { color: "#663c00", backgroundColor: "#fff4e5", ...toastStyle };
    default:
      return toastStyle;
  }
};
