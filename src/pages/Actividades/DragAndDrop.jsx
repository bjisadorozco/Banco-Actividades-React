import React, { useState, useEffect } from "react";
import "./styles/DragAndDrop.css";
import Paragraph from "../components/Paragraph";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";

function DragAndDrop() {
  const [droppedItem1, setDroppedItem1] = useState(null);
  const [droppedItem2, setDroppedItem2] = useState(null);
  const [availableItems, setAvailableItems] = useState([
    "Riesgos eléctricos",
    "Descargas eléctricas",
  ]);
  const [dropZoneClasses, setDropZoneClasses] = useState({
    1: "drop-zone",
    2: "drop-zone",
  });
  const [isMobile, setIsMobile] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDrop = (e, setDroppedItem, dropZoneKey) => {
    const item = e.dataTransfer.getData("text/plain");
    setDroppedItem(item);
    setAvailableItems((prevItems) => prevItems.filter((i) => i !== item));
    setDropZoneClasses((prev) => ({
      ...prev,
      [dropZoneKey]: "drop-zone filled",
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSelectChange = (value, setDroppedItem, dropZoneKey) => {
    if (value) {
      setDroppedItem(value);
      setAvailableItems((prevItems) => prevItems.filter((i) => i !== value));
      setDropZoneClasses((prev) => ({
        ...prev,
        [dropZoneKey]: "drop-zone filled",
      }));
    }
  };

  const getAvailableOptions = (currentValue) => {
    return ["", ...availableItems, currentValue].filter(Boolean);
  };

  const handleReset = () => {
    setDroppedItem1(null);
    setDroppedItem2(null);
    setAvailableItems(["Riesgos eléctricos", "Descargas eléctricas"]);
    setDropZoneClasses({
      1: "drop-zone",
      2: "drop-zone",
    });
    setValidationMessage("");
  };

  const handleValidation = () => {
    const correctAnswers = {
      1: "Riesgos eléctricos",
      2: "Descargas eléctricas",
    };

    const isCorrect1 = droppedItem1 === correctAnswers[1];
    const isCorrect2 = droppedItem2 === correctAnswers[2];

    setDropZoneClasses({
      1: `drop-zone ${isCorrect1 ? "success" : "error"}`,
      2: `drop-zone ${isCorrect2 ? "success" : "error"}`,
    });

    if (isCorrect1 && isCorrect2) {
      setValidationMessage("¡Muy bien! Todas las respuestas son correctas.");
    } else {
      setValidationMessage(
        "Algunas respuestas son incorrectas. Intenta de nuevo."
      );
    }
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
                onChange={(e) =>
                  handleSelectChange(e.target.value, setDroppedItem1, 1)
                }
                disabled={!!validationMessage}
              >
                <option value="">Seleccione</option>
                {getAvailableOptions(droppedItem1).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            ) : (
              <div
                className={dropZoneClasses[1]}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, setDroppedItem1, 1)}
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
                onChange={(e) =>
                  handleSelectChange(e.target.value, setDroppedItem2, 2)
                }
                disabled={!!validationMessage}
              >
                <option value="">Seleccione</option>
                {getAvailableOptions(droppedItem2).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            ) : (
              <div
                className={dropZoneClasses[2]}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, setDroppedItem2, 2)}
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
          <p
            className={`validation-message ${validationMessage.includes("¡Muy bien!") ? "success" : "error"}`}
          >
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
          >
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DragAndDrop;
