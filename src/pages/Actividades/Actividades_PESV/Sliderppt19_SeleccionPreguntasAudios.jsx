import { useState, useEffect } from "react";
import useStore from "../../../store";
import Button from "../../components/Button";
import img1 from "../../../assets/img/falta_oxigeno_ppt11_sldm2.webp";
import img2 from "../../../assets/img/gases_toxicos_ppt11_sldm2.webp";
import img3 from "../../../assets/img/atrapamiento_ppt11_sldm2.webp";
import img4 from "../../../assets/img/atmosferas_explosivas_ppt11_sldm2.webp";
import audio1 from "../../../assets/audio/FISICAS-Morelco.mp3";
import audio2 from "../../../assets/audio/ECONOMICAS-Morelco.mp3";
import audio3 from "../../../assets/audio/LABORALES-Morelco.mp3";
import audio4 from "../../../assets/audio/FISICAS-Morelco.mp3";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import "./styles/Sliderppt19_SeleccionPreguntasAudios.css";
import imgVerdadero from "../../../assets/img/checkAct.png";
import imgFalso from "../../../assets/img/xmarkAct.png";

function Sliderppt19_SeleccionPreguntasAudios() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [selections, setSelections] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
    drop4: "",
  });
  const [isVerified, setIsVerified] = useState({
    drop1: false,
    drop2: false,
    drop3: false,
    drop4: false,
  });
  const [showAudio, setShowAudio] = useState({
    drop1: false,
    drop2: false,
    drop3: false,
    drop4: false,
  });

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleChange = (dropId, value) => {
    setSelections((prev) => {
      const newSelections = { ...prev, [dropId]: value };

      // Verificar si la selección es correcta
      const isCorrect = value === correctItems[dropId];
      setIsVerified((prev) => ({ ...prev, [dropId]: isCorrect }));
      setShowAudio((prev) => ({ ...prev, [dropId]: isCorrect }));

      return newSelections;
    });
  };

  const handleReset = () => {
    setSelections({
      drop1: "",
      drop2: "",
      drop3: "",
      drop4: "",
    });
    setIsVerified({
      drop1: false,
      drop2: false,
      drop3: false,
      drop4: false,
    });
    setShowAudio({
      drop1: false,
      drop2: false,
      drop3: false,
      drop4: false,
    });
  };

  const risks = [
    {
      image: img1,
      audio: audio1,
      dropId: "drop1",
    },
    {
      image: img2,
      audio: audio2,
      dropId: "drop2",
    },
    {
      image: img4,
      audio: audio3,
      dropId: "drop3",
    },
    {
      image: img3,
      audio: audio4,
      dropId: "drop4",
    },
  ];

  const options = [
    { value: "option1", label: "Riesgo físico-químico" },
    { value: "option2", label: "Riesgo físico" },
    { value: "option3", label: "Riesgo Mecánico" },
    { value: "option4", label: "Riesgo químico" },
  ];

  const correctItems = {
    drop1: "option2",
    drop2: "option4",
    drop3: "option1",
    drop4: "option3",
  };

  return (
    <div className="quiz-container-SPA">
      <div className="cards-container-SPA">
        {risks.map((risk, index) => (
          <div className="image-select-container" key={index}>
            {/* Contenedor de audio y validación */}
            <div className="audio-validation-container">
              {/* Mostrar el audio si la respuesta es correcta */}
              {showAudio[risk.dropId] && (
                <div className="audio-container">
                  <audio controls>
                    <source src={risk.audio} type="audio/mpeg" />
                    Tu navegador no soporta el elemento de audio.
                  </audio>
                </div>
              )}

              {/* Mostrar icono de validación */}
              {selections[risk.dropId] && (
                <div className="validation-icon-container">
                  <img
                    src={isVerified[risk.dropId] ? imgVerdadero : imgFalso}
                    alt="Validation Icon"
                    className="validation-icon"
                  />
                </div>
              )}
            </div>

            {/* Imagen circular */}
            <img
              src={risk.image || "/placeholder.svg"}
              alt={`Imagen ${index + 1}`}
              className="circular-image"
            />

            {/* Select */}
            <select
              value={selections[risk.dropId]}
              onChange={(e) => handleChange(risk.dropId, e.target.value)}
              className="custom-select"
              disabled={isVerified[risk.dropId]}
            >
              <option value="">Seleccione...</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Botón de reinicio */}
      <div className="reset-button-container">
        <Button
          bold={false}
          icon={faRefresh}
          roundedFull={true}
          onClick={handleReset}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
}

export default Sliderppt19_SeleccionPreguntasAudios;