import { toast } from 'react-toast-notification';

export const successToast = (message) => {
  if (message) {
    toast(message, {
      status: 'Successful',
      type: 'success',
      autoHide: true,
      delay: '5000',
    });
  }
};

export const errorToast = (message) => {
  if (message) {
    toast(message, {
      status: 'Error',
      type: 'error',
      autoHide: true,
      delay: '5000',
    });
  }
};
