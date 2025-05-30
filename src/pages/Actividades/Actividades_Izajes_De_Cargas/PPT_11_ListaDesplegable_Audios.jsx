"use client";

import { useState, useEffect } from "react";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import metodo5Porque from "../../../assets/img/metodo_5_porque_sldM3.webp";
import metodoArbolFallas from "../../../assets/img/metodo_arbol_fallas_sldM3.webp";
import metodoEspinaPescado from "../../../assets/img/metodo_espina_pescado_sldm3.webp";
import correctIcon from "../../../assets/img/checkAct.png";
import incorrectIcon from "../../../assets/img/xmarkAct.png";

import "./styles/PPT_11_ListaDesplegable_Audios.css";
import izaje_combinado from "../../../assets/img/Izaje de cargas/izaje_combinado.webp";
import izaje_inclinado from "../../../assets/img/Izaje de cargas/izaje_inclinado.webp";
import izaje_manual from "../../../assets/img/Izaje de cargas/izaje_manual.webp";
import izaje_vertical from "../../../assets/img/Izaje de cargas/izaje_vertical.webp";

export default function PPT_11_ListaDesplegable_Audios() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isResetActive, setIsResetActive] = useState(false);
  const [items, setItems] = useState([
    {
      image: izaje_vertical,
      audio: "audio1.mp3",
      correctAnswer: "1",
      selectedAnswer: "",
      isCorrect: false,
    },
    {
      image: izaje_inclinado,
      audio: "audio1.mp3",
      correctAnswer: "2",
      selectedAnswer: "",
      isCorrect: false,
    },
    {
      image: izaje_combinado,
      audio: "audio1.mp3",
      correctAnswer: "3",
      selectedAnswer: "",
      isCorrect: false,
    },
    {
      image: izaje_manual,
      audio: "audio1.mp3",
      correctAnswer: "4",
      selectedAnswer: "",
      isCorrect: false,
    },
  ]);

  const [availableOptions] = useState([
    { value: "3", label: "Izaje Combinado​" },
    { value: "1", label: "Izaje Vertical​" },
    { value: "2", label: "Izaje Inclinado" },
    { value: "4", label: "Izaje Manual" },
  ]);

  useEffect(() => {
    const anySelected = items.some((item) => item.selectedAnswer !== "");
    setIsResetActive(anySelected);
  }, [items]);

  useEffect(() => {
    // Evitar el scroll temporal al recargar la página
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 100);
  }, []);

  const handleSelect = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].selectedAnswer = value;
    setItems(updatedItems);
  };

  const handleValidate = () => {
    if (items.some((item) => item.selectedAnswer === "")) {
      setErrorMessage("Debe seleccionar todas las opciones antes de validar.");
      return;
    }

    let correct = 0;
    const updatedItems = items.map((item) => {
      const isCorrect = item.selectedAnswer === item.correctAnswer;
      if (isCorrect) correct++;
      return { ...item, isCorrect };
    });

    setItems(updatedItems);
    setCorrectCount(correct);
    setPercentage(Math.round((correct / items.length) * 100));
    setIsVerified(true);
    setErrorMessage("");
  };

  const handleReset = () => {
    setItems(
      items.map((item) => ({ ...item, selectedAnswer: "", isCorrect: false }))
    );
    setErrorMessage("");
    setIsVerified(false);
    setCorrectCount(0);
    setPercentage(0);
    setIsResetActive(false);
  };

  return (
    <div className="quiz-containerALD">
      <div className="items-grid">
        {items.map((item, index) => (
          <div
            key={index}
            className={`item-box ${
              item.selectedAnswer !== "" && !isVerified ? "selected" : ""
            } ${isVerified ? (item.isCorrect ? "correct" : "incorrect") : ""}`}
          >
            <div className="image-containerALD">
              <img
                src={item.image || "/placeholder.svg"}
                alt={`Item ${index + 1}`}
                className="item-image"
              />
              {isVerified && (
                <img
                  src={item.isCorrect ? correctIcon : incorrectIcon}
                  className="feedback-iconALD"
                />
              )}
            </div>

            {/* <p
              className={`item-description ${isVerified ? "text-white" : ""}`}
            ></p> */}

            <audio controls style={{ width: "170px", height: "30px" }}>
              <source
                src={
                  availableOptions.find(
                    (option) => option.value === item.selectedAnswer
                  )?.audio || ""
                }
                type="audio/mpeg"
              />
              Tu navegador no soporta el elemento de audio.
            </audio>
            <select
              className={`item-select ${
                item.selectedAnswer !== "" && !isVerified ? "selected" : ""
              }`}
              value={item.selectedAnswer}
              onChange={(e) => handleSelect(index, e.target.value)}
              disabled={isVerified}
            >
              <option value="" disabled>
                Seleccione...
              </option>
              {availableOptions
                .filter(
                  (option) =>
                    !items.some(
                      (item, i) =>
                        i !== index && item.selectedAnswer === option.value
                    )
                )
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>

            {isVerified && (
              <p className="feedback-text">
                {item.isCorrect ? "¡Correcto!" : "¡Incorrecto!"}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="feedback-containerALD">
        {errorMessage && (
          <p
            className="text-center text-md font-bold mt-2"
            style={{ color: "gray" }}
          >
            {errorMessage}
          </p>
        )}
        {isVerified && (
          <div className="results-containerALD text-center">
            <p className={`text-md font-bold text-paragraph-light-color`}>
              Tus respuestas correctas son: {correctCount} de {items.length} (
              {percentage}%)
            </p>
          </div>
        )}
        <div className="button-container">
          <Button
            bold={false}
            icon={faCheck}
            roundedFull={true}
            onClick={handleValidate}
          >
            {"Validar"}
          </Button>
          <Button
            bold={false}
            icon={faRepeat}
            roundedFull={true}
            onClick={handleReset}
            disabled={!isResetActive}
            className={`${!isResetActive ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {"Reiniciar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
