
import { useEffect } from "react"
import QuestionsComponent from "../../components/QuestionsComponent"
import useStore from "../../../store"
import "../Actividades_PESV/styles/PreguntasFactorHumano.css"


const IdentificaRolSoldadura = () => {
    const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)

    useEffect(() => {
        setIsOnDivisor(false)
    }, [setIsOnDivisor])

    const questions = [
        {
            question: "¿Quién es responsable de operar equipos de trabajo en caliente de manera segura y debe contar con autorización antes de iniciar sus labores?",
            options: [
                { text: "Operario de trabajos en caliente (soldador).", correct: true },
                { text: "Vigía de trabajos en caliente.", correct: false },
                { text: "Supervisor de trabajos en caliente.​", correct: false },
            ],
            multipleCorrect: false,
            correctCount: 1,
            requiredSelections: 1,
            correctFeedback: "¡Muy bien! Has identificado adecuadamente el rol correspondiente.​",
            incorrectFeedback: "¡Piénsalo bien! Revisa de nuevo e identifica a cuál de nuestros 3 roles corresponde correctamente.",
        },
        {
            question: "¿Quién debe asegurarse de que las operaciones de trabajo en caliente se realicen en condiciones seguras y tiene la autoridad para detenerlas si hay peligro?",
            options: [
                { text: "Supervisor de trabajos en caliente.​", correct: false },
                { text: "Vigía de trabajos en caliente.", correct: true },
                { text: "Operario de trabajos en caliente (soldador).", correct: false },
            ],
            multipleCorrect: false,
            correctCount: 1,
            requiredSelections: 1,
            correctFeedback: "¡Muy bien! Has identificado adecuadamente el rol correspondiente.​",
            incorrectFeedback: "¡Piénsalo bien! Revisa de nuevo e identifica a cuál de nuestros 3 roles corresponde correctamente.​",
        },
        {
            question: "¿Quién es responsable de la seguridad de los trabajadores, debe instruirlos en estándares de seguridad y puede detener operaciones de alto riesgo?",
            options: [
                { text: "Supervisor de trabajos en caliente.​", correct: true },
                { text: "Operario de trabajos en caliente (soldador).", correct: false },
                { text: "Vigía de trabajos en caliente.", correct: false },
            ],
            multipleCorrect: false,
            correctCount: 1,
            requiredSelections: 1,
            correctFeedback: "¡Muy bien! Has identificado adecuadamente el rol correspondiente.​",
            incorrectFeedback: "¡Piénsalo bien! Revisa de nuevo e identifica a cuál de nuestros 3 roles corresponde correctamente.​",
        }
    ]

    const handleComplete = (results) => {
        console.log("Actividad completada", results)
        // Aquí puedes manejar lo que sucede cuando se completa la actividad
    }

    return <QuestionsComponent questions={questions} onComplete={handleComplete} />
}

export default IdentificaRolSoldadura