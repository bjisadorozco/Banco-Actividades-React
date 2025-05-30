"use client"

import { useState } from "react"
import Button from "../../components/Button";
import { faCheck, faRepeat, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMediaQuery } from "react-responsive"
import "./styles/PreguntasSeleccioneSiNo.css"

function PreguntasSeleccioneSiNo() {
  const isMobile = useMediaQuery({ maxWidth: 640 })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({ correct: 0, total: 4 })
  const [questionResults, setQuestionResults] = useState([])
  const [isValidated, setIsValidated] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = [
    {
      question: "¿Crees que el joven ingeniero estaba preparado para esta carga laboral?",
      options: [
        { text: "Si", correct: false },
        { text: "No", correct: true },
      ],
    },
    {
      question: "¿Consideras que la empresa tiene un papel relevante en el cuidado y salud del joven ingeniero?",
      options: [
        { text: "Si", correct: true },
        { text: "No", correct: false },
      ],
    },
    {
      question: "¿Será que las funciones del ingeniero le generan una alta probabilidad de tener otras enfermedades?",
      options: [
        { text: "Si", correct: true },
        { text: "No", correct: false },
      ],
    },
    {
      question: "¿Sera que la empresa realizó adecuadamente la evaluación de su riesgo psicosocial?",
      options: [
        { text: "Si", correct: false },
        { text: "No", correct: true },
      ],
    },
  ]

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
    <div className="flex flex-col mb-36 md:mb-0 PSYN">
      <div className="flex flex-col md:flex-row gap-8 PSYN">
        <div className="md:flex-1 bg-white w-full px-2 flex justify-center items-center PSYN">
          <div className="w-full flex flex-col justify-center items-center PSYN">
            {!showResults && (
              <div className="preguntas_SN_PSYN">
                <div className="ctItem-SN_PSYN">
                  <div className="counter-container_PSYN">
                    <div className="counta_PSYN">
                      <span className="inc_PSYN">{currentQuestion + 1}</span>/
                      <span className="tol_PSYN">{questions.length}</span>
                    </div>
                  </div>
                  <p className="mb-4 text-zise_PSYN texto-gray_PSYN font-text_PSYN">
                    <strong>Pregunta {currentQuestion + 1}: </strong>
                    {questions[currentQuestion].question}
                  </p>
                  <div>
                    {questions[currentQuestion].options.map((option, index) => (
                      <p
                        key={index}
                        className={`
                          ${selectedAnswers[currentQuestion]?.includes(index) ? "act_PSYN" : ""}
                          ${
                            isValidated && selectedAnswers[currentQuestion]?.includes(index)
                              ? option.correct
                                ? "true_PSYN"
                                : "false_PSYN"
                              : ""
                          }
                        `}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        {option.text}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-col items-center mt-4 PSYN">
                    {showErrorMessage && (
                      <span className="texto-gray_PSYN text-monserrat_PSYN font-bold mb-2 PSYN">
                        Debes seleccionar una opción para continuar.
                      </span>
                    )}
                    
                    {isValidated ? (
                      <Button
                        roundedFull="true"
                        icon={faArrowRight}
                        variant="outline"
                        onClick={handleNext}
                      >
                        Siguiente
                      </Button>
                    ) : (
                      <Button
                        roundedFull="true"
                        icon={faCheck}
                        variant="outline"
                        onClick={handleValidate}
                        disabled={selectedAnswers[currentQuestion]?.length === 0}
                      >
                        Validar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!showResults && showFeedback && (
              <div className="feedback-container_PSYN ctItem-SN_PSYN mt-4 PSYN">
                <p className="texto-gray_PSYN font-text_PSYN PSYN">
                  <strong
                    className={questionResults[currentQuestion] === 1 ? "correct-feedback_PSYN" : "incorrect-feedback_PSYN"}
                  >
                    {questionResults[currentQuestion] === 1 ? "Correcto: " : "Incorrecto: "}
                  </strong>
                  {questionResults[currentQuestion] === 1
                    ? "¡Muy bien! Estas aprendiendo mucho."
                    : "¡Inténtalo de nuevo! La opción seleccionada no es la correcta."}
                </p>
              </div>
            )}

            {showResults && (
              <div className="results-container_PSYN font-text_PSYN texto-gray_PSYN font-text_PSYN PSYN">
                <h2 className="text-size_PSYN font-bold mb-4 text-center PSYN">Resultados:</h2>
                <div className="score-details_PSYN PSYN">
                  {questionResults.map((result, index) => (
                    <p key={index} className="mb-2 texto-gray_PSYN PSYN">
                      El resultado de la pregunta {index + 1} es {' '}
                      <span className={result === 1 ? 'correct-score_PSYN' : 'incorrect-score_PSYN'}>
                        {result}/1 respuestas correctas
                      </span>
                    </p>
                  ))}
                </div>
                <div className="score-summary_PSYN mb-4 PSYN">
                  <p className="font-bold text-center PSYN">
                    Tus respuestas correctas son: {results.correct} de {results.total} ({results.percentage}%)
                  </p>
                </div>
                <div className="flex justify-center PSYN">
                  <Button
                    roundedFull="true"
                    icon={faRepeat}
                    variant="outline"
                    onClick={handleReset}
                  >
                    Reiniciar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreguntasSeleccioneSiNo