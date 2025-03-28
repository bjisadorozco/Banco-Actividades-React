import { useEffect } from "react";
import QuestionsTrueFalse from "../../components/QuestionsTrueFalse";
import useStore from "../../../store";
import imgDefaultAvatar from "../../../assets/img/avatar_sonriente.webp";
import imgTrue from "../../../assets/img/true.jpg";
import imgFalse from "../../../assets/img/false.jpg";
// import "../Actividades_PESV/styles/PreguntasFactorEntornoTF.css";

const PreguntaCasoTF = () => {
    const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

    useEffect(() => {
        setIsOnDivisor(false);
    }, [setIsOnDivisor]);

    const questions = [
        {
            text: "En caso de mordedura de alacrán, se debe lavar la herida con agua y jabón para reducir el riesgo de infección.",
            correct: true,
            feedbackCorrect: "¡Muy bien! Lavar la herida es una medida básica de primeros auxilios para eliminar contaminantes y prevenir infecciones.​",
            feedbackIncorrect: "¡Piénsalo bien! Observa nuevamente el video y trata de contestar la pregunta nuevamente.​"
        },
        {
            text: "Es recomendable aplicar un torniquete para evitar que el veneno del alacrán se propague por el cuerpo.",
            correct: false,
            feedbackCorrect: "¡Muy bien! Aplicar un torniquete no es adecuado, ya que puede empeorar la situación al restringir el flujo sanguíneo y causar daño en los tejidos.​",
            feedbackIncorrect: "¡Piénsalo bien! Observa nuevamente el video y trata de contestar la pregunta nuevamente.​"
        }
    ];

    const handleComplete = (results) => {
        console.log("Actividad completada", results);
        // Aquí puedes manejar lo que sucede cuando se completa la actividad
    };

    return (
        <QuestionsTrueFalse
            questions={questions}
            defaultImage={imgDefaultAvatar}
            correctImage={imgTrue}
            incorrectImage={imgFalse}
            onComplete={handleComplete}
        />
    );
};

export default PreguntaCasoTF;