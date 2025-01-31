import { useState, useEffect } from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"
import Button from "../../components/Button"
import Paragraph from "../../components/Paragraph"
import useStore from "../../../store"
import { faCheck, faRepeat, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useMediaQuery } from "react-responsive"
import "./styles/PreguntasSiNo.css"

import mano1 from "../../../assets/img/fisicas_con_fondo_sld5.webp"
import mano2 from "../../../assets/img/economicas_con_fondo_sld5.webp"
import mano3 from "../../../assets/img/laborales_con_fondo_sld5.webp"
import xmarkIcon from "../../../assets/img/xmarkAct.png"

function PreguntasSiNo() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)
  const isMobile = useMediaQuery({ maxWidth: 640 })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showQuestions, setShowQuestions] = useState(true)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({ correct: 0, total: 3 })
  const [questionResults, setQuestionResults] = useState([])
  const [isValidated, setIsValidated] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = [
    {
      question: "¿Este espacio está diseñado para la ocupación continua de una persona? (Si)",
      options: [
        { text: "Si", correct: true },
        { text: "No", correct: false },
      ],
      correctFeedback: "¡Muy bien! Has contestado correctamente.",
      incorrectFeedback: "¡Piénsalo bien! Esta es una de las condiciones para un espacio confinado.",
      image: mano1,
    },
    {
      question: "¿Tiene medios de entrada y salida restringidos o de difícil acceso? (Si)",
      options: [
        { text: "Si", correct: true },
        { text: "No", correct: false },
      ],
      correctFeedback: "¡Muy bien! Has contestado correctamente.",
      incorrectFeedback: "¡Piénsalo bien! Esta es una de las condiciones para un espacio confinado.",
      image: mano2,
    },
    {
      question: "¿Presenta o puede presentar encerramiento o atmósferas peligrosas? (Si)",
      options: [
        { text: "Si", correct: true },
        { text: "No", correct: false },
      ],
      correctFeedback: "¡Muy bien! Has contestado correctamente.",
      incorrectFeedback: "¡Piénsalo bien! Esta es una de las condiciones para un espacio confinado.",
      image: mano3,
    },
  ]

  useEffect(() => {
    setIsOnDivisor(false)
  }, [setIsOnDivisor])

  const handleAnswerSelect = (optionIndex) => {
    if (!isValidated) {
      setSelectedAnswers((prev) => {
        const newAnswers = [...prev]
        newAnswers[currentQuestion] = [optionIndex]
        return newAnswers
      })
      setShowErrorMessage(false)
      setShowFeedback(false)
    }
  }

  const handleValidate = () => {
    if (selectedAnswers[currentQuestion]?.length > 0) {
      const isCorrect = questions[currentQuestion].options[selectedAnswers[currentQuestion][0]].correct
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
      const correctCount = questionResults.reduce((a, b) => a + b, 0)
      setResults({
        correct: correctCount,
        total: questions.length,
        percentage: Math.round((correctCount / questions.length) * 100),
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
  }

  return (
    <div className="flex flex-col mb-36 md:mb-0">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sección de imágenes - Izquierda */}
        <div className="md:flex-1 md:w-1/2 w-full">
          <div
            className={`image-container ${showResults ? (results.correct === results.total ? "success" : "error") : ""}`}
          >
            {!showResults && questionResults.length === 0 ? (
              <p className="discover-text">Descubre la imagen</p>
            ) : (
              <div className="image-sections">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="image-section">
                    {questionResults[index] !== undefined &&
                      (questionResults[index] === 1 ? (
                        <img
                          src={questions[index].image || "/placeholder.svg"}
                          alt={`Imagen ${index + 1}`}
                          className="section-image"
                        />
                      ) : (
                        <img src={xmarkIcon || "/placeholder.svg"} alt="Incorrecto" className="error-icon" />
                      ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sección de preguntas - Derecha */}
        <div className="md:flex-1 bg-white md:w-1/2 w-full px-2 flex justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center">
            {showQuestions && !showResults && (
              <div className="preguntas_SN">
                <div className="ctItem-SN">
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
                        {option.text}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-col items-center">
                    {showErrorMessage && (
                      <h3 className="text-secondary-color font-bold mb-2">
                        Debes seleccionar una opción para continuar.
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
          </div>
        </div>
      </div>

      {/* Feedback y Resultados - Debajo */}
      <div className="w-full mt-8">
        {showQuestions && !showResults && showFeedback && (
          <div className="feedback-container mx-auto">
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
          <div className="results-container mx-auto">
            <div className="results-header">
              <h2 className="text-xl font-bold mb-4">Resultados:</h2>
            </div>
            <div className="results-content">
              <div className="correct-answers mb-4">
                <h3 className="text-green-600 font-semibold">Preguntas respondidas correctamente:</h3>
                <ul className="ml-4">
                  {questionResults.map((result, index) => result === 1 && <li key={index}>Pregunta {index + 1}</li>)}
                </ul>
              </div>
              {questionResults.some((result) => result === 0) && (
                <div className="incorrect-answers mb-4">
                  <h3 className="text-red-600 font-semibold">Preguntas respondidas incorrectamente:</h3>
                  <ul className="ml-4">
                    {questionResults.map((result, index) => result === 0 && <li key={index}>Pregunta {index + 1}</li>)}
                  </ul>
                </div>
              )}
              <div className="score-summary mb-4">
                <p className="font-bold">
                  Tus respuestas correctas son: {results.correct} de {results.total} ({results.percentage}%)
                </p>
              </div>
              <Paragraph theme="light">
                {results.correct === results.total
                  ? "¡Muy bien! ¡¡Has contestado correctamente las 3 preguntas clave, SI ES UN ESPACIO CONFINADO !!"
                  : "¡Piénsalo bien! Deben cumplirse estas 3 condiciones para que se trate de un ESPACIO CONFINADO"}
              </Paragraph>
              <div className="flex justify-center mt-4">
                <Button bold={false} icon={faRepeat} roundedFull={true} onClick={handleReset}>
                  Reiniciar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PreguntasSiNo

