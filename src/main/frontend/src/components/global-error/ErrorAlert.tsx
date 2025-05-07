import {Alert} from 'react-bootstrap';
import {FC, useEffect, useState} from 'react';
import {useErrorContext} from '@/providers/ErrorContext.tsx';

export const ErrorAlert: FC = () => {
  const {globalError, setGlobalError} = useErrorContext();
  const [error, setError] = useState<strign | null>(null);

  useEffect(() => {
    console.log('====> On set error locally');
    if (globalError) {
      console.log('====> Global Error:', globalError);
      setError(globalError);
      setGlobalError(null);
    }
  }, [globalError]);

  console.log('====> Error:', error);

  if (!error) return null;
  return (
    <Alert variant="danger">
      {error}
    </Alert>
  );
};
