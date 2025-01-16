import { useState, useEffect } from "react";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import { faRepeat, faCheck } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";
import img from "../../../assets/img/caida_perdida_estabilidad_sldM2.webp";
import img1 from "../../../assets/img/colapsio_andamio_sldM2.webp";
import img2 from "../../../assets/img/desplazamiento_herramientas_sldM2.webp";
import img3 from "../../../assets/img/golpe_estructura_sldM2.webp";
import uncheck from "../../../assets/img/xmarkAct.png";
import check from "../../../assets/img/checkAct.png";

export default function SelectActivity() {
  const [selectedOptions, setSelectedOptions] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
    drop4: "",
  });
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");

  const options = [
    {
      id: "option1",
      text: "Golpes con la estructura durante el movimiento vertical​",
      label: "Trabajo en estructuras​",
      image: img,
    },
    {
      id: "option2",
      text: "Colapso del andamio por mal montaje o sobrecarga.​",
      label: "Trabajos en andamios​",
      image: img1,
    },
    {
      id: "option3",
      text: "Caídas por pérdida de estabilidad en superficies inclinadas.​",
      label: "Trabajos en techos y cubiertas​",
      image: img2,
    },
    {
      id: "option4",
      text: "Desplazamiento de herramientas o materiales desde alturas que impacten a trabajadores en niveles inferiores​​",
      label: "Trabajos en paredes",
      image: img3,
    },
  ];

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  useEffect(() => {
    const hasSelectedOptions = Object.values(selectedOptions).some(
      (option) => option !== ""
    );
    setIsResetDisabled(!hasSelectedOptions);
  }, [selectedOptions]);

  const handleReset = () => {
    setSelectedOptions({
      drop1: "",
      drop2: "",
      drop3: "",
      drop4: "",
    });
    setCorrectAnswersCount(0);
    setIsResetDisabled(true);
    setValidationMessage("");
  };

  const handleValidation = () => {
    const correctAnswers = [
      selectedOptions.drop1 === "option1",
      selectedOptions.drop2 === "option2",
      selectedOptions.drop3 === "option3",
      selectedOptions.drop4 === "option4",
    ];

    const totalCorrect = correctAnswers.filter(Boolean).length;
    const percentage = Math.round((totalCorrect / options.length) * 100);

    if (totalCorrect === 4) {
      setValidationMessage(
        `¡Muy bien! ¡Este es un riesgo de la actividad seleccionada! \nTus respuestas correctas son: ${totalCorrect} de 4 (${percentage}%).`
      );
    } else {
      setValidationMessage(
        `Has asociado un riesgo de manera errónea \n Tus respuestas correctas son: ${totalCorrect} de 4 (${percentage}%).`
      );
    }
  };

  const handleSelectChange = (dropId, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [dropId]: value,
    }));
  };

  const getFilteredOptions = (currentDropId) => {
    const selectedValues = Object.values(selectedOptions).filter(
      (value, index) => `drop${index + 1}` !== currentDropId
    );
    return options.filter((option) => !selectedValues.includes(option.id));
  };

  const isValidateDisabled = Object.values(selectedOptions).some(
    (value) => value === ""
  );

  return (
    <div className="flex flex-col overflow-x-hidden mb-36">
      <div className="flex flex-col items-center gap-4 mb-4">
        {options.map((option, index) => (
          <div
            key={option.id}
            className="p-6 mt-4 border rounded-lg shadow-md flex flex-col items-center relative"
            style={{
              justifyContent: "space-between",
              textAlign: "center",
              backgroundColor: validationMessage
                ? selectedOptions[`drop${index + 1}`] === option.id
                  ? "#4CAF50"
                  : "#F44336"
                : "white",
              color: "white",
              height: "auto",
            }}
          >
            {validationMessage && (
              <div
                style={{
                  position: "absolute",
                  top: "29%",
                  left: "90%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
              >
                <img
                  src={
                    selectedOptions[`drop${index + 1}`] === option.id
                      ? check
                      : uncheck
                  }
                  alt={
                    selectedOptions[`drop${index + 1}`] === option.id
                      ? "Correcto"
                      : "Incorrecto"
                  }
                  style={{ width: "64px", height: "64px" }}
                />
              </div>
            )}
            <img
              src={option.image || "/placeholder.svg"}
              alt={option.text}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "8px",
                position: "relative",
              }}
            />
            <Paragraph
              justify="center"
              theme={validationMessage ? undefined : "light"}
            >
              {option.text}
            </Paragraph>

            <div style={{ width: "100%" }}>
              <select
                value={selectedOptions[`drop${index + 1}`] || ""}
                onChange={(e) =>
                  handleSelectChange(`drop${index + 1}`, e.target.value)
                }
                style={{
                  width: "100%",
                  height: "40px",
                  color: validationMessage ? "#0F172A" : "gray",
                  backgroundColor: validationMessage
                    ? selectedOptions[`drop${index + 1}`] === option.id
                      ? "#90EE90"
                      : "#FFB6C1"
                    : "white",
                  borderRadius: "8px",
                  fontWeight: validationMessage ? "bold" : "normal",
                  marginTop: "20px"
                }}
              >
                <option value="">Seleccione...</option>
                {getFilteredOptions(`drop${index + 1}`).map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {validationMessage && (
        <div className="flex justify-center mt-4">
          <p
            className={`validation-message ${
              validationMessage.includes("Muy bien") ? "success" : "error"
            }`}
          >
            {validationMessage}
          </p>
        </div>
      )}

      <div className="flex justify-center mt-4 gap-4">
        <Button
          onClick={handleValidation}
          icon={faCheck}
          roundedFull={true}
          disabled={isValidateDisabled}
        >
          Validar
        </Button>
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
