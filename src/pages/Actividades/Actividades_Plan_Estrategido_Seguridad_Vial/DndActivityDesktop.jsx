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
import { faRepeat, faUndo } from "@fortawesome/free-solid-svg-icons";
import DndActivityMobile from "./DndActivityMobile";

const items = [
  "Reducción de los costos asociados a los accidentes de tránsito.",
  "Mejora de la imagen y reputación de la organización.",
  "Mayor compromiso de los trabajadores con la seguridad vial.",
  "Disminución del absentismo laboral.",
  "Aumento de la productividad.",
  "Aumento de los salarios a los trabajadores.",
  "Mayor riesgo de los conductores al salir a las vías.",
  "Mayor desgaste de los vehículos.",
];

const correctAnswers = {
  Si: [
    "Reducción de los costos asociados a los accidentes de tránsito.",
    "Mejora de la imagen y reputación de la organización.",
    "Mayor compromiso de los trabajadores con la seguridad vial.",
    "Disminución del absentismo laboral.",
    "Aumento de la productividad.",
  ],
  No: [
    "Aumento de los salarios a los trabajadores.",
    "Mayor riesgo de los conductores al salir a las vías.",
    "Mayor desgaste de los vehículos.",
  ],
};

function DraggableItem({ id, content, correct }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: CSS.Translate.toString(transform),
    backgroundColor:
      correct === null ? "#6E3CD2" : correct ? "#4caf50" : "#f44336",
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
      className={`p-4 border-2 border-solid rounded-lg border-gray-400 min-w-[200px] min-h-[250px] ${isOver ? "bg-gray-100" : ""}`}
    >
      {items}
    </div>
  );
}

export default function DndActivityDesktop() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsState, setItemsState] = useState(
    items.reduce(
      (acc, item) => ({ ...acc, [item]: { box: null, correct: null } }),
      {}
    )
  );
  const [feedback, setFeedback] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const [allItemsInBoxes, setAllItemsInBoxes] = useState(false);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && (over.id === "Si" || over.id === "No")) {
      setItemsState((prev) => {
        const updatedState = {
          ...prev,
          [active.id]: { box: over.id, correct: null },
        };

        // Verificar si todos los elementos están en las cajas
        const allInBoxes = Object.values(updatedState).every(
          (data) => data.box !== null
        );
        setAllItemsInBoxes(allInBoxes);

        return updatedState;
      });
      setCurrentIndex((prevIndex) => prevIndex + 1);
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
    setCurrentIndex(0);
    setAllItemsInBoxes(false);
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
        <div className="w-full flex items-center justify-center">
          <div className="bg-[#6E3CD2] rounded-lg text-white">
            {currentIndex < items.length && (
              <DraggableItem
                key={items[currentIndex]}
                id={items[currentIndex]}
                content={items[currentIndex]}
                correct={null}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 mx-4">
          <div className="flex flex-col items-center justify-center">
            <p className="text-[16px] text-[#009A3D] font-bold">SI</p>
            <DroppableBox
              id="Si"
              items={Object.entries(itemsState)
                .filter(([_, data]) => data.box === "Si")
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
            <p className="text-[16px] text-[#f44336] font-bold">NO</p>
            <DroppableBox
              id="No"
              items={Object.entries(itemsState)
                .filter(([_, data]) => data.box === "No")
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

      <div className="w-full flex items-center justify-center">
        <button
          onClick={validateAnswers}
          disabled={!allItemsInBoxes} // Deshabilitar si no todos los elementos están en las cajas
          className={`bg-[#6E3CD2] text-white px-4 py-1 rounded-full mr-2 ${!allItemsInBoxes ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FontAwesomeIcon icon={faUndo} className="mr-2" />
          Validar
        </button>
        <button
          onClick={resetActivity}
          disabled={!allItemsInBoxes} // Deshabilitar si no todos los elementos están en las cajas
          className={`bg-[#6E3CD2] text-white px-4 py-1 rounded-full ${!allItemsInBoxes ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FontAwesomeIcon icon={faRepeat} className="mr-2" />
          Reiniciar
        </button>
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
