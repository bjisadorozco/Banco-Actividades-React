import { useEffect } from "react";
import QuestionsTrueFalse from "../../components/QuestionsTrueFalse";
import useStore from "../../../store";
import imgDefaultAvatar from "../../../assets/img/avatar_sonriente.webp";
import imgTrue from "../../../assets/img/true.jpg";
import imgFalse from "../../../assets/img/false.jpg";
// import "../Actividades_PESV/styles/PreguntasFactorEntornoTF.css";

const PreguntasFactorEntornoTF = () => {
    const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

    useEffect(() => {
        setIsOnDivisor(false);
    }, [setIsOnDivisor]);

    const questions = [
        {
            text: "Infraestructura de Acceso: Mantenimiento y señalización adecuada para un tránsito seguro.",
            correct: true,
            // feedback: "Es fundamental contar con infraestructura bien mantenida y señalizada para garantizar un entorno seguro de tránsito."
        },
        {
            text: "Condiciones Climáticas y Ambientales: Preparación para condiciones extremas como lluvias, neblina y variaciones de temperatura.",
            correct: true,
            // feedback: "La preparación para diferentes condiciones climáticas es esencial para la seguridad vial."
        },
        {
            text: "Dispositivos de seguridad: Todos los vehículos y/o equipos propiedad de nuestra empresa o contratados deben tener alarma de retroceso.",
            correct: false,
            // feedback: "No todos los vehículos requieren alarma de retroceso, depende del tipo y uso del vehículo según normativa."
        },
        {
            text: "Control de Tráfico Interno: Respeto a los límites de velocidad y normas de tráfico dentro de las instalaciones.",
            correct: true,
            // feedback: "El control del tráfico interno es vital para prevenir accidentes en las instalaciones."
        },
        {
            text: "Interacción Segura con Equipos Móviles: Coordinación y comunicación clara con equipos pesados.",
            correct: true,
            // feedback: "La comunicación clara con operadores de equipos pesados previene situaciones de riesgo."
        },
        {
            text: "Uso del cinturón de seguridad: Todos los conductores, operadores y pasajeros deben usar el cinturón de seguridad.",
            correct: true,
            // feedback: "Esta afirmación corresponde al factor humano, no al factor entorno."
        },
        {
            text: "Planificación y Respuesta ante Emergencias: Protocolos de emergencia específicos.",
            correct: true,
            // feedback: "Contar con protocolos de emergencia es parte fundamental del control del entorno para la seguridad vial."
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

export default PreguntasFactorEntornoTF;