import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import PreguntasProteccion3 from "./pages/Actividades/PreguntasProteccion3.jsx";
import PreguntasRiesgosMecanicos from "./pages/Actividades/PreguntasRiesgosMecanicos.jsx";
import PreguntasRiesgosTermicos from "./pages/Actividades/PreguntasRiesgosTermicos.jsx";
import PreguntasTiposRiesgo from "./pages/Actividades/PreguntasTiposRiesgo.jsx";

import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PreguntasTiposRiesgo />
  </React.StrictMode>
);
