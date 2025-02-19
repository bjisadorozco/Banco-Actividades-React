import { useState, useEffect } from "react"
import Instruction from "./Instruction"
import Button from "./Button"
import Paragraph from "./Paragraph"
import { faCheck, faRepeat, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useMediaQuery } from "react-responsive"
import "@fortawesome/fontawesome-free/css/all.min.css"
import imgTrue from "../../assets/img/checkAct.png"
import imgFalse from "../../assets/img/xmarkAct.png"
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

    useEffect(() => {
        setSelectedAnswers(new Array(questions.length).fill([]))
        setQuestionResults(new Array(questions.length).fill(null))
    }, [questions])

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
            let isCorrect
            if (currentQuestionData.multipleCorrect) {
                const correctOptions = currentQuestionData.options
                    .map((option, index) => (option.correct ? index : null))
                    .filter((index) => index !== null)
                isCorrect =
                    selectedAnswers[currentQuestion].length === currentQuestionData.correctCount &&
                    selectedAnswers[currentQuestion].every((answer) => correctOptions.includes(answer))
            } else {
                isCorrect = currentQuestionData.options[selectedAnswers[currentQuestion][0]].correct
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
            const finalResults = {
                correct: questionResults.filter((result) => result === 1).length,
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
    }

    return (
        <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
            <div className="md:flex-2 bg-white md:w-full w-full px-2 md:pr-20 flex justify-center items-center pb-2">
                <div className="w-full flex flex-col justify-center items-center">
                    {/* <Instruction theme="light" arrow="down">
                        Momento de evaluar lo aprendido, responde las siguientes preguntas
                    </Instruction> */}

                    {!showResults && (
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
                                    {showErrorMessage && (
                                        <h3 className="text-secondary-color font-bold mb-2">
                                            {questions[currentQuestion].multipleCorrect
                                                ? `Debes seleccionar ${questions[currentQuestion].requiredSelections || questions[currentQuestion].correctCount} opciones para continuar.`
                                                : "Debes seleccionar una opciÃ³n para continuar."}
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

                    {!showResults && showFeedback && (
                        <div className="feedback-container ctItem mt-4">
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
                        <div className="resultado-container w-full max-w-2xl">
                            <h2 className="text-2xl text-button-figma font-bold text-center text-primary mb-6">Resultados:</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Columna de respuestas correctas */}
                                {questionResults.some((result) => result === 1) && (
                                    <div
                                        className={`correct-answers result-styles ${!questionResults.some((result) => result === 0) ? "md:col-span-2 md:mx-auto md:max-w-md" : ""
                                            }`}
                                    >
                                        <h3 className="text-correct-feedback font-semibold mb-2 text-monserrat">
                                            Preguntas respondidas correctamente:
                                            <img src={imgTrue || ""} alt="Correcto" className="inline-block m-0 mx-1 w-5 h-5" />
                                        </h3>
                                        {questionResults.map(
                                            (result, index) =>
                                                result === 1 && (
                                                    <p key={index} className="text-[#8f8f8f] ml-4 text-monserrat">
                                                        Pregunta {index + 1}
                                                    </p>
                                                ),
                                        )}
                                    </div>
                                )}

                                {/* Columna de respuestas incorrectas */}
                                {questionResults.some((result) => result === 0) && (
                                    <div
                                        className={`incorrect-answers result-styles ${!questionResults.some((result) => result === 1) ? "md:col-span-2 md:mx-auto md:max-w-md" : ""
                                            }`}
                                    >
                                        <h3 className="text-incorrect-feedback font-semibold mb-2 text-monserrat">
                                            Preguntas respondidas incorrectamente:
                                            <img src={imgFalse || ""} alt="Incorrecto" className="inline-block m-0 mx-1 w-5 h-5" />
                                        </h3>
                                        {questionResults.map(
                                            (result, index) =>
                                                result === 0 && (
                                                    <p key={index} className="text-gray-600 ml-4 text-monserrat">
                                                        Pregunta {index + 1}
                                                    </p>
                                                ),
                                        )}
                                    </div>
                                )}
                            </div>

                            <p className="text-response-figma font-bold text-center text-lg mb-6 text-monserrat">
                                Tus respuestas correctas son: {results.correct} de {results.total} (
                                {((results.correct / results.total) * 100).toFixed(0)}%)
                            </p>

                            <div className="flex justify-center">
                                <Button bold={false} icon={faRepeat} roundedFull={true} onClick={handleReset}>
                                    Reiniciar
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