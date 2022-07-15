import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Login from "./screens/auth/login-page";
import { Routes, Route } from "react-router-dom";
import Presentation from "./screens/presentation-page";
import EditSlide from "./screens/edit-slide-page";
import { auth, database } from "./services/firebase";
import RevealSlides from "./screens/swiper/reveal-slides";
import Header from "./components/Header";
import Home from "./screens/home-page";
import { useAppState } from "./context/app-state-context";
import { ChatRoom } from "./components/chat-room";

function App() {
  const { initializeApp } = useAppState();
  const [user, setUser] = useState(null);

  const resetAppState = useCallback(
    (e) => {
      e.preventDefault();
      initializeApp();
    },
    [initializeApp]
  );


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  })

  useEffect(() => {
    window.addEventListener("beforeunload", resetAppState);
    return () => {
      window.removeEventListener("beforeunload", resetAppState);
    };
  }, [resetAppState]);

  return (
    <div>
      <div>
        <Header user={user} />

        <Routes>
          <Route path="/login" element={<Login database={database} user={user}/>} />
          <Route path="/presentation" element={<Home database={database} user={user} />} />
          <Route
            path="/presentation/:id"
            element={<Presentation database={database} user={user}/>}
          />
            <Route
            path="/presentation/chat/:id"
            element={<ChatRoom
              database={database} user={user} />}
          />
          <Route path="presentation/editDocs/:id" element={<EditSlide user={user} />} />
          <Route path="presentation/reveal/:id" element={<RevealSlides user={user} />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
