import { useState, useEffect } from "react";
import useStore from "../../../store";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import img1 from "../../../assets/img/falta_oxigeno_ppt11_sldm2.webp";
import img2 from "../../../assets/img/gases_toxicos_ppt11_sldm2.webp";
import img3 from "../../../assets/img/atrapamiento_ppt11_sldm2.webp";
import img4 from "../../../assets/img/atmosferas_explosivas_ppt11_sldm2.webp";
import img5 from "../../../assets/img/virus_bacterias_ppt11_sldm2.webp";
import img6 from "../../../assets/img/estres_ppt11_sldm2.webp";
import audio1 from "../../../assets/audio/FISICAS-Morelco.mp3";
import audio2 from "../../../assets/audio/FISICAS-Morelco.mp3";
import audio3 from "../../../assets/audio/FISICAS-Morelco.mp3";
import audio4 from "../../../assets/audio/FISICAS-Morelco.mp3";
import audio5 from "../../../assets/audio/FISICAS-Morelco.mp3";
import audio6 from "../../../assets/audio/FISICAS-Morelco.mp3";
import { faRefresh, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./styles/SeleccionEspaciosConfinados.css";
import imgVerdadero from "../../../assets/img/checkAct.png";
import imgFalso from "../../../assets/img/xmarkAct.png";

function SeleccionEspaciosConfinados() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [selections, setSelections] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
    drop4: "",
    drop5: "",
    drop6: "",
  });
  const [availableOptions, setAvailableOptions] = useState({
    drop1: [],
    drop2: [],
    drop3: [],
    drop4: [],
    drop5: [],
    drop6: [],
  });
  const [isVerified, setIsVerified] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isValidateEnabled, setIsValidateEnabled] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [openSelect, setOpenSelect] = useState(null);

  useEffect(() => {
    setIsOnDivisor(false);
    const initialOptions = options.slice(1);
    setAvailableOptions({
      drop1: initialOptions,
      drop2: initialOptions,
      drop3: initialOptions,
      drop4: initialOptions,
      drop5: initialOptions,
      drop6: initialOptions,
    });
  }, [setIsOnDivisor]);

  const handleChange = (dropId, value) => {
    setSelections((prev) => {
      const newSelections = { ...prev, [dropId]: value };
      const selectedValues = Object.values(newSelections).filter((v) => v !== "");
      const newAvailableOptions = {};
      Object.keys(availableOptions).forEach((key) => {
        newAvailableOptions[key] = options
          .slice(1)
          .filter((option) => !selectedValues.includes(option.value) || option.value === newSelections[key]);
      });
      setAvailableOptions(newAvailableOptions);
      setIsValidateEnabled(Object.values(newSelections).some((value) => value !== ""));
      return newSelections;
    });
    setSelectedCards((prev) => [...new Set([...prev, dropId])]);
    setOpenSelect(null);
  };

  const handleVerify = () => {
    const allSelected = Object.values(selections).every((value) => value !== "");
    if (!allSelected) {
      setShowValidationMessage(true);
      return;
    }

    let count = 0;
    Object.keys(selections).forEach((key) => {
      if (selections[key] === correctItems[key]) {
        count++;
      }
    });
    setCorrectCount(count);
    setIsVerified(true);
    setIsValidateEnabled(false);
    setShowValidationMessage(false);
  };

  const handleReset = () => {
    setSelections({
      drop1: "",
      drop2: "",
      drop3: "",
      drop4: "",
      drop5: "",
      drop6: "",
    });
    setIsVerified(false);
    setCorrectCount(0);
    setIsValidateEnabled(false);
    setSelectedCard(null);
    setSelectedCards([]);
    setOpenSelect(null);
    const initialOptions = options.slice(1);
    setAvailableOptions({
      drop1: initialOptions,
      drop2: initialOptions,
      drop3: initialOptions,
      drop4: initialOptions,
      drop5: initialOptions,
      drop6: initialOptions,
    });
  };

  const getCardBackgroundColor = (dropId) => {
    if (isVerified) {
      const percentage = (correctCount / Object.keys(correctItems).length) * 100;
      if (selections[dropId] === correctItems[dropId]) {
        return "bg-green-personalizado";
      } else if (percentage > 60) {
        return "bg-orange-personalizado";
      } else {
        return "bg-red-personalizado";
      }
    } else if (selectedCards.includes(dropId)) {
      return "bg-purple-personalizado";
    }
    return "";
  };

  const risks = [
    {
      title: "Lesiones por corte",
      image: img1,
      audio: audio1,
      description: "Falta de oxígeno",
      dropId: "drop1",
    },
    {
      title: "Lesiones por aplastamiento",
      image: img2,
      audio: audio2,
      description: "Gases Tóxicos",
      dropId: "drop2",
    },
    {
      title: "Golpes y proyecciones",
      image: img4,
      audio: audio3,
      description: "Atmósferas explosivas",
      dropId: "drop3",
    },
    {
      title: "Riesgo ergonómico",
      image: img3,
      audio: audio4,
      description: "Atrapamiento",
      dropId: "drop4",
    },
    {
      title: "Riesgo ergonómico",
      image: img5,
      audio: audio5,
      description: "Virus / Bacterias",
      dropId: "drop5",
    },
    {
      title: "Riesgo ergonómico",
      image: img6,
      audio: audio6,
      description: "Estrés o angustia",
      dropId: "drop6",
    },
  ];

  const options = [
    { value: "", label: "Selecciona una opción" },
    { value: "option1", label: "Riesgo físico-químico" },
    { value: "option2", label: "Riesgo físico" },
    { value: "option3", label: "Riesgo Mecánico" },
    { value: "option4", label: "Riesgo químico" },
    { value: "option5", label: "Riesgo psicosocial" },
    { value: "option6", label: "Riesgo biológico" },
  ];

  const correctItems = {
    drop1: "option2",
    drop2: "option4",
    drop3: "option1",
    drop4: "option3",
    drop5: "option6",
    drop6: "option5",
  };

  return (
    <div className="quiz-container-ESC mb-36 md:mb-0 overflow-auto">
      <div className="cards-container-ESC grid grid-cols-1 md:grid-cols-3 gap-size">
        {risks.map((risk, index) => (
          <div className="quiz-card-ESC" key={index}>
            <div className={`card-front-ESC ${getCardBackgroundColor(risk.dropId)}`}>
              <div className="card-image-ESC bg-gradient-to-b">
                <img
                  src={risk.image || "/placeholder.svg"}
                  alt={risk.title}
                  className="w-auto h-auto"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem"
                  }}
                />

                {isVerified && (
                  <div className="validation-icon-containerESC">
                    <img
                      src={selections[risk.dropId] === correctItems[risk.dropId] ? imgVerdadero : imgFalso}
                      alt="Validation Icon"
                      className="validation-iconESC"
                    />
                  </div>
                )}
              </div>

              <div className="card-content-ESC">
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "16px",
                    color: isVerified || selectedCards.includes(risk.dropId) ? "white" : "#8F8F8F",
                  }}
                >
                  {risk.description}
                </p>

                <Paragraph className="text-justify" style={{ color: "#8F8F8F" }}>
                  <select
                    value={selections[risk.dropId]}
                    onChange={(e) => handleChange(risk.dropId, e.target.value)}
                    onFocus={() => setOpenSelect(risk.dropId)}
                    onBlur={() => setOpenSelect(null)}
                    className={`my-2 w-full p-2 border rounded ${selections[risk.dropId] ? "bg-light-purple" : ""}`}
                    disabled={isVerified}
                    style={{
                      backgroundColor:
                        isVerified || selectedCards.includes(risk.dropId)
                          ? "rgba(255, 255, 255, 0.2)"
                          : selections[risk.dropId]
                            ? "var(--light-purple)"
                            : "white",
                      color: (isVerified || selectedCards.includes(risk.dropId)) && openSelect !== risk.dropId ? "white" : "black",
                      border:
                        isVerified || selectedCards.includes(risk.dropId) ? "1px solid white" : "1px solid #e5e7eb",
                    }}
                  >
                    <option value="">Seleccione...</option>
                    {availableOptions[risk.dropId].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Paragraph>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showValidationMessage && (
        <div className="feedback-container-ESC mt-1 p-0 rounded-lg text-center font-bold">
          <Paragraph>Debes seleccionar todos los elementos antes de validar.</Paragraph>
        </div>
      )}

      {isVerified && (
        <div className="feedback-container-ESC mt-1 p-0 rounded-lg text-center">
          {correctCount === Object.keys(correctItems).length ? (
            <Paragraph>
              <span className="text-green-personalizado font-bold">Respuesta correcta:</span> <span className="texto-gray">¡Muy bien! Todas las respuestas son correctas.</span>
            </Paragraph>
          ) : correctCount === Object.keys(correctItems).length - 2 ? (
            <Paragraph>
              <span className="text-orange-personalizado font-bold">Piénsalo bien:</span> <span className="texto-gray">Algunas preguntas NO las has relacionado correctamente.</span>
            </Paragraph>
          ) : (
            <Paragraph>
              <span className="text-red-personalizado font-bold">Respuesta Incorrecta:</span> <span className="texto-gray">¡Piénsalo bien! ¡Revisa muy bien la pregunta y vuelve a intentarlo!​</span>
            </Paragraph>
          )}
        </div>
      )}

      {isVerified && (
        <div className="text-center mt-1">
          <p theme="ligth" bold="true" className="bold-text">
            Tus respuestas correctas son: {correctCount} de {Object.keys(correctItems).length} (
            {Math.round((correctCount / Object.keys(correctItems).length) * 100)}%).
          </p>
        </div>
      )}

      <div className="flex justify-center gap-4 my-2">
        <Button
          bold={false}
          icon={faCheck}
          roundedFull={true}
          onClick={handleVerify}
          disabled={!isValidateEnabled}
          className={`action-button ${isValidateEnabled ? "" : "disabled"}`}
        >
          Validar
        </Button>
        <Button
          bold={false}
          icon={faRefresh}
          roundedFull={true}
          onClick={handleReset}
          disabled={!isVerified}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
}

export default SeleccionEspaciosConfinados;