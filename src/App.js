import { useState, useEffect } from "react";
import "./App.css";
import Login from "./screens/auth/login-page";
import { Routes, Route, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { AppStateContextProvider } from "./context/app-state-context";
import Presentation from "./screens/presentation-page";
import EditSlide from "./screens/edit-slide-page";
import { database } from "./services/firebase";
import RevealSlides from "./screens/swiper/reveal-slides";
import Header from "./components/Header";
import Home from "./screens/home-page";
import { useAppState } from "./context/app-state-context";

function App() {
  const { appState, setAppState } = useAppState();
  const { user } = appState;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setAppState({ user: user });
    });
  }, [setAppState, user]);

  return (
    <AppStateContextProvider>
      <div>
        <div>
          <Header user={user} />

          <Routes>
            <Route path="/login" element={<Login user={user} />} />
            <Route
              path="/presentation"
              element={<Home user={user} database={database} />}
            />
            <Route
              path="/presentation/:id"
              element={<Presentation database={database} />}
            />
            <Route path="presentation/editDocs/:id" element={<EditSlide />} />
            <Route path="presentation/reveal/:id" element={<RevealSlides />} />
          </Routes>
        </div>
      </div>
    </AppStateContextProvider>
  );
}

export default App;
