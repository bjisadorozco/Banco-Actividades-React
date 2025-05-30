import { useState, useRef, useEffect } from "react";
import mano1 from "../../../assets/img/fisicas_correccion_sin_ruido_visual.webp";
import mano2 from "../../../assets/img/economicas_correccion-sin_flecha.webp";
import mano3 from "../../../assets/img/laborales_con_fondo_sld5.webp";
import checkIcon from "../../../assets/img/checkAct.png";
import xmarkIcon from "../../../assets/img/xmarkAct.png";
import audioFisicas from "../../../assets/audio/fisicas-m1-slide-8-audio.mp3";
import audioEconomicas from "../../../assets/audio/economicas-m1-slide-8-audio.mp3";
import audioLaborales from "../../../assets/audio/LABORALES.mp3";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import "./styles/ChileDAD.css";
import TranscripcionAudios from "../../components/TranscripcionAudios";

const transcripciones = {
    fisicas: [
        { start: 0, end: 5, text: "FÍSICAS: Las lesiones en las manos pueden variar desde cortes leves hasta fracturas, " },
        { start: 5, end: 12, text: "quemaduras graves o amputaciones, lo que en casos extremos puede llevar a una discapacidad parcial" },
        { start: 12, end: 17, text: "o total que limite al trabajador en sus actividades diarias o profesionales " }
      ],
  economicas: [
    { start: 0, end: 6, text: "ECONÓMICAS: Las lesiones en las manos generan importantes consecuencias económicas." },
    { start: 7, end: 15, text: "Los gastos médicos, como hospitalización, cirugías y rehabilitación, suelen ser altos y cubiertos por seguros de la empresa." },
    { start: 16, end: 20, text: "Además, el trabajador puede experimentar una pérdida de ingresos," },
    { start: 20, end: 26, text: "ya que el seguro de incapacidad temporal no siempre cubre el salario completo " },
  ],
  laborales: [
    { start: 0, end: 5, text: "LABORALES: Las lesiones en las manos pueden causar licencias prolongadas, " },
    { start: 5, end: 10, text: "afectando la productividad y los plazos en el cumplimiento de las entregas." },
    { start: 10, end: 15, text: "Dependiendo de la gravedad, el trabajador podría no recuperar su capacidad plena," },
    { start: 15, end: 17, text: "lo que podría resultar en reasignaciones de tareas," },
    { start: 17, end: 22, text: "reducción de responsabilidades o la imposibilidad de seguir en su profesión " },
  ]
};

const ChileDAD = () => {
  const [selections, setSelections] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
  });
  const [isVerified, setIsVerified] = useState({
    drop1: false,
    drop2: false,
    drop3: false,
  });
  const [isResetEnabled, setIsResetEnabled] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRef = useRef(null);

  const items = [
    {
      image: mano1,
      audio: audioFisicas,
      dropId: "drop1",
      correctOption: "Físicas",
      audioId: "fisicas"
    },
    {
      image: mano2,
      audio: audioEconomicas,
      dropId: "drop2",
      correctOption: "Económicas",
      audioId: "economicas"
    },
    {
      image: mano3,
      audio: audioLaborales,
      dropId: "drop3",
      correctOption: "Laborales",
      audioId: "laborales"
    },
  ];

  const options = ["Económicas", "Laborales", "Físicas"];

  const handleChange = (dropId, value) => {
    setSelections((prev) => {
      const newSelections = { ...prev, [dropId]: value };
      const currentItem = items.find(item => item.dropId === dropId);
      const isCorrect = value === currentItem.correctOption;
      
      setIsVerified((prev) => ({ ...prev, [dropId]: isCorrect }));

      if (isCorrect) {
        setFeedbackMessage("¡Correcto! Ahora, escucha el siguiente audio que complementa esta información");
        // Forzar un cambio en el estado para asegurar que el efecto se dispare
        setCurrentAudio(null); // Primero limpiamos
        setTimeout(() => { // Luego en el siguiente ciclo de renderizado establecemos el nuevo audio
          setCurrentAudio({
            src: currentItem.audio,
            transcripcion: transcripciones[currentItem.audioId]
          });
        }, 0);
      } else {
        setFeedbackMessage("No has seleccionado correctamente");
        // Detener y quitar el audio cuando la respuesta es incorrecta
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

  // Efecto para manejar el autoplay
  useEffect(() => {
    if (currentAudio && audioRef.current) {
      const playAudio = async () => {
        try {
          // Resetear el audio antes de reproducir
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
    });
    setIsVerified({
      drop1: false,
      drop2: false,
      drop3: false,
    });
    setIsResetEnabled(false);
    setCorrectCount(0);
    setShowValidationMessage(false);
    setFeedbackMessage("");
    // Detener y quitar el audio al reiniciar
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentAudio(null);
  };

  return (
    <div className="quiz-container-chileDAD">
      <div className="cards-container-chileDAD">
        {items.map((item, index) => (
          <div
            className={`card-container-chileDAD ${
              selections[item.dropId] 
                ? isVerified[item.dropId] 
                  ? "correct" 
                  : "incorrect"
                : ""
            }`}
            key={index}
          >
            <div className="image-select-container-chileDAD">
              <div className="image-validation-container-chileDAD">
                <img
                  src={item.image}
                  alt={`Imagen ${index + 1}`}
                  className="circular-image-chileDAD"
                />
                {selections[item.dropId] && (
                  <>
                    <div className="validation-icon-container-chileDAD">
                      <img
                        src={isVerified[item.dropId] ? checkIcon : xmarkIcon}
                        alt="Validation Icon"
                        className="validation-icon-chileDAD"
                      />
                    </div>
                    <div className={`feedback-text-chileDAD ${
                      isVerified[item.dropId] ? "correct-text" : "incorrect-text"
                    }`}>
                      {isVerified[item.dropId] ? "¡Correcto!" : "¡Incorrecto!"}
                    </div>
                  </>
                )}
              </div>

              <div className="select-container-chileDAD">
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
        <div className={`feedback-message-chileDAD ${
          feedbackMessage.includes("Correcto") ? "success-message" : "error-message"
        }`}>
          {feedbackMessage}
        </div>
      )}

      {showValidationMessage && (
        <div className="results-container-chileDAD text-center mb-2">
          <h3 className="text-md font-bold text-paragraph-light-color text-monserrat">
            Tus respuestas correctas son: {correctCount} de {items.length} (
            {Math.round((correctCount / items.length) * 100)}%)
          </h3>
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

      <div className="reset-button-container-chileDAD">
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

export default ChileDAD;