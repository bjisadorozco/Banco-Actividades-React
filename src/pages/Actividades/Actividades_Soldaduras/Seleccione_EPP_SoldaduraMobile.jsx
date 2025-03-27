"use client"

import { useState, useEffect } from "react"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import Button from "../../components/Button"
import gafas from "../../../assets/img/gafas_proteccion_epp.webp"
import mascara from "../../../assets/img/mascara_protectora_epp.webp"
import vestuario from "../../../assets/img/vestiario_soldadura_epp.webp"
import pantalon from "../../../assets/img/pantalon_cuero_epp.webp"
import zapatos from "../../../assets/img/calzado_seguridad_epp.webp"
import imgVerdadero from "../../../assets/img/checkAct.png"
import imgFalso from "../../../assets/img/xmarkAct.png"
import "./styles/Seleccione_EPP_SoldaduraMobile.css"

const Seleccione_EPP_SoldaduraMobile = () => {
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

  // Items desordenados aleatoriamente
  const [shuffledItems, setShuffledItems] = useState([])

  useEffect(() => {
    // Desordenar los items al montar el componente
    const items = [
      {
        id: "box1",
        title: "Máscara protectora",
        image: mascara,
        options: [
          "Gafas de protección",
          "Pantalón de cuero",
          "Máscara protectora",
          "Vestuario de soldadura",
          "Calzado de seguridad"
        ].sort(() => Math.random() - 0.5)
      },
      {
        id: "box2",
        title: "Gafas de protección",
        image: gafas,
        options: [
          "Gafas de protección",
          "Pantalón de cuero",
          "Máscara protectora",
          "Vestuario de soldadura",
          "Calzado de seguridad"
        ].sort(() => Math.random() - 0.5)
      },
      {
        id: "box3",
        title: "Pantalón de cuero",
        image: pantalon,
        options: [
          "Gafas de protección",
          "Pantalón de cuero",
          "Máscara protectora",
          "Vestuario de soldadura",
          "Calzado de seguridad"
        ].sort(() => Math.random() - 0.5)
      },
      {
        id: "box4",
        title: "Vestuario de soldadura",
        image: vestuario,
        options: [
          "Gafas de protección",
          "Pantalón de cuero",
          "Máscara protectora",
          "Vestuario de soldadura",
          "Calzado de seguridad"
        ].sort(() => Math.random() - 0.5)
      },
      {
        id: "box5",
        title: "Calzado de seguridad",
        image: zapatos,
        options: [
          "Gafas de protección",
          "Pantalón de cuero",
          "Máscara protectora",
          "Vestuario de soldadura",
          "Calzado de seguridad"
        ].sort(() => Math.random() - 0.5)
      }
    ]
    setShuffledItems(items.sort(() => Math.random() - 0.5))
  }, [])

  const handleSelectChange = (event, boxId, correctTitle) => {
    const value = event.target.value
    setSelectedValues((prevState) => ({
      ...prevState,
      [boxId]: value,
    }))

    const isCorrect = value === correctTitle
    setFeedbackMessage(
      isCorrect ? "¡Correcto! Has seleccionado la opción correcta." : "¡Incorrecto! Intenta nuevamente."
    )
    setFeedbackStyle(isCorrect ? "correct" : "incorrect")

    const currentCorrectCount = shuffledItems.reduce((count, item) => {
      return selectedValues[item.id] === item.title ? 
        (item.id === boxId ? (isCorrect ? count + 1 : count) : count + 1) : 
        (item.id === boxId && isCorrect ? count + 1 : count)
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
    setShuffledItems(prev => [...prev].sort(() => Math.random() - 0.5))
  }

  useEffect(() => {
    const allPlaced = Object.values(selectedValues).every((text) => text !== "")
    setAllItemsPlaced(allPlaced)
    setIsResetDisabled(!allPlaced)
  }, [selectedValues])

  const getIsCorrect = (boxId, correctTitle) => {
    if (selectedValues[boxId] === "") return undefined
    return selectedValues[boxId] === correctTitle
  }

  const getCardStyle = (boxId, correctTitle) => {
    if (selectedValues[boxId] === "") return {}
    return {
      backgroundColor: getIsCorrect(boxId, correctTitle) ? "#4CAF50" : "#F44336",
      border: getIsCorrect(boxId, correctTitle) ? "2px solid #4CAF50" : "2px solid #F44336"
    }
  }

  const getSelectStyle = (boxId, correctTitle) => {
    if (selectedValues[boxId] === "") return {}
    return {
      backgroundColor: getIsCorrect(boxId, correctTitle) ? "rgb(118, 189, 121)" : "rgb(211, 110, 102)",
      color: "white",
      border: getIsCorrect(boxId, correctTitle) ? "1px solid #4CAF50" : "1px solid #F44336"
    }
  }

  const percentage = allItemsPlaced ? Math.round((correctCount / 5) * 100) : 0

  return (
    <div className="seleccione-epp-soldadura-mobile-container">
      <div className="main-content-mobile">
        {shuffledItems.map((item) => (
          <div 
            key={item.id} 
            className="card-mobile"
            style={getCardStyle(item.id, item.title)}
          >
            <div className="image-container-mobile">
              <img src={item.image} alt={item.title} className="epp-image-mobile" />
              {selectedValues[item.id] && (
                <img
                  src={getIsCorrect(item.id, item.title) ? imgVerdadero : imgFalso}
                  alt={getIsCorrect(item.id, item.title) ? "Correcto" : "Incorrecto"}
                  className="feedback-icon-mobile"
                />
              )}
            </div>
            <div className="select-container-mobile">
              <select
                value={selectedValues[item.id]}
                onChange={(e) => handleSelectChange(e, item.id, item.title)}
                className="select-box-mobile"
                style={getSelectStyle(item.id, item.title)}
              >
                <option value="">Seleccione...</option>
                {item.options
                  .filter((option) => !Object.values(selectedValues).includes(option) || option === selectedValues[item.id])
                  .map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        ))}
      </div>
      
      <div className="feedback-container-mobile">
        {feedbackMessage && (
          <div className={`feedback-message-mobile ${feedbackStyle}`}>
            <p>{feedbackMessage}</p>
          </div>
        )}
        {allItemsPlaced && (
          <p className="score-message-mobile">
            Tus respuestas correctas son: {correctCount} de 5 ({percentage}%)
          </p>
        )}
      </div>
      
      <div className="buttons-container-mobile">
        <Button
          className="reset-button-mobile"
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

export default Seleccione_EPP_SoldaduraMobile