import React, { useState, useEffect, useCallback } from "react";
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay } from '@dnd-kit/core';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import "./styles/DragAndDrop.css";
import Paragraph from "../../components/Paragraph";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from '../../components/Button';

const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    transition: 'transform 0.1s ease-out',
  } : undefined;

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="drag-button"
      style={style}
    >
      {children}
    </button>
  );
};

const DroppableZone = ({ id, children, isOver }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`drop-zone ${children ? "filled" : ""} ${isOver ? "drop-zone-active" : ""}`}
    >
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
  const [activeId, setActiveId] = useState(null);
  const [overZone, setOverZone] = useState(null);
  const [activeDragId, setActiveDragId] = useState(null);

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
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveDragId(event.active.id);
  };

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
    setActiveDragId(null);
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
  }, [items]);

  return (
    <div className="main-container">
      <DndContext 
        sensors={sensors} 
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
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
                      ? items.dropZone1 === "Riesgos eléctricos"
                        ? "correct"
                        : "incorrect"
                      : ""
                  }`}
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
                <DroppableZone id="dropZone1" isOver={overZone === "dropZone1"}>
                  {items.dropZone1}
                </DroppableZone>
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
                      ? items.dropZone2 === "Descargas eléctricas"
                        ? "correct"
                        : "incorrect"
                      : ""
                  }`}
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
                <DroppableZone id="dropZone2" isOver={overZone === "dropZone2"}>
                  {items.dropZone2}
                </DroppableZone>
              )}
            </div>
          </div>

          {!isMobile && (
            <div className="drag-items">
              {availableItems.map((item) => (
                <DraggableItem key={item} id={item}>
                  {item}
                </DraggableItem>
              ))}
            </div>
          )}
        </div>

        <DragOverlay>
          {activeDragId ? (
            <div className="drag-button dragging">{activeDragId}</div>
          ) : null}
        </DragOverlay>
      </DndContext>

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

