// Imortación de módulos y componentes necesarios
import React, { useState, useEffect } from "react";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";

// Opciones iniciales para los dropdowns
const initialOptions = [
  { value: "1", label: "vehículos" },
  { value: "2", label: "gasolina" },
  { value: "3", label: "térmico" },
  { value: "4", label: "tóxicas" },
  { value: "5", label: "exposición" },
];

// Respuestas para validar las selecciones
const correctAnswers = ["1", "3", "5", "2", "4"];

// Componente principal que representa la actividad de preguntas relacionadas con riesgos térmicos
function PreguntasRiesgosTermicos() {
  // Estados para manejar las opciones seleccionadas, estilos y feedback
  const [dropdowns, setDropdowns] = useState(Array(5).fill("0")); //Estado para los valores seleccionados de los dropdowns
  const [borderColors, setBorderColors] = useState(
    Array(5).fill("border-[#afafaf]") //Colores de los bordes de los dropdowns
  );
  const [isValidated, setIsValidated] = useState(false); //Estado para validar si las respuestas han sido validadas
  const [buttonColors, setButtonColors] = useState(Array(5).fill("bg-white")); //Colores de fondo de los botones
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor); //Manejo del estado global
  const [correctCount, setCorrectCount] = useState(0); //Número de respuestas correctas
  const [feedback, setFeedback] = useState(""); //Mensaje de retroalimentación
  const [percentage, setPercentage] = useState(0); // Nuevo estado para el porcentaje
  const [errorMessage, setErrorMessage] = useState(""); //Porcentaje de respuestas correctas
  const [isValid, setIsValid] = useState(false); //Estado para habilitar el estado de validación

  // Configuración inicial del estado global
  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  // Valida si todas las opciones hansido seleccionadas
  useEffect(() => {
    const allSelected = !dropdowns.includes("0");
    setIsValid(allSelected);
  }, [dropdowns]);

  // Maneja el cambio en los dropdowns
  const handleDropdownChange = (index, value) => {
    const newDropdowns = [...dropdowns];
    newDropdowns[index] = value;
    setDropdowns(newDropdowns);

    // Cambia los colores de los botones según las selecciones
    const newButtonColors = [...buttonColors];
    newButtonColors[index] =
      value !== "0"
        ? "bg-[#b232fc] border-none shadow-md text-white"
        : "bg-white text-black";
    setButtonColors(newButtonColors);
  };

  // Valida las respuestas seleccionadas por el usuario
  const validateDropdowns = () => {
    if (dropdowns.includes("0")) {
      setErrorMessage( <div className="text-incorrect-feedback w-full">
       Debe seleccionar todas las opciones antes de validar.
      </div> );
      return;
    }
    setErrorMessage("");

    // Cambia los colores de borde según las respuestas, si son correctas o incorrectas
    const newBorderColors = dropdowns.map((value, index) =>
      value === correctAnswers[index]
        ? "bg-correct-feedback text-white border-[#afafaf]"
        : "bg-incorrect-feedback text-white border-[#afafaf]"
    );
    setBorderColors(newBorderColors);

    // Calcula la cantidad de respuestas correctas
    const correct = dropdowns.filter(
      (value, index) => value === correctAnswers[index]
    ).length;
    setCorrectCount(correct);
    setIsValidated(true);

    // Calcula el porcentaje de respuestas correctas
    const calculatedPercentage = Math.round(
      (correct / correctAnswers.length) * 100
    );
    setPercentage(calculatedPercentage);

    // Muestra feedback según el resultado
    if (correct === correctAnswers.length) {
      setFeedback(
        <div className="bg-correct-feedback text-white py-1 px-2 my-2 rounded-md w-[80%]">
          ¡Muy bien! Estás aprendiendo mucho para cuidar tus manos.
        </div>
      );
    } else {
      setFeedback(
        <div className="bg-incorrect-feedback text-white py-1 my-2 rounded-md w-[80%]">
          ¡Piénsalo bien e intenta de nuevo!
        </div>
      );
    }
  };

//   Reinicia todos los estados al valor inicial
  const resetDropdowns = () => {
    setDropdowns(Array(5).fill("0"));
    setBorderColors(Array(5).fill("border-[#afafaf]"));
    setButtonColors(Array(5).fill("bg-white"));
    setIsValidated(false);
    setCorrectCount(0);
    setFeedback("");
    setPercentage(0); // Reinicia el porcentaje
    setErrorMessage("");
    setIsValid(false);
  };

