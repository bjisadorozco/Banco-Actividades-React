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
import imgPeligro from "../../../assets/img/avatar-hombre-morado-blanco.webp";
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
      "Siempre se debe envolver el hielo en un paño para evitar quemaduras en la piel.",
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
    feedback: "",
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
            <div className="text-center">
             <p className="my-2 text-red-600 font-semibold">
                Respuestas correctas <br />
                <span className="text-gray-500">{score} de {questions.length} (
                {percentage}%)</span>
              </p>
             
              <div className="w-full reset-container my-4">
                <button
                  onClick={resetQuiz}
                  className="w-[50%] flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white"
                >
                  <FontAwesomeIcon icon={faRepeat} className="mr-2" /> Reiniciar
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-gray-800 text-white text-center py-2 text-xl">
                <span className="inc">{currentQuestion + 1}</span>/
                <span className="tol">{questions.length}</span>
              </div>
              <div className="itemQ view px-6 py-0 flex flex-col items-center justify-center text-justify">
                <div className="mb-3" >
                  <p className="text-gray-800">
                    {questions[currentQuestion].text}
                  </p>
                </div>
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
                      className=" w-[100px] mb-0 "
                    />
                <div className="text-center mt-4">
                  <p
                    className={`text-lg font-regular ${
                      answerSelected === null
                        ? "opacity-0"
                        : answerSelected
                          ? "text-green-600 opacity-100"
                          : "text-red-600 opacity-100"
                    }`}
                  >
                    {answerSelected === null
                      ? " "
                      : answerSelected
                        ? "Correcto ¡Bien hecho!"
                        : "¡Incorrecto!  No te preocupes, puedes mejorar."}
                  </p>
                </div>
               
                  {!showFeedback && (
                    <div className="w-full check flex justify-center">
                      <button
                        className="w-[40%] flex justify-center items-center group bg-main-color rounded-full px-4 py-1 shadow-main-color text-white"
                        onClick={() => handleAnswer(true)}
                        disabled={answerSelected !== null}
                      >
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />{" "}
                        Verdadero
                      </button>

                      <button
                        className="w-[40%] flex justify-center items-center group bg-main-color rounded-full px-4 py-1 shadow-main-color text-white"
                        onClick={() => handleAnswer(false)}
                        disabled={answerSelected !== null}
                      >
                        <FontAwesomeIcon icon={faTimes} className="mr-2" />{" "}
                        Falso
                      </button>
                    </div>
                  )}
                  {showFeedback && (
                    <div className="w-full flex justify-center">
                      <Button
                        bold={true}
                        icon={faArrowRight}
                        roundedFull={true}
                        onClick={handleNext}
                        className="px-4 bg-main-color"
                      >
                        {currentQuestion === questions.length - 1
                          ? "Finalizar"
                          : "Siguiente"}
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