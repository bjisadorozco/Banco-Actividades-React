"use client"

import { useState } from "react"
import carga1 from "../../../assets/img/100_kg_sldm1.webp"
import carga2 from "../../../assets/img/1000_kg_sldm1.webp"
import carga3 from "../../../assets/img/500_kg_sldm1.webp"
import checkIcon from "../../../assets/img/checkAct.png"
import xmarkIcon from "../../../assets/img/xmarkAct.png"
import audioEconomicas from "../../../assets/audio/el-izaje-de-cargas-m1-slide-8-audio.mp3"
import "./styles/Sliderppt8_seleccione.css"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import Button from "../../components/Button"

const Sliderppt8_seleccione = () => {
  const [selectedItem, setSelectedItem] = useState(null) // Almacena la imagen seleccionada
  const [isCorrect, setIsCorrect] = useState(null) // Indica si la selección es correcta
  const [isActivityCompleted, setIsActivityCompleted] = useState(false) // Indica si la actividad está completada
  const [errorMessage, setErrorMessage] = useState("") // Mensaje de error
  const [successMessage, setSuccessMessage] = useState("") // Mensaje de éxito
  const [percentage, setPercentage] = useState(0) // Porcentaje de acierto

  // Maneja la selección de una imagen
  const handleSelection = (id) => {
    if (isActivityCompleted) return // No hacer nada si la actividad ya está completada

    setSelectedItem(id) // Establece la imagen seleccionada
    const correct = id === "carga2" // "carga2" es la imagen del medio (correcta)
    setIsCorrect(correct) // Establece si la selección es correcta
    setIsActivityCompleted(true) // Marca la actividad como completada

    // Establece el porcentaje
    setPercentage(correct ? 100 : 0)

    // Muestra el mensaje de error o éxito según la selección
    if (!correct) {
      setErrorMessage("Respuesta incorrecta: ¡Piénsalo bien! Selecciona la carga correcta.")
      setSuccessMessage("") // Limpia el mensaje de éxito
    } else {
      setSuccessMessage("Selección correcta: ¡Muy bien! Has reconocido la carga más pesada. Ahora escucha este audio correctamente:")
      setErrorMessage("") // Limpia el mensaje de error
    }
  }

  // Reinicia la actividad
  const handleReset = () => {
    setSelectedItem(null)
    setIsCorrect(null)
    setIsActivityCompleted(false)
    setErrorMessage("")
    setSuccessMessage("")
    setPercentage(0)
  }

  return (
    <div className="col-lg-6 col-md-12">
      <div className="activity-container-ppt8-AICS">
        {/* Fila de imágenes */}
        <div className="image-row-ppt8-AICS">
          {/* Imagen 1 */}
          <div className="image-container-ppt8-AICS" onClick={() => handleSelection("carga1")}>
            <img
              src={carga1 || "/placeholder.svg"}
              className={`draggable-ppt8-AICS ${selectedItem === "carga1" ? (isCorrect ? "correct-AICS" : "incorrect-AICS") : ""}`}
              alt="100kgs"
            />
            {/* Muestra el ícono de incorrecto si se selecciona esta imagen */}
            {selectedItem === "carga1" && !isCorrect && (
              <img src={xmarkIcon} className="status-icon-ppt8-AICS" alt="Incorrecto" />
            )}
          </div>

          {/* Imagen 2 (correcta) */}
          <div className="image-container-ppt8-AICS" onClick={() => handleSelection("carga2")}>
            <img
              src={carga2 || "/placeholder.svg"}
              className={`draggable-ppt8-AICS ${selectedItem === "carga2" ? (isCorrect ? "correct-AICS" : "incorrect-AICS") : ""}`}
              alt="1000kgs"
            />
            {/* Muestra el ícono de correcto si se selecciona esta imagen */}
            {selectedItem === "carga2" && isCorrect && (
              <img src={checkIcon} className="status-icon-ppt8-AICS" alt="Correcto" />
            )}
          </div>

          {/* Imagen 3 */}
          <div className="image-container-ppt8-AICS" onClick={() => handleSelection("carga3")}>
            <img
              src={carga3 || "/placeholder.svg"}
              className={`draggable-ppt8-AICS ${selectedItem === "carga3" ? (isCorrect ? "correct-AICS" : "incorrect-AICS") : ""}`}
              alt="500kgs"
            />
            {/* Muestra el ícono de incorrecto si se selecciona esta imagen */}
            {selectedItem === "carga3" && !isCorrect && (
              <img src={xmarkIcon} className="status-icon-ppt8-AICS" alt="Incorrecto" />
            )}
          </div>
        </div>

        {/* Audio (solo se muestra si se selecciona la imagen correcta) */}
        {selectedItem === "carga2" && isCorrect && (
          <div className="audio-container-ppt8-AICS">
            <audio controls autoPlay className="audio-player-ppt8-AICS">
              <source src={audioEconomicas} type="audio/mp3" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        )}

        {/* Mensaje de error */}
        {errorMessage && (
          <div className="error-message-ppt8-AICS">
            <span className="error-label">Selección Incorrecta: </span>{" "}
            <span className="error-text">¡Piénsalo bien! Hay cargas más pesadas, vuelve a intentarlo.</span>
          </div>
        )}

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="success-message-ppt8-AICS">
            <span className="success-label">Selección Correcta: </span>{" "}
            <span className="success-text">¡Muy bien! Has reconocido la carga más pesada. Ahora escucha este audio correctamente:</span>
          </div>
        )}

        {/* Porcentaje de acierto */}
        {isActivityCompleted && (
          <div className="results-container-AICS text-center mt-4 mb-4">
            <h3 className="text-md font-bold text-paragraph-light-color text-monserrat-AICS">
              Tus respuestas correctas son: {isCorrect ? 1 : 0} de 1 ({percentage}%)
            </h3>
          </div>
        )}
      </div>

      {/* Botón de reinicio */}
      <div className="flex-container-AICS">
        <Button
          bold={false}
          icon={faRepeat}
          roundedFull={true}
          onClick={handleReset}
          disabled={!isActivityCompleted}
          className={`reset-button ${isActivityCompleted ? "" : "disabled"}`}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  )
}

export default Sliderppt8_seleccione