//   Filtra las opciones disponibles para cada dropdownisValid
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
      <div className="md:w-full bg-white flex flex-col justify-center md:static relative md:top-0 top-0">
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 gap-2 justify-start md:flex md:flex-col mb-3 h-auto w-full">
            <div className="leading-loose">
              <div className="bg-white text-[#afafaf] border-[#e0e0e0] md:rounded-lg md:shadow-md mb-[1px] md:m-4 p-4 border rounded-md shadow-md m-6">
                <Paragraph theme="light" className="w-full">
                  Estimado Antonio, tu trabajo es muy importante para nuestra
                  empresa, y al estar relacionado con
                  <Select
                    className="m-1 border-[#afafaf] border-2  text-[#afafaf] w-64 "
                    index={0}
                    value={dropdowns[0]}
                    onChange={handleDropdownChange}
                    borderColor={borderColors[0]}
                    buttonColor={buttonColors[0]}
                    options={getAvailableOptions(0)}
                  />
                  personas, la vía y el entorno, estás expuesto a diferentes
                  riesgos de tipo
                  <Select
                    className="m-1 border-[#afafaf] border-2  text-[#afafaf] w-64"
                    index={1}
                    value={dropdowns[1]}
                    onChange={handleDropdownChange}
                    borderColor={borderColors[1]}
                    buttonColor={buttonColors[1]}
                    options={getAvailableOptions(1)}
                  />
                  entre los cuales se encuentran: la
                  <Select
                    className="m-1 border-[#afafaf] border-2  text-[#afafaf] w-64"
                    index={2}
                    value={dropdowns[2]}
                    onChange={handleDropdownChange}
                    borderColor={borderColors[2]}
                    buttonColor={buttonColors[2]}
                    options={getAvailableOptions(2)}
                  />
                  , permanente al sol, el contacto con superficies calientes,
                  manipulación de las partes mecánicas del vehículo, o la misma
                  <Select
                    className="m-1 border-[#afafaf] border-2  text-[#afafaf] w-64"
                    index={3}
                    value={dropdowns[3]}
                    onChange={handleDropdownChange}
                    borderColor={borderColors[3]}
                    buttonColor={buttonColors[3]}
                    options={getAvailableOptions(3)}
                  />
                  puedes tener exposición a productos químicos, y contacto con
                  sustancias
                  <Select
                    className="m-1 border-[#afafaf] border-2  text-[#afafaf] w-64"
                    index={4}
                    value={dropdowns[4]}
                    onChange={handleDropdownChange}
                    borderColor={borderColors[4]}
                    buttonColor={buttonColors[4]}
                    options={getAvailableOptions(4)}
                  />
                  , por ejemplo con los productos de limpieza del vehículo y de
                  los equipos que manipulas a diario. ¡Por favor ten mucho
                  cuidado!
                </Paragraph>
                {isValidated && (
                  <div className="text-center w-full items-center justify-center flex flex-col">
                    {feedback}
                    <h3 className="text-md mt-0 font-bold text-paragraph-light-color ">
                      Tus respuestas correctas son: {correctCount} de {correctAnswers.length} ({percentage}%)
                    </h3>
                  </div>
                )}
                <div className="flex flex-col items-center justify-center">
                  {errorMessage && (
                    <p className="text-secondary-color text-center font-bold my-2">
                      {errorMessage}
                    </p>
                  )}
                  <div className="flex justify-around h-full items-center w-full max-w-[400px] my-1">
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
                      disabled={!isValidated}
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

// Componente reutilizable para un dropdown
function Select({
  index,
  value,
  onChange,
  borderColor,
  buttonColor,
  options,
  className,
}) {
  return (
    <select
      className={`relative inline-block w-full max-w-[120px] appearance-auto rounded-[4px] py-[2px] px-[1px] text-[14px] font-montserrat cursor-pointer outline-none transition-colors duration-300 ${borderColor} ${buttonColor} ${className}`}
      value={value}
      onChange={(e) => onChange(index, e.target.value)}
    >
      <option value="0">Seleccione...</option>
      {options.map((option) => (
        <option
          className="bg-white text-[#3a3a3a] hover:bg-[#dcaff7] hover:text-[#b232fc] focus:bg-[#dcaff7] focus:text-[#b232fc] transition-colors duration-300"
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default PreguntasRiesgosTermicos;
