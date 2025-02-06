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
    padding: "10px",
    marginBottom: "5px",
    borderRadius: "5px",
    cursor: "grab",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-center "
    >
      {content}
      {correct !== null && (
        <img
          src={correct ? trueImage : falseImage}
          alt={correct ? "Correcto" : "Incorrecto"}
          className="w-[30px] mb-0 "
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
      className={`p-4 border-2 border-dashed border-gray-400 min-h-[100px] ${isOver ? "bg-gray-100" : ""}`}
    >
      <h3 className="text-center font-bold">{id}</h3>
      {items}
    </div>
  );
}

export default function DndActivity() {
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
        const allInBoxes = Object.values(updatedState).every((data) => data.box !== null);
        setAllItemsInBoxes(allInBoxes);

        return updatedState;
      });
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const validateAnswers = () => {
    let allCorrect = true;
    setItemsState((prev) => {
      const newState = Object.fromEntries(
        Object.entries(prev).map(([item, data]) => {
          const isCorrect = data.box
            ? (correctAnswers[data.box]?.includes(item) ?? false)
            : null;
          if (isCorrect === false) allCorrect = false;
          return [
            item,
            {
              ...data,
              correct: isCorrect,
            },
          ];
        })
      );
      setFeedback(
        allCorrect
          ? "¡Muy bien! Conoces correctamente los beneficios del PESV."
          : "¡Piénsalo bien! Algunos beneficios no son correctos."
      );
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

  return (
    <div className="p-4">
     
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="w-full flex items-center justify-center ">
          <div className="mt-2 bg-[#6E3CD2] rounded-lg text-white">
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
        <div className="grid grid-cols-2 gap-4 mt-2">
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
     
      </DndContext>

      <div className="mt-4 w-full flex items-center justify-center">
        <button
          onClick={validateAnswers}
          disabled={!allItemsInBoxes}  // Deshabilitar si no todos los elementos están en las cajas
          className={`bg-[#6E3CD2] text-white px-4 py-2 rounded-full mr-2 ${!allItemsInBoxes ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FontAwesomeIcon icon={faUndo} className="mr-2" />
          Validar
        </button>
        <button
          onClick={resetActivity}
          disabled={!allItemsInBoxes}  // Deshabilitar si no todos los elementos están en las cajas
          className={`bg-[#6E3CD2] text-white px-4 py-2 rounded-full ${!allItemsInBoxes ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FontAwesomeIcon icon={faRepeat} className="mr-2" />
          Reiniciar
        </button>
      </div>

      {feedback && (
        <div
          className={`mt-4 p-3 rounded text-white ${feedback.includes("¡Muy bien!") ? "bg-[#4caf50]" : "bg-[#f44336]"}`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
}
