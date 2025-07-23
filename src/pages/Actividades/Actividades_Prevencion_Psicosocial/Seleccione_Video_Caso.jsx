"use client"

import { useState } from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"
import Button from "../../components/Button"
import Paragraph from "../../components/Paragraph"
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons"
import { useMediaQuery } from "react-responsive"
import "./styles/Seleccione_Video_Caso.css"

function Seleccione_Video_Caso() {
    const isMobile = useMediaQuery({ maxWidth: 640 })
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [isValidated, setIsValidated] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [showFeedback, setShowFeedback] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)

    const question = {
        question: "Selecciona el factor de riesgo psicosocial:",
        options: [
            { text: "En el ambiente de Trabajo.", correct: false },
            { text: "Jornadas Laborales Extensas.", correct: false },
            { text: "Violencia laboral.", correct: false },
            { text: "Liderazgo negativo.", correct: true },
        ],
        correctFeedback: "Muy bien! Has identificado el factor de riesgo que se relaciona con este caso",
        incorrectFeedback: "Piénsalo bien! El factor de riesgo no ha sido identificado correctamente.",
    }

    const handleAnswerSelect = (optionIndex) => {
        if (!isValidated) {
            setSelectedAnswer(optionIndex)
            setShowErrorMessage(false)
            setShowFeedback(false)
        }
    }

    const handleValidate = () => {
        if (selectedAnswer !== null) {
            const isCorrectAnswer = question.options[selectedAnswer].correct
            setIsCorrect(isCorrectAnswer)
            setIsValidated(true)
            setShowErrorMessage(false)
            setShowFeedback(true)
        } else {
            setShowErrorMessage(true)
        }
    }

    const handleReset = () => {
        setSelectedAnswer(null)
        setIsValidated(false)
        setShowErrorMessage(false)
        setShowFeedback(false)
        setIsCorrect(false)
    }

    return (
        <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0 SVC">
            <div className="md:flex-2 bg-white md:w-full w-full px-2 flex justify-center items-center pb-2 SVC">
                <div className="w-full flex flex-col justify-center items-center SVC">
                    <div className="SVC-content">
                        <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
                            <strong>{question.question}</strong>
                        </Paragraph>
                        <div>
                            {question.options.map((option, index) => (
                                <p
                                    key={index}
                                    className={`
                    ${selectedAnswer === index ? "act_SVC" : ""}
                    ${isValidated && selectedAnswer === index ? (option.correct ? "true_SVC" : "false_SVC") : ""}
                    ${isValidated ? "disabled_SVC" : ""}
                  `}
                                    onClick={() => handleAnswerSelect(index)}
                                >
                                    {String.fromCharCode(97 + index)}. {option.text}
                                </p>
                            ))}
                        </div>
                        <div className="flex flex-col items-center SVC">
                            {showErrorMessage && (
                                <p className="mb-4 SVC text-center_SM" style={{ backgroundColor: "#fcfcfc" }}>
                                    Por favor selecciona una opción.
                                </p>
                            )}
                            {isValidated && (
                                <span theme="light" justify={isMobile ? "justify" : "justify"}>
                                    <span className="margin-size_SVC text-monserrat_SVC text-center_SM" style={{ color: "#8f8f8f", fontWeight: "bold" }}>
                                        {isCorrect ? "Respuesta correcta (100%)" : "Respuesta incorrecta (0%)"}
                                    </span>
                                </span>
                            )}
                            <Button
                                bold={false}
                                icon={isValidated ? faRepeat : faCheck}
                                roundedFull={true}
                                onClick={isValidated ? handleReset : handleValidate}
                                disabled={selectedAnswer === null}
                                style={{
                                    opacity: selectedAnswer !== null ? 1 : 0.4,
                                    backgroundColor: selectedAnswer !== null ? "#4CAF50" : "#ccc",
                                }}
                            >
                                {isValidated ? "Reiniciar" : "Validar"}
                            </Button>
                        </div>
                    </div>

                    {showFeedback && (
                        <div className="feedback_SVC">
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

export default Seleccione_Video_Caso