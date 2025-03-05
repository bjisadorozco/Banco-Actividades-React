
import { useEffect } from "react"
import QuestionsComponent from "../../components/QuestionsComponent"
import useStore from "../../../store"
import "../Actividades_PESV/styles/PreguntasFactorHumano.css"


const IdentificarRiesgosBiologicos = () => {
    const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)

    useEffect(() => {
        setIsOnDivisor(false)
    }, [setIsOnDivisor])

    const questions = [
        {
            question: "¿Cuál es el objetivo principal de la inspección inicial del sitio de trabajo para evaluar riesgos biológicos?",
            options: [
                { text: "Identificar el entorno y refugios potenciales de animales peligrosos.", correct: true },
                { text: "Elaborar una lista de verificación específica para riesgos biológicos.", correct: false },
                { text: "Realizar tareas laborales de alto riesgo en zonas rurales.", correct: false },
            ],
            multipleCorrect: false,
            correctCount: 1,
            requiredSelections: 1,
            correctFeedback: "¡Muy bien! Has entendido muy bien la gestión de Riesgo Biológico.​",
            incorrectFeedback: "¡Piénsalo bien! Revisa de nuevo el video para revisar la identificación de riesgos biológicos.​",
        },
        {
            question: "¿Qué factor se considera en la lista de verificación para el riesgo biológico en una construcción?",
            options: [
                { text: "Supervisión de trabajadores en tareas de excavación.", correct: false },
                { text: "Presencia de agua estancada que pueda favorecer la proliferación de mosquitos.​", correct: true },
                { text: "Creación de una matriz de probabilidad y severidad.", correct: false },
            ],
            multipleCorrect: false,
            correctCount: 1,
            requiredSelections: 1,
            correctFeedback: "¡Muy bien! Has entendido muy bien la gestión de Riesgo Biológico.​",
            incorrectFeedback: "¡Piénsalo bien! Revisa de nuevo el video para revisar la identificación de riesgos biológicos.​",
        }
    ]

    const handleComplete = (results) => {
        console.log("Actividad completada", results)
        // Aquí puedes manejar lo que sucede cuando se completa la actividad
    }

    return <QuestionsComponent questions={questions} onComplete={handleComplete} />
}

export default IdentificarRiesgosBiologicos