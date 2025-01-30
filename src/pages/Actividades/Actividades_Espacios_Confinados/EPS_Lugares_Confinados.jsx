import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import Actividad_Mobile_entada_salida from "../Actividades_Espacios_Confinados/Actividad_Mobile_Entrada_Salida"

function EPS_Lugares_Confinados() {
  {/* Estado inicial de las palabras con su texto, id, caja correcta y otras propiedades*/}
  const initialWords = [
    {
      text: "Se debe obtener un permiso de trabajo.",
      id: 1,
      correctBox: "entrada",
      currentBox: "entrada",
      isDropped: false,
      isCorrect: null,
    },
    {
      text: "Realizar una medición de los niveles de oxígeno.",
      id: 2,
      correctBox: "entrada",
      currentBox: "entrada",
      isDropped: false,
      isCorrect: null,
    },
    {
      text: "Todo el personal debe contar con los EPP adecuados.",
      id: 3,
      correctBox: "entrada",
      currentBox: "entrada",
      isDropped: false,
      isCorrect: null,
    },
    {
      text: "Evacuar en caso de cambios en las condiciones atmosféricas.",
      id: 4,
      correctBox: "salida",
      currentBox: "salida",
      isDropped: false,
      isCorrect: null,
    },
    {
      text: "Verificar el estado del espacio confinado después de la operación.",
      id: 5,
      correctBox: "salida",
      currentBox: "salida",
      isDropped: false,
      isCorrect: null,
    },
    {
      text: "Contar con un plan de salida siempre.",
      id: 6,
      correctBox: "salida",
      currentBox: "salida",
      isDropped: false,
      isCorrect: null,
    },
  ];

  {/*Definición de los estados */}
  const [history, setHistory] = useState([]);
  const [words, setWords] = useState(initialWords);
  const [droppedCount, setDroppedCount] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const handleDrop = (e, box) => {
    e.preventDefault();
    const wordId = e.dataTransfer.getData("text/plain");
    const updatedWords = [...words];
    const wordIndex = updatedWords.findIndex(
      (word) => word.id === parseInt(wordId)
    );

    if (wordIndex !== -1) {
      const previousState = {
        wordId: updatedWords[wordIndex].id,
        previousBox: updatedWords[wordIndex].currentBox,
        previousDroppedStatus: updatedWords[wordIndex].isDropped,
        previousCorrectStatus: updatedWords[wordIndex].isCorrect,
      };

      {/*guarda el estado anterior para poder deshacer la acción */}
      setHistory([...history, previousState]);

      updatedWords[wordIndex].isDropped = true;
      updatedWords[wordIndex].currentBox = box;
      updatedWords[wordIndex].isCorrect =
        updatedWords[wordIndex].correctBox === box;

      setWords(updatedWords);
      setDroppedCount(droppedCount + 1);
    }
  };

  {/* Permite que el elemento sea soltado en el área */}
  const allowDrop = (e) => {
    e.preventDefault();
  };

  {/* Maneja el inicio del evento de arrastre */}
  const handleDragStart = (e, id) => {
    
    e.dataTransfer.setData("text/plain", id);
  };

 
  {/* Maneja el evento de resetear la actividad */}
  const handleReset = () => {
    setWords(initialWords);
    setDroppedCount(0);
    setFeedback(null);
  };

  {/* Maneja el evento de deshacer el último movimiento */}
  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      const updatedWords = [...words];
      const wordIndex = updatedWords.findIndex(
        (word) => word.id === lastState.wordId
      );

      if (wordIndex !== -1) {
        updatedWords[wordIndex].currentBox = lastState.previousBox;
        updatedWords[wordIndex].isDropped = lastState.previousDroppedStatus;
        updatedWords[wordIndex].isCorrect = lastState.previousCorrectStatus;

        setWords(updatedWords);
        setHistory(history.slice(0, history.length - 1));
        setDroppedCount(droppedCount - 1);
      }
    }
  };

  {/* Obtiene la primera palabra que aún no ha sido soltada */}
  const wordToShow = words.filter((word) => !word.isDropped)[0];

  {/* Calcula el número de respuestas correctas y el porcentaje */}
  const getCorrectAnswers = () => {
    const correctAnswers = words.filter((word) => word.isCorrect).length;
    const percentage = (correctAnswers / words.length) * 100;
    return { correctAnswers, percentage };
  };
{/* Extrae el número de respuestas correctas y el porcentaje */}
  const { correctAnswers, percentage } = getCorrectAnswers();


  {/* Verifica si todas las respuestas son correctas y actualiza el mensaje de retroalimentación */}
  const checkFeedback = () => {
    const allCorrect = words.every((word) => word.isCorrect === true);
    setFeedback(
      allCorrect
        ? "¡Muy bien! identificaste este peligro correctamente."
        : "¡Piénsalo bien! ¡Este peligro no corresponde, vuelve a intentarlo!​"
    );
  };


  {/* Muestra retroalimentación cuando se han soltado todas las palabras */}
  if (droppedCount === words.length && feedback === null) {
    checkFeedback();
  }


  {/* Verifica si el botón de reiniciar debe estar deshabilitado */}
  const isResetButtonDisabled = words.some((word) => !word.isDropped);
  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0 w-full">
      <div className="md:w-full bg-white hidden md:flex flex-col justify-center md:static relative md:top-0 top-0">
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 gap-2 justify-start md:flex md:flex-col mb-3 h-auto w-full">
            <div className="leading-loose">
              <div className="bg-white text-[16px] text-[#afafaf] border-[#e0e0e0] md:rounded-lg md:shadow-md mb-[1px] md:m-4 p-4 border rounded-md shadow-md m-6 font-monserrat">
                <div className="mt-4 text-center">
                  <p className="leading-tight my-4">
                    Has arrastrado {droppedCount} de las {words.length} opciones
                    disponibles. <br />
                    Respuestas correctas: {correctAnswers} de {words.length} (
                      {Math.floor(percentage)}%)
                  </p>
                 
                </div>
                <div className="flex justify-center mb-4 opacity-100">
                  {wordToShow && (
                    <div
                      key={wordToShow.id}
                      className="mb-2 bg-[#6E3CD2] rounded-[15px] px-4 py-2 cursor-pointer text-white text-center opacity-100"
                      draggable
                      onDragStart={(e) => handleDragStart(e, wordToShow.id)}
                    >
                      {wordToShow.text}
                    </div>
                  )}
                </div>

                <div className="flex justify-around h-full w-full">
                  <div className="w-[30%] items-center flex flex-col justify-center rounded-[15px]">
                    <div className="w-full rounded-md bg-[#6E3CD2] px-4 text-white my-2">
                      <h3 className="text-[16px] font-semibold text-center">
                        A la entrada...
                      </h3>
                    </div>

                    <div
                      className="pt-2 w-full min-h-[300px] max-h-[600px] h-auto shadow-md rounded-[10px] border-2  border-gray-300 flex flex-col justify-start items-center"
                      onDrop={(e) => handleDrop(e, "entrada")}
                      onDragOver={allowDrop}
                    >
                      <div className="drop-box overflow-auto height-full h-auto leading-tight ">
                        {words
                          .filter(
                            (word) =>
                              word.currentBox === "entrada" && word.isDropped
                          )
                          .map((word) => (
                            <div
                              key={word.id}
                              className="px-2 my-4 text-[16px] text-white bg-gray-200 p-2 mx-4 rounded-[15px] relative opacity-100"
                              style={{
                                backgroundColor: word.isCorrect
                                  ? "#009A3D"
                                  : "#f44336",
                                  opacity: word.isDropped ? 1 : 0.5,
                              }}
                            >
                              <div className="absolute top-[-15px] right-[-10px] w-8 h-8">
                                {word.isCorrect ? (
                                  <img
                                    src="/src/assets/img/checkAct.png"
                                    alt="Correct"
                                  />
                                ) : (
                                  <img
                                    src="/src/assets/img/false.png"
                                    alt="Incorrect"
                                  />
                                )}
                              </div>
                              {word.text}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-[20%] flex justify-center items-center">
                    <img
                      className="w-full"
                      src="/src/assets/img/avatar-hombre-morado-blanco.webp"
                      alt=""
                    />
                  </div>

                  <div className="w-[30%] items-center flex flex-col justify-center rounded-[15px]">
                    <div className="w-full rounded-md bg-[#6E3CD2] px-2 text-white my-2">
                      <h3 className="text-[16px] font-semibold text-center">
                        A la salida...
                      </h3>
                    </div>
                    <div
                      className="w-full pt-2 min-h-[300px] max-h-[600px] h-auto shadow-md rounded-[10px] border-2 border-gray-300 flex flex-col justify-start items-center"
                      onDrop={(e) => handleDrop(e, "salida")}
                      onDragOver={allowDrop}
                    >
                      <div className="drop-box overflow-auto h-auto leading-tight">
                        {words
                          .filter(
                            (word) =>
                              word.currentBox === "salida" && word.isDropped
                          )
                          .map((word) => (
                            <div
                              key={word.id}
                              className="px-4 my-4 text-[16px] text-white bg-gray-200 rounded-[15px] p-2 mx-4 relative opacity-100"
                              style={{
                                backgroundColor: word.isCorrect
                                  ? "#009A3D"
                                  : "#f44336",
                              }}
                            >
                              <div className="absolute top-[-15px] right-[-10px] w-8 h-8">
                                {word.isCorrect ? (
                                  <img
                                    src="/src/assets/img/checkAct.png"
                                    alt="Correct"
                                  />
                                ) : (
                                  <img
                                    src="/src/assets/img/false.png"
                                    alt="Incorrect"
                                  />
                                )}
                              </div>
                              {word.text}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                {feedback && (
                  <div className="w-full flex text-center flex-col items-center justify-center rounded-lg">
                    <div
                      className="feedback mt-4 w-[50%]"
                      style={{
                        backgroundColor:
                          feedback ===
                          "¡Muy bien! identificaste este peligro correctamente."
                            ? "#009A3D"
                            : "#f44336",
                        color: "white",
                        padding: "10px",
                        borderRadius: "5px",
                        lineHeight: "1.2",
                      }}
                    >
                      {feedback}
                    </div>
                  </div>
                )}

                <div className="w-full flex justify-center items-center">
                  <div className="flex justify-center mt-6 mx-2">
                    <button
                      onClick={handleUndo}
                      className="flex mx-2 justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white my-3"
                    >
                      Deshacer
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex mx-2 justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white my-3"
                      disabled={isResetButtonDisabled}
                    >
                      <FontAwesomeIcon icon={faRepeat} className="mr-2" />
                      Reiniciar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden w-full bg-white flex flex-col justify-center">
        <Actividad_Mobile_entada_salida
          words={words}
          droppedCount={droppedCount}
          correctAnswers={correctAnswers}
          percentage={percentage}
          feedback={feedback}
        />
    </div>
    </div>
  );
}

export default EPS_Lugares_Confinados;
