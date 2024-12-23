import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import PreguntasProteccion3 from "./pages/Actividades/PreguntasProteccion3.jsx";
import PreguntasRiesgosMecanicos from "./pages/Actividades/PreguntasRiesgosMecanicos.jsx";
import PreguntasRiesgosTermicos from "./pages/Actividades/PreguntasRiesgosTermicos.jsx";
import DragAndDropManos from "./pages/Actividades/DragAndDropManos.jsx"
import SelectAndValidateMobile from "./pages/Actividades/SelectAndValidateMobile.jsx";
import PreguntasSeleccionHerramientas from "./pages/Actividades/PreguntasSeleccionHerramientas.jsx";
import OrdenarPasos from "./pages/Actividades/OrdenarPasos.jsx";
import DragAndDrop from "./pages/Actividades/DragAndDrop.jsx";
import OrdenarPasosPalmaManos from "./pages/Actividades/OrdenarPasosPalmaManos.jsx";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DragAndDropManos />
  </React.StrictMode>
);
