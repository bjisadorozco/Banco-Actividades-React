"use client"

import { useState, useEffect } from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"
import Button from "../../components/Button"
import Paragraph from "../../components/Paragraph"
import useStore from "../../../store"
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons"
import { useMediaQuery } from "react-responsive"
import "./styles/Sliderppt24_SeleccionMultiple.css"
import espaciosConfinados from "../../../assets/audio/actividad_multiple_correcto.mp3"

function Sliderppt24_SeleccionMultiple() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)
  const isMobile = useMediaQuery({ maxWidth: 640 })
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [isValidated, setIsValidated] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [remainingOptions, setRemainingOptions] = useState(3)
  const [correctCount, setCorrectCount] = useState(0) // Nuevo estado para contar respuestas correctas

  const question = {
    question: "",
    options: [
      { text: "Usar estabilizadores (patas de cabra, contrapesos", correct: false },
      { text: "Instalar barandillas", correct: true },
      { text: "No trabajar en condiciones adversas", correct: false },
      { text: "Realizar lista de chequeo antes del uso del andamio", correct: true },
      { text: "Utilizar redes de seguridad y/o línea de vida", correct: true },
      { text: "Asegurar herramientas con correas o líneas de sujeción.", correct: false },
    ],
    correctFeedback: "¡Muy bien! Has identificado correctamente las medidas preventivas que se debieron tener en cuenta.",
    incorrectFeedback: "¡Piénsalo bien! Hay medidas, que aunque son preventivas, no son las que causaron el accidente en este caso.",
  }
  
  useEffect(() => {
    setIsOnDivisor(false)
  }, [setIsOnDivisor])

  const handleAnswerSelect = (optionIndex) => {
    if (!isValidated) {
      setSelectedAnswers((prev) => {
        // Si la opción ya está seleccionada, la deseleccionamos
        if (prev.includes(optionIndex)) {
          const newAnswers = prev.filter((i) => i !== optionIndex)
          setRemainingOptions(3 - newAnswers.length)
          return newAnswers
        }
        // Si no se ha alcanzado el límite de 3, agregamos la opción
        else if (prev.length < 3) {
          const newAnswers = [...prev, optionIndex]
          setRemainingOptions(3 - newAnswers.length)
          return newAnswers
        }
        // Si ya hay 3 seleccionadas, no hacemos nada
        return prev
      })
      setShowErrorMessage(false)
      setShowFeedback(false)
    }
  }

  const handleValidate = () => {
    if (selectedAnswers.length === 3) {
      const correctAnswers = question.options
        .map((option, index) => (option.correct ? index : null))
        .filter((index) => index !== null)

      const isAllCorrect =
        selectedAnswers.length === correctAnswers.length &&
        selectedAnswers.every((answer) => correctAnswers.includes(answer))

      // Calcular el número de respuestas correctas
      const correctCount = selectedAnswers.filter((answer) => correctAnswers.includes(answer)).length
      setCorrectCount(correctCount)

      setIsCorrect(isAllCorrect)
      setIsValidated(true)
      setShowErrorMessage(false)
      setShowFeedback(true)
    } else {
      setShowErrorMessage(true)
    }
  }

  const handleReset = () => {
    setSelectedAnswers([])
    setIsValidated(false)
    setShowErrorMessage(false)
    setShowFeedback(false)
    setIsCorrect(false)
    setRemainingOptions(3)
    setCorrectCount(0) // Reiniciar el contador de respuestas correctas
  }

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="md:flex-2 bg-white md:w-full w-full px-2 flex justify-center items-center pb-2">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="USASM">
            <div className="USASM-content">
              <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
                <strong>{question.question}</strong>
              </Paragraph>
              <div>
                {question.options.map((option, index) => (
                  <p
                    key={index}
                    className={`
                      ${selectedAnswers.includes(index) ? "act" : ""}
                      ${isValidated && selectedAnswers.includes(index) ? (option.correct ? "true" : "false") : ""}
                      ${selectedAnswers.length >= 3 && !selectedAnswers.includes(index) ? "disabled" : ""}
                    `}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {String.fromCharCode(97 + index)}. {option.text}
                  </p>
                ))}
              </div>
              <div className="flex flex-col items-center">
                {!isValidated && selectedAnswers.length > 0 && (
                  <p className="mb-4" style={{ backgroundColor: "#fcfcfc" }}>
                    Te faltan <strong>{remainingOptions}</strong> opciones por seleccionar.
                  </p>
                )}
                {/* Mensaje de respuestas correctas fuera del feedback */}
                {isValidated && (
                  <span theme="light" justify={isMobile ? "justify" : "justify"}>
                    <span className="margin-size text-monserrat" style={{ color: "#8f8f8f", fontWeight: "bold" }}>
                      Tus respuestas correctas son: {correctCount} de 3 ({Math.round((correctCount / 3) * 100)}%)
                    </span>
                  </span>
                )}
                <Button
                  bold={false}
                  icon={isValidated ? faRepeat : faCheck}
                  roundedFull={true}
                  onClick={isValidated ? handleReset : handleValidate}
                  disabled={selectedAnswers.length !== 3}
                  style={{
                    opacity: selectedAnswers.length === 3 ? 1 : 0.3,
                    backgroundColor: selectedAnswers.length === 3 ? "#4CAF50" : "#ccc",
                  }}
                >
                  {isValidated ? "Reiniciar" : "Validar"}
                </Button>
              </div>
            </div>
          </div>

          {showFeedback && (
            <div className="USASM-feedback">
              <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
                <span
                  style={{
                    color: isCorrect ? "#4CAF50" : "#F44336",
                    fontWeight: "bold",
                  }}
                >
                  {isCorrect ? "Respuesta(s) correcta(s): " : "Respuesta(s) Incorrecta(s): "}
                </span>
                <span style={{ color: "#8f8f8f", fontWeight: "bold" }}>
                  {isCorrect ? question.correctFeedback : question.incorrectFeedback}
                </span>
              </Paragraph>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sliderppt24_SeleccionMultiple