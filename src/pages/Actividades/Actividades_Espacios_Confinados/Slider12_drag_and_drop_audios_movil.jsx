import { useState, useEffect, useRef } from "react";
import Button from "../../components/Button";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import "./styles/Slider12_drag_and_drop_audios.css";
import TranscripcionAudios from "../../components/TranscripcionAudios";
import audioSeguridad from "../../../assets/audio/sld13_procedimiento_recaste-Ca.mp3";
import audioVelocidad from "../../../assets/audio/sld13_procedimiento_evacuacion-CLE.mp3";
import audioComunicacion from "../../../assets/audio/sld13_plan_para_respuesta_emer.mp3";

export default function slider12_drag_and_drop_audios_movil() {
  const [correctAnswersMessage, setCorrectAnswersMessage] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
  });

  const [message, setMessage] = useState("");
  const [cardStatus, setCardStatus] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
  });

  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState(null);

  // Referencias para los audios
  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);
  const audioRef3 = useRef(null);

  const options = [
    { id: "option1", label: "Procedimiento de rescate" },
    { id: "option2", label: "Procediminento de evacuación" },
    { id: "option3", label: "Plan para respuestas a emergencia" },
  ];

  const audios = [audioSeguridad, audioVelocidad, audioComunicacion];

  // Definir las transcripciones para cada audio
  const TRANSCRIPCIONES = {
    audio1: [
      { end: 1.9, start: 0, text: "Procedimiento de rescate." },
      { end: 6.12, start: 1.9, text: "Este es un instrumento específico que detalle el proceso a seguir" },
      { end: 7.6, start: 6.12, text: "en una situación de rescate." }
    ],
    audio2: [
      { end: 2.32, start: 0, text: "Procedimiento de evacuación." },
      { end: 6.92, start: 2.32, text: "Este procedimiento debe describir las circunstancias que requieren su activación" },
      { end: 12, start: 6.92, text: "como cambios atmosféricos, estructurales o la activación de energías potenciales." }
    ],
    audio3: [
      { end: 2.7, start: 0, text: "Plan para respuesta a emergencias." },
      { end: 5.4, start: 2.7, text: "Este instrumento busca armonizar la estructura" },
      { end: 7.56, start: 5.4, text: "y los recursos de una organización" },
      { end: 10.96, start: 7.56, text: "para una respuesta efectiva ante emergencias." },
      { end: 14.84, start: 10.96, text: "Este debe identificar los escenarios de riesgo potenciales" },
      { end: 17.72, start: 14.84, text: "asociados a las actividades en espacios confinados" },
      { end: 19.62, start: 17.72, text: "y asegurar que cada escenario" },
      { end: 22.8, start: 19.62, text: "cuente con un procedimiento específico para su atención." }
    ]
  };

  useEffect(() => {
    shuffleOptions();
  }, []);

  const shuffleOptions = () => {
    const shuffled = [...options].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  };

  const handleAudioPlay = (audioId) => {
    // Si hay un audio reproduciéndose y es diferente al que se quiere reproducir, lo detenemos
    if (currentPlayingAudio && currentPlayingAudio !== audioId) {
      pauseAudio(currentPlayingAudio);
    }

    // Actualizamos el estado para indicar qué audio está sonando
    setCurrentPlayingAudio(audioId);
  };

  // Función para pausar un audio específico
  const pauseAudio = (audioId) => {
    let audioToStop;

    switch (audioId) {
      case "audio1":
        audioToStop = audioRef1.current;
        break;
      case "audio2":
        audioToStop = audioRef2.current;
        break;
      case "audio3":
        audioToStop = audioRef3.current;
        break;
      default:
        return;
    }

    if (audioToStop) {
      audioToStop.pause();
      audioToStop.currentTime = 0;
    }
  };

  // Función para pausar todos los audios
  const pauseAllAudios = () => {
    if (audioRef1.current) {
      audioRef1.current.pause();
      audioRef1.current.currentTime = 0;
    }
    if (audioRef2.current) {
      audioRef2.current.pause();
      audioRef2.current.currentTime = 0;
    }
    if (audioRef3.current) {
      audioRef3.current.pause();
      audioRef3.current.currentTime = 0;
    }
    setCurrentPlayingAudio(null);
  };

  const handleSelectChange = (event, dropId) => {
    const { value } = event.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [dropId]: value,
    }));
  };

  const handleValidate = () => {
    const correctAnswers = {
      drop1: "option1",
      drop2: "option2",
      drop3: "option3",
    };

    const newCardStatus = { ...cardStatus };
    let totalCorrect = 0;

    Object.keys(correctAnswers).forEach((key) => {
      if (selectedOptions[key] === correctAnswers[key]) {
        newCardStatus[key] = "correct"; // Verde si es correcto
        totalCorrect++;
      } else {
        newCardStatus[key] = "incorrect"; // Rojo si es incorrecto
      }
    });

    setCardStatus(newCardStatus);

    const percentage = Math.round(
      (totalCorrect / Object.keys(correctAnswers).length) * 100
    );

    setMessage(
      totalCorrect === Object.keys(correctAnswers).length
        ? `¡Muy bien! Estás listo para profundizar en los elementos de manejo de emergencias​.`
        : `¡Piénsalo bien! ¡Escucha nuevamente el audio y vuelve a intentarlo!`
    );

    // Mensaje adicional con las respuestas correctas
    setCorrectAnswersMessage(
      `Tus respuestas correctas son: ${totalCorrect} de 3 (${percentage}%).`
    );
  };

  const handleReset = () => {
    setSelectedOptions({
      drop1: "",
      drop2: "",
      drop3: "",
    });
    setCardStatus({
      drop1: "",
      drop2: "",
      drop3: "",
    });
    setMessage("");
    setCorrectAnswersMessage("");
    shuffleOptions();
    pauseAllAudios();
  };

  const getAvailableOptions = (currentDropId) => {
    const selectedValues = Object.values(selectedOptions).filter(
      (value) => value !== "" && value !== selectedOptions[currentDropId]
    );
    return shuffledOptions.filter((option) => !selectedValues.includes(option.id));
  };

  const isValidateDisabled = Object.values(selectedOptions).some(
    (value) => value === ""
  );
  const isResetDisabled = Object.values(selectedOptions).every(
    (value) => value === ""
  );

  return (
    <div
      className="flex flex-col items-center gap-6"
      style={{ width: "90%", gap: "20px", padding: "0" }}
    >
      {audios.map((audio, index) => {
        const dropId = `drop${index + 1}`;
        const audioId = `audio${index + 1}`;
        const cardColor =
          cardStatus[dropId] === "correct"
            ? "#4CAF50" // Verde
            : cardStatus[dropId] === "incorrect"
              ? "#F44336" // Rojo
              : "#FFFFFF"; // Blanco (sin validar)

        return (
          <div
            key={dropId}
            className="p-4 border rounded-lg shadow-md flex flex-col items-center"
            style={{
              backgroundColor: cardColor,
              transition: "background-color 0.3s ease",
              borderColor: "#e2e8f0",
              width: "100%"
            }}
          >
            {/* Componente de audio con transcripción */}
            <div style={{ width: "100%", position: "relative" }}>
              <TranscripcionAudios
                ref={index === 0 ? audioRef1 : index === 1 ? audioRef2 : audioRef3}
                src={audio}
                transcripcion={TRANSCRIPCIONES[audioId]}
                onPlay={() => handleAudioPlay(audioId)}
              />
            </div>

            {/* Selector */}
            <select
              value={selectedOptions[dropId]}
              onChange={(event) => handleSelectChange(event, dropId)}
              className={`${cardStatus[dropId] === "correct" ? "select-correct" : cardStatus[dropId] === "incorrect" ? "select-incorrect" : ""}`}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                padding: "8px",
                fontSize: "16px",
                marginTop: "15px",
              }}
            >
              <option value="">Seleccione...</option>
              {getAvailableOptions(dropId).map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      })}

      {message && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            color: "white",
            backgroundColor: message.includes("Muy bien")
              ? "#4CAF50"
              : "#F44336",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}
      {correctAnswersMessage && (
        <div className="correct-answers-message">{correctAnswersMessage}</div>
      )}

      <div className="flex justify-center gap-4" style={{ padding: "0" }}>
        <Button
          onClick={handleValidate}
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