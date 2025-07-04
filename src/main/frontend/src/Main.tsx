import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {App} from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ErrorProvider} from '@/providers/ErrorContext.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <App/>
      </ErrorProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
