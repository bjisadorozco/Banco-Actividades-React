"use client"

import { useState } from "react"
import sistema_oxiacetileno from "/src/assets/img/corrección_sistema_oxiacetileno.webp"
import imgVerdadero from "../../../assets/img/checkAct.png"
import imgFalso from "../../../assets/img/xmarkAct.png"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import "./styles/DragAndDrop_Sistema_OxiacetilenoMobile.css"
import Button from "../../components/Button"

const DragAndDrop_Sistema_OxiacetilenoMobile = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    box1: "",
    box2: "",
    box3: "",
  })

  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [scoreMessage, setScoreMessage] = useState("")
  const [feedbackStyle, setFeedbackStyle] = useState("")
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [currentStep, setCurrentStep] = useState(1) // 1, 2 o 3 para las opciones

  const options = [
    "Juego de soplete tipo chapista c/3 picos",
    "Tapa de fundición",
    "Válvula reguladora de presión de oxígeno c/2 manómetros",
  ]

  const correctItems = {
    box1: "Válvula reguladora de presión de oxígeno c/2 manómetros",
    box2: "Juego de soplete tipo chapista c/3 picos",
    box3: "Tapa de fundición",
  }

  const stepTitles = {
    1: "Opción 2",
    2: "Opción 3",
    3: "Opción 6"
  }

  const handleSelectOption = (option) => {
    const boxId = `box${currentStep}`
    const isCorrect = option === correctItems[boxId]

    setSelectedOptions(prev => ({
      ...prev,
      [boxId]: option
    }))

    // Actualizar el puntaje
    const newCorrect = isCorrect ? score.correct + 1 : score.correct
    const newTotal = score.total + 1
    setScore({ correct: newCorrect, total: newTotal })

    // Establecer mensajes
    setFeedbackMessage(
      isCorrect ? "¡Correcto! Has seleccionado la opción correcta." : "¡Incorrecto! Intenta nuevamente."
    )
    setFeedbackStyle(isCorrect ? "correct" : "incorrect")

    // Avanzar al siguiente paso si no es el último
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Mostrar el porcentaje cuando se hayan seleccionado todos los elementos
      const percentage = Math.round((newCorrect / newTotal) * 100)
      setScoreMessage(`Tus respuestas correctas son: ${newCorrect} de ${newTotal} (${percentage}%)`)
    }
  }

  const handleReset = () => {
    setSelectedOptions({
      box1: "",
      box2: "",
      box3: "",
    })
    setFeedbackMessage("")
    setScoreMessage("")
    setFeedbackStyle("")
    setScore({ correct: 0, total: 0 })
    setCurrentStep(1)
  }

  const getIsCorrect = (boxId) => {
    if (selectedOptions[boxId] === "") return undefined
    return selectedOptions[boxId] === correctItems[boxId]
  }

  const allItemsSelected = Object.values(selectedOptions).every(option => option !== "")

  return (
    <div className="drag-and-drop-containermobile">
      <div className={`main-contentmobile ${allItemsSelected ? "completed-statemobile" : ""}`}>
        <div className="image-container-wrapper">
          <div className="image-wrappermobile">
            <img
              src={sistema_oxiacetileno || "/placeholder.svg"}
              alt="Sistema Oxiacetileno"
              className="sistema-oxiacetileno-imagemobile"
            />
            <div className="feedback-icons-containermobile">
              {/* Solo los iconos de feedback sin cajas */}
              {selectedOptions.box1 && (
                <img
                  src={getIsCorrect("box1") ? imgVerdadero : imgFalso}
                  alt={getIsCorrect("box1") ? "Correcto" : "Incorrecto"}
                  className="feedback-iconmobile box1-icon"
                />
              )}
              {selectedOptions.box2 && (
                <img
                  src={getIsCorrect("box2") ? imgVerdadero : imgFalso}
                  alt={getIsCorrect("box2") ? "Correcto" : "Incorrecto"}
                  className="feedback-iconmobile box2-icon"
                />
              )}
              {selectedOptions.box3 && (
                <img
                  src={getIsCorrect("box3") ? imgVerdadero : imgFalso}
                  alt={getIsCorrect("box3") ? "Correcto" : "Incorrecto"}
                  className="feedback-iconmobile box3-icon"
                />
              )}
            </div>
          </div>
        </div>

        {!allItemsSelected && (
          <div className="step-container">
            <h3 className="step-title">{stepTitles[currentStep]}</h3>
            <select
              className="step-select"
              onChange={(e) => handleSelectOption(e.target.value)}
              value=""
            >
              <option value="">Seleccione una opción</option>
              {options
                .filter(option => !Object.values(selectedOptions).includes(option))
                .map((option, index) => (
                  <option key={`option-${index}`} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>
      <div className="feedback-containermobile">
        {feedbackMessage && (
          <div className={`feedback-messagemobile ${feedbackStyle}`}>
            <p>{feedbackMessage}</p>
          </div>
        )}
        {allItemsSelected && scoreMessage && (
          <p className="score-messagemobile">{scoreMessage}</p>
        )}
      </div>
      <div className="buttons-containermobile">
        <Button
          className="reset-buttonmobile"
          bold={false}
          icon={faRepeat}
          roundedFull={true}
          onClick={handleReset}
          disabled={!allItemsSelected}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  )
}

export default DragAndDrop_Sistema_OxiacetilenoMobile