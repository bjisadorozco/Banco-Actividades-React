import { useState, useEffect } from "react"
import useStore from "../../../store"
import Button from "../../components/Button"
import Paragraph from "../../components/Paragraph"
import img1 from "../../../assets/img/falta_oxigeno_ppt11_sldm2.webp"
import img2 from "../../../assets/img/gases_toxicos_ppt11_sldm2.webp"
import img3 from "../../../assets/img/atmosferas_explosivas_ppt11_sldm2.webp"
import img4 from "../../../assets/img/atrapamiento_ppt11_sldm2.webp"
import img5 from "../../../assets/img/virus_bacterias_ppt11_sldm2.webp"
import img6 from "../../../assets/img/estres_ppt11_sldm2.webp"
import audio1 from "../../../assets/audio/FISICAS-Morelco.mp3"
import audio2 from "../../../assets/audio/FISICAS-Morelco.mp3"
import audio3 from "../../../assets/audio/FISICAS-Morelco.mp3"
import audio4 from "../../../assets/audio/FISICAS-Morelco.mp3"
import audio5 from "../../../assets/audio/FISICAS-Morelco.mp3"
import audio6 from "../../../assets/audio/FISICAS-Morelco.mp3"
import { faRefresh, faCheck } from "@fortawesome/free-solid-svg-icons"
import "./styles/SeleccionEspaciosConfinados.css"
import imgVerdadero from "../../../assets/img/checkAct.png"
import imgFalso from "../../../assets/img/xmarkAct.png"

function SeleccionEspaciosConfinados() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)
  const [selections, setSelections] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
    drop4: "",
    drop5: "",
    drop6: "",
  })
  const [availableOptions, setAvailableOptions] = useState({
    drop1: [],
    drop2: [],
    drop3: [],
    drop4: [],
    drop5: [],
    drop6: [],
  })
  const [isVerified, setIsVerified] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [isValidateEnabled, setIsValidateEnabled] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [selectedCards, setSelectedCards] = useState([])

  useEffect(() => {
    setIsOnDivisor(false)
    // Initialize available options
    const initialOptions = options.slice(1)
    setAvailableOptions({
      drop1: initialOptions,
      drop2: initialOptions,
      drop3: initialOptions,
      drop4: initialOptions,
      drop5: initialOptions,
      drop6: initialOptions,
    })
  }, [setIsOnDivisor])

  const handleChange = (dropId, value) => {
    setSelections((prev) => {
      const newSelections = { ...prev, [dropId]: value }

      // Update available options for all dropdowns
      const selectedValues = Object.values(newSelections).filter((v) => v !== "")
      const newAvailableOptions = {}
      Object.keys(availableOptions).forEach((key) => {
        newAvailableOptions[key] = options
          .slice(1)
          .filter((option) => !selectedValues.includes(option.value) || option.value === newSelections[key])
      })
      setAvailableOptions(newAvailableOptions)

      // Enable validate button if at least one option is selected
      setIsValidateEnabled(Object.values(newSelections).some((value) => value !== ""))

      return newSelections
    })
    setSelectedCards((prev) => [...new Set([...prev, dropId])])
  }

  const handleVerify = () => {
    let count = 0
    Object.keys(selections).forEach((key) => {
      if (selections[key] === correctItems[key]) {
        count++
      }
    })
    setCorrectCount(count)
    setIsVerified(true)
    setIsValidateEnabled(false)
  }

  const handleReset = () => {
    setSelections({
      drop1: "",
      drop2: "",
      drop3: "",
      drop4: "",
      drop5: "",
      drop6: "",
    })
    setIsVerified(false)
    setCorrectCount(0)
    setIsValidateEnabled(false)
    setSelectedCard(null)
    setSelectedCards([])
    // Reset available options
    const initialOptions = options.slice(1)
    setAvailableOptions({
      drop1: initialOptions,
      drop2: initialOptions,
      drop3: initialOptions,
      drop4: initialOptions,
      drop5: initialOptions,
      drop6: initialOptions,
    })
  }

  const getCardBackgroundColor = (dropId) => {
    if (isVerified) {
      const percentage = (correctCount / Object.keys(correctItems).length) * 100
      if (selections[dropId] === correctItems[dropId]) {
        return "bg-green-personalizado"
      } else if (percentage > 60) {
        return "bg-orange-personalizado"
      } else {
        return "bg-red-personalizado"
      }
    } else if (selectedCards.includes(dropId)) {
      return "bg-purple-personalizado"
    }
    return ""
  }

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
  ]
  const options = [
    { value: "", label: "Selecciona una opción" },
    { value: "option1", label: "Riesgo químico 2" },
    { value: "option2", label: "Riesgo físico" },
    { value: "option3", label: "Riesgo Mecánico" },
    { value: "option4", label: "Riesgo químico" },
    { value: "option5", label: "Riesgo psicosocial" },
    { value: "option6", label: "Riesgo biológico" },
  ]

  const correctItems = {
    drop1: "option2",
    drop2: "option4",
    drop3: "option1",
    drop4: "option3",
    drop5: "option6",
    drop6: "option5",
  }

  return (
    <div className="quiz-container-SEC mb-36 md:mb-0 overflow-auto">
      <div className="cards-container-SEC grid grid-cols-1 md:grid-cols-3 gap-size">
        {risks.map((risk, index) => (
          <div className="quiz-card-SEC" key={index}>
            <div className={`card-front-SEC ${getCardBackgroundColor(risk.dropId)}`}>
              <div className="card-image-SEC bg-gradient-to-b" style={{ position: "relative" }}>
                <img
                  src={risk.image || "/placeholder.svg"}
                  alt={risk.title}
                  className="w-full h-full object-contain"
                  style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
                />

                {isVerified && (
                  <div className="validation-icon-containerSEC">
                    <img
                      src={selections[risk.dropId] === correctItems[risk.dropId] ? imgVerdadero : imgFalso}
                      alt="Validation Icon"
                      className="validation-iconSEC"
                    />
                  </div>
                )}
              </div>

              <div className="card-content-SEC">
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
                    className={`my-2 w-full p-2 border rounded ${selections[risk.dropId] ? "bg-light-purple" : ""}`}
                    disabled={isVerified}
                    style={{
                      backgroundColor:
                        isVerified || selectedCards.includes(risk.dropId)
                          ? "rgba(255, 255, 255, 0.2)"
                          : selections[risk.dropId]
                            ? "var(--light-purple)"
                            : "white",
                      color: isVerified || selectedCards.includes(risk.dropId) ? "white" : "gray",
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
      {isVerified && (
        <div
          className={`feedback-container-SEC mt-1 p-4 rounded-lg text-center text-white ${
            correctCount === Object.keys(correctItems).length
              ? "bg-green-personalizado"
              : correctCount / Object.keys(correctItems).length > 0.6
                ? "bg-orange-personalizado"
                : "bg-red-personalizado"
          }`}
        >
          {correctCount === Object.keys(correctItems).length ? (
            <Paragraph>Respuesta correcta: ¡Muy bien! Todas las repuestas son correctas.</Paragraph>
          ) : (
            <Paragraph>
              Respuesta Incorrecta: ¡Piénsalo bien! ¡Revisa muy bien la pregunta y vuelve a intentarlo!​
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
        <Button bold={false} icon={faRefresh} roundedFull={true} onClick={handleReset}>
          Reiniciar
        </Button>
      </div>
    </div>
  )
}

export default SeleccionEspaciosConfinados

