import React, { useState, useEffect } from "react";
import "./styles/OrdenarPasosPalmaManos.css"; // Asegúrate de incluir los estilos
import Paragraph from "../components/Paragraph";
import { faCheck, faRepeat, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";

const OrdenarPasosPalmaManos = () => {
  const pasosCorrectos = [
    "Primeros auxilios y atencion médica.",
    "Reporte e investigación de accidentes.",
    "Rehabilitación y reinserción laboral.",
  ];

  const [pasos, setPasos] = useState([]);
  const [resultado, setResultado] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const desordenarPasos = () => {
    const pasosConNumeros = pasosCorrectos.map((paso, index) => ({
      numero: index + 1,
      texto: paso,
    }));

    const pasosDesordenados = pasosConNumeros.sort(() => Math.random() - 0.5);
    setPasos(pasosDesordenados);
    setResultado("");
    setCorrectCount(0);
    setIsButtonActive(false); // Desactiva el botón al reiniciar
  };

  useEffect(() => {
    desordenarPasos();
  }, []);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setIsButtonActive(true); // Activa el botón cuando el usuario empieza a mover
  };

  const handleDrop = (e, targetIndex) => {
    const draggedIndex = e.dataTransfer.getData("index");
    const newPasos = [...pasos];
    const temp = newPasos[draggedIndex];
    newPasos[draggedIndex] = newPasos[targetIndex];
    newPasos[targetIndex] = temp;
    setPasos(newPasos);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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
            className={`tarjeta-paso ${
              resultado &&
              (paso.texto === pasosCorrectos[index] ? "correcto" : "incorrecto")
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {paso.numero}. {paso.texto}
          </div>
        ))}
      </div>

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

      <div className="botones-container">
        <Button
          bold={false}
          icon={faCheck}
          roundedFull={true}
          onClick={isButtonActive ? validarOrden : null}
          disabled={!isButtonActive} // Botón desactivado si no está activo
          className={`boton-validar ${
            isButtonActive ? "activo" : "inactivo"
          }`} 
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

export default OrdenarPasosPalmaManos;
