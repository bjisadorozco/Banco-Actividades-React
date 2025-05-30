"use client"

import { useState } from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"
import Button from "../../components/Button"
import Paragraph from "../../components/Paragraph"
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons"
import { useMediaQuery } from "react-responsive"
import "./styles/Slider10SeleccioneMultiple.css"

function Slider10SeleccioneMultiple() {
  const isMobile = useMediaQuery({ maxWidth: 640 })
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [isValidated, setIsValidated] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [remainingOptions, setRemainingOptions] = useState(2)
  const [correctCount, setCorrectCount] = useState(0)

  const question = {
    question: "Selecciona los 2 factores de riesgo psicosocial:",
    options: [
      { text: "Carga mental.", correct: false },
      { text: "Exigencias emocionales.", correct: true },
      { text: "Jornadas de trabajo y carga excesiva.", correct: true },
      { text: "Estilo de mando.", correct: false },
    ],
    correctFeedback: "Muy bien! Has identificado los 2 factores de riesgo que aplican",
    incorrectFeedback: "Piénsalo bien! Hay factores de riesgo que no has identificado correctamente.",
  }

  const handleAnswerSelect = (optionIndex) => {
    if (!isValidated) {
      setSelectedAnswers((prev) => {
        if (prev.includes(optionIndex)) {
          const newAnswers = prev.filter((i) => i !== optionIndex)
          setRemainingOptions(2 - newAnswers.length)
          return newAnswers
        }
        else if (prev.length < 2) {
          const newAnswers = [...prev, optionIndex]
          setRemainingOptions(2 - newAnswers.length)
          return newAnswers
        }
        return prev
      })
      setShowErrorMessage(false)
      setShowFeedback(false)
    }
  }

  const handleValidate = () => {
    if (selectedAnswers.length === 2) {
      const correctAnswers = question.options
        .map((option, index) => (option.correct ? index : null))
        .filter((index) => index !== null)

      const isAllCorrect =
        selectedAnswers.length === correctAnswers.length &&
        selectedAnswers.every((answer) => correctAnswers.includes(answer))

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
    setRemainingOptions(2)
    setCorrectCount(0)
  }

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0 SML10">
      <div className="md:flex-2 bg-white md:w-full w-full px-2 flex justify-center items-center pb-2 SML10">
        <div className="w-full flex flex-col justify-center items-center SML10">
          <div className="SML10-content">
            <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
              <strong>{question.question}</strong>
            </Paragraph>
            <div>
              {question.options.map((option, index) => (
                <p
                  key={index}
                  className={`
                    ${selectedAnswers.includes(index) ? "act_SML10" : ""}
                    ${isValidated && selectedAnswers.includes(index) ? (option.correct ? "true_SML10" : "false_SML10") : ""}
                    ${selectedAnswers.length >= 2 && !selectedAnswers.includes(index) ? "disabled_SML10" : ""}
                  `}
                  onClick={() => handleAnswerSelect(index)}
                >
                  {String.fromCharCode(97 + index)}. {option.text}
                </p>
              ))}
            </div>
            <div className="flex flex-col items-center SML10">
              {!isValidated && selectedAnswers.length > 0 && (
                <p className="mb-4 SML10 text-center_SM" style={{ backgroundColor: "#fcfcfc" }}>
                  Te faltan <strong>{remainingOptions}</strong> opciones por seleccionar.
                </p>
              )}
              {isValidated && (
                <span theme="light" justify={isMobile ? "justify" : "justify"}>
                  <span className="margin-size_SML10 text-monserrat_SML10 text-center_SM" style={{ color: "#8f8f8f", fontWeight: "bold" }}>
                    Tus respuestas correctas son: {correctCount} de 2 ({Math.round((correctCount / 2) * 100)}%)
                  </span>
                </span>
              )}
              <Button
                bold={false}
                icon={isValidated ? faRepeat : faCheck}
                roundedFull={true}
                onClick={isValidated ? handleReset : handleValidate}
                disabled={selectedAnswers.length !== 2}
                style={{
                  opacity: selectedAnswers.length === 2 ? 1 : 0.4,
                  backgroundColor: selectedAnswers.length === 2 ? "#4CAF50" : "#ccc",
                }}
              >
                {isValidated ? "Reiniciar" : "Validar"}
              </Button>
            </div>
          </div>

          {showFeedback && (
            <div className="feedback_SML10">
              <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
                <span
                  style={{
                    color: isCorrect ? "#4CAF50" : "#F44336",
                    fontWeight: "bold",
                  }}
                >
                  {isCorrect ? "Selección correcta: " : "Selección Incorrecta: "}
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

export default Slider10SeleccioneMultiple