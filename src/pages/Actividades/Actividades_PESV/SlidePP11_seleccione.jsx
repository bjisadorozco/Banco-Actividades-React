"use client"

import { useState } from "react"
import useStore from "../../../store"
import Button from "../../components/Button"
import img1 from "../../../assets/img/empresa_camiones_grnade.webp"
import img2 from "../../../assets/img/empresa_flota_vehiculos.webp"
import img3 from "../../../assets/img/empresa_grande_gobierno.webp"
import img4 from "../../../assets/img/empresa_persona_conduzca_vehiculo.webp"
import img5 from "../../../assets/img/persona_conduce_vehiculo.webp"
import img6 from "../../../assets/img/sancion_administrativa.webp"
import { faRefresh } from "@fortawesome/free-solid-svg-icons"
import "./styles/SlidePPT11_seleccione.css"
import imgVerdadero from "../../../assets/img/checkAct.png"
import imgFalso from "../../../assets/img/xmarkAct.png"

function SlidePPT11_seleccione() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)
  const [selections, setSelections] = useState({})
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [showPercentage, setShowPercentage] = useState(false)
  const [hasIncorrect, setHasIncorrect] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [feedbackType, setFeedbackType] = useState("")
  const [quizCompleted, setQuizCompleted] = useState(false)

  const risks = [
    {
      title: "Lesiones por corte",
      image: img1,
      description: "El PESV sólo deben aplicarlos la empresas grandes y del gobierno",
      dropId: "drop1",
      isCorrect: false,
    },
    {
      title: "Lesiones por aplastamiento",
      image: img2,
      description:
        "Deben aplicar PESV las empresas que tengan una flota de vehículos automotores o no automotores (incluyendo bicicletas, patinetas, monopatines, etc.) superior a 10 unidades",
      dropId: "drop2",
      isCorrect: true,
    },
    {
      title: "Golpes y proyecciones",
      image: img4,
      description:
        "El cumplimiento del PESV es obligatorio y las organizaciones que no lo implementan pueden ser objeto de sanciones administrativas, civiles e incluso penales.",
      dropId: "drop3",
      isCorrect: true,
    },
    {
      title: "Riesgo ergonómico",
      image: img3,
      description:
        "También deben aplicar el PESV aquellas empresas que tengan personas que conduzcan vehículos para realizar sus funciones laborales.",
      dropId: "drop4",
      isCorrect: true,
    },
    {
      title: "Riesgo ergonómico",
      image: img5,
      description: "Para aplicar el PESV se requiere que la empresa tenga camiones y vehículos grandes",
      dropId: "drop5",
      isCorrect: false,
    },
    {
      title: "Riesgo ergonómico",
      image: img6,
      description:
        "Si los trabajadores de una empresa montan bus, o conducen vehículo para llegar al trabajo, deben aplicar el PESV",
      dropId: "drop6",
      isCorrect: false,
    },
  ]

  const handleCardClick = (dropId, isCorrect) => {
    if (selections[dropId] !== undefined || quizCompleted) return

    setSelections((prev) => {
      const newSelections = { ...prev, [dropId]: isCorrect }
      const newCorrectCount = Object.values(newSelections).filter((val) => val).length
      const newIncorrectCount = Object.values(newSelections).filter((val) => !val).length
      const newHasIncorrect = Object.values(newSelections).some((val) => !val)

      setCorrectCount(newCorrectCount)
      setIncorrectCount(newIncorrectCount)
      setHasIncorrect(newHasIncorrect)
      setShowPercentage(true)

      if (newCorrectCount === 3) {
        setQuizCompleted(true)

        if (newIncorrectCount === 0) {
          setFeedback("Correcto: ¡Bien hecho! Has seleccionado las empresas que deben aplicar el PESV.")
          setFeedbackType("correct")
        } else if (newIncorrectCount >= 3) {
          setFeedback("Incorrecto: Inténtalo de nuevo. Revisa qué empresas están obligadas a implementarlo.")
          setFeedbackType("incorrect")
        } else {
          setFeedback("Inténtalo de nuevo, algunas de tus respuestas son correctas, pero otras no.")
          setFeedbackType("partial")
        }
      }

      return newSelections
    })
  }

  const handleReset = () => {
    setSelections({})
    setCorrectCount(0)
    setIncorrectCount(0)
    setShowPercentage(false)
    setHasIncorrect(false)
    setFeedback("")
    setFeedbackType("")
    setQuizCompleted(false)
  }

  const getPercentage = () => {
    return Math.round((correctCount / 3) * 100)
  }

  const hasSelections = Object.keys(selections).length > 0

  return (
    <div className="quiz-container-PP11 mb-36 md:mb-0 overflow-auto">
      <div className="cards-container-PP11 grid grid-cols-1 md:grid-cols-3 gap-size">
        {risks.map((risk, index) => (
          <div className="quiz-card-PP11" key={index} onClick={() => handleCardClick(risk.dropId, risk.isCorrect)}>
            <div
              className={`card-front-PP11 ${selections[risk.dropId] !== undefined ? (risk.isCorrect ? "bg-green-personalizado" : "bg-red-personalizado") : ""}`}
            >
              <div className="card-content-PP11">
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "12px",
                    color: selections[risk.dropId] !== undefined ? "white" : "#8F8F8F",
                  }}
                >
                  {risk.description}
                </p>
              </div>

              <div className="card-image-PP11 bg-gradient-to-b">
                <img
                  src={risk.image || "/placeholder.svg"}
                  alt={risk.title}
                  className="w-full h-full object-contain mb-0"
                />

                {selections[risk.dropId] !== undefined && (
                  <div className="validation-icon-container-centered">
                    <img
                      src={risk.isCorrect ? imgVerdadero : imgFalso}
                      alt="Validation Icon"
                      className="validation-icon-centered"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {quizCompleted && feedback && (
        <div
          className={`feedback-message ${
            feedbackType === "correct"
              ? "bg-correct-feedback"
              : feedbackType === "incorrect"
                ? "bg-incorrect-feedback"
                : "bg-partial-feedback"
          } text-white py-1 px-2 my-2 rounded-md mx-auto text-center`}
        >
          {feedback}
        </div>
      )}

      {showPercentage && hasSelections && (
        <div className="text-center mt-1">
          <p theme="ligth" bold="true" className="bold-text">
            Tus respuestas correctas son: {correctCount} de 3 ({getPercentage()}%)
          </p>
        </div>
      )}

      <div className="flex justify-center gap-4 my-2">
        <Button
          bold={false}
          icon={faRefresh}
          roundedFull={true}
          onClick={handleReset}
          disabled={!hasSelections}
          className={!hasSelections ? "disabled" : ""}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  )
}

export default SlidePPT11_seleccione