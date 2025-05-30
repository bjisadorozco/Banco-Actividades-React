import React, { useState } from "react";
import imgTrue from "../../../assets/img/true.jpg";
import imgFalse from "../../../assets/img/false.jpg";
import imgDefaultAvatar from "../../../assets/img/avatar_sonriente.webp";
import Button from "../../components/Button";
import { faRepeat, faArrowRight, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
const Feedback = ({ isCorrect, message }) => (
  <div className={`text-${isCorrect ? "green" : "red"}-600 font-monserrat`}>
    {isCorrect ? "¡Correcto!" : "¡Piénsalo bien!"}
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
    <div className="container">
      <div className="w-full flex justify-center items-center my-2">
        <div className="max-w-md w-full bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden mx-auto min-w-[35vw]">
          {showScore ? (
            <div className="text-center p-6 font-monserrat">
              <div className="flex justify-center mb-4">
                <img
                  src={imgDefaultAvatar}
                  alt="Avatar"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <p className="my-2 text-gray-500 font-semibold">
                Respuestas correctas son: {score} de {questions.length} ({percentage}%)
              </p>
              <div className="w-full flex flex-col items-center justify-center">
                <Button
                  className="reset-button"
                  bold={true}
                  icon={faRepeat}
                  roundedFull={true}
                  onClick={resetQuiz}
                >
                  Reiniciar
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-gray-800 text-white text-center py-2 text-[16px] font-monserrat">
                <span className="inc">{currentQuestion + 1}</span>/
                <span className="tol">{questions.length}</span>
              </div>
              <div className="view px-3 pt-2 pb-0 w-full flex items-center justify-center flex-col">
                <div className="min-h-[50px]">
                  <p className="text-gray-800 text-justify font-monserrat">
                    {questions[currentQuestion].text}
                  </p>
                </div>

                <div className="relative flex justify-center my-4">
                  <div className="w-32 h-32 relative">
                    <img
                      src={imgDefaultAvatar}
                      alt="Avatar"
                      className="w-full h-full object-contain"
                    />

                    {answerSelected !== null && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={answerSelected ? imgTrue : imgFalse}
                          alt={answerSelected ? "Correct" : "Incorrect"}
                          className="w-full h-full object-contain absolute"
                          style={{ zIndex: 10 }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-justify mt-2">
                  <p
                    className={`text-[16px] font-regular leading-tight ${answerSelected === null
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
                      <Button
                        className="true-button"
                        bold={true}
                        icon={faCheck}
                        roundedFull={true}
                        onClick={() => handleAnswer(true)}
                        disabled={answerSelected !== null}
                      >
                        Verdadero
                      </Button>
                      <Button
                        className="false-button"
                        bold={true}
                        icon={faXmark}
                        roundedFull={true}
                        onClick={() => handleAnswer(false)}
                        disabled={answerSelected !== null}
                      >
                        Falso
                      </Button>
                    </div>
                  )}
                  {showFeedback && (
                    <div className="flex justify-center mt-4">
                      <Button
                        className="next-button"
                        bold={true}
                        icon={faArrowRight}
                        roundedFull={true}
                        onClick={handleNext}
                      >
                        Siguiente
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