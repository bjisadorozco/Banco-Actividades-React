import React, { useState, useEffect, useRef } from "react";
import Audio1 from "../../assets/audio/sld8_fatiga.mp3";
import Audio2 from "../../assets/audio/sld8_uso_repetitivo.mp3";
import Audio3 from "../../assets/audio/sld8_riesgo_ergonomico.mp3";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import "./styles/PreguntasTiposRiesgo.css";

const OPTIONS = [
  { value: "Uso repetitivo", label: "Uso repetitivo" },
  { value: "Posturas incorrectas", label: "Posturas incorrectas" },
  { value: "Fatiga", label: "Fatiga" },
];

const CORRECT_ANSWERS = {
  select1: "Fatiga",
  select2: "Uso repetitivo",
  select3: "Posturas incorrectas",
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
              <div className="ctItem">
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
                  <option value="">Seleccione...</option>
                  {getAvailableOptions("select1").map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="preguntas_01">
              <div className="ctItem">
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
              </div>
            </div>
          </div>

          <div className="bottom-question">
            <div className="preguntas_01">
              <div className="ctItem">
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
          className="d-flex justify-content-center gap-3 mt-4"
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
