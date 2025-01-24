import React, { useState } from "react";
import imgTrue from "../../../assets/img/checkAct.png";
import imgFalse from "../../../assets/img/xmarkAct.png";

const Feedback = ({ isCorrect, message }) => (
  <div className={`text-${isCorrect ? 'green' : 'red'}-600 font-monserrat`}>
    {isCorrect ? '¡Correcto!' : '¡Piénsalo bien!'}
    <span className="text-gray-500"> {message}</span>
  </div>
);

const questions = [
  {
    text: "El Plan para Respuestas a Emergencias (PRE) solo se centra en garantizar que el equipo de rescate esté capacitado y no necesita identificar los escenarios de riesgo.",
    correct: false,
    feedBackCorrect: (
      <Feedback
        isCorrect={true}
        message="El procedimiento de rescate debe detallar cada paso."
      />
    ),
    feedBackIncorrect: (
      <Feedback
        isCorrect={false}
        message="Lee correctamente e inténtalo nuevamente."
      />
    ),
  },
  {
    text: `El Procedimiento de Rescate debe incluir instrucciones claras sobre el montaje y los puntos de anclaje del equipo de rescate.`,
    correct: true,
    feedBackCorrect: (
      <Feedback
        isCorrect={true}
        message="El procedimiento de rescate debe detallar cada paso."
      />
    ),
    feedBackIncorrect: (
      <Feedback
        isCorrect={false}
        message="Lee correctamente e inténtalo nuevamente."
      />
    ),
  },
  {
    text: "Los Procedimientos de Evacuación no necesitan describir las circunstancias específicas que requieren su activación.​",
    correct: false,
    feedBackCorrect: (
      <Feedback
        isCorrect={true}
        message="Es fundamental que los procedimientos de evacuación incluyan las condiciones exactas que justificarían su activación, como cambios en la atmósfera o condiciones estructurales inseguras."
      />
    ),
    feedBackIncorrect: (
      <Feedback
        isCorrect={false}
        message="Lee correctamente e inténtalo nuevamente."
      />
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

  const percentage = Math.round((score / questions.length) * 100);
  return (
    <div className="container ">
      <div className="w-full flex justify-center items-center p-4">
        <div className="max-w-md w-full bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden mx-auto min-w-[35vw]">
          {showScore ? (
            <div className="text-center p-6 font-monserrat">
              <p className="my-2 text-gray-500 font-semibold">
                Respuestas correctas son: {score} de {questions.length} (
                {percentage}%)
              </p>
              <div className="reset-container">
                <button
                  onClick={resetQuiz}
                  className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white mx-auto my-3"
                >
                  Reiniciar
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-gray-800 text-white text-center py-2 text-[16px] font-monserrat">
                <span className="inc">{currentQuestion + 1}</span>/
                <span className="tol">{questions.length}</span>
              </div>
              <div className=" view p-6">
                <div className="mb-2 min-h-[50px]">
                  <p className="text-gray-800 text-justify font-monserrat">
                    {questions[currentQuestion].text}
                  </p>
                </div>
                <div className="relative flex justify-center">
                  <div className="w-32">
                    {answerSelected !== null && (
                      <div className="flex items-center justify-center">
                        <img
                          src={answerSelected ? imgTrue : imgFalse}
                          alt={answerSelected ? "Correct" : "Incorrect"}
                          className="w-full h-full object-contain mb-0"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-justify mt-2">
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
                <hr className="mb-4 border-none" />
                <div className="check flex justify-center space-x-4">
                  {!showFeedback && (
                    <div className="check flex justify-center space-x-4">
                      <button
                        className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white"
                        onClick={() => handleAnswer(true)}
                        disabled={answerSelected !== null}
                      >
                        Verdadero
                      </button>
                      <button
                        className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white m-0"
                        onClick={() => handleAnswer(false)}
                        disabled={answerSelected !== null}
                      >
                        Falso
                      </button>
                    </div>
                  )}
                  {showFeedback && (
                    <div className="flex justify-center mt-4 text-white ">
                      <button
                        onClick={handleNext}
                        className="bg-main-color py-2 px-4 rounded-full text-[16px] font-bold"
                      >
                        {currentQuestion === questions.length - 1
                          ? "Finalizar"
                          : "Siguiente"}
                      </button>
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
