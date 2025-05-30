import { useState, useRef, useEffect } from "react";
import paso1 from "../../../assets/img/atencion_inmediata_trabajador.webp";
import paso2 from "../../../assets/img/notificacion_accidente.webp";
import paso3 from "../../../assets/img/reporte_mutualidad.webp";
import paso4 from "../../../assets/img/evaluacion_atencion_medica.webp";
import paso5 from "../../../assets/img/investigacion_interna.webp";
import paso6 from "../../../assets/img/seguimiento_reincorporacion.webp";
import checkIcon from "../../../assets/img/checkAct.png";
import xmarkIcon from "../../../assets/img/xmarkAct.png";
import audioPaso1 from "../../../assets/audio/atencion-inmediata-al-trabajador-m3-slide-23-audio.mp3";
import audioPaso2 from "../../../assets/audio/notificacion-del-accidente-m3-slide-23-audio.mp3";
import audioPaso3 from "../../../assets/audio/reporte-a-la-mutualidad-m3-slide-23-audio.mp3";
import audioPaso4 from "../../../assets/audio/evaluacion-y-atencion-médica-m3-slide-23-audio.mp3";
import audioPaso5 from "../../../assets/audio/investigacion-interna-y-medidas-correctivas-m3-slide-23-audio.mp3";
import audioPaso6 from "../../../assets/audio/seguimiento-y-reincorporacion-m3-slide-23-audio.mp3";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import "./styles/ChileSeleccione.css";
import TranscripcionAudios from "../../components/TranscripcionAudios";

const transcripciones = {
    paso1: [
        { start: 0, end: 3, text: "1: Atención inmediata al trabajador" }
    ],
    paso2: [
        { start: 0, end: 3, text: "2: Notificación del accidente" }
    ],
    paso3: [
        { start: 0, end: 3, text: "3: Reporte a la mutualidad correspondiente" }
    ],
    paso4: [
        { start: 0, end: 3, text: "4: Evaluación y atención médica" }
    ],
    paso5: [
        { start: 0, end: 4, text: "5: Investigación interna y medidas correctivas" }
    ],
    paso6: [
        { start: 0, end: 3, text: "6: Seguimiento y reincorporación" }
    ]
};

const titulosCards = {
    paso1: "Atención inmediata al trabajador",
    paso2: "Notificación del accidente",
    paso3: "Reporte a la mutualidad correspondiente",
    paso4: "Evaluación y atención médica",
    paso5: "Investigación interna y medidas correctivas",
    paso6: "Seguimiento y reincorporación"
};

// Orden fijo desordenado para las cards (no aleatorio)
const cardOrder = [4, 1, 6, 3, 2, 5];

