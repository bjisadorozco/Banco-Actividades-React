import React, { useState, useEffect, useRef } from "react";
import Audio1 from "../../../assets/audio/Alturas velocidad M3 – Slide 28 Audio.mp3";
import Audio2 from "../../../assets/audio/Alturas comunicacion M3 – Slide 28 Audio.mp3";
import Audio3 from "../../../assets/audio/Alturas seguridad M3 – Slide 28 Audio.mp3";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import correctIcon from "../../../assets/img/checkAct.png";
import incorrectIcon from "../../../assets/img/xmarkAct.png";

import '../../Actividades/Actividades_Trabajo_seguro_alturas/styles/PreguntasAlturas1.css';
import Paragraph from "../../components/Paragraph";
const OPTIONS = [
  { value: "Velocidad", label: "Velocidad" },
  { value: "Comunicación", label: "Comunicación" },
  { value: "Seguridad", label: "Seguridad" },
];

const CORRECT_ANSWERS = {
  select1: "Velocidad",
  select2: "Comunicación",
  select3: "Seguridad",
};

export default function PreguntasAlturas1() {
  const audioRefs = useRef([]);
  const [selections, setSelections] = useState({
    select1: "",
    select2: "",
    select3: "",
  });
  const [feedback, setFeedback] = useState("");
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [validationStatus, setValidationStatus] = useState({});
  const [showValidateError, setShowValidateError] = useState(false);

  useEffect(() => {
    const hasAnySelection = Object.values(selections).some(
      (value) => value !== ""
    );
    setIsResetDisabled(!hasAnySelection);
    setShowValidateError(false);
  }, [selections]);

  const handleAudioPlay = (index) => {
    audioRefs.current.forEach((audio, i) => {
      if (i !== index && audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

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

    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
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
    setFeedback(
      correctCount === 3
        ? "¡Correcto! Todas las respuestas son correctas."
        : `Tienes ${correctCount} de 3 respuestas correctas. Intenta de nuevo.`
    );
  };

  const getContainerClassName = (selectId) => {
    if (Object.keys(validationStatus).length === 0) return "ctItem";
    return `ctItem ${
      validationStatus[selectId] ? "correct-container" : "incorrect-container"
    }`;
  };

  const getSelectClassName = (selectId) => {
    if (Object.keys(validationStatus).length === 0) return "form-select";
    return `form-select ${validationStatus[selectId] ? "correct" : "incorrect"}`;
  };

  return (
    <div className="main-container">
      <div className="activity-container">
        <div className="questions-grid">
          <div className="col-md-6 mb-4">
            <div className="preguntas_01">
              <div className={getContainerClassName("select1")}>
                <div className="audio-container mb-3">
                  <audio
                    controls
                    className="w-100"
                    ref={(el) => (audioRefs.current[0] = el)}
                    onPlay={() => handleAudioPlay(0)}
                  >
                    <source src={Audio1} type="audio/mp3" />
                  </audio>
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
                      className="feedback-icon"
                    />
                    <Paragraph className="feedback-text">
                      {validationStatus.select1 ? "¡Correcto!" : "¡Incorrecto!"}
                    </Paragraph>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="preguntas_01">
              <div className={getContainerClassName("select2")}>
                <div className="audio-container mb-3">
                  <audio
                    controls
                    className="w-100"
                    ref={(el) => (audioRefs.current[1] = el)}
                    onPlay={() => handleAudioPlay(1)}
                  >
                    <source src={Audio2} type="audio/mp3" />
                  </audio>
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
                      className="feedback-icon"
                    />
                    <Paragraph className="feedback-text">
                      {validationStatus.select2 ? "¡Correcto!" : "¡Incorrecto!"}
                    </Paragraph>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bottom-question">
            <div className="preguntas_01">
              <div className={getContainerClassName("select3")}>
                <div className="audio-container mb-3">
                  <audio
                    controls
                    className="w-100"
                    ref={(el) => (audioRefs.current[2] = el)}
                    onPlay={() => handleAudioPlay(2)}
                  >
                    <source src={Audio3} type="audio/mp3" />
                  </audio>
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
                      className="feedback-icon"
                    />
                    <Paragraph className="feedback-text">
                      {validationStatus.select3 ? "¡Correcto!" : "¡Incorrecto!"}
                    </Paragraph>
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
                  <div className="text-error">
                    Por favor selecciona todas las opciones antes de validar
                  </div>
                )}
                {feedback && (
                  <div
                    className={
                      feedback.includes("Correcto")
                        ? "text-success"
                        : "text-error"
                    }
                  >
                    {feedback}
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
