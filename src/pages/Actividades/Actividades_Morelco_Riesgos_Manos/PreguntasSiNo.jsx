"use client"

import { useState } from "react"
import Button from "../../components/Button";
import { faCheck, faRepeat, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMediaQuery } from "react-responsive"
import "./styles/PreguntasSiNo.css"

import mano1 from "../../../assets/img/pieza_1_espacios_confinados.webp"
import mano2 from "../../../assets/img/pieza_2_espacios_confinados.webp"
import mano3 from "../../../assets/img/pieza_3_espacios_confinados.webp"
import imgcompleta from "../../../assets/img/este_es_un_espacio_confinado_sldM1.webp"
import xmarkIcon from "../../../assets/img/xmarkAct.png"
import checkIcon from "../../../assets/img/checkAct.png"

function PreguntasSiNo() {
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
      question: "¿Este espacio está diseñado para la ocupación continua de una persona?",
      options: [
        { text: "Si", correct: false },
        { text: "No", correct: true },
      ],
      image: mano1,
    },
    {
      question: "¿Tiene medios de entrada y salida restringidos o de difícil acceso?",
      options: [
        { text: "Si", correct: true },
        { text: "No", correct: false },
      ],
      image: mano2,
    },
    {
      question: "¿Presenta o puede presentar encerramiento o atmósferas peligrosas?",
      options: [
        { text: "Si", correct: true },
        { text: "No", correct: false },
      ],
      image: mano3,
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

  const allCorrect = results.correct === results.total;
  const allIncorrect = results.correct === 0;

  return (
    <div className="flex flex-col mb-36 md:mb-0">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sección de imágenes - Izquierda */}
        <div className="md:flex-1 md:w-1/2 w-full">
          <div
            className={`image-container ${showResults ? (results.correct === results.total ? "success" : "error") : ""}`}
          >
            {!showResults && questionResults.length === 0 ? (
              <p className="discover-text font-text">Descubre la imagen</p>
            ) : showResults && results.correct === results.total ? (
              <div className="full-image-container">
                <img
                  src={imgcompleta}
                  alt="Imagen completa"
                  className="full-image"
                />
                <img
                  src={checkIcon}
                  alt="Correcto"
                  className="check-icon-center"
                />
              </div>    
            ) : (
              <div className="image-sections">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="image-section">
                    {questionResults[index] !== undefined &&
                      (questionResults[index] === 1 ? (
                        <>
                          <img
                            src={questions[index].image || "/placeholder.svg"}
                            alt={`Imagen ${index + 1}`}
                            className="section-image"
                          />
                          <img
                            src={checkIcon || "/placeholder.svg"}
                            alt="Correcto"
                            className="check-icon"
                          />
                        </>
                      ) : (
                        <div className="error-section">
      <img src={xmarkIcon || "/placeholder.svg"} alt="Incorrecto" className="error-icon" />
      <p className="error-text">No seleccionaste bien la pregunta, no puedes ver la imagen.</p>
    </div>
                      ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sección de preguntas y resultados - Derecha */}
        <div className="md:flex-1 bg-white md:w-1/2 w-full px-2 flex justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center">
            {showQuestions && !showResults && (
              <div className="preguntas_SN">
                <div className="ctItem-SN">
                  <p className="mb-4 text-zise texto-gray font-text">
                    <strong>Pregunta {currentQuestion + 1}: </strong>
                    {questions[currentQuestion].question}
                  </p>
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

                  <div className="flex flex-col items-center mt-4">
                    {showErrorMessage && (
                      <span className="texto-gray text-monserrat font-bold mb-2">Debes seleccionar una opción para continuar.</span>
                    )}
                    
                      {isValidated ? (
                        <>
                          <Button
                      roundedFull="true"
                      icon={faArrowRight}
                      variant="outline"
                      onClick={isValidated ? handleNext : handleValidate}
                      disabled={selectedAnswers[currentQuestion]?.length === 0}
                    >Siguiente

                      </Button>
                        </>
                      ) : (
                        <>
                         <Button
                      roundedFull="true"
                      icon={faCheck}
                      variant="outline"
                      onClick={isValidated ? handleNext : handleValidate}
                      disabled={selectedAnswers[currentQuestion]?.length === 0}
                    >Validar
                      </Button> 
                        </>
                      )}
                  </div>
                </div>
              </div>
            )}

            {showResults && (
              <div className="results-container font-text texto-gray font-text">
                <h2 className="text-size font-bold mb-4 text-center">Resultados:</h2>
                <div className={`separation-result ${allCorrect || allIncorrect ? "full-width" : ""}`}>
                  {(allCorrect || !allIncorrect) && (
                    <div className={`correct-answers ${allCorrect ? "full-width" : ""}`}>
                      <h3 className="preguntas_true font-bold flex items-center">
                        Preguntas respondidas correctamente:
                        <img className="w-6 m-0 ml-1" src={checkIcon || "/placeholder.svg"} />
                      </h3>
                      <ul className="ml-4">
                        {questionResults.map(
                          (result, index) => result === 1 && <li key={index}>Pregunta {index + 1}</li>,
                        )}
                      </ul>
                    </div>
                  )}
                  {(allIncorrect || !allCorrect) && (
                    <div className={`incorrect-answers ${allIncorrect ? "full-width" : ""}`}>
                      <h3 className="preguntas_false font-bold flex items-center">
                        Preguntas respondidas incorrectamente:
                        <img className="w-6 m-0 ml-1" src={xmarkIcon || "/placeholder.svg"} />
                      </h3>
                      <ul className="ml-4">
                        {questionResults.map(
                          (result, index) => result === 0 && <li key={index}>Pregunta {index + 1}</li>,
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="score-summary mb-4">
                  <p className="font-bold text-center">
                    Tus respuestas correctas son: {results.correct} de {results.total} ({results.percentage}%)
                  </p>
                </div>
                <div className="flex justify-center">
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
      {/* Nueva sección para la validación */}
      {showResults && (
        <div className="mt-8 text-center container-feedbackPSN font-text">
          <p
            className="mb-4 font-bold text-size"
            style={{
              color: results.correct === results.total ? "#4caf50" : results.correct === 0 ? "#f44336" : "#fb923c",
            }}
          >
            {results.correct === results.total ? (
              <>
                <span style={{ color: "#4caf50" }}>¡Muy bien!</span>
                <span className="texto-gray font-text font-normal">
                  ¡¡Has contestado correctamente las 3 preguntas clave, SI ES UN ESPACIO CONFINADO!!
                </span>
              </>
            ) : (
              <>
                <span
                  style={{
                    color: results.correct === 0 ? "#f44336" : "#fb923c",
                  }}
                >
                  ¡Piénsalo bien!
                </span>{" "}
                <span className="texto-gray font-normal">
                  Deben cumplirse estas 3 condiciones para que se trate de un ESPACIO CONFINADO
                </span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  )
}

export default PreguntasSiNo