const ChileSeleccione = () => {
  const [selections, setSelections] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
    drop4: "",
    drop5: "",
    drop6: ""
  });
  const [isVerified, setIsVerified] = useState({
    drop1: false,
    drop2: false,
    drop3: false,
    drop4: false,
    drop5: false,
    drop6: false
  });
  const [isResetEnabled, setIsResetEnabled] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [currentAudio, setCurrentAudio] = useState(null);
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const audioRef = useRef(null);

  const items = [
    {
      image: paso1,
      audio: audioPaso1,
      dropId: "drop1",
      correctOption: "Paso 1",
      audioId: "paso1",
      order: cardOrder[0]
    },
    {
      image: paso2,
      audio: audioPaso2,
      dropId: "drop2",
      correctOption: "Paso 2",
      audioId: "paso2",
      order: cardOrder[1]
    },
    {
      image: paso3,
      audio: audioPaso3,
      dropId: "drop3",
      correctOption: "Paso 3",
      audioId: "paso3",
      order: cardOrder[2]
    },
    {
      image: paso4,
      audio: audioPaso4,
      dropId: "drop4",
      correctOption: "Paso 4",
      audioId: "paso4",
      order: cardOrder[3]
    },
    {
      image: paso5,
      audio: audioPaso5,
      dropId: "drop5",
      correctOption: "Paso 5",
      audioId: "paso5",
      order: cardOrder[4]
    },
    {
      image: paso6,
      audio: audioPaso6,
      dropId: "drop6",
      correctOption: "Paso 6",
      audioId: "paso6",
      order: cardOrder[5]
    }
  ].sort((a, b) => a.order - b.order); // Ordenamos según el orden definido

  // Opciones ordenadas para los selects
  const options = ["Paso 1", "Paso 2", "Paso 3", "Paso 4", "Paso 5", "Paso 6"];

  const handleChange = (dropId, value) => {
    setSelections((prev) => {
      const newSelections = { ...prev, [dropId]: value };
      const currentItem = items.find(item => item.dropId === dropId);
      const isCorrect = value === currentItem.correctOption;
      
      setIsVerified((prev) => ({ ...prev, [dropId]: isCorrect }));
      setShowInitialMessage(false); // Ocultamos el mensaje inicial al hacer una selección

      if (isCorrect) {
        setFeedbackMessage("¡Correcto! Ahora, escucha el siguiente audio que complementa esta información");
        setCurrentAudio(null);
        setTimeout(() => {
          setCurrentAudio({
            src: currentItem.audio,
            transcripcion: transcripciones[currentItem.audioId],
            titulo: titulosCards[currentItem.audioId]
          });
        }, 0);
      } else {
        setFeedbackMessage("No has seleccionado correctamente");
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        setCurrentAudio(null);
      }

      setIsResetEnabled(true);
      setCorrectCount(items.filter(item => newSelections[item.dropId] === item.correctOption).length);
      setShowValidationMessage(Object.values(newSelections).every(val => val !== ""));

      return newSelections;
    });
  };

  useEffect(() => {
    if (currentAudio && audioRef.current) {
      const playAudio = async () => {
        try {
          audioRef.current.currentTime = 0;
          await audioRef.current.play();
        } catch (error) {
          console.log("Autoplay prevented:", error);
          setFeedbackMessage(prev => prev + " Haz clic en el botón de play para escuchar el audio.");
        }
      };
      playAudio();
    }
  }, [currentAudio]);

  const handleReset = () => {
    setSelections({
      drop1: "",
      drop2: "",
      drop3: "",
      drop4: "",
      drop5: "",
      drop6: ""
    });
    setIsVerified({
      drop1: false,
      drop2: false,
      drop3: false,
      drop4: false,
      drop5: false,
      drop6: false
    });
    setIsResetEnabled(false);
    setCorrectCount(0);
    setShowValidationMessage(false);
    setFeedbackMessage("");
    setShowInitialMessage(true); // Mostramos el mensaje inicial al reiniciar
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentAudio(null);
  };

  return (
    <div className="quiz-container-chileSORD">
      <div className="cards-container-chileSORD">
        {items.map((item, index) => (
          <div
            className={`card-container-chileSORD ${
              selections[item.dropId] 
                ? isVerified[item.dropId] 
                  ? "correct" 
                  : "incorrect"
                : ""
            }`}
            key={index}
          >
            <div className="image-select-container-chileSORD">
              <div className="image-validation-container-chileSORD">
                <img
                  src={item.image}
                  alt={`Imagen ${index + 1}`}
                  className="step-image-chileSORD"
                />
                {selections[item.dropId] && (
                  <div className="validation-icon-container-chileSORD">
                    <img
                      src={isVerified[item.dropId] ? checkIcon : xmarkIcon}
                      alt="Validation Icon"
                      className="validation-icon-chileSORD"
                    />
                  </div>
                )}
              </div>

              {selections[item.dropId] && (
                <div className={`feedback-text-chileSORD ${
                  isVerified[item.dropId] ? "correct-text" : "incorrect-text"
                }`}>
                  {isVerified[item.dropId] ? "¡Correcto!" : "¡Incorrecto!"}
                </div>
              )}

              <div className="card-title-chileSORD">
                {titulosCards[item.audioId]}
              </div>

              <div className="select-container-chileSORD">
                <select
                  value={selections[item.dropId]}
                  onChange={(e) => handleChange(item.dropId, e.target.value)}
                  disabled={isVerified[item.dropId]}
                  className={
                    selections[item.dropId]
                      ? isVerified[item.dropId]
                        ? "correct-select"
                        : "incorrect-select"
                      : ""
                  }
                >
                  <option value="">Seleccione...</option>
                  {options
                    .filter(
                      (option) =>
                        !Object.values(selections).includes(option) ||
                        selections[item.dropId] === option
                    )
                    .map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {feedbackMessage && (
        <div className={`feedback-message-chileSORD ${
          feedbackMessage.includes("Correcto") ? "success-message" : "error-message"
        }`}>
          {feedbackMessage}
        </div>
      )}

      {showValidationMessage && (
        <div className="results-container-chileSORD text-center mb-2">
          <h3 className="text-md font-bold text-paragraph-light-color text-monserrat">
            Tus respuestas correctas son: {correctCount} de {items.length} (
            {Math.round((correctCount / items.length) * 100)}%)
          </h3>
        </div>
      )}

      {showInitialMessage && !Object.values(selections).some(val => val !== "") && (
        <div className="initial-message-chileSORD">
          Cuando realices la actividad correctamente, aquí escucharás un audio que complementará las opciones
        </div>
      )}

      {currentAudio && (
        <div className="audio-global-container">
          <TranscripcionAudios 
            ref={audioRef}
            src={currentAudio.src}
            transcripcion={currentAudio.transcripcion}
          />
        </div>
      )}

      <div className="reset-button-container-chileSORD">
        <Button
          bold={false}
          icon={faRepeat}
          roundedFull={true}
          onClick={handleReset}
          disabled={!isResetEnabled}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
};

export default ChileSeleccione;