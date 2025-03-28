import React, { useState } from "react";
import imgTrue from "../../../assets/img/checkAct.png";
import imgFalse from "../../../assets/img/xmarkAct.png";
import imgPeligro from "../../../assets/img/avatar-hombre-morado-blanco.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
{
  /* Componente de retroalimentación, muestra si la respuesta es correcta o incorrecta */
}
const Feedback = ({ isCorrect, message }) => (
  <div className={`text-${isCorrect ? "green" : "red"}-600 font-monserrat`}>
    {isCorrect ? "¡Correcto!" : "¡Piénsalo bien!"}
    <span className="text-gray-500"> {message}</span>
  </div>
);

{
  /* Array con las preguntas y las respuestas correctas */
}
const questions = [
  {
    text: "Se debe obtener un permiso de trabajo",
    correct: "Entrada",
    feedBackCorrect: (
      <Feedback
        isCorrect={true}
        message="¡Muy bien! identificaste este peligro correctamente."
      />
    ),
    feedBackIncorrect: (
      <Feedback
        isCorrect={false}
        message="¡Piénsalo bien! ¡Este peligro no corresponde, vuelve a intentarlo!"
      />
    ),
  },
  {
    text: "Contar con un plan de salida siempre​",
    correct: "Salida",
    feedBackCorrect: (
      <Feedback
        isCorrect={true}
        message="¡Muy bien! identificaste este peligro correctamente."
      />
    ),
    feedBackIncorrect: (
      <Feedback
        isCorrect={false}
        message="¡Piénsalo bien! ¡Este peligro no corresponde, vuelve a intentarlo!"
      />
    ),
  },
  {
    text: "Verificar el estado del espacio confinado después de la operación.​",
    correct: "Salida",
    feedBackCorrect: (
      <Feedback
        isCorrect={true}
        message="¡Muy bien! identificaste este peligro correctamente."
      />
    ),
    feedBackIncorrect: (
      <Feedback
        isCorrect={false}
        message="¡Piénsalo bien! ¡Este peligro no corresponde, vuelve a intentarlo!"
      />
    ),
  },
  {
    text: `Realizar una medición de los niveles de oxígeno`,
    correct: "Entrada",
    feedBackCorrect: (
      <Feedback
        isCorrect={true}
        message="¡Muy bien! identificaste este peligro correctamente."
      />
    ),
    feedBackIncorrect: (
      <Feedback
        isCorrect={false}
        message="¡Piénsalo bien! ¡Este peligro no corresponde, vuelve a intentarlo!"
      />
    ),
  },
  {
    text: "Todo el personal debe contar con los EPP adecuados.​",
    correct: "Entrada",
    feedBackCorrect: (
      <Feedback
        isCorrect={true}
        message="¡Muy bien! identificaste este peligro correctamente."
      />
    ),
    feedBackIncorrect: (
      <Feedback
        isCorrect={false}
        message="¡Piénsalo bien! ¡Este peligro no corresponde, vuelve a intentarlo!"
      />
    ),
  },
  {
    text: "Evacuar en caso de cambios en las condiciones atmosféricas.​",
    correct: "Salida",
    feedBackCorrect: (
      <Feedback
        isCorrect={true}
        message="¡Muy bien! identificaste este peligro correctamente."
      />
    ),
    feedBackIncorrect: (
      <Feedback
        isCorrect={false}
        message="¡Piénsalo bien! ¡Este peligro no corresponde, vuelve a intentarlo!"
      />
    ),
  },
];

function Actividad_Mobile_entada_salida() {
  {
    /* stados para controlar el cuestionario y las respuesta */
  }
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answerSelected, setAnswerSelected] = useState(null);

  {
    /* Función para manejar la respuesta del usuario */
  }
  const handleAnswer = (userAnswer) => {
    const isCorrect = userAnswer === questions[currentQuestion].correct;
    setAnswerSelected(isCorrect);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setShowFeedback(true);
  };

  {
    /* Función para ir a la siguiente pregunta o mostrar el resultado final */
  }
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

  {
    /* Calcula el porcentaje de respuestas correctas */
  }
  const percentage = Math.round((score / questions.length) * 100);
  return (
    <div className="container ">
      <div className="w-full flex justify-center items-center p-4">
        <div className="max-w-md w-full bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden mx-auto min-w-[35vw]">
          {showScore ? (
            <div className="text-center p-6 font-monserrat w-full flex-col flex justify-center items-center">
              <p className="my-2 text-gray-500 font-semibold">
                Respuestas correctas son: {score} de {questions.length} (
                {percentage}%)
              </p>

              <div className="">
                <button
                  onClick={resetQuiz}
                  className="group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white mx-auto my-3"
                >
                  <FontAwesomeIcon icon={faRepeat} className="mr-2" />
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
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="relative w-full text-justify items-center justify-center flex flex-col">
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
                        onClick={() => handleAnswer("Entrada")}
                        disabled={answerSelected !== null}
                      >
                        Entrada
                      </button>
                      <button
                        className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white m-0"
                        onClick={() => handleAnswer("Salida")}
                        disabled={answerSelected !== null}
                      >
                        Salida
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

export default Actividad_Mobile_entada_salida;
