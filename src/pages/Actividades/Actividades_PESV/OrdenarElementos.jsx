import React from 'react';
import SortSteps from '../../components/SortSteps';
import "../Actividades_PESV/styles/OrdenarElementos.css"

const OrdenarElementos = () => {
    const pasosCorrectos = [
        "Diagnóstico y análisis.",
        "Diseño del PESV.",
        "Implementación del PESV.",
        "Monitoreo y evaluación del PESV.",
    ];

    const pasosDesordenados = [
        {
            id: 'paso-3',
            texto: pasosCorrectos[2]
        },
        {
            id: 'paso-1',
            texto: pasosCorrectos[0]
        },
        {
            id: 'paso-4',
            texto: pasosCorrectos[3]
        },
        {
            id: 'paso-2',
            texto: pasosCorrectos[1]
        }
    ];

    return (
        <SortSteps
            steps={pasosDesordenados}
            correctOrder={pasosCorrectos}
            // title="Ordena los pasos para el uso seguro de guardas metálicas"
            feedbackCorrect="¡Muy bien! Has ayudado a Antonio a organizar las 4 etapas de implementación del PESV.​"
            feedbackPartial="Buen intento, pero revisa el orden de algunos elementos."
            feedbackIncorrect="¡Piénsalo bien! Observa nuevamente el video y ordena correctamente las 4 etapas de implementación del PESV en las empresas."
        />
    );
};

export default OrdenarElementos;