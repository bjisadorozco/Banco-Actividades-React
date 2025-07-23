import React, { useState, useRef, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import useStore from "../../../store";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import "../../Actividades/Actividades_Trabajo_seguro_alturas/styles/Pregunta1alturas.css";

//actividad 1, pregunta 1, curso: trabajo seguro en alturas.

function Pregunta1alturas() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isValidated, setIsValidated] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = {
    question:
      "Andy lo ve, y sabe que es riesgoso…¿Qué crees que Andy debe hacer?",
    options: [
      {
        text: "Ayudarle a subir a la estructura para que empiece rápido",
        correct: false,
      },
      {
        text: "Detener la labor, y recordarle que una tarea de alto riesgo requiere ATS y permiso de trabajo",
        correct: true,
      },
      {
        text: "Pasar de largo y no decir nada para que no regañen a Juan",
        correct: false,
      },
    ],
    correctFeedback:
      "¡Muy bien! Tienes la actitud correcta para comenzar este curso de Trabajo seguro en alturas!",
    incorrectFeedback:
      " ¡Piénsalo bien! No vale la pena subir, ni tampoco quedarse callado.",
  };

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleAnswerSelect = (optionIndex) => {
    if (!isValidated) {
      setSelectedAnswers([optionIndex]);
      setShowErrorMessage(false);
      setShowFeedback(false);
    }
  };

  const handleValidate = () => {
    if (selectedAnswers.length > 0) {
      const isCorrect = question.options[selectedAnswers[0]].correct;
      setIsValidated(true);
      setShowErrorMessage(false);
      setShowFeedback(true);
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers([]);
    setIsValidated(false);
    setShowErrorMessage(false);
    setShowFeedback(false);
  };

  return (
    <div>
      <div className="preguntas_01">
        <div className="ctItem-7">
          <Paragraph theme="light" justify="justify">
            <strong>Pregunta:</strong> {question.question}
          </Paragraph>
          <div>
            {question.options.map((option, index) => (
              <p
                key={index}
                className={`
                                            ${selectedAnswers.includes(index) ? "act" : ""}
                                            ${
                                              isValidated &&
                                              selectedAnswers.includes(index)
                                                ? option.correct
                                                  ? "true"
                                                  : "false"
                                                : ""
                                            }
                                        `}
                onClick={() => handleAnswerSelect(index)}
              >
                {String.fromCharCode(97 + index)}. {option.text}
              </p>
            ))}
          </div>
          <div className="flex flex-col items-center">
            {showErrorMessage && (
              <h3 className="text-secondary-color font-bold mb-2">
                Debes seleccionar una opción para continuar.
              </h3>
            )}
            <div className="flex gap-[0.5rem]">
              <Button
                bold={false}
                icon={faCheck}
                roundedFull={true}
                onClick={handleValidate}
                disabled={selectedAnswers.length === 0}
              >
                Validar
              </Button>
              <Button
                bold={false}
                icon={faRepeat}
                roundedFull={true}
                onClick={handleReset}
                disabled={selectedAnswers.length === 0}
              >
                Reiniciar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showFeedback && (
        <div className="feedback-container-alturas ctItem-7">
          <Paragraph theme="light" justify="justify">
            <strong
              style={{
                color: question.options[selectedAnswers[0]].correct
                  ? "#4CAF50"
                  : "#F44336",
              }}
            >
              {question.options[selectedAnswers[0]].correct
                ? "Correcto: "
                : "Incorrecto: "}
            </strong>
            {question.options[selectedAnswers[0]].correct
              ? question.correctFeedback
              : question.incorrectFeedback}
          </Paragraph>
        </div>
      )}
    </div>
  );
}

export default Pregunta1alturas;
