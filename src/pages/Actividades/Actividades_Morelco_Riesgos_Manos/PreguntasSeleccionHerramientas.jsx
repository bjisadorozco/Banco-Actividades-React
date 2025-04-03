import React, { useState, useRef, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import Instruction from "../../components/Instruction";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import useStore from "../../../store";
import {
  faCheck,
  faRepeat,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import "./styles/PreguntasSeleccionHerramientas.css";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * PreguntasSeleccionHerramientas
 * 

/******  50ecd974-6254-49ce-bc67-51e28db66bad  *******/
function PreguntasSeleccionHerramientas() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const videoRef = useRef(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuestions, setShowQuestions] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ correct: 0, total: 2 });
  const [questionResults, setQuestionResults] = useState([]);
  const [isValidated, setIsValidated] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      question:
        "¿Cuál es la función principal de los guantes en el trabajo con herramientas manuales?",
      options: [
        { text: "Aumentar la velocidad de trabajo.", correct: false },
        {
          text: "Proteger las manos de cortes, abrasiones y quemaduras.",
          correct: true,
        },
        { text: "Reducir el cansancio en las manos.", correct: false },
      ],
      correctFeedback:
        "¡Muy bien ! Estas aprendiendo mucho para cuidar tus manos.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
    {
      question:
        "¿En qué situación NO es recomendable usar guantes durante el trabajo?",
      options: [
        {
          text: "Al manipular herramientas rotativas como sierras o taladros.",
          correct: false,
        },
        {
          text: "Al trabajar con soldadoras que generan calor.",
          correct: true,
        },
        {
          text: "Al manejar herramientas que puedan causar cortes.",
          correct: false,
        },
      ],
      multipleCorrect: false,
      correctCount: 1,
      correctFeedback:
        "¡Muy bien ! Estas aprendiendo mucho para cuidar tus manos.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
  ];

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleAnswerSelect = (optionIndex) => {
    if (!isValidated) {
      if (questions[currentQuestion].multipleCorrect) {
        setSelectedAnswers((prev) => {
          const newAnswers = [...prev];
          if (!newAnswers[currentQuestion]) {
            newAnswers[currentQuestion] = [];
          }
          if (newAnswers[currentQuestion].includes(optionIndex)) {
            newAnswers[currentQuestion] = newAnswers[currentQuestion].filter(
              (i) => i !== optionIndex
            );
          } else if (newAnswers[currentQuestion].length < 2) {
            newAnswers[currentQuestion] = [
              ...newAnswers[currentQuestion],
              optionIndex,
            ];
          }
          return newAnswers;
        });
      } else {
        setSelectedAnswers((prev) => {
          const newAnswers = [...prev];
          newAnswers[currentQuestion] = [optionIndex];
          return newAnswers;
        });
      }
      setShowErrorMessage(false);
      setShowFeedback(false);
    }
  };

  const handleValidate = () => {
    if (selectedAnswers[currentQuestion]?.length > 0) {
      if (
        questions[currentQuestion].multipleCorrect &&
        selectedAnswers[currentQuestion].length === 1
      ) {
        setShowErrorMessage(true);
        return;
      }
      let isCorrect;
      if (questions[currentQuestion].multipleCorrect) {
        const correctOptions = questions[currentQuestion].options
          .map((option, index) => (option.correct ? index : null))
          .filter((index) => index !== null);
        isCorrect =
          selectedAnswers[currentQuestion].length ===
            questions[currentQuestion].correctCount &&
          selectedAnswers[currentQuestion].every((answer) =>
            correctOptions.includes(answer)
          );
      } else {
        isCorrect =
          questions[currentQuestion].options[
            selectedAnswers[currentQuestion][0]
          ].correct;
      }
      setQuestionResults((prev) => {
        const newResults = [...prev];
        newResults[currentQuestion] = isCorrect ? 1 : 0;
        return newResults;
      });
      setIsValidated(true);
      setShowErrorMessage(false);
      setShowFeedback(true);
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setIsValidated(false);
      setShowFeedback(false);
    } else {
      setResults({
        correct: questionResults.reduce((a, b) => a + b, 0),
        total: questions.length,
      });
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setIsValidated(false);
    setQuestionResults([]);
    setShowErrorMessage(false);
    setShowFeedback(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden md:mb-36">
      <div className="md:flex-2 bg-white md:w-full w-full px-2 md:pr-20 flex justify-center items-center pb-2">
        <div className="w-full flex flex-col justify-center items-center">
          {showQuestions && !showResults && (
            <div className="preguntas_01">
              <div className="ctItem-7">
                <Paragraph
                  theme="light"
                  justify={isMobile ? "justify" : "justify"}
                >
                  <strong>Pregunta {currentQuestion + 1}: </strong>
                  {questions[currentQuestion].question}
                </Paragraph>
                <div>
                  {questions[currentQuestion].options.map((option, index) => (
                    <p
                      key={index}
                      className={`
                        ${selectedAnswers[currentQuestion]?.includes(index) ? "act" : ""}
                        ${
                          isValidated &&
                          selectedAnswers[currentQuestion]?.includes(index)
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
                      {questions[currentQuestion].multipleCorrect
                        ? selectedAnswers[currentQuestion]?.length === 1
                          ? "Falta una opción por seleccionar."
                          : "Debes seleccionar dos opciones para continuar."
                        : "Debes seleccionar una opción para continuar."}
                    </h3>
                  )}
                  <Button
                    bold={false}
                    icon={isValidated ? faArrowRight : faCheck}
                    roundedFull={true}
                    onClick={isValidated ? handleNext : handleValidate}
                    disabled={selectedAnswers[currentQuestion]?.length === 0}
                  >
                    {isValidated ? "Siguiente" : "Validar"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {showQuestions && !showResults && showFeedback && (
            <div className="feedback-container ctItem mt-4">
              <Paragraph
                theme="light"
                justify={isMobile ? "justify" : "justify"}
              >
                <strong
                  style={{
                    color:
                      questionResults[currentQuestion] === 1
                        ? "#4CAF50"
                        : "#F44336",
                  }}
                >
                  {questionResults[currentQuestion] === 1
                    ? "Correcto: "
                    : "Incorrecto: "}
                </strong>
                {questionResults[currentQuestion] === 1
                  ? questions[currentQuestion].correctFeedback
                  : questions[currentQuestion].incorrectFeedback}
              </Paragraph>
            </div>
          )}

          {showResults && (
            <div className="resultado-container">
              <p className="text-secondary-color font-bold">Resultados:</p>
              <div className="results-list">
                {questionResults.map((result, index) => (
                  <Paragraph key={index} theme="light">
                    El resultado de la pregunta {index + 1} es{" "}
                    <span
                      className={result === 1 ? "text-success" : "text-error"}
                    >
                      {result}/1 respuestas correcta
                    </span>
                  </Paragraph>
                ))}
              </div>
              <Button
                bold={false}
                icon={faRepeat}
                roundedFull={true}
                onClick={handleReset}
              >
                Reiniciar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PreguntasSeleccionHerramientas;
