import "./styles/DragAndDropAudios.css";
import { useState } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import Button from "../../components/Button";
import audioSeguridad from "../../../assets/audio/Alturas seguridad M3 – Slide 28 Audio.mp3";
import audioVelocidad from "../../../assets/audio/Alturas velocidad M3 – Slide 28 Audio.mp3";
import audioComunicacion from "../../../assets/audio/Alturas comunicacion M3 – Slide 28 Audio.mp3";
import uncheck from "../../../assets/img/xmarkAct.png";
import check from "../../../assets/img/checkAct.png";

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
      className="draggable-option"
      style={style}
      {...listeners}
      {...attributes}
    >
      {label}
    </div>
  );
}

function DropArea({ id, children, isCorrect, verificationImage }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`drop-area ${isOver ? "drop-area" : ""} ${children ? "drop-area-filled" : ""} ${isCorrect !== null ? (isCorrect ? "drop-area-correct" : "drop-area-incorrect") : ""}`}
    >
      {children && <div className="drop-area-content">{children}</div>}
      {verificationImage && (
        <img
          src={verificationImage === "correct" ? check : uncheck}
          alt={verificationImage}
          className="verification-image"
        />
      )}
    </div>
  );
}

export default function DragAndDropAudios() {
  const [items, setItems] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
  });

  const [validation, setValidation] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
  });

  const [message, setMessage] = useState("");

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  );

  const options = [
    { id: "option1", label: "Seguridad" },
    { id: "option2", label: "Velocidad" },
    { id: "option3", label: "Comunicación" },
  ];

  const audios = [audioSeguridad, audioVelocidad, audioComunicacion];

  const verificationImages = {
    drop1:
      validation.drop1 !== null
        ? validation.drop1
          ? "correct"
          : "incorrect"
        : null,
    drop2:
      validation.drop2 !== null
        ? validation.drop2
          ? "correct"
          : "incorrect"
        : null,
    drop3:
      validation.drop3 !== null
        ? validation.drop3
          ? "correct"
          : "incorrect"
        : null,
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over && over.id) {
      if (items[over.id]) return;

      setItems((prevItems) => {
        const updatedItems = {
          ...prevItems,
          [over.id]: active.id,
        };
        validateDrop(over.id, active.id);
        return updatedItems;
      });
    }
  };

  const validateDrop = (dropId, optionId) => {
    const correctAnswers = {
      drop1: "option1",
      drop2: "option2",
      drop3: "option3",
    };

    const isCorrect = correctAnswers[dropId] === optionId;

    setValidation((prevValidation) => ({
      ...prevValidation,
      [dropId]: isCorrect,
    }));

    setMessage(
      isCorrect
        ? "¡Muy bien! Estas listo para profundizar en los elementos de manejo de Rescate en trabajo en alturas​"
        : "¡Piénsalo bien! Escucha de nuevo el audio para relacionarlo correctamente​"
    );
  };

  const handleReset = () => {
    setItems({
      drop1: null,
      drop2: null,
      drop3: null,
    });
    setValidation({
      drop1: null,
      drop2: null,
      drop3: null,
    });
    setMessage("");
  };

  return (
    <div className="drag-and-drop-container">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {options.map((option, index) => (
          <div key={option.id} className="drag-and-drop-row">
            <div className="drag-and-drop-items">
              <DraggableOption
                id={option.id}
                label={option.label}
                isDropped={Object.values(items).includes(option.id)}
              />
              <DropArea
                id={`drop${index + 1}`}
                isCorrect={validation[`drop${index + 1}`]}
                verificationImage={verificationImages[`drop${index + 1}`]}
              >
                {items[`drop${index + 1}`] &&
                  options.find((opt) => opt.id === items[`drop${index + 1}`])
                    ?.label}
              </DropArea>
            </div>
            <div
              className={`audio-card ${
                validation[`drop${index + 1}`] === true
                  ? "drop-area-correct"
                  : ""
              } ${
                validation[`drop${index + 1}`] === false
                  ? "drop-area-incorrect"
                  : ""
              }`}
            >
              <audio controls className="audio-control">
                <source src={audios[index]} type="audio/mp3" />
                Tu navegador no soporta audio HTML5.
              </audio>
            </div>
          </div>
        ))}
      </DndContext>

      <div className="button-group">
        <Button onClick={handleReset} icon="faRepeat" roundedFull={true}>
          Reiniciar
        </Button>
      </div>

      {message && (
        <div
          className={`message ${message.includes("Muy bien") ? "message-success" : "message-error"}`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
