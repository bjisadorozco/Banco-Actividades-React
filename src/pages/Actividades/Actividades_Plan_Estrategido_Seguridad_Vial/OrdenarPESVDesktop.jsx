import React, { useState, useEffect } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRepeat,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import trueImage from "/src/assets/img/checkAct.png";
import falseImage from "/src/assets/img/false.png";

const initialItems = [
  { id: "1", text: "1. Diagnóstico y análisis." },
  { id: "2", text: "2. Diseño del PESV." },
  { id: "3", text: "3. Implementación del PESV." },
  { id: "4", text: "4. Monitoreo y evaluación del PESV" },
];

const correctOrder = ["1", "2", "3", "4"];

function OrdenarPESV() {
  const [items, setItems] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isMoved, setIsMoved] = useState(false);
  const [hasValidated, setHasValidated] = useState(false);

  useEffect(() => {
    setItems(shuffle(initialItems));
  }, []);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event) => {
    const { over } = event;
    if (over) {
      const overId = over.id;
      const activeId = event.active.id;

      if (activeId !== overId) {
        setItems((items) => {
          const activeIndex = items.findIndex((item) => item.id === activeId);
          const overIndex = items.findIndex((item) => item.id === overId);

          const newItems = [...items];
          newItems[activeIndex] = items[overIndex];
          newItems[overIndex] = items[activeIndex];

          return newItems;
        });

        setIsMoved(true);

        // Validate automatically if the user has already validated once
        if (hasValidated) {
          validateOrder();
        }
      }
    }
  };

  const validateOrder = () => {
    const currentOrder = items.map((item) => item.id);
    const correctCount = currentOrder.filter((id, index) => id === correctOrder[index]).length;
    const incorrectCount = items.length - correctCount;

    if (correctCount === items.length) {
      setFeedback({
        message: `¡Muy bien! Conoces correctamente las etapas del PESV. Respuestas correctas ${correctCount} de ${items.length} (100%).`,
        color: "#009A3D",
      });
    } else if (incorrectCount === items.length) {
      setFeedback({
        message: `Todas las opciones son incorrectas, piénsalo bien y vuelve a intentarlo. Respuestas correctas ${correctCount} de ${items.length} (0%).`,
        color: "#f44336",
      });
    } else {
      setFeedback({
        message: `¡Piénsalo bien! Algunas etapas no son correctas. Respuestas correctas ${correctCount} de ${items.length} (${Math.round((correctCount / items.length) * 100)}%).`,
        color: "#FF9800",
      });
    }
  };

  const handleValidateClick = () => {
    validateOrder();
    setHasValidated(true);
  };

  const resetItems = () => {
    setItems(shuffle(initialItems));
    setFeedback(null);
    setIsMoved(false);
    setHasValidated(false);
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2">
            {items.map((item, index) => {
              const isCorrect = item.id === correctOrder[index];
              return (
                <DraggableItem
                  key={item.id}
                  id={item.id}
                  isCorrect={isCorrect}
                  feedback={feedback}
                >
                  {item.text}
                </DraggableItem>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
      <div className="w-full mt-4 flex justify-center items-center">
        <button
          onClick={handleValidateClick}
          disabled={!isMoved}
          className={`bg-[#6E3CD2] text-white px-4 py-1 rounded-full mr-2 ${!isMoved ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FontAwesomeIcon icon={faUndo} /> Validar
        </button>
        <button
          onClick={resetItems}
          disabled={!isMoved}
          className={`bg-[#6E3CD2] text-white px-4 py-1 rounded-full mr-2 ${!isMoved ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FontAwesomeIcon icon={faRepeat} /> Reiniciar
        </button>
      </div>
      {feedback && (
        <div className="w-full  flex justify-center items-center">
        <div className="w-full text-center text-white p-1 rounded-lg" style={{ backgroundColor: feedback.color }}>
          {feedback.message}
        </div>
        </div>
      )}
    </div>
  );
}

function DraggableItem({ id, children, isCorrect, feedback }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const { setNodeRef: setDroppableNodeRef } = useDroppable({ id });

  const style = transform
    ? {
        transform: `translate3d(0, ${transform.y}px, 0)`,
      }
    : undefined;

  const itemStyle = {
    ...style,
    padding: "5px",
    border: "1px solid",
    cursor: "grab",
    backgroundColor: "#6E3CD2",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  };

  if (feedback) {
    itemStyle.backgroundColor = isCorrect ? "#009A3D" : "#f44336";
  }

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        setDroppableNodeRef(node);
      }}
      style={itemStyle}
      {...attributes}
      {...listeners}
    >
      {children}
      {feedback && (
        <img
          src={isCorrect ? trueImage : falseImage}
          alt={isCorrect ? "Correcto" : "Incorrecto"}
          style={{ marginLeft: "10px", width: "20px", height: "20px" }}
        />
      )}
    </div>
  );
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default OrdenarPESV;
