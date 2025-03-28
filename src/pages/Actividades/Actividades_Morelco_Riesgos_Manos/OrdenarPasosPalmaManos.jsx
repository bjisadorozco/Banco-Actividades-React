import React, { useState } from "react";
import "./styles/OrdenarPasosPalmaManos.css";
import Paragraph from "../../components/Paragraph";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";

const OrdenarPasosPalmaManos = () => {
  const pasosCorrectos = [
    "Primeros auxilios y atencion médica.",
    "Reporte e investigación de accidentes.",
    "Rehabilitación y reinserción laboral.",
  ];

  const pasosInicialesDesordenados = [
    { numero: 3, texto: "Rehabilitación y reinserción laboral." },
    { numero: 1, texto: "Primeros auxilios y atencion médica." },
    { numero: 2, texto: "Reporte e investigación de accidentes." },
  ];

  const [pasos, setPasos] = useState(pasosInicialesDesordenados);
  const [resultado, setResultado] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const reiniciarPasos = () => {
    setPasos([...pasosInicialesDesordenados]);
    setResultado("");
    setCorrectCount(0);
    setIsButtonActive(false);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setIsButtonActive(true);
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
    const correctCount = pasos.filter(
      (paso, index) => paso.texto === pasosCorrectos[index]
    ).length;
    const isCorrect = correctCount === pasosCorrectos.length;
    setResultado(isCorrect ? "correcto" : "incorrecto");
    setCorrectCount(correctCount);
  };

  return (
    <div className="ordenar-pasos-wrapper">
      <div className="ordenar-pasos-containerOPM mt-14">
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

        <div className="botones-containerOPM">
          <Button
            bold={false}
            icon={faCheck}
            roundedFull={true}
            onClick={isButtonActive ? validarOrden : null}
            disabled={!isButtonActive}
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
            onClick={reiniciarPasos}
          >
            Reiniciar
          </Button>
        </div>
      </div>

      {resultado && (
        <div className="feedback-containerOPM">
          <p className="text-md mt-0 font-bold text-center">
            {resultado === "correcto" ? (
              <span>
                <span style={{ color: '#4caf50' }}>¡Correcto!</span>{' '}
                <span style={{ color: '#8F8F8F' }}>
                  Todas las respuestas son correctas. ({Math.round((correctCount / pasosCorrectos.length) * 100)}%)
                </span>
              </span>
            ) : (
              <span>
                <span style={{ color: '#f44336' }}>¡Incorrecto!</span>{' '}
                <span style={{ color: '#8F8F8F' }}>
                  Tienes {correctCount} de {pasosCorrectos.length} respuestas correctas. Intenta de nuevo. ({Math.round((correctCount / pasosCorrectos.length) * 100)}%)
                </span>
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrdenarPasosPalmaManos;

