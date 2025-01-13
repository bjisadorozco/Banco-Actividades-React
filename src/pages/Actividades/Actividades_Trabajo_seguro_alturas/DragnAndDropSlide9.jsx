import { useState, useEffect } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";

import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";

function DraggableOption({ id, label, isDropped }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  if (isDropped) {
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        width: "190px", // Incrementado el ancho en 20px
        height: "60px",
        backgroundColor: "#C0185D",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        fontWeight: "bold",
        textAlign: "center",
      }}
      {...listeners}
      {...attributes}
      className="draggable-option cursor-pointer"
    >
      {label}
    </div>
  );
}

function DropArea({ id, children, verificationImage }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver
      ? "#e6e6e6"
      : children
        ? verificationImage === "correct"
          ? "#4CAF50" // Verde
          : "#F44336" // Rojo
        : "#e6e6e6",
    width: "90%",
    height: "50px",
    border: `2px dashed ${
      isOver
        ? "gray"
        : children
          ? verificationImage === "correct"
            ? "#4CAF50" // Verde
            : "#F44336" // Rojo
          : "gray"
    }`,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px", // Espaciado entre texto y DropArea
  };

  return (
    <div ref={setNodeRef} style={style} className="drop-area">
      {children}
    </div>
  );
}

export default function DragAndDropSlide9() {
  const [verificationImages, setVerificationImages] = useState({});
  const [items, setItems] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
    drop4: null,
  });
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [isResetDisabled, setIsResetDisabled] = useState(true);  
  const [validationMessage, setValidationMessage] = useState("");

  const options = [
    {
      id: "option1",
      text: "Golpes con la estructura durante el movimiento vertical​",
      label: "Labores en fachadas y paredes​",
    },
    {
      id: "option2",
      text: "Colapso del andamio por mal montaje o sobrecarga.​",
      label: "Trabajos en andamios​",
    },
    {
      id: "option3",
      text: "Caídas por pérdida de estabilidad en superficies inclinadas.​",
      label: "Trabajos en techos y cubiertas​",
    },
    {
      id: "option4",
      text: "Desplazamiento de herramientas o materiales desde alturas que impacten a trabajadores en niveles inferiores​​",
      label: "Trabajos en andamios​​",
    },
  ];

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  useEffect(() => {
    const hasDroppedItems = Object.values(items).some((item) => item !== null);
    setIsResetDisabled(!hasDroppedItems);
  }, [items]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  );

  const handleReset = () => {
    setItems({
      drop1: null,
      drop2: null,
      drop3: null,
      drop4: null,
    });
    setFeedback("");
    setVerificationImages({});
    setCorrectAnswersCount(0);
    setIsResetDisabled(true); // Deshabilitar el botón al reiniciar    
    setValidationMessage("");
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over && over.id) {
      if (items[over.id]) return; // Previene duplicados

      setItems((prevItems) => ({
        ...prevItems,
        [over.id]: active.id,
      }));

      const isCorrect =
        (over.id === "drop1" && active.id === "option1") ||
        (over.id === "drop2" && active.id === "option2") ||
        (over.id === "drop3" && active.id === "option3") ||
        (over.id === "drop4" && active.id === "option4")

      setVerificationImages((prev) => ({
        ...prev,
        [over.id]: isCorrect ? "correct" : "incorrect",
      }));

      // setValidationMessages((prevMessages) => ({
      //   ...prevMessages,
      //   [over.id]: {
      //     text: isCorrect ? "Respuesta correcta: ¡Muy bien ! ¡Este es un riesgo de la actividad seleccionada !​" 
      //     : "Respuesta Incorrecta: ¡Piénsalo bien! Este riesgo no se relaciona con la actividad seleccionada​",
      //     class: isCorrect ? "success" : "error",
      //   },
      // }));

      setValidationMessage(
        isCorrect
          ? "Respuesta correcta: ¡Muy bien ! ¡Este es un riesgo de la actividad seleccionada !"
          : "Respuesta Incorrecta: ¡Piénsalo bien! Este riesgo no se relaciona con la actividad seleccionada"
      );

      if (isCorrect) {
        setCorrectAnswersCount((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="flex flex-col overflow-x-hidden mb-36">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex flex-row justify-center gap-4 mb-4">
          {options.map((option, index) => (
            <div
              key={option.id}
              className="p-6 mt-4 border rounded-lg bg-white shadow-md flex flex-col items-center"
              style={{
                width: "350px",
                justifyContent: "space-between",
                textAlign: "left",
              }}
            >
              <Paragraph theme="light" justify="center">
                {option.text}
              </Paragraph>
              
              <div style={{ width: "100%" }}>
                <DropArea
                  id={`drop${index + 1}`}
                  verificationImage={verificationImages[`drop${index + 1}`]}
                >
                  {items[`drop${index + 1}`] &&
                    options.find((opt) => opt.id === items[`drop${index + 1}`])
                      ?.label}
                </DropArea>
              </div>
                
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-center gap-4">
          {options.map((option) => (
            <DraggableOption
              key={option.id}
              id={option.id}
              label={option.label}
              isDropped={Object.values(items).includes(option.id)}
            />
          ))}
        </div>
      </DndContext>
      {validationMessage && (
          <div className="feedback-container">
            <p className={`validation-message ${validationMessage.includes("¡Muy bien!") ? "success" : "error"}`}>
              {validationMessage}
            </p>
          </div>
        )}

      <div className="flex justify-center mt-4">
        <Button
          onClick={handleReset}
          icon={faRepeat}
          roundedFull={true}
          disabled={isResetDisabled}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
}
