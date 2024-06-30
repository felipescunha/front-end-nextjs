import { ToastContent, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastMessageProps {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  theme?: 'light' | 'dark' | 'colored';
  type?: 'success' | 'error';
}

export const ToastMessage: (message: ToastContent, options?: ToastMessageProps) => void = (
  message,
  {
    position = 'top-right',
    autoClose = 2000,
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = true,
    theme = 'light',
    type = 'error',
  } = {},
) => {
  toast(message, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress: undefined,
    theme,
    type,
  });
};
