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

const questions = [
  {
    text: "El Plan para Respuestas a Emergencias (PRE) solo se centra en garantizar que el equipo de rescate esté capacitado y no necesita identificar los escenarios de riesgo.",
    correct: false,
    feedBackCorrect: (
      <>
        <div className="text-green-600">¡Bien hecho! <span className="text-gray-500"> El procedimiento de rescate debe detallar cada paso.{" "}
          </span>
        </div>
      </>
    ),
    feedBackIncorrect: (
      <>
        <div className="text-red-600">¡Piénsalo bien! <span className="text-gray-500"> Lee correctamente e inténtalo nuevamente.
          </span>
        </div>
      </>
    ),
  },
  {
    text: `El Procedimiento de Rescate debe incluir instrucciones claras sobre el montaje y los puntos de anclaje del equipo de rescate. `,
    correct: true,
    feedBackCorrect: (
      <>
        <div className="text-green-600"> ¡Correcto! <span className="text-gray-500"> El procedimiento de rescate debe detallar cada paso.
          </span>
        </div>
      </>
    ),
    feedBackIncorrect: (
      <>
        <div className="text-red-600">¡Piénsalo bien! <span className="text-gray-500"> Lee correctamente e inténtalo nuevamente.
          </span>
        </div>
      </>
    ),
  },
  {
    text: "Los Procedimientos de Evacuación no necesitan describir las circunstancias especificas que requieren su activación.​",
    correct: false,
    feedBackCorrect: (
      <>
        <div className="text-green-600">¡Perfecto! <span className="text-gray-500"> Es fundamental que los procedimientos de evacuación incluyan las
            condiciones exactas que justificarían su activación, como cambios en
            la atmósfera o condiciones estructurales inseguras.
          </span>
        </div>
      </>
    ),
    feedBackIncorrect: (
      <>
        <div className="text-red-600">¡Piénsalo bien! <span className="text-gray-500"> Lee correctamente e inténtalo nuevamente.
          </span>
        </div>
      </>
    ),
  },
];

function Actividad_Falso_Verdadero() {
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

  const percentage = Math.floor((score / questions.length) * 100);
  return (
    <div className="container">
      <div className="w-full flex justify-center items-center p-4">
        <div className="max-w-md w-full bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden mx-auto min-w-[35vw]">
          {showScore ? (
            <div className="text-center p-6">
              <p className="my-2 text-gray-500 font-semibold">
                Respuestas correctas ({percentage}%)
              </p>
              <p className="text-lg">
                {score} de {questions.length}
              </p>
              <div className="reset-container">
                <button
                  onClick={resetQuiz}
                  className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white mx-auto my-3"
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
              <div className=" view p-6">
                <div className="mb-3" style={{ minHeight: "50px" }}>
                  <p className="text-gray-800 text-justify">
                    {questions[currentQuestion].text}
                  </p>
                </div>
                <div className="relative flex justify-center mb-4">
                  <div className="w-32 relative">
                    {answerSelected !== null && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={answerSelected ? imgTrue : imgFalse}
                          alt={answerSelected ? "Correct" : "Incorrect"}
                          className="w-full h-full object-contain"
                          style={{ marginBottom: "0px" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-justify mt-4">
                  <p
                    className={`text-[16px] font-regular leading-tight ${
                      answerSelected === null
                        ? "opacity-0"
                        : answerSelected
                          ? "opacity-100"
                          : "opacity-100"
                    }`}
                  >
                    {answerSelected === null
                      ? " "
                      : answerSelected
                        ? questions[currentQuestion].feedBackCorrect
                        : questions[currentQuestion].feedBackIncorrect}
                  </p>
                </div>
                <hr
                  className="mb-4"
                  style={{
                    width: "100%",
                    border: "1px solid var(--black)",
                  }}
                />
                <div className="check flex justify-center space-x-4">
                  {!showFeedback && (
                    <div className="check flex justify-center space-x-4">
                      <button
                        className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white"
                        onClick={() => handleAnswer(true)}
                        disabled={answerSelected !== null}
                      >
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />{" "}
                        Verdadero
                      </button>
                      <button
                        className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white m-0"
                        onClick={() => handleAnswer(false)}
                        disabled={answerSelected !== null}
                      >
                        <FontAwesomeIcon icon={faTimes} className="mr-2" />{" "}
                        Falso
                      </button>
                    </div>
                  )}
                  {showFeedback && (
                    <div className="flex justify-center mt-4">
                      <Button
                        bold={true}
                        icon={faArrowRight}
                        roundedFull={true}
                        onClick={handleNext}
                        className="bg-main-color"
                      >
                        {currentQuestion === questions.length - 1
                          ? "Finalizar"
                          : "Siguiente"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Actividad_Falso_Verdadero;
