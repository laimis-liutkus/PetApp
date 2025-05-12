import {FC} from 'react';
import {GlobalAlert} from '@/components/global-alert/GlobalAlert.tsx';

interface GlobalErrorAlertProps {
  message: string | null;
  onClose: () => void;
}

export const GlobalErrorAlert: FC<GlobalErrorAlertProps> = ({message, onClose}) => {
  return (
    <GlobalAlert message={message} onClose={onClose} duration={0}/>
  );
};