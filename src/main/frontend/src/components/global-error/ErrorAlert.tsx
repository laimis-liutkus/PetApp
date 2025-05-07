import {Alert} from 'react-bootstrap';
import {FC, useEffect, useState} from 'react';
import {useErrorContext} from '@/providers/ErrorContext.tsx';

export const ErrorAlert: FC = () => {
  const {globalError, setGlobalError} = useErrorContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (globalError) {
      setError(globalError);
      setGlobalError(null);
    }
  }, [globalError]);

  if (!error) return null;
  return (
    <Alert variant="danger">
      {error}
    </Alert>
  );
};
