import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SearchContextProvider } from './components/context/SearchContext';
import { AuthContextProvider } from './components/context/AuthContext';
import { ReviewContextProvider } from './components/context/ReviewContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <ReviewContextProvider>
          <App/>
        </ReviewContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
