import {createContext, FC, ReactNode, useContext, useState} from 'react';

const ErrorContext = createContext<{ globalError: string | null, setGlobalError: (msg: string | null) => void } | null>(null);

export const useErrorContext = () => {
  const ctx = useContext(ErrorContext);
  if (!ctx) {
    throw new Error('useErrorContext must be used within an ErrorProvider');
  }
  return ctx;
};

export const ErrorProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [globalError, setGlobalError] = useState<string | null>(null);
  return (
    <ErrorContext.Provider value={{globalError, setGlobalError}}>
      {children}
    </ErrorContext.Provider>
  );
};
