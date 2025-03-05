import React from 'react';
import SortSteps from '../../components/SortSteps';
import "../Actividades_PESV/styles/OrdenarElementos.css"

const OrdenarMedidasCorrectivas = () => {
    const pasosCorrectos = [
        "Revisar la zona afectada y asegurarse de que no haya aguijón presente (las avispas no dejan aguijón).",
        "Mantener la calma y alejar al trabajador del lugar del incidente para evitar más picaduras.",
        "Lavar el área afectada con agua y jabón para reducir el riesgo de infección.",
        "Aplicar frío local (compresa fría o hielo envuelto en un paño) para disminuir el dolor y la inflamación.",
        "Monitorear al trabajador: Si presenta síntomas como dificultad para respirar, inflamación severa o mareos, activar el protocolo de emergencia y transportarlo al centro médico más cercano.​",
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
        },
        {
            id: 'paso-5',
            texto: pasosCorrectos[4]
        }
    ];

    return (
        <SortSteps
            steps={pasosDesordenados}
            correctOrder={pasosCorrectos}
            // title="Ordena los pasos para el uso seguro de guardas metálicas"
            feedbackCorrect="¡Muy bien! Has identificado correctamente el orden de las medidas correctivas que se debieron tener en cuenta.​​"
            feedbackPartial="Buen intento, pero revisa el orden de algunos elementos."
            feedbackIncorrect="¡Piénsalo bien! Aunque todas las medidas son correctas, el orden adecuado ayuda a manejar mejor la situación."
        />
    );
};

export default OrdenarMedidasCorrectivas;