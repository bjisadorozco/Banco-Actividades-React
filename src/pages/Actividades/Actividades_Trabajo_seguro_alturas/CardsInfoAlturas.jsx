import  { useEffect, useRef } from "react";
import useStore from "../../../store";
// import Paragraph from "../../components/Paragraph";
// import Title from "../../components/Title";
// import Instruction from "../../components/Instruction";
import { useMediaQuery } from "react-responsive";
import imgDerrames from "../../../assets/img/adm_programa_prevencion.webp";
import imgConatoIncendios from "../../../assets/img/profesional_calificado.webp";
import imgReaccionNoDeseada from "../../../assets/img/coordinador_trabajo_alturas.webp";
import imgRobo from "../../../assets/img/ayudante_seguridad.webp";
import imgEmergenciaSalud from "../../../assets/img/trabajador_autorizado.webp";
// import audioDerrame from "../../assets/../audio/sld18_derrames.mp3";
// import audioConatoIncendio from "../../../assets/audio/sld18_conatos_incendio.mp3";
// import audioReaccionNoDeseada from "../../../assets/audio/slide_16_reacciones.mp3";
// import audioRobo from "../../../assets/audio/slide_16_robo.mp3";
// import audioEmergenciaSalud from "../../../assets/audio/sld18_emergencias_salud.mp3";
import '../../Actividades/Actividades_Trabajo_seguro_alturas/styles/CardsInfoAlturas.css';
import Paragraph from "../../components/Paragraph";

function CardsInfoAlturas() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  // const audioRefs = useRef([]);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  // Función para manejar la reproducción de audio
  // const handleAudioPlay = (index) => {
  //   // Detener todos los otros audios
  //   audioRefs.current.forEach((audio, idx) => {
  //     if (idx !== index && audio) {
  //       audio.pause();
  //       audio.currentTime = 0;
  //     }
  //   });
  // };

  const emergencyScenarios = [
    {
      title: "Administrador del programa de Prevención y Protección contra caídas",
      image: imgDerrames,
      // audio: audioDerrame,
      description: "1. Diseñar, administrar y asegurar el Programa de Prevención y Protección Contra Caídas, conforme con la definición establecida para ello.",
      gradient: "from-green-400 to-green-600"
    },
    {
      title: "Profesional calificado",
      image: imgConatoIncendios,
      // audio: audioConatoIncendio,
      description: "2. Calcular resistencia de materiales, diseñar, analizar, evaluar, autorizar puntos de anclaje y/o estructuras para protección contra caídas.",
      gradient: "from-lime-400 to-green-500"
    },
    {
      title: "Coordinador de trabajo en alturas",
      image: imgReaccionNoDeseada,
      // audio: audioReaccionNoDeseada,
      description: "3. Identificar peligros en el sitio en donde se realiza trabajo en alturas. Aplicar medidas correctivas inmediatas para controlar los riesgos asociados a dichos peligros.",
      gradient: "from-yellow-300 to-lime-400"
    },
    {
      title: "Ayudante de Seguridad",
      image: imgRobo,
      // audio: audioRobo,
      description: "4. Son los encargados de hacer cumplir que se mantengan las condiciones de seguridad en el sitio de trabajo para controlar el las áreas de riesgo de caída de objetos o personas.",
      gradient: "from-yellow-300 to-yellow-500"
    },
    {
      title: "Trabajador autorizado",
      image: imgEmergenciaSalud,
      // audio: audioEmergenciaSalud,
      description: "5. Realizar las actividades de trabajo en alturas encomendadas por el empleador y/o contratante, cumpliendo las medidas definidas.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="quiz-container-ee">
      

      <div className="cards-container-ee">
        {emergencyScenarios.map((scenario, index) => (
          <div className="quiz-card-ee" key={index}>
            <div className="card-inner-ee">
              <div className="card-front-ee">
                <div className={`card-image-ee bg-gradient-to-b ${scenario.gradient}`}>
                  <img src={scenario.image} alt={scenario.title} className="w-full h-full object-cover" style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}/>
                </div>
                <div className="card-content-ee">
                  <h2 className="card-title-ee">{scenario.title}</h2>
                </div>
              </div>
              <div className="card-back-ee">
                <div>
                  <Paragraph className="result-message-ee text-justify text-parag">{scenario.description}</Paragraph>
                  {/* <audio 
                    ref={el => audioRefs.current[index] = el}
                    controls 
                    className="mt-1 w-full"
                    onPlay={() => handleAudioPlay(index)}
                  >
                    <source src={scenario.audio} type="audio/mp3" />
                  </audio> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardsInfoAlturas;