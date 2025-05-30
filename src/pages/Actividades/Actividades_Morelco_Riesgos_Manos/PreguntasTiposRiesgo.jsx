import React, { useState, useEffect, useRef } from "react";
import Audio1 from "../../../assets/audio/velocidad-m2-slide-21.mp3";
import Audio2 from "../../../assets/audio/comunicación-m2-slide-21.mp3";
import Audio3 from "../../../assets/audio/seguridad-m2-slide-21.mp3";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import correctIcon from "../../../assets/img/checkAct.png";
import incorrectIcon from "../../../assets/img/xmarkAct.png";
import "./styles/PreguntasTiposRiesgo.css";
import TranscripcionAudios from "../../components/TranscripcionAudios";

const OPTIONS = [
  { value: "seguridad", label: "seguridad" },
  { value: "velocidad", label: "velocidad" },
  { value: "comunicación", label: "comunicación" },
];

const CORRECT_ANSWERS = {
  select1: "velocidad",
  select2: "comunicación",
  select3: "seguridad",
};

const TRANSCRIPCIONES = {
  audio1: [
    { start: 0, end: 1, text: "Velocidad:" },
    { start: 1, end: 3, text: "Aunque la seguridad es primordial," },
    { start: 3, end: 6, text: " la velocidad es también un factor importante," },
    { start: 6, end: 9, text: "ya que el tiempo de respuesta puede marcar la diferencia" },
    { start: 9, end: 12, text: "en la supervivencia de la víctima." }
  ],
  audio2: [
    { start: 0, end: 1, text: "Comunicación: " },
    { start: 1, end: 4, text: "Una comunicación clara y efectiva" },
    { start: 4, end: 6, text: "es esencial para coordinar las acciones" },
    { start: 6, end: 9, text: "de todos los involucrados en el rescate." }
  ],
  audio3: [
    { start: 0, end: 1, text: "Seguridad: " },
    { start: 1, end: 4, text: "La seguridad es la máxima prioridad en todas" },
    { start: 4, end: 6, text: "las operaciones de rescate." }
  ]
};

export default function PreguntasTiposRiesgo() {
  const [selections, setSelections] = useState({
    select1: "",
    select2: "",
    select3: "",
  });
  const [feedback, setFeedback] = useState("");
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [validationStatus, setValidationStatus] = useState({});
  const [showValidateError, setShowValidateError] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState(null);

  // Referencias a los elementos de audio
  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);
  const audioRef3 = useRef(null);

  useEffect(() => {
    const hasAnySelection = Object.values(selections).some(
      (value) => value !== ""
    );
    setIsResetDisabled(!hasAnySelection);
    setShowValidateError(false);
  }, [selections]);

  // Función para manejar la reproducción de audio
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

  // Escuchar eventos de reproducción de audio
  useEffect(() => {
    const handleAudioEnded = () => {
      setCurrentPlayingAudio(null);
    };

    // Añadir event listeners para detectar cuando termina un audio
    const addEndedListeners = () => {
      if (audioRef1.current) {
        audioRef1.current.addEventListener('ended', handleAudioEnded);
      }
      if (audioRef2.current) {
        audioRef2.current.addEventListener('ended', handleAudioEnded);
      }
      if (audioRef3.current) {
        audioRef3.current.addEventListener('ended', handleAudioEnded);
      }
    };

    // Intentar añadir los listeners inmediatamente
    addEndedListeners();
    
    // Y también después de un breve retraso para asegurar que los refs estén disponibles
    const timer = setTimeout(addEndedListeners, 500);

    return () => {
      clearTimeout(timer);
      // Limpiar event listeners
      if (audioRef1.current) {
        audioRef1.current.removeEventListener('ended', handleAudioEnded);
      }
      if (audioRef2.current) {
        audioRef2.current.removeEventListener('ended', handleAudioEnded);
      }
      if (audioRef3.current) {
        audioRef3.current.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, []);

  const handleSelectChange = (selectId, value) => {
    setSelections((prev) => ({
      ...prev,
      [selectId]: value,
    }));
    setFeedback("");
    setValidationStatus({});
  };

  const getAvailableOptions = (currentSelectId) => {
    const selectedValues = Object.entries(selections)
      .filter(([key, value]) => key !== currentSelectId && value !== "")
      .map(([_, value]) => value);

    return OPTIONS.filter((option) => !selectedValues.includes(option.value));
  };

  const handleReset = () => {
    setSelections({
      select1: "",
      select2: "",
      select3: "",
    });
    setFeedback("");
    setValidationStatus({});
    setShowValidateError(false);
    pauseAllAudios();
  };

  const validateAnswers = () => {
    const allSelected = Object.values(selections).every(
      (value) => value !== ""
    );

    if (!allSelected) {
      setShowValidateError(true);
      return;
    }

    const results = {
      select1: selections.select1 === CORRECT_ANSWERS.select1,
      select2: selections.select2 === CORRECT_ANSWERS.select2,
      select3: selections.select3 === CORRECT_ANSWERS.select3,
    };

    setValidationStatus(results);

    const correctCount = Object.values(results).filter(Boolean).length;
    setCorrectCount(correctCount);
    const percentage = Math.round((correctCount / 3) * 100);
    setPercentage(percentage);
    setFeedback(
      correctCount === 3
        ? `¡Correcto! Todas las respuestas son correctas. (${percentage}%)`
        : `Tienes ${correctCount} de 3 respuestas correctas. Intenta de nuevo. (${percentage}%)`
    );
  };

  const getContainerClassName = (selectId) => {
    if (Object.keys(validationStatus).length === 0) return "ctItem1";
    return `ctItem1 ${
      validationStatus[selectId] ? "correcto-container" : "incorrecto-container"
    }`;
  };

  const getSelectClassName = (selectId) => {
    if (Object.keys(validationStatus).length === 0) return "form-select1";
    return `form-select1 ${validationStatus[selectId] ? "correct" : "incorrect"}`;
  };

  return (
    <div className="main-container1">
      <div className="activity-container1">
        <div className="questions-grid1">
          <div className="col-md-6">
            <div className="preguntas_01">
              <div className={getContainerClassName("select1")}>
                <div className="audio-container1 mb-0">
                  <TranscripcionAudios
                    ref={audioRef1}
                    src={Audio1}
                    transcripcion={TRANSCRIPCIONES.audio1}
                    onPlay={() => handleAudioPlay("audio1")}
                  />
                </div>
                <select
                  className={getSelectClassName("select1")}
                  value={selections.select1}
                  onChange={(e) =>
                    handleSelectChange("select1", e.target.value)
                  }
                >
                  <option value="">Seleccione... </option>
                  {getAvailableOptions("select1").map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {Object.keys(validationStatus).length > 0 && (
                  <>
                    <img
                      src={
                        validationStatus.select1 ? correctIcon : incorrectIcon
                      }
                      alt={validationStatus.select1 ? "Correcto" : "Incorrecto"}
                      className="feedback-icon-TR"
                    />
                    <p className="feedback-text">
                      <span style={{ color: validationStatus.select1 ? '#fff' : '#fff' }}>
                        {validationStatus.select1 ? "¡Correcto!" : "¡Incorrecto!"}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="preguntas_01">
              <div className={getContainerClassName("select2")}>
                <div className="audio-container1 mb-0">
                  <TranscripcionAudios
                    ref={audioRef2}
                    src={Audio2}
                    transcripcion={TRANSCRIPCIONES.audio2}
                    onPlay={() => handleAudioPlay("audio2")}
                  />
                </div>
                <select
                  className={getSelectClassName("select2")}
                  value={selections.select2}
                  onChange={(e) =>
                    handleSelectChange("select2", e.target.value)
                  }
                >
                  <option value="">Seleccione...</option>
                  {getAvailableOptions("select2").map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {Object.keys(validationStatus).length > 0 && (
                  <>
                    <img
                      src={
                        validationStatus.select2 ? correctIcon : incorrectIcon
                      }
                      alt={validationStatus.select2 ? "Correcto" : "Incorrecto"}
                      className="feedback-icon-TR"
                    />
                    <p className="feedback-text">
                      <span style={{ color: validationStatus.select2 ? '#fff' : '#fff' }}>
                        {validationStatus.select2 ? "¡Correcto!" : "¡Incorrecto!"}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bottom-question">
            <div className="preguntas_01">
              <div className={getContainerClassName("select3")}>
                <div className="audio-container1 mb-0">
                  <TranscripcionAudios
                    ref={audioRef3}
                    src={Audio3}
                    transcripcion={TRANSCRIPCIONES.audio3}
                    onPlay={() => handleAudioPlay("audio3")}
                  />
                </div>
                <select
                  className={getSelectClassName("select3")}
                  value={selections.select3}
                  onChange={(e) =>
                    handleSelectChange("select3", e.target.value)
                  }
                >
                  <option value="">Seleccione...</option>
                  {getAvailableOptions("select3").map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {Object.keys(validationStatus).length > 0 && (
                  <>
                    <img
                      src={
                        validationStatus.select3 ? correctIcon : incorrectIcon
                      }
                      alt={validationStatus.select3 ? "Correcto" : "Incorrecto"}
                      className="feedback-icon-TR"
                    />
                    <p className="feedback-text">
                      <span style={{ color: validationStatus.select3 ? '#fff' : '#fff' }}>
                        {validationStatus.select3 ? "¡Correcto!" : "¡Incorrecto!"}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12">
            {(showValidateError || feedback) && (
              <div>
                {showValidateError && (
                  <div className="text-errorPTR" style={{ color: '#8f8f8f', fontWeight: 'bold'}}>
                    Por favor selecciona todas las opciones antes de validar
                  </div>
                )}
                {feedback && (
                  <div>
                    {correctCount === 3 ? (
                      <p>
                        <span style={{ color: '#4caf50', fontWeight: 'bold' }}>¡Correcto!</span>{' '}
                        <span style={{ color: '#8f8f8f', fontWeight: 'bold' }}>
                          Todas las respuestas son correctas. ({percentage}%)
                        </span>
                      </p>
                    ) : (
                      <p>
                        <span style={{ color: '#f44336', fontWeight: 'bold' }}>¡Incorrecto!</span>{' '}
                        <span style={{ color: '#8f8f8f', fontWeight: 'bold' }}>
                          Tienes {correctCount} de 3 respuestas correctas. Intenta de nuevo. ({percentage}%)
                        </span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div
          className="d-flex justify-content-center gap-3"
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            bold={false}
            icon={faCheck}
            roundedFull={true}
            onClick={validateAnswers}
          >
            Validar
          </Button>
          <Button
            bold={false}
            icon={faRepeat}
            onClick={handleReset}
            roundedFull={true}
            disabled={isResetDisabled}
          >
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
}
