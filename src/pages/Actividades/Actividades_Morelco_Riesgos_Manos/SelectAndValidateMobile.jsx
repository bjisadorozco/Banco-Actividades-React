import React, { useState } from "react";
import mano1 from "../../../assets/img/fisicas_sld5.webp";
import mano2 from "../../../assets/img/economicas_sld5.webp";
import mano3 from "../../../assets/img/laborales_sld5.webp";
import checkIcon from "../../../assets/img/checkAct.png";
import xmarkIcon from "../../../assets/img/xmarkAct.png";
import audioFisicas from "../../../assets/audio/FISICAS-Morelco.mp3"; // Ruta del audio Físicas
import audioEconomicas from "../../../assets/audio/ECONOMICAS-Morelco.mp3"; // Ruta del audio Económicas
import audioLaborales from "../../../assets/audio/LABORALES-Morelco.mp3"; // Ruta del audio Laborales
import "./styles/SelectAndValidateMobile.css"; // Asegúrate de incluir los estilos específicos para móviles
import Paragraph from "../../components/Paragraph";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";

const SelectAndValidateMobile = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    select1: "",
    select2: "",
    select3: "",
  });

  const [validationStatus, setValidationStatus] = useState({
    select1: null, // Valores: "correcto", "incorrecto" o null
    select2: null,
    select3: null,
  });

  const [audioSource, setAudioSource] = useState(null); // Estado para manejar el audio
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar el mensaje de error
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito

  const options = ["Económicas", "Laborales", "Físicas"]; // Opciones iniciales

  const handleSelectChange = (e, selectId, correctAnswer, audio) => {
    const selectedValue = e.target.value;

    setSelectedOptions((prevState) => ({
      ...prevState,
      [selectId]: selectedValue,
    }));

    if (selectedValue === correctAnswer) {
      setValidationStatus((prevState) => ({
        ...prevState,
        [selectId]: "correcto",
      }));
      setAudioSource(audio); // Asignar el audio correspondiente
      setSuccessMessage(
        "¡Correcto! Ahora, escucha el siguiente audio que complementa esta información"
      );
      setErrorMessage("");
    } else {
      setValidationStatus((prevState) => ({
        ...prevState,
        [selectId]: "incorrecto",
      }));
      setAudioSource(null); // No asignar audio en caso de respuesta incorrecta
      setErrorMessage("Oops, esa no es la respuesta correcta.");
      setSuccessMessage("");
    }
  };

  const handleReset = () => {
    setSelectedOptions({
      select1: "",
      select2: "",
      select3: "",
    });
    setValidationStatus({
      select1: null,
      select2: null,
      select3: null,
    });
    setAudioSource(null); // Resetear el audio
    setErrorMessage("");
    setSuccessMessage("");
  };

  // Generar opciones disponibles dinámicamente
  const getFilteredOptions = (currentSelectId) => {
    const selectedValues = Object.values(selectedOptions).filter(Boolean);
    return options.filter(
      (option) => !selectedValues.includes(option) || selectedOptions[currentSelectId] === option
    );
  };

  return (
    <div className="mobile-container">
      <div className="activity-container-mobile">
        {/* Cuadro 1 */}
        <div
          className={`select-item ${
            validationStatus.select1 === "correcto"
              ? "correct"
              : validationStatus.select1 === "incorrecto"
              ? "incorrect"
              : ""
          }`}
        >
          <img src={mano1} alt="Mano 1" className="select-image-mobile" />
          {validationStatus.select1 === "correcto" && (
            <img src={checkIcon} className="status-icon-mobile" alt="Correcto" />
          )}
          {validationStatus.select1 === "incorrecto" && (
            <img src={xmarkIcon} className="status-icon-mobile" alt="Incorrecto" />
          )}
          <select
            value={selectedOptions.select1}
            onChange={(e) =>
              handleSelectChange(e, "select1", "Físicas", audioFisicas)
            }
            className="select-box-mobile"
          >
            <option value="">Selecciona...</option>
            {getFilteredOptions("select1").map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Cuadro 2 */}
        <div
          className={`select-item ${
            validationStatus.select2 === "correcto"
              ? "correct"
              : validationStatus.select2 === "incorrecto"
              ? "incorrect"
              : ""
          }`}
        >
          <img src={mano2} alt="Mano 2" className="select-image-mobile" />
          {validationStatus.select2 === "correcto" && (
            <img src={checkIcon} className="status-icon-mobile" alt="Correcto" />
          )}
          {validationStatus.select2 === "incorrecto" && (
            <img src={xmarkIcon} className="status-icon-mobile" alt="Incorrecto" />
          )}
          <select
            value={selectedOptions.select2}
            onChange={(e) =>
              handleSelectChange(e, "select2", "Económicas", audioEconomicas)
            }
            className="select-box-mobile"
          >
            <option value="">Selecciona...</option>
            {getFilteredOptions("select2").map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Cuadro 3 */}
        <div
          className={`select-item ${
            validationStatus.select3 === "correcto"
              ? "correct"
              : validationStatus.select3 === "incorrecto"
              ? "incorrect"
              : ""
          }`}
        >
          <img src={mano3} alt="Mano 3" className="select-image-mobile" />
          {validationStatus.select3 === "correcto" && (
            <img src={checkIcon} className="status-icon-mobile" alt="Correcto" />
          )}
          {validationStatus.select3 === "incorrecto" && (
            <img src={xmarkIcon} className="status-icon-mobile" alt="Incorrecto" />
          )}
          <select
            value={selectedOptions.select3}
            onChange={(e) =>
              handleSelectChange(e, "select3", "Laborales", audioLaborales)
            }
            className="select-box-mobile"
          >
            <option value="">Selecciona...</option>
            {getFilteredOptions("select3").map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {errorMessage && <div className="error-message-mobile">{errorMessage}</div>}
      {successMessage && <div className="success-message-mobile">{successMessage}</div>}
      {/* Mostrar el audio si se ha seleccionado una respuesta correcta */}
      {audioSource && (
        <div className="audio-container-mobile">
          <audio controls autoPlay key={audioSource}>
            <source src={audioSource} type="audio/mp3" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      )}

      

      <div className="flex-container-mobile">
        <Button bold={false} icon={faRepeat} roundedFull={true} onClick={handleReset}>
          Reiniciar
        </Button>
      </div>
    </div>
  );
};

export default SelectAndValidateMobile;
