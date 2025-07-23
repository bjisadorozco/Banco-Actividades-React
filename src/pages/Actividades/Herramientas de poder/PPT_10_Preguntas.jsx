import { useState } from "react";
import { RotateCcw } from "lucide-react";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import {
  faCheck,
  faRepeat,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/PPT_Preguntas.css";

export default function QuizActivity() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ correct: 0, total: 3 });
  const [questionResults, setQuestionResults] = useState([]);
  const [isValidated, setIsValidated] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);

  const questions = [
    {
      question:
        "¿Cuál es un riesgo común al manejar herramientas de poder sin protección adecuada?​",
      options: [
        {
          text: "Golpes o cortes en las manos.",
          correct: true,
        },
        {
          text: " Fatiga ocular por falta de sueño​.",
          correct: false,
        },
        {
          text: "Dolores de cabeza por el ruido​.",
          correct: false,
        },
      ],
      correctFeedback: "¡Bien hecho! La opción seleccionada es correcta.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
    {
      question:
        "¿Qué afección puede surgir por el uso continuo y prolongado de herramientas de poder?​",
      options: [
        {
          text: "Esguinces en los tobillos​",
          correct: false,
        },
        {
          text: " Microtraumatismos repetitivos​.",
          correct: true,
        },
        {
          text: "Lesiones oculares por partículas​.",
          correct: false,
        },
      ],
      correctFeedback: "¡Bien hecho! La opción seleccionada es correcta.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
  ];

  const handleAnswerSelect = (optionIndex) => {
    if (!isValidated) {
      setSelectedAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQuestion] = [optionIndex];
        return newAnswers;
      });
      setShowErrorMessage(false);
      setShowFeedback(false);
    }
  };

  const handleValidate = () => {
    if (selectedAnswers[currentQuestion]?.length > 0) {
      const isCorrect =
        questions[currentQuestion].options[selectedAnswers[currentQuestion][0]]
          .correct;
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
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {showQuestions && !showResults && (
        <div className="preguntas_01">
          <div className="ctItem">
            <Paragraph theme="light" justify="justify">
              <p>Pregunta {currentQuestion + 1}: </p>
              {questions[currentQuestion].question}
            </Paragraph>
            <div className="opciones">
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
          </div>

          <div
            className="flex flex-col items-center"
            style={{ marginTop: "40px" }}
          >
            {showErrorMessage && (
              <h3
                className="text-secondary-color text-center font-bold mb-2"
                style={{ color: "gray" }}
              >
                Debes seleccionar una opción para continuar.
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
          {showQuestions && !showResults && showFeedback && (
            <div className="feedback-container1 ctItem mt-4">
              <Paragraph theme="light" justify="justify">
                <p
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
                </p>
                {questionResults[currentQuestion] === 1
                  ? questions[currentQuestion].correctFeedback
                  : questions[currentQuestion].incorrectFeedback}
              </Paragraph>
            </div>
          )}
        </div>
      )}

      {showResults && (
        <div className="resultado-container">
          <p className="font-bold">Resultados:</p>
          <div className="results-list">
            {questionResults.map((result, index) => (
              <Paragraph key={index} theme="light">
                <br />
                El resultado de la pregunta {index + 1} es:{" "}
                <span
                  className={result === 1 ? "text-success1" : "text-error1"}
                >
                  {result}/1 respuestas correctas
                </span>
              </Paragraph>
            ))}
            <Paragraph theme="light">
              <br /> Tus respuestas correctas son {results.correct} de{" "}
              {results.total} (
              {((results.correct / results.total) * 100).toFixed(0)}%)
            </Paragraph>
          </div>
          <Button
            bold={false}
            icon={faRepeat}
            roundedFull={true}
            onClick={handleReset}
          >
            Reiniciar Actividad
          </Button>
        </div>
      )}
    </div>
  );
}
