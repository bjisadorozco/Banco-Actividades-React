import { useState, useEffect, useRef } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import Button from "../../components/Button";
import { faRepeat, faCheck } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";
import uncheck from "../../../assets/img/xmarkAct.png";
import check from "../../../assets/img/checkAct.png";
import audio1 from "../../../assets/audio/m2_slide21_empresa_construccion.mp3";
import audio2 from "../../../assets/audio/m2_slide21_empresa_mensajeria.mp3";
import audio3 from "../../../assets/audio/m2_slide21_insttucion_salud.mp3";
import "./styles/PPT21_DragAndDrop.css";

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
        width: "30%",
        minWidth: "20%",
        height: "60px",
        padding: "10px",
        backgroundColor: "#0F172A",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        textAlign: "center",
        lineHeight: "1.2rem",
      }}
      {...listeners}
      {...attributes}
    >
      {label}
    </div>
  );
}

// function DropArea({ id, children, isValidated, isCorrect }) {
//   const { isOver, setNodeRef } = useDroppable({
//     id,
//   });
//   const style = {
//     backgroundColor: isValidated
//       ? isCorrect
//         ? "#4CAF50" // Light green
//         : "#F44336" // Light red
//       : children
//         ? "#0F172A"
//         : isOver
//           ? "#e6e6e6"
//           : "#f3f4f6",
//     width: "100%",
//     height: "50px",
//     padding: "1.6rem",
//     border: `2px dashed ${
//       isValidated
//         ? isCorrect
//           ? "#4CAF50"
//           : "#F44336"
//         : children
//           ? "#0F172A"
//           : "#e2e8f0"
//     }`,
//     borderRadius: "8px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     color: isValidated ? "inherit" : "white",
//     lineHeight: "1.2rem",
//   };

//   return (
//     <div ref={setNodeRef} style={style}>
//       {children}
//     </div>
//   );
// }

function DropArea({ id, children, isValidated, isCorrect }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  // Determinar el estilo de fondo y borde basado en las condiciones
  let backgroundColor, borderColor;

  if (isValidated) {
    // Si está validado, usar colores de correcta/incorrecta
    backgroundColor = isCorrect ? "#4CAF50" : "#F44336"; // Verde o rojo
    borderColor = isCorrect ? "#4CAF50" : "#F44336";
  } else if (children) {
    // Si contiene un elemento (ya se soltó algo)
    backgroundColor = "#0F172A";
    borderColor = "#0F172A";
  } else if (isOver) {
    // Si está arrastrando sobre el área
    backgroundColor = "#e6e6e6";
    borderColor = "#0F172A";
  } else {
    // Estado inicial/default
    backgroundColor = "red";
    borderColor = "#e2e8f0";
  }

  const style = {
    backgroundColor,
    width: "100%",
    height: "50px",
    padding: "1.6rem",
    border: `2px dashed ${borderColor}`,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: children || isValidated ? "white" : "inherit",
    lineHeight: "1.2rem",
    position: "relative", // Para posicionar correctamente los íconos
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
      {isValidated && (
        <img
          src={isCorrect ? check : uncheck}
          alt={isCorrect ? "Correct" : "Incorrect"}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            width: "24px",
            height: "24px",
          }}
        />
      )}
    </div>
  );
}

function ChatBubble({ message, isUser = false }) {
  return (
    <div className={`chat-bubble-wrapper ${isUser ? "user" : ""}`}>
      <div className={`chat-bubble ${isUser ? "user" : ""}`}>{message}</div>
    </div>
  );
}

function AudioPlayer({ audio, isPlaying, onPlay }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="audio-player">
      <audio ref={audioRef} controls className="audio-element" onPlay={onPlay}>
        <source src={audio} type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
}

function PhoneHeader({ name }) {
  return (
    <div className="phone-header">
      {/* <div className="status-bar">
        <div className="time">9:41</div>
        <div className="icons">
          <div className="signal">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="wifi">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="battery">
            <div></div>
          </div>
        </div>
      </div> */}
      {/* <div className="chat-header">
        <div className="user-info">
          <div className="avatar">{name[0]}</div>
          <div className="name">{name}</div>
        </div>
      </div> */}
    </div>
  );
}

