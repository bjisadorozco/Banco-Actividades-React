import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
import useStore from "../../../store";
import '../../Actividades/Actividades_Trabajo_seguro_alturas/styles/Pregunta2alturas.css';

function Pregunta2alturas() {
    const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isValidated, setIsValidated] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    const question = {
        question: "¿Estás tomando el curso de?",
        options: [
            { text: "Trabajo seguro con EPP", correct: false },
            { text: "Trabajo seguro en Alturas", correct: true },
            { text: "Uso seguro de herramientas en obra", correct: false }
        ],
        correctFeedback: "¡Muy bien! Sigue así!",
        incorrectFeedback: "¡Piénsalo bien! Vuelve a intentarlo."
    };

    useEffect(() => {
        setIsOnDivisor(false);
    }, [setIsOnDivisor]);

    const handleAnswerSelect = (optionIndex) => {
        if (!isValidated) {
            setSelectedAnswers([optionIndex]);
            setShowErrorMessage(false);
            setShowFeedback(false);
        }
    };

    const handleValidate = () => {
        if (selectedAnswers.length > 0) {
            const isCorrect = question.options[selectedAnswers[0]].correct;
            setIsValidated(true);
            setShowErrorMessage(false);
            setShowFeedback(true);
        } else {
            setShowErrorMessage(true);
        }
    };

    const handleReset = () => {
        setSelectedAnswers([]);
        setIsValidated(false);
        setShowErrorMessage(false);
        setShowFeedback(false);
    };

    return (
        <div className="flex-col w-full max-w-4xl mx-auto">
            <div className="preguntas_seleccion">
                <div className="ctItem-7">
                    <Paragraph theme="light" justify="justify">
                        <strong>Pregunta:</strong> {question.question}
                    </Paragraph>
                    <div>
                        {question.options.map((option, index) => (
                            <p
                                key={index}
                                className={`${
                                    selectedAnswers.includes(index) ? 'act' : ''
                                } ${
                                    isValidated && selectedAnswers.includes(index)
                                        ? option.correct
                                            ? 'true'
                                            : 'false'
                                        : ''
                                }`}
                                onClick={() => handleAnswerSelect(index)}
                            >
                                {String.fromCharCode(97 + index)}. {option.text}
                            </p>
                        ))}
                    </div>
                    <div className="flex flex-col items-center">
                        {showErrorMessage && (
                            <h3 className="text-secondary-color font-bold mb-2">
                                Debes seleccionar una opción para continuar.
                            </h3>
                        )}
                        {!isValidated && (
                            <Button
                                bold={false}
                                icon={faCheck}
                                roundedFull={true}
                                onClick={handleValidate}
                                disabled={selectedAnswers.length === 0}
                            >
                                Validar
                            </Button>
                        )}
                        {isValidated && (
                            <Button
                                bold={false}
                                icon={faRepeat}
                                roundedFull={true}
                                onClick={handleReset}
                            >
                                Reiniciar
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {isValidated && question.options[selectedAnswers[0]].correct && (
                <div className="info-container">
                    <Paragraph theme="light" justify="justify">
                        <strong>Según la Resolución 4272 de 2021: </strong>
                        se considera trabajo en alturas toda actividad realizada a una distancia superior a 2 metros del plano de los pies del trabajador. Esto significa que cualquier labor que se ejecute a esta altura o mayor, 
                        <strong> SE CONSIDERA TRABAJO EN ALTURAS</strong>, y debe cumplir con las medidas de seguridad establecidas por la normativa vigente.
                    </Paragraph>
                </div>
            )}
            {showFeedback && (
                <div className="feedback">
                    <Paragraph theme="light" justify="justify">
                        <strong
                            style={{
                                color: question.options[selectedAnswers[0]].correct ? "#4CAF50" : "#F44336",
                            }}
                        >
                            {question.options[selectedAnswers[0]].correct ? "Correcto: " : "Incorrecto: "}
                        </strong>
                        {question.options[selectedAnswers[0]].correct
                            ? question.correctFeedback
                            : question.incorrectFeedback}
                    </Paragraph>
                </div>
            )}
        </div>
    );
}

export default Pregunta2alturas;

