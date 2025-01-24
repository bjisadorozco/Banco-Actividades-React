import React, { useState, useEffect, useRef } from "react";
import Audio1 from "../../../assets/audio/Alturas velocidad M3 – Slide 28 Audio.mp3";
import Audio2 from "../../../assets/audio/Alturas comunicacion M3 – Slide 28 Audio.mp3";
import Audio3 from "../../../assets/audio/Alturas seguridad M3 – Slide 28 Audio.mp3";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import correctIcon from "../../../assets/img/checkAct.png";
import incorrectIcon from "../../../assets/img/xmarkAct.png";
import "./styles/PreguntasTiposRiesgoMobile.css";

const OPTIONS = [
  { value: "Seguridad", label: "Seguridad" },
  { value: "Velocidad", label: "Velocidad" },
  { value: "Comunicación", label: "Comunicación" },
];

const CORRECT_ANSWERS = {
  select1: "Velocidad",
  select2: "Comunicación",
  select3: "Seguridad",
};

export default function PreguntasTiposRiesgo() {
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
  const [percentage, setPercentage] = useState(0);

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
    const calculatedPercentage = Math.round((correctCount / 3) * 100);
    setPercentage(calculatedPercentage);
    setFeedback(
      correctCount === 3
        ? `¡Correcto! Todas las respuestas son correctas. (${calculatedPercentage}%)`
        : `Tienes ${correctCount} de 3 respuestas correctas. Intenta de nuevo. (${calculatedPercentage}%)`
    );
  };

  const getContainerClassName = (selectId) => {
    if (Object.keys(validationStatus).length === 0) return "ctItem2";
    return `ctItem2 ${
      validationStatus[selectId] ? "correcto-container" : "incorrecto-container"
    }`;
  };

  const getSelectClassName = (selectId) => {
    if (Object.keys(validationStatus).length === 0) return "form-select2";
    return `form-select2 ${validationStatus[selectId] ? "correct" : "incorrect"}`;
  };

  return (
    <div className="main-containe1">
      <div className="activity-container2">
        <div className="questions-grid2 ">
          <div className="col-md-6">
            <div className="preguntas_01">
              <div className={getContainerClassName("select1")}>
                <div className="audio-container2 mb-0">
                  <audio
                    controls
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
                      className="feedback-icon-TR"
                    />
                    <p className="feedback-text">
                      <span style={{ color: validationStatus.select1 ? '#4caf50' : '#f44336' }}>
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
                <div className="audio-container2 mb-0">
                  <audio
                    controls
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
                      className="feedback-icon-TR"
                    />
                    <p className="feedback-text">
                      <span style={{ color: validationStatus.select2 ? '#4caf50' : '#f44336' }}>
                        {validationStatus.select2 ? "¡Correcto!" : "¡Incorrecto!"}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
          <div className="preguntas_01">
              <div className={getContainerClassName("select3")}>
                <div className="audio-container2 mb-0">
                  <audio
                    controls
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
                      className="feedback-icon-TR"
                    />
                    <p className="feedback-text">
                      <span style={{ color: validationStatus.select3 ? '#4caf50' : '#f44336' }}>
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
                  <div className="text-errorPTRM" style={{ color: '#8f8f8f', fontWeight: 'bold' }}>
                    Por favor selecciona todas las opciones antes de validar
                  </div>
                )}
                {feedback && (
                  <div>
                    {feedback.includes("Correcto") ? (
                      <p>
                        <span style={{ color: '#4caf50', fontWeight: 'bold' }}>¡Correcto!</span>{' '}
                        <span style={{ color: '#8F8F8F', fontWeight: 'bold' }}>
                          Todas las respuestas son correctas. ({percentage}%)
                        </span>
                      </p>
                    ) : (
                      <p>
                        <span style={{ color: '#f44336', fontWeight: 'bold' }}>¡Incorrecto!</span>{' '}
                        <span style={{ color: '#8F8F8F', fontWeight: 'bold' }}>
                          Tienes {feedback.match(/\d+/)[0]} de 3 respuestas correctas. Intenta de nuevo. ({percentage}%)
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

