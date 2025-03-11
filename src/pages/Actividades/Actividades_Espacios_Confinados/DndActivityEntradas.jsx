import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import trueImage from "/src/assets/img/checkAct.png";
import falseImage from "/src/assets/img/false.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRepeat, faUndo } from "@fortawesome/free-solid-svg-icons";
import DndActivityMobile from "./DndActivityMobile";
import Button from "../../components/Button";

const items = [
  "Se debe obtener un permiso de trabajo.",
  "Realizar una medición de los niveles de oxígeno.",
  "Todo el personal debe contar con los EPP adecuados.",
  "Contar con un plan de salida siempre.",
  "Evacuar en caso de cambios en las condiciones atmosféricas.",
  "Verificar el estado del espacio confinado después de la operación.",
];

const correctAnswers = {
  Entrada: [
    "Se debe obtener un permiso de trabajo.",
    "Realizar una medición de los niveles de oxígeno.",
    "Todo el personal debe contar con los EPP adecuados.",
    "Contar con un plan de salida siempre.",
  ],
  Salida: [
    "Evacuar en caso de cambios en las condiciones atmosféricas.",
    "Verificar el estado del espacio confinado después de la operación.",
  ],
};

function DraggableItem({ id, content, correct }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: CSS.Translate.toString(transform),
    backgroundColor:
      correct === null ? "#0F172A" : correct ? "#4caf50" : "#f44336",
    padding: "4px",
    borderRadius: "5px",
    cursor: "grab",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-center"
    >
      {content}
      {correct !== null && (
        <img
          src={correct ? trueImage : falseImage}
          alt={correct ? "Correcto" : "Incorrecto"}
          className="w-[30px] mb-0"
        />
      )}
    </div>
  );
}

function DroppableBox({ id, items }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`p-4 border-2 border-solid rounded-lg border-gray-400 min-w-[400px] min-h-[250px] ${isOver ? "bg-gray-100" : ""}`}
    >
      {items}
    </div>
  );
}

export default function DndActivityEntradas() {
  const [itemsState, setItemsState] = useState(
    items.reduce(
      (acc, item) => ({ ...acc, [item]: { box: null, correct: null } }),
      {}
    )
  );
  const [feedback, setFeedback] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const [allItemsInBoxes, setAllItemsInBoxes] = useState(false);
  const [atLeastOneItemPlaced, setAtLeastOneItemPlaced] = useState(false);
  const [remainingItemsCount, setRemainingItemsCount] = useState(items.length);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && (over.id === "Entrada" || over.id === "Salida")) {
      setItemsState((prev) => {
        const updatedState = {
          ...prev,
          [active.id]: { box: over.id, correct: null },
        };

        // Verificar cuántos elementos quedan sin colocar
        const placedItemsCount = Object.values(updatedState).filter(
          (data) => data.box !== null
        ).length;
        setRemainingItemsCount(items.length - placedItemsCount);

        // Verificar si todos los elementos están en las cajas
        const allInBoxes = Object.values(updatedState).every(
          (data) => data.box !== null
        );
        setAtLeastOneItemPlaced(placedItemsCount > 0);
        setAllItemsInBoxes(allInBoxes);

        return updatedState;
      });
    }
  };

  const validateAnswers = () => {
    let correctCount = 0;
    let incorrectCount = 0;

    setItemsState((prev) => {
      const newState = Object.fromEntries(
        Object.entries(prev).map(([item, data]) => {
          const isCorrect = data.box
            ? (correctAnswers[data.box]?.includes(item) ?? false)
            : null;
          if (isCorrect) correctCount++;
          if (isCorrect === false) incorrectCount++;
          return [
            item,
            {
              ...data,
              correct: isCorrect,
            },
          ];
        })
      );

      const totalItems = items.length;
      const correctPercentage = Math.round((correctCount / totalItems) * 100);

      if (correctCount === totalItems) {
        setFeedback(
          `¡Muy bien! Conoces correctamente los beneficios del PESV. Respuestas correctas ${correctCount} de ${totalItems} (${correctPercentage}%).`
        );
      } else if (incorrectCount === totalItems) {
        setFeedback(
          `Todas las opciones son incorrectas, piénsalo bien y vuelve a intentarlo. Respuestas correctas ${correctCount} de ${totalItems} (${correctPercentage}%).`
        );
      } else {
        setFeedback(
          `¡Piénsalo bien! Algunos beneficios no son correctos. Respuestas correctas ${correctCount} de ${totalItems} (${correctPercentage}%).`
        );
      }

      return newState;
    });
  };

  const resetActivity = () => {
    setItemsState(
      items.reduce(
        (acc, item) => ({ ...acc, [item]: { box: null, correct: null } }),
        {}
      )
    );
    setFeedback(null);
    setAllItemsInBoxes(false);
    setAtLeastOneItemPlaced(false);
    setRemainingItemsCount(items.length);
  };

  const getFeedbackColor = () => {
    const correctAnswersCount = Object.values(itemsState).filter(
      (data) => data.correct === true
    ).length;
    const incorrectAnswersCount = Object.values(itemsState).filter(
      (data) => data.correct === false
    ).length;

    if (correctAnswersCount === items.length) {
      return "#009A3D"; // Verde para todas correctas
    } else if (incorrectAnswersCount === items.length) {
      return "#f44336"; // Rojo para todas incorrectas
    } else {
      return "#FF9800"; // Naranja para mixto
    }
  };

  return (
    <div className="mx-8">
      <div className="hidden md:flex jusitfy-center items-center flex-col">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {remainingItemsCount > 0 && (
            <p className="text-center text-gray-500 font-bold">
              Te faltan {remainingItemsCount} opciones
            </p>
          )}
          <div className="w-full flex items-center justify-center">
            <div className="bg-[#0F172A] rounded-lg text-white">
              {items
                .filter((item) => itemsState[item].box === null)
                .slice(0, 1) // Muestra solo el primer elemento disponible
                .map((item) => (
                  <DraggableItem
                    key={item}
                    id={item}
                    content={item}
                    correct={null}
                  />
                ))}
            </div>
          </div>

          <div className="grid grid-cols-2 mx-4">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[16px] text-[#009A3D] font-bold">
                A la entrada...
              </p>
              <DroppableBox
                id="Entrada"
                items={Object.entries(itemsState)
                  .filter(([_, data]) => data.box === "Entrada")
                  .map(([item, data]) => (
                    <DraggableItem
                      key={item}
                      id={item}
                      content={item}
                      correct={data.correct}
                    />
                  ))}
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="text-[16px] text-[#f44336] font-bold">
                A la salida...
              </p>
              <DroppableBox
                id="Salida"
                items={Object.entries(itemsState)
                  .filter(([_, data]) => data.box === "Salida")
                  .map(([item, data]) => (
                    <DraggableItem
                      key={item}
                      id={item}
                      content={item}
                      correct={data.correct}
                    />
                  ))}
              />
            </div>
          </div>
        </DndContext>

        <div className="w-full flex items-center justify-center gap-4">
          <Button onClick={validateAnswers} disabled={!allItemsInBoxes}>
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Validar
          </Button>
          <Button onClick={resetActivity} disabled={!atLeastOneItemPlaced}>
            <FontAwesomeIcon icon={faRepeat} className="mr-2" />
            Reiniciar
          </Button>
        </div>

        {feedback && (
          <div
            className={`w-full p-1 rounded text-white flex flex-col items-center justify-center text-center`}
            style={{ backgroundColor: getFeedbackColor() }}
          >
            {feedback}
          </div>
        )}
      </div>
      <div className="md:hidden">
        <DndActivityMobile />
      </div>
    </div>
  );
}
