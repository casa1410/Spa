import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Inicio from "./components/Inicio";

import appFirebase from "./credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(appFirebase);

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {usuario === null ? (
            <>
              <Route path="/" element={<Navigate to="/Inicio" />} />
              <Route path="/Inicio" element={<Inicio />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : usuario.tipoId === 1 ? (
            <>
              <Route
                path="/"
                element={<Home correoUsuario={usuario.email} />}
              />
              <Route path="/login" element={<Navigate to="/" />} />
            </>
          ) : usuario.tipoId === 2 ? (
            <>
              <Route
                path="/"
                element={<Home correoUsuario={usuario.email} />}
              />
              <Route path="/login" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={<Home correoUsuario={usuario.email} />}
              />
              <Route path="/login" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
