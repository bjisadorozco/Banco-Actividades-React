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
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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

  // Estado para habilitar/deshabilitar botones
  const [isResetEnabled, setIsResetEnabled] = useState(false);
  const [isValidateEnabled, setIsValidateEnabled] = useState(false);
  const [correctAnswersMessage, setCorrectAnswersMessage] = useState("");

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  );

  const options = [
    { id: "option1", label: "Procedimiento de rescate" },
    { id: "option2", label: "Procediminento de evacuación" },
    { id: "option3", label: "Plan para respuestas a emergencia" },
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

      const updatedItems = {
        ...items,
        [over.id]: active.id,
      };

      setItems(updatedItems);

      // Habilitar botón de reinicio si al menos un drop tiene un item
      setIsResetEnabled(
        Object.values(updatedItems).some((item) => item !== null)
      );

      // Habilitar botón de validar si todos los drops tienen items
      setIsValidateEnabled(
        Object.values(updatedItems).every((item) => item !== null)
      );
    }
  };

  const handleValidation = () => {
    const correctAnswers = {
      drop1: "option1",
      drop2: "option2",
      drop3: "option3",
    };

    let totalCorrect = 0;

    const updatedValidation = Object.keys(items).reduce((acc, dropId) => {
      const isCorrect = correctAnswers[dropId] === items[dropId];
      if (isCorrect) totalCorrect++;
      acc[dropId] = isCorrect;
      return acc;
    }, {});

    setValidation(updatedValidation);

    const percentage = Math.round(
      (totalCorrect / Object.keys(correctAnswers).length) * 100
    );

    setMessage(
      totalCorrect === Object.keys(correctAnswers).length
        ? "¡Muy bien! Estás listo para profundizar en los elementos de manejo de emergencias​."
        : "¡Piénsalo bien! ¡Escucha nuevamente el audio y vuelve a intentarlo!"
    );

    // Mensaje adicional con las respuestas correctas
    setCorrectAnswersMessage(
      `Tus respuestas correctas son: ${totalCorrect} de 3 (${percentage}%).`
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
    setCorrectAnswersMessage("");
    setIsResetEnabled(false);
    setIsValidateEnabled(false);
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

      <div className="buttons">
        <Button
          onClick={handleValidation}
          icon={faCheck}
          roundedFull={true}
          bold={false}
          disabled={!isValidateEnabled}
        >
          Validar
        </Button>
        <Button
          onClick={handleReset}
          icon={faRepeat}
          roundedFull={true}
          disabled={!isResetEnabled}
        >
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
      {correctAnswersMessage && (
        <div className="correct-answers-message">{correctAnswersMessage}</div>
      )}
    </div>
  );
}
