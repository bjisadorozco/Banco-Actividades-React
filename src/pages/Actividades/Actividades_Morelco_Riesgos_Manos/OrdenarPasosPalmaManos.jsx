import React, { useState } from "react";
import "./styles/OrdenarPasosPalmaManos.css"; // Asegúrate de incluir los estilos
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
    setIsButtonActive(false); // Deshabilitar el botón al reiniciar
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setIsButtonActive(true); // Habilitar el botón al iniciar un arrastre
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

      <div className="botones-container">
        <Button
          bold={false}
          icon={faCheck}
          roundedFull={true}
          onClick={isButtonActive ? validarOrden : null}
          disabled={!isButtonActive} // Botón inicialmente deshabilitado
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
      {resultado && (
        <div className={`resultado ${resultado}`}>
          <div className="feedback-container">
            <div className="feedback-message">
              <p>
                {resultado === "correcto"
                  ? "Respuesta correcta: ¡Muy bien! Estás aprendiendo mucho para cuidar tus manos."
                  : "Respuesta incorrecta: ¡Piénsalo bien!."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdenarPasosPalmaManos;
