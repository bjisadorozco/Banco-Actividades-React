import React, { useState } from "react";
import "./styles/DragAndDrop.css";
import Paragraph from "../components/Paragraph";
import { faCheck, faRepeat, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/Button';

const DragAndDrop = () => {
  const [droppedItem1, setDroppedItem1] = useState(null);
  const [droppedItem2, setDroppedItem2] = useState(null);
  const [availableItems, setAvailableItems] = useState([
    "Riesgos eléctricos",
    "Descargas eléctricas",
  ]);
  const [validationMessage, setValidationMessage] = useState("");

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDrop = (e, setDroppedItem) => {
    const item = e.dataTransfer.getData("text/plain");
    setDroppedItem(item);
    setAvailableItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setDroppedItem1(null);
    setDroppedItem2(null);
    setAvailableItems(["Riesgos eléctricos", "Descargas eléctricas"]);
    setValidationMessage("");
  };

  const handleValidation = () => {
    const correctAnswers = {
      1: "Riesgos eléctricos",
      2: "Descargas eléctricas",
    };

    if (
      droppedItem1 === correctAnswers[1] &&
      droppedItem2 === correctAnswers[2]
    ) {
      setValidationMessage(
        "Respuesta correcta: ¡Muy bien! Estás aprendiendo mucho para cuidar tus manos."
      );
    } else {
      setValidationMessage(
        "Respuesta Incorrecta: ¡Piénsalo bien! ¡Revisa muy bien los conceptos y vuelve a intentarlo!"
      );
    }
  };

  return (
    <div className="main-container">
      {/* Contenedor de arrastrar y soltar */}
      <div className="drag-and-drop-container">
        <div className="card-container">
          <div className="card">
            <Paragraph theme="light">
              Exposición a posibles descargas eléctricas en contacto con cables
              o equipos defectuosos.
            </Paragraph>
            <div
              className="drop-zone"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, setDroppedItem1)}
            >
              {droppedItem1 || <span></span>}
            </div>
          </div>
          <div className="card">
            <Paragraph theme="light">
              Un trabajador que al manipular cables o herramientas eléctricas
              sin las precauciones adecuadas puede resultar en descargas
              eléctricas que causan quemaduras o lesiones graves en las manos.
            </Paragraph>
            <div
              className="drop-zone"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, setDroppedItem2)}
            >
              {droppedItem2 || <span></span>}
            </div>
          </div>
        </div>

        <div className="drag-items">
          {availableItems.map((item) => (
            <button
              key={item}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="drag-button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Contenedor de acciones */}
      <div className="action-container">
        <div className="action-buttons">
            <Button
                bold={false}
                icon={faCheck}
                roundedFull={true}
                onClick={handleValidation}
                >
                Validar
            </Button>
            <Button
                bold={false}
                icon={faRepeat}
                roundedFull={true}
                onClick={handleReset}
                >
                Reiniciar
            </Button>
          {/* <button className="reset-button" onClick={handleReset}>
            Reiniciar
          </button>
          <button className="validate-button" onClick={handleValidation}>
            Validar
          </button> */}
        </div>
        {validationMessage && (
          <div className="message-container feedback-container">
            <p className="validation-message ">{validationMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;
