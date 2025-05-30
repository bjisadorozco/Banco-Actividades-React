"use client"

import { useState, useEffect } from "react"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import sistema_oxiacetileno from "/src/assets/img/avatar_epp_con_titulos.webp"
import imgVerdadero from "../../../assets/img/checkAct.png"
import imgFalso from "../../../assets/img/xmarkAct.png"
import "./styles/Seleccione_EPP_Soldadura.css"
import Button from "../../components/Button"

const Seleccione_EPP_Soldadura = () => {
  const [selectedValues, setSelectedValues] = useState({
    box1: "",
    box2: "",
    box3: "",
    box4: "",
    box5: "",
  })

  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbackStyle, setFeedbackStyle] = useState("")
  const [isResetDisabled, setIsResetDisabled] = useState(true)
  const [allItemsPlaced, setAllItemsPlaced] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const texts = [
    { title: "Gafas de protección" },
    { title: "Pantalón de cuero" },
    { title: "Máscara protectora" },
    { title: "Vestuario de soldadura" },
    { title: "Calzado de seguridad" },
  ]

  const correctItems = {
    box1: "Máscara protectora",
    box2: "Gafas de protección",
    box3: "Pantalón de cuero",
    box4: "Vestuario de soldadura",
    box5: "Calzado de seguridad",
  }

  const handleSelectChange = (event, boxId) => {
    const value = event.target.value
    setSelectedValues((prevState) => ({
      ...prevState,
      [boxId]: value,
    }))

    const isCorrect = value === correctItems[boxId]
    
    setFeedbackMessage(
      isCorrect ? "¡Correcto! Has seleccionado la opción correcta." : "¡Incorrecto! Intenta nuevamente."
    )
    setFeedbackStyle(isCorrect ? "correct" : "incorrect")

    const currentCorrectCount = Object.keys(selectedValues).reduce((count, key) => {
      if (key === boxId) {
        return isCorrect ? count + 1 : count
      }
      return selectedValues[key] === correctItems[key] ? count + 1 : count
    }, 0)
    
    setCorrectCount(currentCorrectCount)
  }

  const handleReset = () => {
    setSelectedValues({
      box1: "",
      box2: "",
      box3: "",
      box4: "",
      box5: "",
    })
    setFeedbackMessage("")
    setFeedbackStyle("")
    setAllItemsPlaced(false)
    setCorrectCount(0)
  }

  useEffect(() => {
    const allPlaced = Object.values(selectedValues).every((text) => text !== "")
    setAllItemsPlaced(allPlaced)
    setIsResetDisabled(!allPlaced)
  }, [selectedValues])

  const getIsCorrect = (boxId) => {
    if (selectedValues[boxId] === "") return undefined
    return selectedValues[boxId] === correctItems[boxId]
  }

  const getSelectStyle = (boxId) => {
    if (selectedValues[boxId] === "") return {}
    return {
      backgroundColor: getIsCorrect(boxId) ? "#4CAF50" : "#F44336",
      color: "white"
    }
  }

  const percentage = allItemsPlaced ? Math.round((correctCount / 5) * 100) : 0

  return (
    <div className="seleccione-epp-soldadura-containerppt24">
      <div className={`main-contentppt24 ${allItemsPlaced ? "completed-stateppt24" : ""}`}>
        <div className="image-containerppt24">
          <img
            src={sistema_oxiacetileno || "/placeholder.svg"}
            alt="Sistema Oxiacetileno"
            className="sistema-oxiacetileno-imageppt24"
          />
          <div className="arrow arrow-1"></div>
          <div className="arrow arrow-2"></div>
          <div className="arrow arrow-3"></div>
          <div className="arrow arrow-4"></div>
          <div className="arrow arrow-5"></div>
          <div className="arrow arrow-6"></div>
          <div className="arrow arrow-7"></div>
          <div className="arrow arrow-8"></div>
          <div className="arrow arrow-9"></div>
          <div className="arrow arrow-10"></div>

          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className="select-containerppt24"
              style={{ top: `${[12, 10, 69, 41, 81][num - 1]}%`, left: `${[68, -7, -6, -3, 75][num - 1]}%` }}
            >
              <select
                value={selectedValues[`box${num}`]}
                onChange={(e) => handleSelectChange(e, `box${num}`)}
                className="select-boxppt24"
                style={getSelectStyle(`box${num}`)}
              >
                <option value="">Seleccione...</option>
                {texts
                  .filter((text) => !Object.values(selectedValues).includes(text.title) || text.title === selectedValues[`box${num}`])
                  .map((text, index) => (
                    <option key={index} value={text.title}>
                      {text.title}
                    </option>
                  ))}
              </select>
              {selectedValues[`box${num}`] && (
                <img
                  src={getIsCorrect(`box${num}`) ? imgVerdadero : imgFalso}
                  alt={getIsCorrect(`box${num}`) ? "Correcto" : "Incorrecto"}
                  className="feedback-iconppt24"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="feedback-containerppt24">
        {feedbackMessage && (
          <div className={`feedback-messageppt24 ${feedbackStyle}`}>
            <p>{feedbackMessage}</p>
          </div>
        )}
        {allItemsPlaced && (
          <p className="score-messageppt24">
            Tus respuestas correctas son: {correctCount} de 5 ({percentage}%)
          </p>
        )}
      </div>
      <div className="buttons-containerppt24">
        <Button
          className="reset-buttonppt24"
          bold={false}
          icon={faRepeat}
          roundedFull={true}
          onClick={handleReset}
          disabled={isResetDisabled}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  )
}

export default Seleccione_EPP_Soldadura