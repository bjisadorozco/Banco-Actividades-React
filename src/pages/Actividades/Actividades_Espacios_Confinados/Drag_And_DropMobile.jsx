import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import checkIcon from "../../../assets/img/checkAct.png";
import xmarkIcon from "../../../assets/img/xmarkAct.png";
import audioCasco from "/src/assets/audio/casco_de_proteccion.mp3";
import audioBotas from "/src/assets/audio/botas_con_punta_de_acero.mp3";
import audioArnes from "/src/assets/audio/arnes_de_cuerpo_completo.mp3";
import audioOverol from "/src/assets/audio/overoles_resistente_a_quimicos.mp3";
import audioProtector from "/src/assets/audio/tapones_o_protectore_auditivos.mp3";
import audioGafas from "/src/assets/audio/gafas_de_seguridad.mp3";
import audioGuantes from "/src/assets/audio/guantes_resistentes_a_quimicos.mp3";
import audioRespirador from "/src/assets/audio/respiradores_purificadores_de_aire.mp3";
import casco from "/src/assets/img/casco_sldM2.webp";
import botas from "/src/assets/img/botas_sldM2.webp";
import arnes from "/src/assets/img/arnes_sldM2.webp";
import overol from "/src/assets/img/overoles_resistentes_quimicos_sldM2.webp";
import protector from "/src/assets/img/protectores_auditivos_sldM2.webp";
import gafas from "/src/assets/img/gafas_seguridad_sldM2.webp";
import guantes from "/src/assets/img/guantes_sldM2.webp";
import respirador from "/src/assets/img/respiradores_sldM2.webp";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";


