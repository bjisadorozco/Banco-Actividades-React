"use client"

import { useState, useRef } from "react"
import izaje1 from "../../../assets/img/eslingas.webp"
import izaje2 from "../../../assets/img/cables_acero.webp"
import izaje3 from "../../../assets/img/tensores.webp"
import checkIcon from "../../../assets/img/checkAct.png"
import xmarkIcon from "../../../assets/img/xmarkAct.png"
import audioCablesDeAcero from "../../../assets/audio/eslingas-de-izaje-m1-slide-13-audio.mp3"
import audioEslingas from "../../../assets/audio/cables-de-acero-m1-slide-13-audio.mp3"
import audioTensores from "../../../assets/audio/Tensores-m1-slide-13-audio.mp3"
import "./styles/Slidermobile_select_audios.css"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import Button from "../../components/Button"

const Slidermobile_select_audios = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    card1: null,
    card2: null,
    card3: null,
  })
  const [validationStatus, setValidationStatus] = useState({
    card1: null,
    card2: null,
    card3: null,
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [currentAudio, setCurrentAudio] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [isActivityCompleted, setIsActivityCompleted] = useState(false)

  // Referencias para los elementos de audio
  const audioRef1 = useRef(null)
  const audioRef2 = useRef(null)
  const audioRef3 = useRef(null)

  // Opciones disponibles para los select
  const options = [
    { value: "cables_acero", label: "Cables de acero", image: izaje2 },
    { value: "eslingas", label: "Eslingas", image: izaje1 },
    { value: "tensores", label: "Tensores", image: izaje3 },
  ]

  // Función para obtener las opciones disponibles excluyendo las ya seleccionadas
  const getAvailableOptions = (cardId) => {
    const selectedValues = Object.values(selectedOptions).filter((value) => value !== null)
    return options.filter((option) => !selectedValues.includes(option.value) || selectedOptions[cardId] === option.value)
  }

  const handleSelectChange = (event, cardId) => {
    const selectedValue = event.target.value

    const isCorrect =
      (cardId === "card1" && selectedValue === "cables_acero") ||
      (cardId === "card2" && selectedValue === "eslingas") ||
      (cardId === "card3" && selectedValue === "tensores")

    setSelectedOptions((prevState) => ({
      ...prevState,
      [cardId]: selectedValue,
    }))

    setValidationStatus((prevState) => ({
      ...prevState,
      [cardId]: isCorrect ? "correcto" : "incorrecto",
    }))

    // Mensajes de feedback inmediato
    if (isCorrect) {
      setSuccessMessage(
        <span className="text-green-personalizado font-bold">¡Muy bien!</span>
      )
      setErrorMessage("")
    } else {
      setErrorMessage(
        <span className="text-red-personalizado font-bold">¡Piénsalo bien!</span>
      )
      setSuccessMessage("")
    }

    // Verificar si todas las opciones han sido seleccionadas
    const updatedSelectedOptions = {
      ...selectedOptions,
      [cardId]: selectedValue,
    }
    const allOptionsSelected = Object.values(updatedSelectedOptions).every((item) => item !== null)

    if (allOptionsSelected) {
      const updatedValidationStatus = {
        ...validationStatus,
        [cardId]: isCorrect ? "correcto" : "incorrecto",
      }
      const correctAnswers = Object.values(updatedValidationStatus).filter((status) => status === "correcto").length
      setCorrectCount(correctAnswers)
      setPercentage(Math.round((correctAnswers / 3) * 100))
      setIsActivityCompleted(true)
    }
  }

  const handleReset = () => {
    // Reiniciar los audios
    if (audioRef1.current) {
      audioRef1.current.pause()
      audioRef1.current.currentTime = 0
    }
    if (audioRef2.current) {
      audioRef2.current.pause()
      audioRef2.current.currentTime = 0
    }
    if (audioRef3.current) {
      audioRef3.current.pause()
      audioRef3.current.currentTime = 0
    }

    // Reiniciar el estado
    setSelectedOptions({
      card1: null,
      card2: null,
      card3: null,
    })
    setValidationStatus({
      card1: null,
      card2: null,
      card3: null,
    })
    setCurrentAudio(null)
    setErrorMessage("")
    setSuccessMessage("")
    setCorrectCount(0)
    setPercentage(0)
    setIsActivityCompleted(false)
  }

  // Función para pausar otros audios cuando uno comienza a reproducirse
  const handleAudioPlay = (audio) => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause()
    }
    setCurrentAudio(audio)
  }

  return (
    <div className="col-lg-6 col-md-12">
      <div className="activity-container-select-audios">
        {/* Card 1 */}
        <div
          className={`card-select-audios ${
            validationStatus.card1 === "correcto"
              ? "card-correct"
              : validationStatus.card1 === "incorrecto"
              ? "card-incorrect"
              : ""
          }`}
        >
          <div className="audio-player-select-audios">
            <audio
              ref={audioRef1}
              controls
              onPlay={(e) => handleAudioPlay(e.target)}
            >
              <source src={audioCablesDeAcero} type="audio/mp3" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
          <select
            className={`select-audios ${
              validationStatus.card1 === "correcto"
                ? "select-correctSA"
                : validationStatus.card1 === "incorrecto"
                ? "select-incorrectSA"
                : ""
            }`}
            onChange={(e) => handleSelectChange(e, "card1")}
            value={selectedOptions.card1 || ""}
          >
            <option value="">Seleccione...</option>
            {getAvailableOptions("card1").map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {selectedOptions.card1 && (
            <div className="image-status-container">
              <img
                src={options.find((opt) => opt.value === selectedOptions.card1).image}
                alt="Imagen seleccionada"
                className="selected-image"
              />
              {validationStatus.card1 && (
                <img
                  src={validationStatus.card1 === "correcto" ? checkIcon : xmarkIcon}
                  className="status-icon-select-audios"
                  alt={validationStatus.card1 === "correcto" ? "Correcto" : "Incorrecto"}
                />
              )}
            </div>
          )}
        </div>

        {/* Card 2 */}
        <div
          className={`card-select-audios ${
            validationStatus.card2 === "correcto"
              ? "card-correct"
              : validationStatus.card2 === "incorrecto"
              ? "card-incorrect"
              : ""
          }`}
        >
          <div className="audio-player-select-audios">
            <audio
              ref={audioRef2}
              controls
              onPlay={(e) => handleAudioPlay(e.target)}
            >
              <source src={audioEslingas} type="audio/mp3" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
          <select
            className={`select-audios ${
              validationStatus.card2 === "correcto"
                ? "select-correctSA"
                : validationStatus.card2 === "incorrecto"
                ? "select-incorrectSA"
                : ""
            }`}
            onChange={(e) => handleSelectChange(e, "card2")}
            value={selectedOptions.card2 || ""}
          >
            <option value="">Seleccione...</option>
            {getAvailableOptions("card2").map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {selectedOptions.card2 && (
            <div className="image-status-container">
              <img
                src={options.find((opt) => opt.value === selectedOptions.card2).image}
                alt="Imagen seleccionada"
                className="selected-image"
              />
              {validationStatus.card2 && (
                <img
                  src={validationStatus.card2 === "correcto" ? checkIcon : xmarkIcon}
                  className="status-icon-select-audios"
                  alt={validationStatus.card2 === "correcto" ? "Correcto" : "Incorrecto"}
                />
              )}
            </div>
          )}
        </div>

        {/* Card 3 */}
        <div
          className={`card-select-audios ${
            validationStatus.card3 === "correcto"
              ? "card-correct"
              : validationStatus.card3 === "incorrecto"
              ? "card-incorrect"
              : ""
          }`}
        >
          <div className="audio-player-select-audios">
            <audio
              ref={audioRef3}
              controls
              onPlay={(e) => handleAudioPlay(e.target)}
            >
              <source src={audioTensores} type="audio/mp3" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
          <select
            className={`select-audios ${
              validationStatus.card3 === "correcto"
                ? "select-correctSA"
                : validationStatus.card3 === "incorrecto"
                ? "select-incorrectSA"
                : ""
            }`}
            onChange={(e) => handleSelectChange(e, "card3")}
            value={selectedOptions.card3 || ""}
          >
            <option value="">Seleccione...</option>
            {getAvailableOptions("card3").map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {selectedOptions.card3 && (
            <div className="image-status-container">
              <img
                src={options.find((opt) => opt.value === selectedOptions.card3).image}
                alt="Imagen seleccionada"
                className="selected-image"
              />
              {validationStatus.card3 && (
                <img
                  src={validationStatus.card3 === "correcto" ? checkIcon : xmarkIcon}
                  className="status-icon-select-audios"
                  alt={validationStatus.card3 === "correcto" ? "Correcto" : "Incorrecto"}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="error-message-select-audios">
          <p>{errorMessage} <span className="texto-gray">Revisa nuevamente y vuelve a intentarlo.</span></p>
        </div>
      )}
      {successMessage && (
        <div className="success-message-select-audios">
          <p>{successMessage} <span className="texto-gray">Conoces los izajes de carga.</span></p>
        </div>
      )}

      {/* Mostrar el porcentaje de respuestas correctas */}
      {isActivityCompleted && (
        <div className="percentage-message-select-audios">
          <p>Tus respuestas correctas son: {correctCount} de 3 ({percentage}%)</p>
        </div>
      )}

      <div className="flex-container">
        <Button bold={false} icon={faRepeat} roundedFull={true} onClick={handleReset}>
          Reiniciar
        </Button>
      </div>
    </div>
  )
}

export default Slidermobile_select_audios