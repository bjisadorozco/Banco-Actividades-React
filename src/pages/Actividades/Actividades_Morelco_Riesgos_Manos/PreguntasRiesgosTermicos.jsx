import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import Paragraph from "../../components/Paragraph";
import Instruction from "../../components/InstructionList";
import Button from "../../components/Button";
import ModalDialog from "../../components/ModalDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faRepeat,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";
import "./styles/PreguntasRiesgosTermicos.css";
import { useMediaQuery } from "react-responsive";

const initialOptions = [
  { value: "1", label: "vehículos" },
  { value: "2", label: "gasolina" },
  { value: "3", label: "térmico" },
  { value: "4", label: "tóxicas" },
  { value: "5", label: "exposición" },
];

const correctAnswers = ["1", "3", "5", "2", "4"];

function PreguntasRiesgosTermicos() {
  const [dropdowns, setDropdowns] = useState(Array(5).fill("0"));
  const [borderColors, setBorderColors] = useState(
    Array(5).fill("border-slate-900")
  );
  const [isValidated, setIsValidated] = useState(false);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [percentage, setPercentage] = useState(0); // Nuevo estado para el porcentaje
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  const handleDropdownChange = (index, value) => {
    const newDropdowns = [...dropdowns];
    newDropdowns[index] = value;
    setDropdowns(newDropdowns);
  };

  const validateDropdowns = () => {
    if (dropdowns.includes("0")) {
      setErrorMessage("Debe seleccionar todas las opciones antes de validar.");
      return;
    }
    setErrorMessage("");
    const newBorderColors = dropdowns.map((value, index) =>
      value === correctAnswers[index]
        ? "bg-correct-feedback text-white border-slate-900"
        : "bg-incorrect-feedback text-white border-slate-900"
    );
    setBorderColors(newBorderColors);

    const correct = dropdowns.filter(
      (value, index) => value === correctAnswers[index]
    ).length;
    setCorrectCount(correct);
    setIsValidated(true);

    // Calcular porcentaje
    const calculatedPercentage = Math.round(
      (correct / correctAnswers.length) * 100
    );
    setPercentage(calculatedPercentage);

    // Set feedback based on correctness
    if (correct === correctAnswers.length) {
      setFeedback("¡Muy bien! Estas aprendiendo mucho para cuidar tus manos.");
    } else {
      setFeedback("¡Piénsalo bien!");
    }
  };

  const resetDropdowns = () => {
    setDropdowns(Array(5).fill("0"));
    setBorderColors(Array(5).fill("border-slate-900"));
    setIsValidated(false);
    setCorrectCount(0);
    setFeedback("");
    setPercentage(0); // Reinicia el porcentaje
    setErrorMessage("");
  };

  const getAvailableOptions = (index) => {
    const selectedOptions = dropdowns.filter(
      (value, i) => i !== index && value !== "0"
    );
    return initialOptions.filter(
      (option) => !selectedOptions.includes(option.value)
    );
  };

  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0">
      <div
        className="md:w-[100%] bg-white flex flex-col justify-center"
        style={{
          position: isMobile ? "static" : "relative",
          top: isMobile ? "0" : "0px",
        }}
      >
        <div className="flex flex-col items-center">
          <div className="ctActivityDragDrop px-2 justify-start display-mobile mb-3 h-auto">
            <div className="listOpcDrop">
              <div
                className={`caja-container p-4 border rounded-md shadow-md ${isMobile ? "m-2" : "m-2"}`}
              >
                <Paragraph
                  theme="ligth"
                  justify={isMobile ? "justify" : "justify"}
                >
                  Estimado Antonio, tu trabajo es muy importante para nuestra
                  empresa, y al estar relacionado con
                  <Select
                    className="m-1"
                    index={0}
                    value={dropdowns[0]}
                    onChange={handleDropdownChange}
                    borderColor={borderColors[0]}
                    options={getAvailableOptions(0)}
                  />
                  personas, la vía y el entorno, estás expuesto a diferentes
                  riesgos de tipo
                  <Select
                    className="m-1"
                    index={1}
                    value={dropdowns[1]}
                    onChange={handleDropdownChange}
                    borderColor={borderColors[1]}
                    options={getAvailableOptions(1)}
                  />
                  )entre los cuales se encuentran: la
                  <Select
                    className="m-1"
                    index={2}
                    value={dropdowns[2]}
                    onChange={handleDropdownChange}
                    borderColor={borderColors[2]}
                    options={getAvailableOptions(2)}
                  />
                  , permanente al sol, el contacto con superficies calientes,
                  manipulación de las partes mecánicas del vehículo, o la misma
                  <Select
                    className="m-1"
                    index={3}
                    value={dropdowns[3]}
                    onChange={handleDropdownChange}
                    borderColor={borderColors[3]}
                    options={getAvailableOptions(3)}
                  />
                  puedes tener exposición a productos químicos, y contacto con
                  sustancias
                  <Select
                    className="m-1"
                    index={4}
                    value={dropdowns[4]}
                    onChange={handleDropdownChange}
                    borderColor={borderColors[4]}
                    options={getAvailableOptions(4)}
                  />
                  , por ejemplo con los productos de limpieza del vehículo y de
                  los equipos que manipulas a diario. ¡Por favor ten mucho
                  cuidado!
                </Paragraph>
                {isValidated && (
                  <div className="text-center">
                    <h3
                      className={`text-md mt-0 font-bold text-paragraph-light-color`}
                    >
                      {correctCount} de {correctAnswers.length} respuestas
                      correctas
                    </h3>
                    <p className="text-paragraph-light-color font-bold">
                      Su resultado porcentual es del {percentage}%
                    </p>
                  </div>
                )}
                <div className="flex flex-col items-center justify-center">
                  {errorMessage && (
                    <p className="text-secondary-color text-center font-bold mt-1">
                      {errorMessage}
                    </p>
                  )}
                  <div className="botones-container-RT">
                    <Button
                      bold={false}
                      icon={faCheck}
                      roundedFull={true}
                      onClick={validateDropdowns}
                    >
                      Validar
                    </Button>
                    <Button
                      bold={false}
                      icon={faRepeat}
                      roundedFull={true}
                      onClick={resetDropdowns}
                    >
                      Reiniciar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Select({ index, value, onChange, borderColor, options, className }) {
  return (
    <select
      className={`custom-select-wrapper custom-select word-select ${borderColor} ${className}`}
      value={value}
      onChange={(e) => onChange(index, e.target.value)}
    >
      <option value="0">Seleccione...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default PreguntasRiesgosTermicos;
