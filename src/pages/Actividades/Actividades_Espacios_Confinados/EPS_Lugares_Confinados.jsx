import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import Actividad_Mobile_entada_salida from "../Actividades_Espacios_Confinados/Actividad_Mobile_Entrada_Salida";
import hombre from "/src/assets/img/avatar-hombre-morado-blanco.webp";
import trueImage from "/src/assets/img/checkAct.png";
import falseImage from "/src/assets/img/false.png";

function EPS_Lugares_Confinados() {
  {
    /* Estado inicial de las palabras con su texto, id, caja correcta y otras propiedades*/
  }
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

  {
    /*Definición de los estados */
  }
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

      {
        /*guarda el estado anterior para poder deshacer la acción */
      }
      setHistory([...history, previousState]);

      updatedWords[wordIndex].isDropped = true;
      updatedWords[wordIndex].currentBox = box;
      updatedWords[wordIndex].isCorrect =
        updatedWords[wordIndex].correctBox === box;

      setWords(updatedWords);
      setDroppedCount(droppedCount + 1);
    }
  };

  {
    /* Permite que el elemento sea soltado en el área */
  }
  const allowDrop = (e) => {
    e.preventDefault();
  };

  {
    /* Maneja el inicio del evento de arrastre */
  }
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    e.currentTarget.style.opacity = "1"; // Evita la reducción de opacidad
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1"; // Asegura que la opacidad no cambie
  };

  {
    /* Maneja el evento de resetear la actividad */
  }
  const handleReset = () => {
    setWords(initialWords);
    setDroppedCount(0);
    setFeedback(null);
  };

  {
    /* Maneja el evento de deshacer el último movimiento */
  }
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

  {
    /* Obtiene la primera palabra que aún no ha sido soltada */
  }
  const wordToShow = words.filter((word) => !word.isDropped)[0];

  {
    /* Calcula el número de respuestas correctas y el porcentaje */
  }
  const getCorrectAnswers = () => {
    const correctAnswers = words.filter((word) => word.isCorrect).length;
    const percentage = (correctAnswers / words.length) * 100;
    return { correctAnswers, percentage };
  };
  {
    /* Extrae el número de respuestas correctas y el porcentaje */
  }
  const { correctAnswers, percentage } = getCorrectAnswers();

  {
    /* Verifica si todas las respuestas son correctas y actualiza el mensaje de retroalimentación */
  }
  // Función para manejar el cálculo de retroalimentación
  const checkFeedback = () => {
    const correctAnswers = words.filter((word) => word.isCorrect).length;
    const incorrectAnswers = words.length - correctAnswers;

    if (correctAnswers === words.length) {
      // Todas las respuestas son correctas
      setFeedback("¡Muy bien! identificaste los peligros correctamente.");
    } else if (incorrectAnswers === words.length) {
      // Todas las respuestas son incorrectas
      setFeedback(
        "Todas las opciones son incorrectas, piénsalo bien y vuelve a intentarlo."
      );
    } else {
      // Algunas respuestas son correctas, otras incorrectas
      setFeedback(
        "¡Piénsalo bien! ¡Algunos peligros no corresponden, vuelve a intentarlo!"
      );
    }
  };

  // Llamar a checkFeedback cuando todas las palabras han sido soltadas
  useEffect(() => {
    if (droppedCount === words.length && feedback === null) {
      checkFeedback();
    }
  }, [droppedCount, words]);

  // Cambiar el color de fondo según la retroalimentación
  const getFeedbackColor = () => {
    const correctAnswers = words.filter((word) => word.isCorrect).length;
    const incorrectAnswers = words.length - correctAnswers;

    if (correctAnswers === words.length) {
      return "#009A3D"; // Verde para todas correctas
    } else if (incorrectAnswers === words.length) {
      return "#f44336"; // Rojo para todas incorrectas
    } else {
      return "#FF9800"; // Naranja para mixto
    }
  };

  {
    /* Muestra retroalimentación cuando se han soltado todas las palabras */
  }
  if (droppedCount === words.length && feedback === null) {
    checkFeedback();
  }

  {
    /* Verifica si el botón de reiniciar debe estar deshabilitado */
  }
  const isResetButtonDisabled = words.some((word) => !word.isDropped);
  return (
    <div className="md:flex hidden flex-col items-center  justify-center relative">
      <div className="grid grid-cols-1 justify-start md:flex md:flex-col h-auto w-full relative  ">
        <div className="leading-loose relative">
          <div className="h-96 text-[16px] text-[#afafaf] md:rounded-lg-md rounded-md font-monserrat">
            <div className="text-center">
              {feedback && (
                <div className="w-full flex text-center flex-col items-center justify-center rounded-lg relative my-0">
                  <div
                    className="w-[50%]"
                    style={{
                      backgroundColor: getFeedbackColor(),
                      color: "white",
                      padding: "5px",
                      borderRadius: "5px",
                      lineHeight: "1.2",
                    }}
                  >
                    {feedback}
                  </div>
                  <p className="leading-tight">
                    Respuestas correctas: {correctAnswers} de {words.length} (
                    {Math.floor((correctAnswers / words.length) * 100)}%)
                  </p>
                </div>
              )}
            </div>
            <div className="w-full flex items-center justify-center relative">
              <h3 className="text-[16px] font-semibold h-8 absolute z-30 top-0">
                Quedan {words.filter((word) => !word.isDropped).length} de 6
              </h3>
            </div>
            <div className="flex justify-center my-0 items-center flex-col">
              {wordToShow && (
                <div
                  key={wordToShow.id}
                  className="mb-2 bg-[#6E3CD2] rounded-[15px] px-2 py-2 cursor-pointer text-white text-center opacity-100"
                  draggable
                  onDragStart={(e) => handleDragStart(e, wordToShow.id)}
                  onDragEnd={handleDragEnd}
                >
                  {wordToShow.text}
                </div>
              )}
            </div>

            <div className="flex justify-around w-full min-h-[200px] max-h-[400px] h-auto relative bottom-10">
              <div className="w-[40%] items-center flex flex-col justify-center rounded-[15px]">
                {/*salida*/}
                <div className="w-full rounded-md bg-[#6E3CD2] text-white my-2">
                  <h3 className="text-[16px] font-semibold text-center">
                    A la entrada...
                  </h3>
                </div>
                <div
                  className="pt-2 w-full min-h-[200px] max-h-[400px] h-auto shadow-md rounded-[10px] border-2 border-gray-300 flex flex-col justify-start items-center"
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
                          className="px-2 my-4 text-[16px] text-white bg-gray-200 p-2 mx-4 rounded-[15px] relative"
                          style={{
                            backgroundColor: word.isCorrect
                              ? "#009A3D"
                              : "#f44336",
                          }}
                        >
                          <div className="absolute top-[-15px] right-[-10px] w-8 h-8">
                            {word.isCorrect ? (
                              <img src={trueImage} alt="Correct" />
                            ) : (
                              <img src={falseImage} alt="Incorrect" />
                            )}
                          </div>
                          {word.text}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="w-[20%] flex justify-center items-center">
                <img className="w-full" src={hombre} alt="" />
              </div>

              <div className="w-[40%] items-center flex flex-col justify-center rounded-[15px]">
                {/*salida*/}
                <div className="w-full rounded-md bg-[#6E3CD2] text-white my-2">
                  <h3 className="text-[16px] font-semibold text-center">
                    A la salida...
                  </h3>
                </div>
                <div
                  className="w-full pt-2 min-h-[200px] max-h-[600px] h-auto shadow-md rounded-[10px] border-2 border-gray-300 flex flex-col justify-start items-center"
                  onDrop={(e) => handleDrop(e, "salida")}
                  onDragOver={allowDrop}
                >
                  <div className="drop-box overflow-auto h-auto leading-tight">
                    {words
                      .filter(
                        (word) => word.currentBox === "salida" && word.isDropped
                      )
                      .map((word) => (
                        <div
                          key={word.id}
                          className="px-4 my-4 text-[16px] text-white bg-gray-200 rounded-[15px] p-2 mx-4 relative"
                          style={{
                            backgroundColor: word.isCorrect
                              ? "#009A3D"
                              : "#f44336",
                          }}
                        >
                          <div className="absolute top-[-15px] right-[-10px] w-8 h-8">
                            {word.isCorrect ? (
                              <img src={trueImage} alt="Correct" />
                            ) : (
                              <img src={falseImage} alt="Incorrect" />
                            )}
                          </div>
                          {word.text}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center items-center relative bottom-20">
              <div className="w-[50%] flex justify-center mx-2">
                <button
                  onClick={handleUndo}
                  className="w-[200px] flex mx-2 h-8 justify-center items-center group bg-main-color rounded-full px-4 shadow-main-color text-white"
                >
                  Deshacer
                </button>
                <button
                  onClick={handleReset}
                  className="w-[200px] flex mx-2 h-8 justify-center items-center group bg-main-color rounded-full px-4 shadow-main-color text-white"
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
