import React, { useState, useEffect } from "react";
import "./styles/DragAndDrop.css";
import Paragraph from "../components/Paragraph";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from '../components/Button';

function DragAndDrop() {
  const [droppedItem1, setDroppedItem1] = useState(null);
  const [droppedItem2, setDroppedItem2] = useState(null);
  const [availableItems, setAvailableItems] = useState([
    "Riesgos eléctricos",
    "Descargas eléctricas",
  ]);
  const [validationMessage, setValidationMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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

  const handleSelectChange = (value, setDroppedItem) => {
    if (value) {
      setDroppedItem(value);
      setAvailableItems((prevItems) => prevItems.filter((i) => i !== value));
    }
  };

  const getAvailableOptions = (currentValue) => {
    return ["", ...availableItems, currentValue].filter(Boolean);
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

    const isCorrect = droppedItem1 === correctAnswers[1] && droppedItem2 === correctAnswers[2];

    setValidationMessage(
      isCorrect
        ? "¡Muy bien! Estás aprendiendo mucho para cuidar tus manos."
        : "¡Piénsalo bien! Revisa muy bien los conceptos y vuelve a intentarlo."
    );
  };

  return (
    <div className="main-container">
      <div className="drag-and-drop-container">
        <div className="card-container">
          <div className="card">
            <Paragraph theme="light">
              Exposición a posibles descargas eléctricas en contacto con cables
              o equipos defectuosos.
            </Paragraph>
            {isMobile ? (
              <select
                className={`mobile-select ${
                  validationMessage
                    ? droppedItem1 === "Riesgos eléctricos"
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
                value={droppedItem1 || ""}
                onChange={(e) => handleSelectChange(e.target.value, setDroppedItem1)}
                disabled={!!validationMessage}
              >
                <option value="">Seleccione una opción...</option>
                {getAvailableOptions(droppedItem1).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            ) : (
              <div
                className={`drop-zone ${droppedItem1 ? "filled" : ""}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, setDroppedItem1)}
              >
                {droppedItem1 || "Arrastre aquí"}
              </div>
            )}
          </div>

          <div className="card">
            <Paragraph theme="light">
              Un trabajador que al manipular cables o herramientas eléctricas
              sin las precauciones adecuadas puede resultar en descargas
              eléctricas que causan quemaduras o lesiones graves en las manos.
            </Paragraph>
            {isMobile ? (
              <select
                className={`mobile-select ${
                  validationMessage
                    ? droppedItem2 === "Descargas eléctricas"
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
                value={droppedItem2 || ""}
                onChange={(e) => handleSelectChange(e.target.value, setDroppedItem2)}
                disabled={!!validationMessage}
              >
                <option value="">Seleccione una opción...</option>
                {getAvailableOptions(droppedItem2).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            ) : (
              <div
                className={`drop-zone ${droppedItem2 ? "filled" : ""}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, setDroppedItem2)}
              >
                {droppedItem2 || "Arrastre aquí"}
              </div>
            )}
          </div>
        </div>

        {!isMobile && (
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
        )}
      </div>

      {validationMessage && (
          <div className="feedback-container">
            <p className={`validation-message ${validationMessage.includes("¡Muy bien!") ? "success" : "error"}`}>
              {validationMessage}
            </p>
          </div>
        )}

      <div className="action-container">
        <div className="action-buttons">
          <Button
            bold={false}
            icon={faCheck}
            roundedFull={true}
            onClick={handleValidation}
            disabled={!droppedItem1 || !droppedItem2}
          >
            Validar
          </Button>
          <Button
            bold={false}
            icon={faRepeat}
            roundedFull={true}
            onClick={handleReset}
            disabled={!droppedItem1 && !droppedItem2 && !validationMessage}
          >
            Reiniciar
          </Button>
        </div>
        
      </div>
    </div>
  );
}

export default DragAndDrop;