const SelectAndValidateMobile = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    select1: "",
    select2: "",
    select3: "",
    select4: "",
    select5: "",
    select6: "",
    select7: "",
    select8: "",
  });

  const [validationStatus, setValidationStatus] = useState({
    select1: null, // Valores: "correcto", "incorrecto" o null
    select2: null,
    select3: null,
    select4: null,
    select5: null,
    select6: null,
    select7: null,
    select8: null,
  });

  const [audioSource, setAudioSource] = useState(null); // Estado para manejar el audio
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar el mensaje de error
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito

  const options = [
    "Casco de Protección",
    "Botas",
    "Arnés de Cuerpo Completo",
    "Overol",
    "Tapones Auditivos",
    "Gafas de Seguridad",
    "Guantes Resistentes a Químicos",
    "Resporador",
  ]; // Opciones iniciales

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
        <>
        <span className="text-[#4CAF50] font-bold">
          Relación correcta:{" "}
        </span>
        <span className="text-[#808693]">
          ¡Muy bien! Identificaste este ítem correctamente. Ahora escucha
          el siguiente audio:
        </span>
      </>
      );
      setErrorMessage("");
    } else {
      setValidationStatus((prevState) => ({
        ...prevState,
        [selectId]: "incorrecto",
      }));
      setAudioSource(null); // No asignar audio en caso de respuesta incorrecta
      setErrorMessage(<>
        <span className="text-[#FF7043] font-bold">
          Relación incorrecta:{" "}
        </span>
        <span className="text-[#808693]">
          ¡Piénsalo bien! El ítem no corresponde a este elemento de
          protección personal, vuelve a intentarlo.
        </span>
      </>);
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
      (option) =>
        !selectedValues.includes(option) ||
        selectedOptions[currentSelectId] === option
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative my-2">
      <div className="w-full flex flex-col items-center justify-center mx-2">
        {/* Cuadro 1 */}
        <div className="bg-[#E5E7EB] rounded-lg flex flex-col items-center justify-center">
          <div
            className={`select-item rounded-xl ${
              validationStatus.select1 === "correcto"
                ? "correct"
                : validationStatus.select1 === "incorrecto"
                  ? "incorrect"
                  : ""
            }`}
          >
            <img src={casco} alt="Casco" className="select-image-mobile" />
            {validationStatus.select1 === "correcto" && (
              <img
                src={checkIcon}
                className="status-icon-mobile"
                alt="Correcto"
              />
            )}
            {validationStatus.select1 === "incorrecto" && (
              <img
                src={xmarkIcon}
                className="status-icon-mobile"
                alt="Incorrecto"
              />
            )}
            <select
              value={selectedOptions.select1}
              onChange={(e) =>
                handleSelectChange(
                  e,
                  "select1",
                  "Casco de Protección",
                  audioCasco
                )
              }
              className="select-box-mobile rounded-xl w-[80%] text-[#9C99A1] border-none"
            >
              <option value="">Selecciona...</option>
              {getFilteredOptions("select1").map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cuadro 2 */}
        <div className="bg-[#E5E7EB] rounded-lg flex flex-col items-center justify-center">
          <div
            className={`select-item rounded-xl ${
              validationStatus.select2 === "correcto"
                ? "correct"
                : validationStatus.select2 === "incorrecto"
                  ? "incorrect"
                  : ""
            }`}
          >
            <img src={botas} alt="Botas" className="select-image-mobile" />
            {validationStatus.select2 === "correcto" && (
              <img
                src={checkIcon}
                className="status-icon-mobile"
                alt="Correcto"
              />
            )}
            {validationStatus.select2 === "incorrecto" && (
              <img
                src={xmarkIcon}
                className="status-icon-mobile"
                alt="Incorrecto"
              />
            )}
            <select
              value={selectedOptions.select2}
              onChange={(e) =>
                handleSelectChange(e, "select2", "Botas", audioBotas)
              }
              className="select-box-mobile rounded-xl w-[80%] text-[#9C99A1] border-none"
            >
              <option value="">Selecciona...</option>
              {getFilteredOptions("select2").map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cuadro 3 */}
        <div className="bg-[#E5E7EB] rounded-lg flex flex-col items-center justify-center">
          <div
            className={`select-item rounded-xl ${
              validationStatus.select3 === "correcto"
                ? "correct"
                : validationStatus.select3 === "incorrecto"
                  ? "incorrect"
                  : ""
            }`}
          >
            <img src={arnes} alt="Arnes" className="select-image-mobile mt-2" />
            {validationStatus.select3 === "correcto" && (
              <img
                src={checkIcon}
                className="status-icon-mobile"
                alt="Correcto"
              />
            )}
            {validationStatus.select3 === "incorrecto" && (
              <img
                src={xmarkIcon}
                className="status-icon-mobile"
                alt="Incorrecto"
              />
            )}
            <select
              value={selectedOptions.select3}
              onChange={(e) =>
                handleSelectChange(
                  e,
                  "select3",
                  "Arnés de Cuerpo Completo",
                  audioArnes
                )
              }
              className="select-box-mobile rounded-xl w-[80%] text-[#9C99A1] border-none"
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

        {/* Cuadro 4 */}
        <div className="bg-[#E5E7EB] rounded-lg flex flex-col items-center justify-center">
          <div
            className={`select-item rounded-xl ${
              validationStatus.select4 === "correcto"
                ? "correct"
                : validationStatus.select4 === "incorrecto"
                  ? "incorrect"
                  : ""
            }`}
          >
            <img
              src={overol}
              alt="Overol"
              className="select-image-mobile mt-2"
            />
            {validationStatus.select4 === "correcto" && (
              <img
                src={checkIcon}
                className="status-icon-mobile"
                alt="Correcto"
              />
            )}
            {validationStatus.select4 === "incorrecto" && (
              <img
                src={xmarkIcon}
                className="status-icon-mobile"
                alt="Incorrecto"
              />
            )}
            <select
              value={selectedOptions.select3}
              onChange={(e) =>
                handleSelectChange(e, "select4", "Overol", audioOverol)
              }
              className="select-box-mobile rounded-xl w-[80%] text-[#9C99A1] border-none"
            >
              <option value="">Selecciona...</option>
              {getFilteredOptions("select4").map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cuadro 5 */}
        <div className="bg-[#E5E7EB] rounded-lg flex flex-col items-center justify-center">
          <div
            className={`select-item rounded-xl ${
              validationStatus.select5 === "correcto"
                ? "correct"
                : validationStatus.select5 === "incorrecto"
                  ? "incorrect"
                  : ""
            }`}
          >
            <img
              src={protector}
              alt="Protector"
              className="select-image-mobile"
            />
            {validationStatus.select5 === "correcto" && (
              <img
                src={checkIcon}
                className="status-icon-mobile"
                alt="Correcto"
              />
            )}
            {validationStatus.select5 === "incorrecto" && (
              <img
                src={xmarkIcon}
                className="status-icon-mobile"
                alt="Incorrecto"
              />
            )}
            <select
              value={selectedOptions.select3}
              onChange={(e) =>
                handleSelectChange(
                  e,
                  "select5",
                  "Tapones Auditivos",
                  audioProtector
                )
              }
              className="select-box-mobile rounded-xl w-[80%] text-[#9C99A1] border-none"
            >
              <option value="">Selecciona...</option>
              {getFilteredOptions("select5").map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cuadro 6 */}
        <div className="bg-[#E5E7EB] rounded-lg flex flex-col items-center justify-center">
          <div
            className={`select-item rounded-xl ${
              validationStatus.select6 === "correcto"
                ? "correct"
                : validationStatus.select6 === "incorrecto"
                  ? "incorrect"
                  : ""
            }`}
          >
            <img src={gafas} alt="Gafas" className="select-image-mobile" />
            {validationStatus.select6 === "correcto" && (
              <img
                src={checkIcon}
                className="status-icon-mobile"
                alt="Correcto"
              />
            )}
            {validationStatus.select6 === "incorrecto" && (
              <img
                src={xmarkIcon}
                className="status-icon-mobile"
                alt="Incorrecto"
              />
            )}
            <select
              value={selectedOptions.select3}
              onChange={(e) =>
                handleSelectChange(
                  e,
                  "select6",
                  "Gafas de Seguridad",
                  audioGafas
                )
              }
              className="select-box-mobile rounded-xl w-[80%] text-[#9C99A1] border-none"
            >
              <option value="">Selecciona...</option>
              {getFilteredOptions("select6").map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cuadro 7 */}
        <div className="bg-[#E5E7EB] rounded-lg flex flex-col items-center justify-center">
          <div
            className={`select-item rounded-xl ${
              validationStatus.select7 === "correcto"
                ? "correct"
                : validationStatus.select7 === "incorrecto"
                  ? "incorrect"
                  : ""
            }`}
          >
            <img
              src={guantes}
              alt="Guantes"
              className="select-image-mobile mt-2"
            />
            {validationStatus.select7 === "correcto" && (
              <img
                src={checkIcon}
                className="status-icon-mobile"
                alt="Correcto"
              />
            )}
            {validationStatus.select7 === "incorrecto" && (
              <img
                src={xmarkIcon}
                className="status-icon-mobile"
                alt="Incorrecto"
              />
            )}
            <select
              value={selectedOptions.select3}
              onChange={(e) =>
                handleSelectChange(
                  e,
                  "select7",
                  "Guantes Resistentes a Químicos",
                  audioGuantes
                )
              }
              className="select-box-mobile rounded-xl w-[80%] text-[#9C99A1] border-none"
            >
              <option value="">Selecciona...</option>
              {getFilteredOptions("select7").map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cuadro 8 */}
        <div className="bg-[#E5E7EB] rounded-lg flex flex-col items-center justify-center">
          <div
            className={`select-item rounded-xl ${
              validationStatus.select8 === "correcto"
                ? "correct"
                : validationStatus.select8 === "incorrecto"
                  ? "incorrect"
                  : ""
            }`}
          >
            <img
              src={respirador}
              alt="Respirador"
              className="select-image-mobile mt-2"
            />
            {validationStatus.select8 === "correcto" && (
              <img
                src={checkIcon}
                className="status-icon-mobile"
                alt="Correcto"
              />
            )}
            {validationStatus.select8 === "incorrecto" && (
              <img
                src={xmarkIcon}
                className="status-icon-mobile"
                alt="Incorrecto"
              />
            )}
            <select
              value={selectedOptions.select3}
              onChange={(e) =>
                handleSelectChange(
                  e,
                  "select8",
                  "Respirador Purificador de Aire",
                  audioRespirador
                )
              }
              className="select-box-mobile rounded-xl w-[80%] text-[#9C99A1] border-none"
            >
              <option value="">Selecciona...</option>
              {getFilteredOptions("select8").map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className="error-message-mobile">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="success-message-mobile">{successMessage}</div>
      )}
      {/* Mostrar el audio si se ha seleccionado una respuesta correcta */}
      {audioSource && (
        <div className="audio-container-mobile">
          <audio controls autoPlay key={audioSource}>
            <source src={audioSource} type="audio/mp3" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      )}

      <div className="flex-container-mobile flex-col justify-center items-center">
        <button
          className={`w-[80%] py-2 bg-[#6E3CD2] text-white rounded-lg text-[20px]`}
          onClick={handleReset}
        >
          <FontAwesomeIcon icon={faRepeat} /> Reiniciar
        </button>
      </div>
    </div>
  );
};

export default SelectAndValidateMobile;
