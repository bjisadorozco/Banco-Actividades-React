import { useState, useEffect } from "react";
import imgOption1 from "../../../assets/img/caida_perdida_estabilidad_sldM2.webp";
import imgOption2 from "../../../assets/img/colapsio_andamio_sldM2.webp";
import imgOption3 from "../../../assets/img/desplazamiento_herramientas_sldM2.webp";
import imgOption4 from "../../../assets/img/golpe_estructura_sldM2.webp";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import '../../Actividades/Actividades_Trabajo_seguro_alturas/styles/DragAndDropAlturas1.css';
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";

export default function DragAndDropAlturas1Movil() {
  const [verificationImages, setVerificationImages] = useState({});
  const [dropdownSelections, setDropdownSelections] = useState(Array(4).fill("0"));
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  const options = [
    { id: "option1", imgSrc: imgOption1, label: "caida", value: 1 },
    { id: "option2", imgSrc: imgOption2, label: "colapso", value: 2 },
    { id: "option3", imgSrc: imgOption3, label: "golpe", value: 3 },
    { id: "option4", imgSrc: imgOption4, label: "desplazamiento", value: 4 },
  ];

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  const getFilteredOptions = (index) => {
    const selectedValues = dropdownSelections.filter((_, i) => i !== index);
    return options.filter((option) => !selectedValues.includes(option.id));
  };

  const handleDropdownChange = (index, value) => {
    setDropdownSelections((prev) => {
      const updatedSelections = [...prev];
      updatedSelections[index] = value;

      const isCorrect =
        (index === 0 && value === "option1") ||
        (index === 1 && value === "option2") ||
        (index === 2 && value === "option3") ||
        (index === 3 && value === "option4");

      setVerificationImages((prevImages) => ({
        ...prevImages,
        [index]: isCorrect ? "border-green-600" : "border-red-600",
      }));

      const isAnySelected = updatedSelections.some((val) => val !== "0");
      setIsResetDisabled(!isAnySelected);

      return updatedSelections;
    });
  };

  const handleReset = () => {
    setDropdownSelections(Array(options.length).fill("0"));
    setVerificationImages({});
    setIsResetDisabled(true);
  };

  return (
    <div className="block md:hidden">
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
          <div className="relative w-full flex flex-col items-center">
            <img
              src={option.imgSrc}
              alt={`Opción ${index + 1}`}
              className="w-[60%] object-contain"
            />
          </div>
          <div className="w-full text-center mt-4">
            <select
              className={`border-2 w-3/4 rounded-md text-black ${verificationImages[index] || ""}`}
              value={dropdownSelections[index]}
              onChange={(e) => handleDropdownChange(index, e.target.value)}
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
            <Paragraph>
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
  );
}

