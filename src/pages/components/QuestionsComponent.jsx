import { useState, useEffect } from "react"
import Instruction from "./Instruction"
import Button from "./Button"
import Paragraph from "./Paragraph"
import { faCheck, faRepeat, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useMediaQuery } from "react-responsive"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "../components/styles/QuestionsComponent.css"

const QuestionsComponent = ({ questions, onComplete }) => {
    const isMobile = useMediaQuery({ maxWidth: 640 })
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [results, setResults] = useState({ correct: 0, total: questions.length })
    const [questionResults, setQuestionResults] = useState([])
    const [isValidated, setIsValidated] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [showFeedback, setShowFeedback] = useState(false)
    const [remainingSelections, setRemainingSelections] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)

    const baseTextStyle = {
        fontFamily: "Montserrat, sans-serif"
    }

    useEffect(() => {
        setSelectedAnswers(new Array(questions.length).fill([]))
        setQuestionResults(new Array(questions.length).fill(null))
    }, [questions])

    useEffect(() => {
        const currentQuestionData = questions[currentQuestion]
        const requiredSelections = currentQuestionData.requiredSelections || currentQuestionData.correctCount
        const selectedCount = selectedAnswers[currentQuestion]?.length || 0
        setRemainingSelections(requiredSelections - selectedCount)
    }, [selectedAnswers, currentQuestion, questions])

    const handleAnswerSelect = (optionIndex) => {
        if (!isValidated) {
            setSelectedAnswers((prev) => {
                const newAnswers = [...prev]
                const currentQuestionData = questions[currentQuestion]
                if (currentQuestionData.multipleCorrect) {
                    if (!newAnswers[currentQuestion]) {
                        newAnswers[currentQuestion] = []
                    }
                    if (newAnswers[currentQuestion].includes(optionIndex)) {
                        newAnswers[currentQuestion] = newAnswers[currentQuestion].filter((i) => i !== optionIndex)
                    } else if (
                        newAnswers[currentQuestion].length <
                        (currentQuestionData.requiredSelections || currentQuestionData.correctCount)
                    ) {
                        newAnswers[currentQuestion] = [...newAnswers[currentQuestion], optionIndex]
                    }
                } else {
                    newAnswers[currentQuestion] = [optionIndex]
                }
                return newAnswers
            })
            setShowErrorMessage(false)
            setShowFeedback(false)
        }
    }

    const handleValidate = () => {
        const currentQuestionData = questions[currentQuestion]
        const requiredSelections = currentQuestionData.requiredSelections || currentQuestionData.correctCount

        if (selectedAnswers[currentQuestion]?.length === requiredSelections) {
            let correctSelected = 0
            const correctOptions = currentQuestionData.options
                .map((option, index) => (option.correct ? index : null))
                .filter((index) => index !== null)

            // Contar cuántas respuestas correctas fueron seleccionadas
            correctSelected = selectedAnswers[currentQuestion].filter((answer) => 
                correctOptions.includes(answer)
            ).length
            
            setCorrectCount(correctSelected)
            
            // La pregunta es correcta solo si se seleccionaron TODAS las respuestas correctas necesarias
            const isFullyCorrect = correctSelected === currentQuestionData.correctCount
            
            setQuestionResults((prev) => {
                const newResults = [...prev]
                newResults[currentQuestion] = {
                    isCorrect: isFullyCorrect,
                    correctSelected: correctSelected,
                    totalCorrect: currentQuestionData.correctCount
                }
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
            setCorrectCount(0)
        } else {
            const finalResults = {
                correct: questionResults.filter((result) => result.isCorrect).length,
                total: questions.length,
            }
            setResults(finalResults)
            setShowResults(true)
            if (onComplete) {
                onComplete(finalResults)
            }
        }
    }

    const handleReset = () => {
        setCurrentQuestion(0)
        setSelectedAnswers(new Array(questions.length).fill([]))
        setShowResults(false)
        setIsValidated(false)
        setQuestionResults(new Array(questions.length).fill(null))
        setShowErrorMessage(false)
        setShowFeedback(false)
        setCorrectCount(0)
    }

    return (
        <div className="flex flex-col custom-margin md:flex-row overflow-x-hidden mb-36 md:mb-0">
            <div className="md:flex-2 md:w-full w-full px-2 flex justify-center items-center pb-2">
                <div className="w-full flex flex-col justify-center items-center">
                    {!showResults && (
                        <div className="preguntas_01">
                            <div className="ctItem-7">
                                <Paragraph theme="light" justify={isMobile ? "justify" : "justify"} style={baseTextStyle}>
                                    <strong>Pregunta {currentQuestion + 1}: </strong>
                                    {questions[currentQuestion].question}
                                </Paragraph>
                                <div>
                                    {questions[currentQuestion].options.map((option, index) => (
                                        <p
                                            key={index}
                                            style={baseTextStyle}
                                            className={`
                                                ${selectedAnswers[currentQuestion]?.includes(index) ? "act" : ""}
                                                ${isValidated && selectedAnswers[currentQuestion]?.includes(index)
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
                                    {!isValidated && selectedAnswers[currentQuestion]?.length > 0 && (
                                        <p className="mb-4" style={{ backgroundColor: "#fcfcfc", ...baseTextStyle }}>
                                            Te faltan <strong>{remainingSelections}</strong> opciones por seleccionar.
                                        </p>
                                    )}
                                    {isValidated && questions[currentQuestion].multipleCorrect && (
                                        <span theme="light" justify={isMobile ? "justify" : "justify"}>
                                            <span className="margin-size text-monserrat" style={{ color: "#8f8f8f", fontWeight: "bold", ...baseTextStyle }}>
                                                Respuestas correctas: {correctCount}/{questions[currentQuestion].correctCount}
                                            </span>
                                        </span>
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

                    {!showResults && showFeedback && (
                        <div className="feedback-container ctItem mt-4">
                            <Paragraph theme="light" justify={isMobile ? "justify" : "center"} style={baseTextStyle}>
                                <strong
                                    style={{
                                        color: questionResults[currentQuestion]?.isCorrect ? "#4CAF50" : "#F44336",
                                        ...baseTextStyle
                                    }}
                                >
                                    {questionResults[currentQuestion]?.isCorrect ? "Correcto: " : "Incorrecto: "}
                                </strong>
                                {questionResults[currentQuestion]?.isCorrect
                                    ? questions[currentQuestion].correctFeedback
                                    : questions[currentQuestion].incorrectFeedback}
                            </Paragraph>
                        </div>
                    )}

                    {showResults && (
                        <div className="resultado-container w-full max-w-2xl p-4">
                            <h2 className="text-paragraph-size font-bold text-center text-button-figma mb-4" style={baseTextStyle}>
                                Resultados:
                            </h2>

                            <div className="space-y-4 mb-4">
                                {questionResults.map((result, index) => (
                                    <div key={index} className="text-center">
                                        <p className="text-response-figma" style={baseTextStyle}>
                                            El resultado de la pregunta {index + 1} es{" "}
                                            <span className={result.isCorrect ? "text-correct-feedback" : "text-incorrect-feedback"}>
                                                {result.correctSelected}/{result.totalCorrect} respuestas correctas
                                            </span>
                                        </p>
                                    </div>
                                ))}

                                <p className="text-center text-response-figma font-semibold mt-4" style={baseTextStyle}>
                                    Preguntas completamente correctas: {results.correct} de {results.total} (
                                    {Math.round((results.correct / results.total) * 100)}%)
                                </p>
                            </div>

                            <div className="flex justify-center mt-6">
                                <Button
                                    bold={false}
                                    icon={faRepeat}
                                    roundedFull={true}
                                    onClick={handleReset}
                                    className="bg-button-figma text-white"
                                >
                                    Reiniciar Actividad
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default QuestionsComponent