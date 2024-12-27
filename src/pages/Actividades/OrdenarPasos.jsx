import React, { useState, useEffect } from "react";
import "./styles/OrdenarPasos.css"; // Asegúrate de incluir los estilos
import Paragraph from "../components/Paragraph";
import { faCheck, faRepeat, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/Button';

const OrdenarPasos = () => {
  // Pasos ordenados correctamente con sus números
  const pasosCorrectos = [
    "Se realiza una evaluación de riesgos para identificar las áreas peligrosas durante el montaje de la estructura metálica.",
    "Se seleccionan y instalan guardas fijas de metal resistente en las herramientas y equipos utilizados, como sierras y taladros, para evitar el contacto accidental con partes móviles.",
    "Los trabajadores reciben capacitación sobre la importancia de las guardas y cómo utilizarlas correctamente durante el montaje de la estructura.",
    "Se establece un programa de mantenimiento regular para inspeccionar y asegurar que las guardas estén en buen estado y funcionando correctamente.",
    "Antes de cada turno, los trabajadores verifican que las guardas estén en su lugar y funcionando correctamente en todas las herramientas y equipos utilizados.",
  ];

  // Estado para los pasos desordenados con su número correspondiente
  const [pasos, setPasos] = useState([]);

  // Estado para el resultado de la validación
  const [resultado, setResultado] = useState("");
  const [correctCount, setCorrectCount] = useState(0);

  // Función para desordenar pasos con sus números
  const desordenarPasos = () => {
    // Crear un array de objetos con el número y el paso
    const pasosConNumeros = pasosCorrectos.map((paso, index) => ({
      numero: index + 1, // Número del paso (empezando desde 1)
      texto: paso,
    }));

    // Desordenar el array de objetos
    const pasosDesordenados = pasosConNumeros.sort(() => Math.random() - 0.5);
    setPasos(pasosDesordenados);
    setResultado(""); // Limpiar el resultado
    setCorrectCount(0);
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
    const isCorrect = pasos.every(
      (paso, index) => paso.texto === pasosCorrectos[index]
    );
    setResultado(isCorrect ? "correcto" : "incorrecto");
    setCorrectCount(
      pasos.filter((paso, index) => paso.texto === pasosCorrectos[index]).length
    );
  };

  return (
    <div className="ordenar-pasos-container">
      <div className="contenedor-pasos">
        {pasos.map((paso, index) => (
          <div
            key={index}
            className={`tarjeta-paso ${resultado && (paso.texto === pasosCorrectos[index] ? "correcto" : "incorrecto")}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {paso.numero}. {paso.texto} {/* Mostrar el número desordenado junto con el paso */}
          </div>
        ))}
      </div>

      {/* Contador de respuestas correctas */}
      {resultado && (
        <div className="contador-correctas">
          <br />
          <p className="text-md mt-0 font-bold text-center">
            <span className="contador-texto">
              {correctCount} de {pasosCorrectos.length} respuestas correctas
            </span>
          </p>
        </div>
      )}

      {/* Cuadro con el mensaje de feedback */}
      {resultado && (
        <div className={`resultado ${resultado}`}>
          <div className="feedback-container">
            <div className="feedback-message">
              <p>
                {resultado === "correcto"
                  ? "Respuesta correcta: ¡Muy bien! Estás aprendiendo mucho para cuidar tus manos."
                  : "Respuesta incorrecta: ¡Piénsalo bien! Piensa en el orden correcto y vuelve a intentarlo."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Botones de Validar y Reiniciar */}
      <div className="botones-container">
      <Button
                bold={false}
                icon={faCheck}
                roundedFull={true}
                onClick={validarOrden}
                >
                Validar
            </Button>
            <Button
                bold={false}
                icon={faRepeat}
                roundedFull={true}
                onClick={desordenarPasos}
                >
                Reiniciar
            </Button>
      </div>
    </div>
  );
};

export default OrdenarPasos;
