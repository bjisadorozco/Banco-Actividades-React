import { useEffect } from "react";
import QuestionsTrueFalse from "../../components/QuestionsTrueFalse";
import useStore from "../../../store";
import imgDefaultAvatar from "../../../assets/img/avatar_sonriente.webp";
import imgTrue from "../../../assets/img/true.jpg";
import imgFalse from "../../../assets/img/false.jpg";
// import "../Actividades_PESV/styles/PreguntasFactorEntornoTF.css";

const Sliderppt25_preguntasTF = () => {
    const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

    useEffect(() => {
        setIsOnDivisor(false);
    }, [setIsOnDivisor]);

    const questions = [
        {
            text: "El uso de un arnés de cuerpo completo es opcional al trabajar en andamios con riesgo de caída.",
            correct: false,
             feedback: "El arnés de cuerpo completo es fundamental en situaciones donde existe riesgo de caída, ya que protege al trabajador al estar conectado a un sistema de anclaje seguro. Esto es obligatorio en áreas de difícil acceso o con posibilidad de caídas."
        },
        {
            text: "Las inspecciones visuales de rutina deben realizarse únicamente una vez a la semana.",
            correct: false,
             feedback: " Las inspecciones visuales de rutina deben realizarse diariamente o antes de cada uso del andamio para garantizar que cualquier defecto, daño o peligro sea detectado y corregido oportunamente, reduciendo así el riesgo de accidentes."
        },
        {
            text: "El desgaste, la oxidación y las piezas flojas son aspectos a buscar durante las inspecciones visuales de rutina.",
            correct: true,
            feedback: "Durante las inspecciones visuales de rutina es esencial buscar signos de desgaste, oxidación, deformaciones o piezas flojas, ya que estos defectos pueden comprometer la seguridad y la estabilidad del equipo."
        },
        {
            text: "Las pruebas de carga deben realizarse sin supervisión y sin respetar los límites recomendados por el fabricante.",
            correct: false,
            feedback: " Las pruebas de carga deben realizarse siempre bajo supervisión calificada y respetando los límites de carga recomendados por el fabricante para garantizar la estabilidad y la seguridad del andamio, evitando el riesgo de colapso."
        },
        {
            text: "El mantenimiento preventivo incluye acciones como lubricar tornillos de nivelación y reemplazar piezas dañadas.",
            correct: true,
            feedback: "El mantenimiento preventivo tiene como objetivo prolongar la vida útil del equipo y garantizar su funcionalidad, realizando actividades como lubricar piezas móviles, sustituir componentes dañados o corroídos y realizar ajustes necesarios."
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

export default Sliderppt25_preguntasTF;