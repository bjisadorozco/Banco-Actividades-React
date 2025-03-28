
import { useEffect } from "react"
import QuestionsComponent from "../../components/QuestionsComponent"
import useStore from "../../../store"
import "../Actividades_PESV/styles/PreguntasFactorHumano.css"

const PreguntasFactorHumano = () => {
    const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)

    useEffect(() => {
        setIsOnDivisor(false)
    }, [setIsOnDivisor])

    const questions = [
        {
            question: "Identifica los 3 elementos del FACTOR HUMANO que Pedro SI tuvo en cuenta:",
            options: [
                { text: "Uso de cinturón de seguridad", correct: true },
                { text: "Capacitación de los conductores", correct: true },
                { text: "Evitar consumo de alcohol y drogas", correct: true },
                { text: "Uso de casco de motocicleta", correct: false },
                { text: "Límites de velocidad y señales de tránsito", correct: false },
                { text: "Evitar uso de elementos distractores", correct: false },
            ],
            multipleCorrect: true,
            correctCount: 3,
            requiredSelections: 3,
            correctFeedback: "¡Muy bien! Reconoces los elementos del factor humano.",
            incorrectFeedback: "¡Piénsalo bien! Observa nuevamente el video e inténtalo de nuevo.",
        },
        {
            question: "Identifica los 2 elementos del FACTOR HUMANO que Pedro NO tuvo en cuenta:",
            options: [
                { text: "Uso de cinturón de seguridad", correct: false },
                { text: "Capacitación de los conductores", correct: false },
                { text: "Evitar consumo de alcohol y drogas", correct: false },
                { text: "Uso de casco de motocicleta", correct: false },
                { text: "Límites de velocidad y señales de tránsito", correct: true },
                { text: "Evitar uso de elementos distractores", correct: true },
            ],
            multipleCorrect: true,
            correctCount: 2,
            requiredSelections: 2,
            correctFeedback: "¡Muy bien! Reconoces los elementos del factor humano.",
            incorrectFeedback: "¡Piénsalo bien! Observa nuevamente el video e inténtalo de nuevo.",
        }
    ]

    const handleComplete = (results) => {
        console.log("Actividad completada", results)
        // Aquí puedes manejar lo que sucede cuando se completa la actividad
    }

    return <QuestionsComponent questions={questions} onComplete={handleComplete} />
}

export default PreguntasFactorHumano