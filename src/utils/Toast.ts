// utils/toastUtils.ts
import {
  CheckCircleOutline,
  CloseOutlined,
  ErrorOutlineOutlined,
  PriorityHighOutlined,
  WarningOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";

const toastStyle: React.CSSProperties = {
  minHeight: 10,
  padding: 10,
  marginBottom: 5,
  paddingRight: 30,
  width: "fit-content",
  textAlign: "center",
};

export const showToast = {
  success: (message: string) =>
    toast.success(message, {
      icon: CheckCircleOutline,
      closeButton: false,
      style: {
        color: "#1e4620",
        backgroundColor: "#edf7ed",
        ...toastStyle,
      },
    }),
  error: (message: string) =>
    toast.error(message, {
      icon: ErrorOutlineOutlined,
      closeButton: false,
      style: {
        color: "#5f2120",
        backgroundColor: "#fdeded",
        ...toastStyle,
      },
    }),
  info: (message: string) =>
    toast.info(message, {
      icon: PriorityHighOutlined,
      closeButton: false,
      style: {
        color: "#014361",
        backgroundColor: "#e5f6fd",
        ...toastStyle,
      },
    }),
  warning: (message: string) =>
    toast.warning(message, {
      icon: WarningOutlined,
      closeButton: false,
      style: {
        color: "#663c00",
        backgroundColor: "#fff4e5",
        ...toastStyle,
      },
    }),
};
