"use client"

import { useState, useRef, useEffect } from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"
import Button from "../../components/Button"
import Paragraph from "../../components/Paragraph"
import useStore from "../../../store"
import { faCheck, faRepeat, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useMediaQuery } from "react-responsive"
import "./styles/Sliderppt16_SeleccionPreguntasParte1.css"

function Sliderppt16_SeleccionPreguntasParte1() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)
  const isMobile = useMediaQuery({ maxWidth: 640 })
  const videoRef = useRef(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showQuestions, setShowQuestions] = useState(true)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({ correct: 0, total: 0, percentage: 0 })
  const [questionResults, setQuestionResults] = useState([])
  const [isValidated, setIsValidated] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = [
    {
      question: "¿Qué aspectos se deben verificar en el análisis del terreno antes de instalar un andamio?",
      options: [
        { text: "La presencia de líneas eléctricas cercanas.", correct: false },
        { text: "La estabilidad y nivelación del suelo.", correct: true },
        { text: "El número de trabajadores en el área.", correct: false },
      ],
      correctFeedback: "¡Muy bien! Has aprendido cómo realizar un alistamiento correcto para trabajo con andamios.",
      incorrectFeedback: "¡Piénsalo bien! Observa nuevamente el video y trata de contestar las preguntas nuevamente.",
    },
    {
      question: "¿Cuál es un riesgo importante a considerar al analizar el entorno adyacente para instalar un andamio?",
      options: [
        { text: "La proximidad a líneas eléctricas o maquinaria en movimiento.", correct: true },
        { text: "El tipo de herramientas que se usarán en el andamio", correct: false },
        { text: "La altura del andamio respecto al edificio.", correct: false },
      ],
      multipleCorrect: false,
      correctCount: 1,
      correctFeedback: "¡Muy bien! Has aprendido cómo realizar un alistamiento correcto para trabajo con andamios.",
      incorrectFeedback: "¡Piénsalo bien! Observa nuevamente el video y trata de contestar las preguntas nuevamente.",
    },
  ]

  useEffect(() => {
    setIsOnDivisor(false)
  }, [setIsOnDivisor])

  const handleAnswerSelect = (optionIndex) => {
    if (!isValidated) {
      if (questions[currentQuestion].multipleCorrect) {
        setSelectedAnswers((prev) => {
          const newAnswers = [...prev]
          if (!newAnswers[currentQuestion]) {
            newAnswers[currentQuestion] = []
          }
          if (newAnswers[currentQuestion].includes(optionIndex)) {
            newAnswers[currentQuestion] = newAnswers[currentQuestion].filter((i) => i !== optionIndex)
          } else if (newAnswers[currentQuestion].length < 2) {
            newAnswers[currentQuestion] = [...newAnswers[currentQuestion], optionIndex]
          }
          return newAnswers
        })
      } else {
        setSelectedAnswers((prev) => {
          const newAnswers = [...prev]
          newAnswers[currentQuestion] = [optionIndex]
          return newAnswers
        })
      }
      setShowErrorMessage(false)
      setShowFeedback(false)
    }
  }

  const handleValidate = () => {
    if (selectedAnswers[currentQuestion]?.length > 0) {
      if (questions[currentQuestion].multipleCorrect && selectedAnswers[currentQuestion].length === 1) {
        setShowErrorMessage(true)
        return
      }

      let isCorrect
      if (questions[currentQuestion].multipleCorrect) {
        const correctOptions = questions[currentQuestion].options
          .map((option, index) => (option.correct ? index : null))
          .filter((index) => index !== null)
        isCorrect =
          selectedAnswers[currentQuestion].length === questions[currentQuestion].correctCount &&
          selectedAnswers[currentQuestion].every((answer) => correctOptions.includes(answer))
      } else {
        isCorrect = questions[currentQuestion].options[selectedAnswers[currentQuestion][0]].correct
      }
      setQuestionResults((prev) => {
        const newResults = [...prev]
        newResults[currentQuestion] = isCorrect ? 1 : 0
        return newResults
      })
      setIsValidated(true)
      setShowErrorMessage(false)
      setShowFeedback(true)
    } else {
      setShowErrorMessage(true)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setIsValidated(false)
      setShowFeedback(false)
    } else {
      setResults({
        correct: questionResults.reduce((a, b) => a + b, 0),
        total: questions.length,
        percentage: Math.round((questionResults.reduce((a, b) => a + b, 0) / questions.length) * 100),
      })
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setIsValidated(false)
    setQuestionResults([])
    setShowErrorMessage(false)
    setShowFeedback(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div className="flex justify-center w-full px-4 mb-36 md:mb-0">
      <div className="max-w-3xl w-full">
        {showQuestions && !showResults && (
          <div className="preguntas_01">
            <div className="ctItem-7">
              <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
                <strong>Pregunta {currentQuestion + 1}: </strong>
                {questions[currentQuestion].question}
              </Paragraph>
              <div>
                {questions[currentQuestion].options.map((option, index) => (
                  <p
                    key={index}
                    className={`
                                            ${selectedAnswers[currentQuestion]?.includes(index) ? "act" : ""}
                                            ${
                                              isValidated && selectedAnswers[currentQuestion]?.includes(index)
                                                ? option.correct
                                                  ? "true"
                                                  : "false"
                                                : ""
                                            }
                                        `}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {String.fromCharCode(97 + index)}. {option.text}
                  </p>
                ))}
              </div>
              <div className="flex flex-col items-center">
                {showErrorMessage && (
                  <h3 className="text-secondary-color font-bold mb-2">
                    {questions[currentQuestion].multipleCorrect
                      ? selectedAnswers[currentQuestion]?.length === 1
                        ? "Falta una opción por seleccionar."
                        : "Debes seleccionar dos opciones para continuar."
                      : "Debes seleccionar una opción para continuar."}
                  </h3>
                )}
                <Button
                  bold={false}
                  icon={isValidated ? faArrowRight : faCheck}
                  roundedFull={true}
                  onClick={isValidated ? handleNext : handleValidate}
                  disabled={selectedAnswers[currentQuestion]?.length === 0}
                >
                  {isValidated ? "Siguiente" : "Validar"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {showQuestions && !showResults && showFeedback && (
          <div className="feedback-containerPSH ctItemPSH mt-4">
            <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
              <strong
                style={{
                  color: questionResults[currentQuestion] === 1 ? "#4CAF50" : "#F44336",
                }}
              >
                {questionResults[currentQuestion] === 1 ? "Correcto: " : "Incorrecto: "}
              </strong>
              {questionResults[currentQuestion] === 1
                ? questions[currentQuestion].correctFeedback
                : questions[currentQuestion].incorrectFeedback}
            </Paragraph>
          </div>
        )}

        {showResults && (
          <div className="resultado-containerPSH">
            <p className="text-secondary-color font-bold text-color">Resultados:</p>
            <div className="results-list">
              {questionResults.map((result, index) => (
                <p key={index} theme="light" className="text-centrar">
                  El resultado de la pregunta {index + 1} es{" "}
                  <span className={result === 1 ? "text-successPSH" : "text-errorPSH"}>
                    {result}/1 respuesta(s) correctas(s)
                  </span>
                </p>
              ))}
            </div>
            <p className="text-paragraph-light-color font-bold">
              Tus respuestas correctas son: {results.correct} de 2 ({results.percentage}%)
            </p>
            <Button bold={false} icon={faRepeat} roundedFull={true} onClick={handleReset}>
              Reiniciar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sliderppt16_SeleccionPreguntasParte1

