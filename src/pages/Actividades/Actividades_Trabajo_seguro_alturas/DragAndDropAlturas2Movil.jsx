'use client'

import { useState, useEffect } from "react";
import imgOption1 from "../../../assets/img/describir_las_tareas_sldM1.webp";
import imgOption2 from "../../../assets/img/difundir_riesgos_sldM1.webp";
import imgOption3 from "../../../assets/img/identificar_riesgos_sldM1.webp";

import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import imgVerdadero from "../../../assets/img/checkAct.png";
import imgFalso from "../../../assets/img/xmarkAct.png";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";

export default function DragAndDropAlturas2Movil() {
  const [verificationImages, setVerificationImages] = useState({});
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("");
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [isResetDisabled, setIsResetDisabled] = useState(true);

  const options = [
    { id: "option1", text: "-Inspección previa y periódica de los equipos de sujeción. -Capacitación sobre el uso correcto de arneses y sistemas de sujeción. -uso obligatorio de líneas de vida certificadas. -Sistema de doble anclaje.", label: "Caso 1", value: 1, imgSrc: imgOption1 },
    { id: "option2", text: "-Verificación de estabilidad de la plataforma antes de usarla. -Certificación del equipo. -Uso de líneas de vida adicionales para seguridad.", label: "Caso 2", value: 2, imgSrc: imgOption2 },
    { id: "option3", text: "-Uso de arneses con líneas de vida. -Implementar árias de exclusión debajo de la zona de trabajo. -Uso de redes de protección para caída de herramientas o materiales.", label: "Caso 3", value: 3, imgSrc: imgOption3 },
  ];

  const [dropdownSelections, setDropdownSelections] = useState(
    Array(options.length).fill("0")
  );
  const [availableOptions, setAvailableOptions] = useState(options);

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  const handleDropdownChange = (index, value) => {
    setDropdownSelections((prev) => {
      const updatedSelections = [...prev];
      updatedSelections[index] = value;

      const selectedValues = updatedSelections.filter((val) => val !== "0");
      const remainingOptions = options.filter(
        (option) => !selectedValues.includes(option.id)
      );
      setAvailableOptions(remainingOptions);

      const isCorrect =
        (index === 0 && value === "option1") ||
        (index === 1 && value === "option2") ||
        (index === 2 && value === "option3");

      if (isCorrect) {
        let feedbackText = "";
        switch (value) {
          case "option1":
            feedbackText = "Los guantes son esenciales para proteger las manos...";
            break;
          case "option2":
            feedbackText = "El casco es crucial para proteger la cabeza...";
            break;
          case "option3":
            feedbackText = "Las botas de seguridad protegen los pies...";
            break;
        }
        setFeedback(feedbackText);
        setFeedbackColor("bg-correct-feedback border-green-500");
      } else {
        setFeedback("Esta no es la opción correcta para esta posición.");
        setFeedbackColor("bg-incorrect-feedback border-red-500");
      }

      setVerificationImages((prevImages) => ({
        ...prevImages,
        [index]: isCorrect ? "border-green-600" : "border-red-600",
      }));

      const isAnySelected = updatedSelections.some((val) => val !== "0");
      setIsResetDisabled(!isAnySelected);

      return updatedSelections;
    });
  };

  const getFilteredOptions = (index) => {
    const selectedValues = dropdownSelections.filter((_, i) => i !== index);
    return options.filter((option) => !selectedValues.includes(option.id));
  };

  const handleReset = () => {
    setDropdownSelections(Array(options.length).fill("0"));
    setAvailableOptions(options);
    setFeedback("");
    setFeedbackColor("");
    setVerificationImages({});
    setCorrectAnswersCount(0);
    setIsResetDisabled(true);
  };

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:flex-2 bg-white w-full px-2 flex justify-center items-center pb-2">
          <div className="md:flex-2 display-mobile ligth-display bg-white w-full px-6 flex flex-col justify-center items-center mb-3 mt-10">
            <div className="block w-full">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`relative mb-6 w-full flex flex-col items-center justify-center p-4 rounded-md mx-auto ${
                    verificationImages[index] === "border-green-600"
                      ? "bg-[#4CAF50]"
                      : verificationImages[index] === "border-red-600"
                        ? "bg-[#F44336]"
                        : "bg-gray-200"
                  }`}
                >
                  <div className="w-full relative">
                    <Paragraph theme="light">
                      <textarea
                        className="w-full p-2 border-2 border-gray-300 rounded-md h-[150px]"
                        value={option.text}
                        readOnly
                      />
                    </Paragraph>
                    {(verificationImages[index] === "border-green-600" || verificationImages[index] === "border-red-600") && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          className="h-[90px] w-[90px]" 
                          src={verificationImages[index] === "border-green-600" ? imgVerdadero : imgFalso} 
                          alt={verificationImages[index] === "border-green-600" ? "Correcto" : "Incorrecto"} 
                        />
                      </div>
                    )}
                  </div>
                  <div className="w-full text-center mt-4">
                    <select
                      className={`border-2 w-3/4 rounded-md text-black ${verificationImages[index] || ""}`}
                      value={dropdownSelections[index]}
                      onChange={(e) =>
                        handleDropdownChange(index, e.target.value)
                      }
                    >
                      <option value="0" disabled>
                        Seleccione...
                      </option>
                      {getFilteredOptions(index).map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4 w-full text-center">
                    <Paragraph className="text-white">
                      {verificationImages[index] === "border-green-600"
                        ? "¡Correcto!"
                        : verificationImages[index] === "border-red-600"
                          ? "¡Incorrecto! Piénsalo bien."
                          : ""}
                    </Paragraph>
                  </div>
                </div>
              ))}

              <div className="flex flex-row gap-4 justify-center mt-4">
                <Button
                  onClick={handleReset}
                  icon={faRepeat}
                  roundedFull={true}
                  disabled={isResetDisabled}
                >
                  Reiniciar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

