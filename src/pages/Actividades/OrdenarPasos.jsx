import React, { useState, useEffect } from "react";
import "./styles/OrdenarPasos.css"; // Asegúrate de incluir los estilos
import { faCheck, faRepeat, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const OrdenarPasos = () => {
  // Pasos ordenados correctamente
  const pasosCorrectos = [
    "Se realiza una evaluación de riesgos para identificar las áreas peligrosas durante el montaje de la estructura metálica.",
    "Se seleccionan y instalan guardas fijas de metal resistente en las herramientas y equipos utilizados, como sierras y taladros, para evitar el contacto accidental con partes móviles.",
    "Los trabajadores reciben capacitación sobre la importancia de las guardas y cómo utilizarlas correctamente durante el montaje de la estructura.",
    "Se establece un programa de mantenimiento regular para inspeccionar y asegurar que las guardas estén en buen estado y funcionando correctamente.",
    "Antes de cada turno, los trabajadores verifican que las guardas estén en su lugar y funcionando correctamente en todas las herramientas y equipos utilizados.",
  ];

  // Estado para los pasos desordenados
  const [pasos, setPasos] = useState([]);

  // Estado para el resultado de la validación
  const [resultado, setResultado] = useState("");

  // Función para desordenar pasos
  const desordenarPasos = () => {
    const pasosDesordenados = [...pasosCorrectos].sort(() => Math.random() - 0.5);
    setPasos(pasosDesordenados);
    setResultado(""); // Limpiar el resultado
  };

  // Desordenar pasos al cargar el componente
  useEffect(() => {
    desordenarPasos();
  }, []);

  // Función para manejar el Drag & Drop
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e, targetIndex) => {
    const draggedIndex = e.dataTransfer.getData("index");
    const newPasos = [...pasos];
    // Intercambiar elementos
    const temp = newPasos[draggedIndex];
    newPasos[draggedIndex] = newPasos[targetIndex];
    newPasos[targetIndex] = temp;
    setPasos(newPasos);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Función para validar el orden
  const validarOrden = () => {
    const isCorrect = pasos.every((paso, index) => paso === pasosCorrectos[index]);
    setResultado(isCorrect ? "correcto" : "incorrecto");
  };

  return (
    <div className="ordenar-pasos-container">
      <div className="contenedor-pasos">
        {pasos.map((paso, index) => (
          <div
            key={index}
            className={`tarjeta-paso ${resultado && (paso === pasosCorrectos[index] ? "correcto" : "incorrecto")}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {index + 1}. {paso}
          </div>
        ))}
      </div>
      <div className="botones-container">
        <button  className="btn" onClick={validarOrden}
        ><i class="fa fa-check"></i>
          Validar
        </button>
        <button className="btn" onClick={desordenarPasos}><i class="fa fa-repeat"></i>
          Reiniciar
        </button>
      </div>
      {resultado && (
        <div className={`resultado ${resultado}`}>
          {resultado === "correcto" ? "¡Orden correcto!" : "El orden es incorrecto, inténtalo de nuevo."}
        </div>
      )}
    </div>
  );
};

export default OrdenarPasos;
