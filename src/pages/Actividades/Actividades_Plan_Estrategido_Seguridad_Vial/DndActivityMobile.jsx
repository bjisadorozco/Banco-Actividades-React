import React, { useState } from "react";
import trueImage from "/src/assets/img/checkAct.png";
import falseImage from "/src/assets/img/false.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faUndo } from "@fortawesome/free-solid-svg-icons";
const items = [
  "Reducción de los costos asociados a los accidentes de tránsito.",
  "Mejora de la imagen y reputación de la organización.",
  "Mayor compromiso de los trabajadores con la seguridad vial.",
  "Disminución del absentismo laboral.",
  "Aumento de la productividad.",
  "Aumento de los salarios a los trabajadores.",
  "Mayor riesgo de los conductores al salir a las vías.",
  "Mayor desgaste de los vehículos.",
];

const correctAnswers = {
  Si: [
    "Reducción de los costos asociados a los accidentes de tránsito.",
    "Mejora de la imagen y reputación de la organización.",
    "Mayor compromiso de los trabajadores con la seguridad vial.",
    "Disminución del absentismo laboral.",
    "Aumento de la productividad.",
  ],
  No: [
    "Aumento de los salarios a los trabajadores.",
    "Mayor riesgo de los conductores al salir a las vías.",
    "Mayor desgaste de los vehículos.",
  ],
};

function SelectItem({ id, content, correct, onChange }) {
  const [isCorrect, setIsCorrect] = useState(correct);

  const handleChange = (e) => {
    const value = e.target.value;
    onChange(id, value);
    const isCorrect = value
      ? (correctAnswers[value]?.includes(content) ?? false)
      : null;
    setIsCorrect(isCorrect);
  };

  return (
    <div
      className={`w-full flex flex-col items-center justify-center p-2 rounded-lg mb-2 ${
        isCorrect === null ? "bg-[#6E3CD2]" : isCorrect ? "bg-[#4caf50]" : "bg-[#f44336]"
      }`}
    >
      <span className="text-white">{content}</span>
      <select
        id={id}
        onChange={handleChange}
        className="w-full bg-white text-[#808693] rounded-lg px-2 py-1 my-2"
      >
        <option value="">Seleccionar</option>
        <option value="Si">Sí</option>
        <option value="No">No</option>
      </select>
      {isCorrect !== null && (
        <div className="flex items-center justify-center mt-2">
          <img
            src={isCorrect ? trueImage : falseImage}
            alt={isCorrect ? "Correcto" : "Incorrecto"}
            className="w-[50px] mr-2"
          />
          <span className="text-white">{isCorrect ? "Correcto" : "Incorrecto"}</span>
        </div>
      )}
    </div>
  );
}

export default function DndActivityMobile() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsState, setItemsState] = useState(
    items.reduce(
      (acc, item) => ({ ...acc, [item]: { box: "", correct: null } }),
      {}
    )
  );
  const [feedback, setFeedback] = useState(null);
  const [finalFeedback, setFinalFeedback] = useState(null);

  const handleSelectChange = (item, value) => {
    setItemsState((prev) => {
      const isCorrect = value
        ? (correctAnswers[value]?.includes(item) ?? false)
        : null;
      const newState = {
        ...prev,
        [item]: { box: value, correct: isCorrect },
      };

      const correctCount = Object.values(newState).filter(
        (data) => data.correct === true
      ).length;
      const totalItems = items.length;
      const correctPercentage = Math.round((correctCount / totalItems) * 100);

      setFeedback(
        `Respuestas correctas: ${correctCount} de ${totalItems} (${correctPercentage}%)`
      );

      return newState;
    });
  };

  const nextQuestion = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      validateAnswers();
    }
  };

  const validateAnswers = () => {
    let correctCount = 0;
    let incorrectCount = 0;

    Object.values(itemsState).forEach((data) => {
      if (data.correct === true) correctCount++;
      if (data.correct === false) incorrectCount++;
    });

    const totalItems = items.length;
    const correctPercentage = Math.round((correctCount / totalItems) * 100);

    if (correctCount === totalItems) {
      setFinalFeedback(
        `¡Muy bien! Conoces correctamente los beneficios del PESV. Respuestas correctas ${correctCount} de ${totalItems} (${correctPercentage}%).`
      );
    } else if (incorrectCount === totalItems) {
      setFinalFeedback(
        `Todas las opciones son incorrectas, piénsalo bien y vuelve a intentarlo. Respuestas correctas ${correctCount} de ${totalItems} (${correctPercentage}%).`
      );
    } else {
      setFinalFeedback(
        `¡Piénsalo bien! Algunos beneficios no son correctos. Respuestas correctas ${correctCount} de ${totalItems} (${correctPercentage}%).`
      );
    }
  };

  const resetActivity = () => {
    setItemsState(
      items.reduce(
        (acc, item) => ({ ...acc, [item]: { box: "", correct: null } }),
        {}
      )
    );
    setFeedback(null);
    setFinalFeedback(null);
    setCurrentIndex(0);
  };

  const getFeedbackColor = () => {
    const correctAnswersCount = Object.values(itemsState).filter(
      (data) => data.correct === true
    ).length;
    const incorrectAnswersCount = Object.values(itemsState).filter(
      (data) => data.correct === false
    ).length;

    if (correctAnswersCount === items.length) {
      return "#009A3D"; // Verde para todas correctas
    } else if (incorrectAnswersCount === items.length) {
      return "#f44336"; // Rojo para todas incorrectas
    } else {
      return "#FF9800"; // Naranja para mixto
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center p-2 bg-[#6E3CD2] rounded-lg">
          <span className="text-white font-bold">
            {currentIndex + 1}/{items.length}
          </span>
        </div>
        <SelectItem
          key={items[currentIndex]}
          id={items[currentIndex]}
          content={items[currentIndex]}
          correct={itemsState[items[currentIndex]].correct}
          onChange={handleSelectChange}
        />
        {feedback && (
          <div className="text-[#808693] text-center">
            {feedback}
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-center">
        {currentIndex < items.length - 1 ? (
          <button
            onClick={nextQuestion}
            className="bg-[#6E3CD2] text-white px-4 py-2 rounded-full mr-2"
          >
            Siguiente
          </button>
        ) : (
          <button
            onClick={validateAnswers}
            className="bg-[#6E3CD2] text-white px-4 py-2 rounded-full mr-2"
          >
            <FontAwesomeIcon icon={faUndo} className="mr-2" />
            Validar
          </button>
        )}
        <button
          onClick={resetActivity}
          className="bg-[#6E3CD2] text-white px-4 py-2 rounded-full"
        >
          <FontAwesomeIcon icon={faRepeat} className="mr-2" />
          Reiniciar
        </button>
      </div>

      {finalFeedback && (
        <div
          className={`w-full mt-4 p-3 rounded text-white flex flex-col items-center justify-center text-center`}
          style={{ backgroundColor: getFeedbackColor() }}
        >
          {finalFeedback}
        </div>
      )}


    </div>
    
  );
}
