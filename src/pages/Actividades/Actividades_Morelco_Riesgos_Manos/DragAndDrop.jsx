import React, { useState, useEffect, useCallback } from "react";
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import "./styles/DragAndDrop.css";
import Paragraph from "../../components/Paragraph";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from '../../components/Button';
import checkIcon from "../../../assets/img/checkAct.png";
import xmarkIcon from "../../../assets/img/xmarkAct.png";
import { CheckCircle, XCircle } from 'lucide-react';

const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    transition: 'transform 0.1s ease-out',
  } : undefined;

  return (
    <button ref={setNodeRef} {...listeners} {...attributes} className="drag-button" style={style}>
      {children}
    </button>
  );
};

const DroppableZone = ({ id, children, isOver, validationState }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`drop-zone ${children ? "filled" : ""} ${isOver ? "drop-zone-active" : ""} ${validationState || ""}`}>
      {children || "Arrastre aquí"}
    </div>
  );
};

function DragAndDrop() {
  const [items, setItems] = useState({
    dropZone1: null,
    dropZone2: null,
  });
  const [availableItems, setAvailableItems] = useState([
    "Riesgos eléctricos",
    "Descargas eléctricas",
  ]);
  const [validationMessage, setValidationMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [overZone, setOverZone] = useState(null);
  const [validationState, setValidationState] = useState({
    dropZone1: "",
    dropZone2: "",
  });


  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10, },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5, },
    })
  );

  const handleDragOver = useCallback((event) => {
    const { over } = event;
    setOverZone(over ? over.id : null);
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id.startsWith('dropZone')) {
      setItems(prev => ({
        ...prev,
        [over.id]: active.id,
      }));
      setAvailableItems(prev => prev.filter(item => item !== active.id));
    }
    setOverZone(null);
  };

  const handleSelectChange = useCallback((value, dropZoneId) => {
    if (value) {
      setItems(prev => ({
        ...prev,
        [dropZoneId]: value,
      }));
      setAvailableItems(prev => prev.filter(item => item !== value));
    }
  }, []);

  const getAvailableOptions = useCallback((currentValue) => {
    return ["", ...availableItems, currentValue].filter(Boolean);
  }, [availableItems]);

  const handleReset = useCallback(() => {
    setItems({
      dropZone1: null,
      dropZone2: null,
    });
    setAvailableItems(["Riesgos eléctricos", "Descargas eléctricas"]);
    setValidationMessage("");
    setValidationState({
      dropZone1: "",
      dropZone2: "",
    });
  }, []);

  const handleValidation = useCallback(() => {
    const correctAnswers = {
      dropZone1: "Riesgos eléctricos",
      dropZone2: "Descargas eléctricas",
    };
    const isCorrect = items.dropZone1 === correctAnswers.dropZone1 && items.dropZone2 === correctAnswers.dropZone2;
    
    setValidationMessage(
      isCorrect
        ? "¡Muy bien! Estás aprendiendo mucho para cuidar tus manos."
        : "¡Piénsalo bien! Revisa muy bien los conceptos y vuelve a intentarlo."
    );
    
    setValidationState({
      dropZone1: items.dropZone1 === correctAnswers.dropZone1 ? "validation-success" : "validation-error",
      dropZone2: items.dropZone2 === correctAnswers.dropZone2 ? "validation-success" : "validation-error",
    });
  }, [items]);

  return (
    <div className="main-container">
      <DndContext
        sensors={sensors}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="drag-and-drop-container">
          <div className="card-container">
            <div className={`card ${validationState.dropZone1}`}>
              <Paragraph theme="light">
                Exposición a posibles descargas eléctricas en contacto con cables o equipos defectuosos.
              </Paragraph>
              {validationState.dropZone1 && (
                <img 
                src={validationState.dropZone1 === "validation-success" ? checkIcon : xmarkIcon}
                alt={validationState.dropZone1 === "validation-success" ? "Correct" : "Incorrect"}
                className="validation-icon"
              />
              )}
              {isMobile ? (
                <select
                  className={`mobile-select ${validationState.dropZone1}`}
                  value={items.dropZone1 || ""}
                  onChange={(e) => handleSelectChange(e.target.value, 'dropZone1')}
                  disabled={!!validationMessage}
                >
                  <option value="">Seleccione una opción...</option>
                  {getAvailableOptions(items.dropZone1).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              ) : (
                <DroppableZone
                  id="dropZone1"
                  isOver={overZone === "dropZone1"}
                  validationState={validationState.dropZone1}
                >
                  {items.dropZone1}
                </DroppableZone>
              )}
            </div>
            <div className={`card ${validationState.dropZone2}`}>
              <Paragraph theme="light">
                Un trabajador que al manipular cables o herramientas eléctricas sin las precauciones adecuadas puede resultar en descargas eléctricas que causan quemaduras o lesiones graves en las manos.
              </Paragraph>
              {validationState.dropZone2 && (
                <img 
                src={validationState.dropZone2 === "validation-success" ? checkIcon : xmarkIcon}
                alt={validationState.dropZone2 === "validation-success" ? "Correct" : "Incorrect"}
                className="validation-icon"
              />
              )}
              {isMobile ? (
                <select
                  className={`mobile-select ${validationState.dropZone2}`}
                  value={items.dropZone2 || ""}
                  onChange={(e) => handleSelectChange(e.target.value, 'dropZone2')}
                  disabled={!!validationMessage}
                >
                  <option value="">Seleccione una opción...</option>
                  {getAvailableOptions(items.dropZone2).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              ) : (
                <DroppableZone
                  id="dropZone2"
                  isOver={overZone === "dropZone2"}
                  validationState={validationState.dropZone2}
                >
                  {items.dropZone2}
                </DroppableZone>
              )}
            </div>
          </div>
          {!isMobile && (
            <div className="drag-items h-auto">
              {availableItems.map((item) => (
                <DraggableItem key={item} id={item}>
                  {item}
                </DraggableItem>
              ))}
            </div>
          )}
        </div>
      </DndContext>
      {validationMessage && (
        <div className="">
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
            disabled={!items.dropZone1 || !items.dropZone2}
          >
            Validar
          </Button>
          <Button
            bold={false}
            icon={faRepeat}
            roundedFull={true}
            onClick={handleReset}
            disabled={!items.dropZone1 && !items.dropZone2 && !validationMessage}
          >
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DragAndDrop;