export default function PPT_21_DragAndDrop() {
  const [verificationImages, setVerificationImages] = useState({});
  const [items, setItems] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
  });
  const [isValidated, setIsValidated] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [playingAudio, setPlayingAudio] = useState(null);

  const chatMessages = [
    {
      name: "Juan",
      greeting: "Hola Juan, como estás?",
      response:
        "Muy bien Tatiana, acá te comparto mi experiencia en la gestión del Riesgo vital con el PESV.",
      farewell: "Entendido, gracias Juan!!",
      audio: audio1,
    },
    {
      name: "Carlos",
      greeting: "Hola Carlos, como estás?",
      response:
        "Muy bien Tatiana, acá te comparto mi experiencia en la gestión del Riesgo vital con el PESV.",
      farewell: "Gracias Carlos, te veo luego!!",
      audio: audio2,
    },
    {
      name: "Pamela",
      greeting: "Hola Pamela, como estás?",
      response:
        "Muy bien Tatiana, acá te comparto mi experiencia en la gestión del Riesgo vital con el PESV.",
      farewell: "Gracias Pamela, feliz día!!",
      audio: audio3,
    },
  ];

  const options = [
    { id: "option1", label: "Empresa de construcción" },
    { id: "option2", label: "Empresa de mensajería y paquetería" },
    { id: "option3", label: "Institución de salud (hospital o clínica)" },
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
    });
    setIsValidated(false);
    setVerificationImages({});
    setCorrectAnswersCount(0);
    setIsResetDisabled(true);
    setValidationMessage("");
  };

  const handleValidation = () => {
    const totalCorrect = Object.values(verificationImages).filter(
      (status) => status === "correct"
    ).length;

    const percentage = Math.round((totalCorrect / options.length) * 100);

    setCorrectAnswersCount(totalCorrect);

    if (totalCorrect === options.length) {
      setValidationMessage(
        `¡Muy bien! Tus respuestas correctas son: ${totalCorrect} de 3 (${percentage}%)`
      );
    } else {
      setValidationMessage(
        `¡Piénsalo bien! Tus respuestas correctas son: ${totalCorrect} de 3 (${percentage}%)`
      );
    }

    setIsValidated(true);
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over && over.id) {
      if (items[over.id]) return;

      const newItem = active.id;
      const isCorrect =
        (over.id === "drop1" && newItem === "option1") ||
        (over.id === "drop2" && newItem === "option2") ||
        (over.id === "drop3" && newItem === "option3");

      setItems((prevItems) => ({
        ...prevItems,
        [over.id]: newItem,
      }));

      setVerificationImages((prev) => ({
        ...prev,
        [over.id]: isCorrect ? "correct" : "incorrect",
      }));
    }
  };

  // function handleDragEnd(event) {
  //   const { over, active } = event;

  //   if (over && over.id) {
  //     if (items[over.id]) return;

  //     const newItem = active.id;
  //     const isCorrect =
  //       (over.id === "drop1" && newItem === "option1") ||
  //       (over.id === "drop2" && newItem === "option2") ||
  //       (over.id === "drop3" && newItem === "option3");

  //     setItems((prevItems) => ({
  //       ...prevItems,
  //       [over.id]: newItem,
  //     }));

  //     setVerificationImages((prev) => ({
  //       ...prev,
  //       [over.id]: isCorrect ? "correct" : "incorrect",
  //     }));

  //     // Validación automática
  //     const totalCorrect = Object.values({
  //       ...verificationImages,
  //       [over.id]: isCorrect ? "correct" : "incorrect",
  //     }).filter((status) => status === "correct").length;

  //     const percentage = Math.round((totalCorrect / options.length) * 100);

  //     setCorrectAnswersCount(totalCorrect);

  //     if (totalCorrect === options.length) {
  //       setValidationMessage(
  //         `¡Muy bien! ¡Este es un riesgo de la actividad seleccionada!\nTus respuestas correctas son: ${totalCorrect} de 3 (${percentage}%)`
  //       );
  //     } else {
  //       setValidationMessage(
  //         `¡Piénsalo bien! Este riesgo no se relaciona con la actividad seleccionada\nTus respuestas correctas son: ${totalCorrect} de 3 (${percentage}%)`
  //       );
  //     }

  //     setIsValidated(true);
  //   }
  // }

  const isCorrectMatch = (dropId, optionId) => {
    const matches = {
      drop1: "option1",
      drop2: "option2",
      drop3: "option3",
    };
    return matches[dropId] === optionId;
  };

  const areAllItemsDropped = Object.values(items).every(
    (item) => item !== null
  );

  const handleAudioPlay = (audio) => {
    setPlayingAudio(audio);
  };

  return (
    <div className="container1">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="chat-grid">
          {chatMessages.map((chat, index) => (
            <div key={index} className="phone-container">
              <PhoneHeader name={chat.name} />
              <div className="chat-content">
                <ChatBubble message={chat.greeting} isUser />
                <ChatBubble message={chat.response} />
                <AudioPlayer
                  audio={chat.audio}
                  isPlaying={playingAudio === chat.audio}
                  onPlay={() => handleAudioPlay(chat.audio)}
                />
                <ChatBubble message={chat.farewell} isUser />
                <div className="area">
                  <DropArea
                    id={`drop${index + 1}`}
                    isCorrect={
                      isValidated &&
                      isCorrectMatch(
                        `drop${index + 1}`,
                        items[`drop${index + 1}`] || ""
                      )
                    }
                    isValidated={isValidated}
                  >
                    {items[`drop${index + 1}`] &&
                      options.find(
                        (opt) => opt.id === items[`drop${index + 1}`]
                      )?.label}
                    {isValidated && (
                      <img
                        src={
                          verificationImages[`drop${index + 1}`] === "correct"
                            ? check
                            : uncheck
                        }
                        alt={
                          verificationImages[`drop${index + 1}`] === "correct"
                            ? "Correct"
                            : "Incorrect"
                        }
                        style={{
                          top: "0px",
                          right: "-10px",
                          width: "32px",
                          height: "32px",
                        }}
                      />
                    )}
                  </DropArea>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="options-container">
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
        <div className="justify-center" style={{ display: "flex" }}>
          <p
            className={`validation-message ${
              validationMessage.includes("Muy bien") ? "successs" : "errors"
            }`}
          >
            {validationMessage}
          </p>
        </div>
      )}

      <div className="content-button">
        <Button
          onClick={handleValidation}
          icon={faCheck}
          roundedFull={true}
          disabled={!areAllItemsDropped}
        >
          Validar
        </Button>
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
