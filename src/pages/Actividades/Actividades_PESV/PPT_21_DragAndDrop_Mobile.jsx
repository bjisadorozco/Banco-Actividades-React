import { useState, useEffect, useRef } from "react";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import { faRepeat, faCheck } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";
import uncheck from "../../../assets/img/xmarkAct.png";
import check from "../../../assets/img/checkAct.png";
import audio1 from "../../../assets/audio/m2_slide21_empresa_construccion.mp3";
import audio2 from "../../../assets/audio/m2_slide21_empresa_mensajeria.mp3";
import audio3 from "../../../assets/audio/m2_slide21_insttucion_salud.mp3";
import "./styles/PPT21_DragAndDrop.css";

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
      <div className="status-bar">
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
      </div>
      <div className="chat-header">
        <div className="user-info">
          <div className="avatar">{name[0]}</div>
          <div className="name">{name}</div>
        </div>
      </div>
    </div>
  );
}

export default function PPT_21_DragAndDrop_Mobile() {
  const [selectedOptions, setSelectedOptions] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
  });
  const [isValidated, setIsValidated] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
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

  const getFilteredOptions = (currentDropId) => {
    const selectedValues = Object.values(selectedOptions).filter(
      (value, index) => `drop${index + 1}` !== currentDropId
    );
    const currentSelectedOption = selectedOptions[currentDropId];

    // Filtra las opciones excluyendo las ya seleccionadas, pero incluye la opción actualmente seleccionada
    return options.filter(
      (option) =>
        !selectedValues.includes(option.id) ||
        option.id === currentSelectedOption
    );
  };

  const isValidateDisabled = Object.values(selectedOptions).some(
    (value) => value === ""
  );

  useEffect(() => {
    const hasSelectedOptions = Object.values(selectedOptions).some(
      (option) => option !== ""
    );
    setIsResetDisabled(!hasSelectedOptions);
  }, [selectedOptions]);

  const handleReset = () => {
    setSelectedOptions({
      drop1: "",
      drop2: "",
      drop3: "",
    });
    setIsValidated(false);
    setCorrectAnswersCount(0);
    setIsResetDisabled(true);
    setValidationMessage("");
  };

  const handleValidation = () => {
    const totalCorrect = Object.values(selectedOptions).filter(
      (optionId, index) => optionId === `option${index + 1}`
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

  const handleSelectChange = (dropId, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [dropId]: value,
    }));
  };

  const handleAudioPlay = (audio) => {
    setPlayingAudio(audio);
  };

  return (
    <div className="container1">
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
                <select
                  value={selectedOptions[`drop${index + 1}`] || ""}
                  onChange={(e) =>
                    handleSelectChange(`drop${index + 1}`, e.target.value)
                  }
                  style={{
                    width: "100%",
                    height: "50px",
                    border: `2px dashed ${
                      isValidated
                        ? selectedOptions[`drop${index + 1}`] ===
                          `option${index + 1}`
                          ? "#4CAF50"
                          : "#F44336"
                        : selectedOptions[`drop${index + 1}`]
                          ? "#0F172A"
                          : "#e2e8f0"
                    }`,
                    borderRadius: "8px",
                    backgroundColor: isValidated
                      ? selectedOptions[`drop${index + 1}`] ===
                        `option${index + 1}`
                        ? "#4CAF50"
                        : "#F44336"
                      : selectedOptions[`drop${index + 1}`]
                        ? "#0F172A"
                        : "#f3f4f6",
                    color: selectedOptions[`drop${index + 1}`]
                      ? "white"
                      : "#0F172A",
                  }}
                >
                  <option value="" disabled>
                    Seleccione...
                  </option>
                  {getFilteredOptions(`drop${index + 1}`).map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {isValidated && (
                  <img
                    src={
                      selectedOptions[`drop${index + 1}`] ===
                      `option${index + 1}`
                        ? check
                        : uncheck
                    }
                    alt={
                      selectedOptions[`drop${index + 1}`] ===
                      `option${index + 1}`
                        ? "Correct"
                        : "Incorrect"
                    }
                    style={{
                      position: "relative",
                      top: "-43px",
                      left: "89%",
                      width: "32px",
                      height: "32px",
                      margin: "0",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

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
          disabled={isValidateDisabled}
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
