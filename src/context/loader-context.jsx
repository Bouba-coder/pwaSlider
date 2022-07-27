import React, { useCallback, useContext, useState } from 'react';

const LoaderContext = React.createContext();

export default LoaderContext;

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error(
      'useLoaderContext must be used within a LoaderContextProvider'
    );
  }
  return context;
}

const { Provider } = LoaderContext;

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);

    const toggleLoad = useCallback(() => {
        setLoading((value) => !value);
      }, []);
  
    return (
      <Provider value={{ loading, toggleLoad }}>
        {children}
      </Provider>
    );
  }