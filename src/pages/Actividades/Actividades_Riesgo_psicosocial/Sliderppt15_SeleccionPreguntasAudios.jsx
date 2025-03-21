import { useState, useEffect, useRef } from "react";
import useStore from "../../../store";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import img1 from "../../../assets/img/comite_seguridad_vial.webp";
import img2 from "../../../assets/img/alta_direccion.webp";
import img3 from "../../../assets/img/usted.webp";
import img4 from "../../../assets/img/responsable_plan_estrategico.webp";
import audio1 from "../../../assets/audio/m2_slide19_comite_seguridad_vial.mp3";
import audio2 from "../../../assets/audio/m2_slide19_alta_direccion.mp3";
import audio3 from "../../../assets/audio/m2_slide19_responsable_pesv.mp3";
import audio4 from "../../../assets/audio/m2_slide19_usted.mp3";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import "./styles/Sliderppt15_SeleccionPreguntasAudios.css";
import imgVerdadero from "../../../assets/img/checkAct.png";
import imgFalso from "../../../assets/img/xmarkAct.png";

function Sliderppt15_SeleccionPreguntasAudios() {
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
  const [isResetEnabled, setIsResetEnabled] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const audioRefs = useRef({
    drop1: null,
    drop2: null,
    drop3: null,
    drop4: null,
  });

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleChange = (dropId, value) => {
    // Detener todos los audios anteriores antes de procesar la nueva selección
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    setSelections((prev) => {
      const newSelections = { ...prev, [dropId]: value };

      // Verificar si la selección es correcta
      const isCorrect = value === correctItems[dropId];
      setIsVerified((prev) => ({ ...prev, [dropId]: isCorrect }));

      // Habilitar el botón de reinicio si se ha hecho al menos una selección
      setIsResetEnabled(true);

      // Contar respuestas correctas
      const correctAnswers = Object.keys(newSelections).filter(
        (key) => newSelections[key] === correctItems[key]
      ).length;
      setCorrectCount(correctAnswers);

      // Mostrar feedback si todas las preguntas han sido respondidas
      if (Object.values(newSelections).every((val) => val !== "")) {
        setShowValidationMessage(true);
      }

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
    setIsResetEnabled(false);
    setCorrectCount(0);
    setShowValidationMessage(false);

    // Detener todos los audios
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
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
    { value: "option1", label: "Responsable del plan estratégico de seguridad vial" },
    { value: "option2", label: "Comite de seguridad vial" },
    { value: "option3", label: "Usted" },
    { value: "option4", label: "Alta dirección" },
  ];

  const correctItems = {
    drop1: "option2",
    drop2: "option4",
    drop3: "option1",
    drop4: "option3",
  };

  return (
    <div className="quiz-container-ppt15">
      <div className="cards-container-ppt15">
        {risks.map((risk, index) => (
          <div
            className={`card-container-ppt15 ${selections[risk.dropId] ? (isVerified[risk.dropId] ? "correct" : "incorrect") : ""}`}
            key={index}
          >
            <div className="image-audio-select-container-ppt15">
              <div className="image-container-ppt15">
                <img
                  src={risk.image || "/placeholder.svg"}
                  alt={`Imagen ${index + 1}`}
                  className="circular-image-ppt15"
                />
                {selections[risk.dropId] && (
                  <div className="validation-icon-container-ppt15">
                    <img
                      src={isVerified[risk.dropId] ? imgVerdadero : imgFalso}
                      alt="Validation Icon"
                      className="validation-icon-ppt15"
                    />
                  </div>
                )}
              </div>

              <div className="audio-container-ppt15">
                <audio ref={(el) => (audioRefs.current[risk.dropId] = el)} controls>
                  <source src={risk.audio} type="audio/mpeg" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </div>

              <div className="select-container-ppt15">
                <select
                  value={selections[risk.dropId]}
                  onChange={(e) => handleChange(risk.dropId, e.target.value)}
                  disabled={isVerified[risk.dropId]}
                >
                  <option value="">Seleccione...</option>
                  {options
                    .filter(
                      (option) =>
                        !Object.values(selections).includes(option.value) ||
                        selections[risk.dropId] === option.value
                    )
                    .map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showValidationMessage && (
        <div className="text-center-ppt15 mt-1">
          <p theme="ligth" bold="true" className="bold-text-ppt15">
            Tus respuestas correctas son: {correctCount} de {Object.keys(correctItems).length} (
            {Math.round((correctCount / Object.keys(correctItems).length) * 100)}%).
          </p>
        </div>
      )}

      {showValidationMessage && (
        <div className="feedback-container-ppt15 mt-1 p-0 rounded-lg text-center">
          {correctCount === Object.keys(correctItems).length ? (
            <Paragraph>
              <span className="text-green-personalizado-ppt15 font-bold">Respuesta correcta:</span>{" "}
              <span className="texto-gray-ppt15">¡Muy bien! Conoces a nuestro equipo de PESV.​</span>
            </Paragraph>
          ) : correctCount === Object.keys(correctItems).length - 2 ? (
            <Paragraph>
              <span className="text-orange-personalizado-ppt15 font-bold">Piénsalo bien:</span>{" "}
              <span className="texto-gray-ppt15">
                Algunas preguntas NO las has relacionado correctamente.
              </span>
            </Paragraph>
          ) : (
            <Paragraph>
              <span className="text-red-personalizado-ppt15 font-bold">Respuesta Incorrecta:</span>{" "}
              <span className="texto-gray-ppt15">
                ¡Piénsalo bien! Mira nuevamente el vídeo e inténtalo de nuevo.
              </span>
            </Paragraph>
          )}
        </div>
      )}

      <div className="reset-button-container-ppt15">
        <Button
          bold={false}
          icon={faRefresh}
          roundedFull={true}
          onClick={handleReset}
          disabled={!isResetEnabled}
          className={isResetEnabled ? "" : "disabled"}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
}

export default Sliderppt15_SeleccionPreguntasAudios;