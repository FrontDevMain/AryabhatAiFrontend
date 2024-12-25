// utils/toastUtils.ts
import {
  CheckCircleOutline,
  ErrorOutlineOutlined,
  PriorityHighOutlined,
  WarningOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";

const toastStyle = {
  minHeight: 10,
  padding: 10,
};

export const showToast = {
  success: (message: string) =>
    toast.success(message, {
      icon: CheckCircleOutline,
      closeButton: false, // Disable the close button
      style: {
        color: "#1e4620",
        backgroundColor: "#edf7ed",
        ...toastStyle,
      },
    }),
  error: (message: string) =>
    toast.error(message, {
      icon: ErrorOutlineOutlined,
      closeButton: false, // Disable the close button
      style: {
        color: "#5f2120",
        backgroundColor: "#fdeded",
        ...toastStyle,
      },
    }),
  info: (message: string) =>
    toast.info(message, {
      icon: PriorityHighOutlined,
      closeButton: false, // Disable the close button
      style: {
        color: "#014361",
        backgroundColor: "#e5f6fd",
        ...toastStyle,
      },
    }),
  warning: (message: string) =>
    toast.warning(message, {
      icon: WarningOutlined,
      closeButton: false, // Disable the close button
      style: {
        color: "#663c00",
        backgroundColor: "#fff4e5",
        ...toastStyle,
      },
    }),
};
