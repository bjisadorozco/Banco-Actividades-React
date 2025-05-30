import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faArrowRight,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import imgTrue from "../../../assets/img/checkAct.png";
import imgFalse from "../../../assets/img/xmarkAct.png";
import imgPeligro from "../../../assets/img/avatar_hombre_mirando_lista_fondo_blanco.webp";
import "./styles/PreguntasVorF.css";

const questions = [
  {
    text: "Es recomendable aplicar hielo directamente sobre la piel en una lesión por aplastamiento para reducir la hinchazón.",
    correct: false,
    feedback:
      "Siempre se debe envolver el hielo en un paño para evitar quemaduras en la piel.",
  },
  {
    text: `El método de análisis de accidentes que se centra en indagar en las causas raíz de un incidente haciendo repetidamente (5 veces) la pregunta "¿Por qué?" hasta llegar a la causa raíz, se llama método de los 5 porqués `,
    correct: true,
    feedback:
      "Correcto. El método de los 5 porqués es una técnica efectiva para llegar a la causa raíz de un problema.",
  },
  {
    text: "Si una lesión por aplastamiento parece leve, no es necesario buscar atención médica ni seguir un plan de evaluación continua.​",
    correct: false,
    feedback:
      "Aunque la lesión parezca leve, es importante seguir las recomendaciones médicas y evaluar su evolución.",
  },
  {
    text: "La rehabilitación y reincorporación laboral son una etapa importante del proceso de gestión de accidentes por lesiones en las manos.​",
    correct: true,
    feedback: "Correcto. La rehabilitación es clave para una recuperación completa y segura.",
  },
  {
    text: "El reporte del accidente y la investigación de sus causas deben realizarse solo si la lesión es grave.​​",
    correct: false,
    feedback:
      "Todo accidente, independientemente de su gravedad, debe ser reportado e investigado para prevenir futuros incidentes.",
  },
];

function PreguntasVorF() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answerSelected, setAnswerSelected] = useState(null);

  const handleAnswer = (userAnswer) => {
    const isCorrect = userAnswer === questions[currentQuestion].correct;
    setAnswerSelected(isCorrect);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setAnswerSelected(null);
      setShowFeedback(false);
    } else {
      setShowScore(true);
      setShowFeedback(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setAnswerSelected(null);
  };
  const percentage = Math.round((score / questions.length) * 100);
  return (
    <div className="container">
      <div className="w-full flex justify-center items-center">
        <div
          className="max-w-md w-full bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden"
          style={{ margin: "0 auto", minWidth: "35vw" }}
        >
          {showScore ? (
            <div className="text-center p-6">
              <p className="my-2 texto-gray font-bold">
                Respuestas correctas
              </p>
              <p className="text-lg texto-gray font-bold">
                Tus respuestas correctas son: {score} de {questions.length} ({percentage}%)
              </p>
              <div className="reset-container">
                <Button
                  onClick={resetQuiz}
                  roundedFull={true}
                  bold={true}
                  icon={faRepeat}
                  className="bg-main-color mx-auto my-3"
                >
                  Reiniciar
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-gray-800 text-white text-center py-2 text-xl">
                <span className="inc">{currentQuestion + 1}</span>/
                <span className="tol">{questions.length}</span>
              </div>
              <div className="itemQ view p-1">
                <div className="mb-3" style={{ minHeight: "50px" }}>
                  <p className="text-gray-800 texto-gray">
                    {questions[currentQuestion].text}
                  </p>
                </div>
                <div className="relative flex justify-center">
                  <img
                    src={
                      answerSelected === null
                        ? imgPeligro
                        : answerSelected
                          ? imgTrue
                          : imgFalse
                    }
                    alt={
                      answerSelected === null
                        ? "Pregunta"
                        : answerSelected
                          ? "Correcto"
                          : "Incorrecto"
                    }
                    className="w-[100px] mb-0"
                  />
                </div>
              </div>

              {answerSelected !== null && (
                <>
                  <div className="text-center mt-4">
                    <p
                      className={`text-lg font-bold ${answerSelected ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {answerSelected
                        ? "Correcto ¡Bien hecho!"
                        : "¡Incorrecto! No te preocupes, puedes mejorar."}
                    </p>
                    <div className="rounded-lg">
                      <p className="texto-gray">
                        {questions[currentQuestion].feedback}
                      </p>
                    </div>
                  </div>
                  <hr className="mt-2 border-gray-300" />
                </>
              )}

              <div className="check flex justify-center space-x-4">
                {!showFeedback ? (
                  <div className="check flex flex-button justify-center space-x-4">
                    <Button
                      roundedFull={true}
                      bold={true}
                      icon={faCheck}
                      onClick={() => handleAnswer(true)}
                      disabled={answerSelected !== null}
                      className="bg-main-color"
                    >
                      Verdadero
                    </Button>
                    <Button
                      roundedFull={true}
                      bold={true}
                      icon={faTimes}
                      onClick={() => handleAnswer(false)}
                      disabled={answerSelected !== null}
                      className="bg-main-color"
                    >
                      Falso
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-center mt-4">
                    <Button
                      roundedFull={true}
                      bold={true}
                      icon={faArrowRight}
                      onClick={handleNext}
                      className="bg-main-color"
                    >
                      Siguiente
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PreguntasVorF;