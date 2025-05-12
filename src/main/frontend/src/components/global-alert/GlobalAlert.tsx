import {Alert} from 'react-bootstrap';
import {FC, useEffect} from 'react';

interface GlobalAlertProps {
  message: string | null;
  variant?: string;
  onClose: () => void;
  duration?: number;
}

export const GlobalAlert: FC<GlobalAlertProps> = ({message, variant = 'danger', onClose, duration = 5000}) => {

  useEffect(() => {
    if (message && duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <Alert
      variant={variant}
      onClose={onClose}
      dismissible
      style={{
        left: '50%',
        minWidth: '30rem',
        position: 'fixed',
        top: '1rem',
        transform: 'translateX(-50%)',
        zIndex: '9999'
      }}>
      {message}
    </Alert>
  );
};
