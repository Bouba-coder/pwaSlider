import React, { useContext, useEffect, useState } from "react";
import storage from "./storage";

const AppStateContextDefault = {
  appState: {
    activeSlide: null,
    user: null,
  },
  setAppState: () => null,
  initializeApp: () => null,
};

export const AppStateContext = React.createContext(AppStateContextDefault);

const { Provider } = AppStateContext;

export const useAppState = () => {
  const state = useContext(AppStateContext);
  return state;
};

export const AppStateContextProvider = ({ children }) => {
  const [appState, setState] = useState({});

  const setAppState = (data) => {
    const state = { ...appState, ...data };
    setState(state);
    storage.setItem("appState", state);
  };

  const initializeApp = async () => {};

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <Provider
      value={{
        appState,
        setAppState,
        initializeApp,
      }}
    >
      {children}
    </Provider>
  );
};
