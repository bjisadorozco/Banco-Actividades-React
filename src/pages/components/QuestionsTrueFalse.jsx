import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faTimes,
    faArrowRight,
    faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import "../components/styles/QuestionsTrueFalse.css";

const QuestionsTrueFalse = ({
    questions,
    defaultImage,
    correctImage,
    incorrectImage,
    onComplete
}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [answerSelected, setAnswerSelected] = useState(null);

    const handleAnswer = (userAnswer) => {
        const isCorrect = userAnswer === questions[currentQuestion].correct;
        setAnswerSelected(isCorrect);

        if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
        }
        setShowFeedback(true);
    };

    const handleNext = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setAnswerSelected(null);
            setShowFeedback(false);
        } else {
            setShowScore(true);
            setShowFeedback(false);
            if (onComplete) {
                onComplete({
                    correct: score + (answerSelected ? 1 : 0),
                    total: questions.length
                });
            }
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setAnswerSelected(null);
        setShowFeedback(false);
    };

    // Calcular el porcentaje de respuestas correctas
    const percentage = Math.round((score / questions.length) * 100);

    // Obtener la imagen actual (puede ser específica para la pregunta o la predeterminada)
    const currentQuestionImage = questions[currentQuestion]?.image || defaultImage;

    return (
        <div className="container">
            <div className="w-full flex justify-center items-center p-2">
                <div
                    className="max-w-md w-full bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden"
                    style={{ margin: "0 auto", minWidth: "90vw" }}
                >
                    <div className="bg-button-figma text-white text-center py-2 text-xl">
                        <span className="inc">{currentQuestion + 1}</span>/
                        <span className="tol">{questions.length}</span>
                    </div>
                    {showScore ? (
                        <div className="text-center p-4">
                            <p className="font-bold text-response-figma">
                                Tus respuestas correctas son: {score} de {questions.length} ({percentage}%)
                            </p>
                            <p className="my-2 text-response-figma font-bold">
                                ¡Gracias por participar!
                            </p>
                            <div className="reset-container mt-4">
                                <Button
                                    roundedFull={true}
                                    icon={faRepeat}
                                    onClick={resetQuiz}
                                    className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white mx-auto my-3"
                                > Reiniciar
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="itemQ view p-4">
                                <div className="mb-3" style={{ minHeight: "1.3rem" }}>
                                    <p className="text-response-figma">
                                        {questions[currentQuestion].text}
                                    </p>
                                </div>
                                <div className="relative flex justify-center mb-4">
                                    <div className="w-32 h-32 relative">
                                        {answerSelected !== null ? (
                                            <img
                                                src={answerSelected ? correctImage : incorrectImage}
                                                alt={answerSelected ? "Correct" : "Incorrect"}
                                                className="w-full h-full object-contain rounded-lg"
                                            />
                                        ) : (
                                            <img
                                                src={currentQuestionImage}
                                                alt="Pregunta"
                                                className="w-full h-full object-contain"
                                            />
                                        )}
                                    </div>
                                </div>
                                <hr
                                    className="my-4"
                                    style={{
                                        width: "100%",
                                        border: "1px solid #102044",
                                    }}
                                />
                                <div className="text-center mt-4">
                                    <p
                                        className={`font-bold ${answerSelected === null
                                            ? "opacity-0"
                                            : answerSelected
                                                ? "text-correct-feedback"
                                                : "text-incorrect-feedback"
                                            }`}
                                    >
                                        {answerSelected === null
                                            ? " "
                                            : answerSelected
                                                ? "Correcto ¡Bien hecho!"
                                                : "Incorrecto ¡Piénsalo bien!"
                                        }
                                    </p>
                                </div>
                                {showFeedback && (
                                    <div className="feedback-container p-3 bg-gray-200 rounded-lg mb-4">
                                        <p className="text-response-figma">
                                            {answerSelected
                                                ? (questions[currentQuestion].feedbackCorrect || "")
                                                : (questions[currentQuestion].feedbackIncorrect || "")
                                            }
                                        </p>
                                    </div>
                                )}
                                <div className="check flex justify-center space-x-4">
                                    {!showFeedback && (
                                        <div className="check flex flex-button justify-center space-x-4">
                                            <Button
                                                className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white"
                                                onClick={() => handleAnswer(true)}
                                                disabled={answerSelected !== null}
                                                roundedFull={true}
                                                icon={faCheck}
                                            >
                                                Verdadero
                                            </Button>

                                            <Button
                                                icon={faTimes}
                                                roundedFull={true}
                                                className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white m-0"
                                                onClick={() => handleAnswer(false)}
                                                disabled={answerSelected !== null}
                                            >
                                                Falso
                                            </Button>
                                        </div>
                                    )}
                                    {showFeedback && (
                                        <div className="flex justify-center md:w-[100%] w-[50%]  mt-4">
                                            <Button
                                                bold={true}
                                                icon={faArrowRight}
                                                roundedFull={true}
                                                onClick={handleNext}
                                                className="bg-main-color"
                                            >
                                                {currentQuestion === questions.length - 1
                                                    ? "Finalizar"
                                                    : "Siguiente"}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionsTrueFalse;