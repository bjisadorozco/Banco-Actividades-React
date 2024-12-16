import logoMorelco from "../assets/img/artes-morelco/logo_morelco.webp";
import background from '../assets/img/fondo1.png';
import { Clock, BookOpen, User, CheckSquare } from 'lucide-react';
import Button from './components/Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";

export default function Introduccion() {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const sections = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Duración del Curso",
      content: [
        { label: "Tiempo máximo estimado de duración virtual", value: "1 hora" },
        { label: "Tiempo asociado a su perfil de formación", value: "4 horas" }
      ]
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Objetivo del Curso",
      content: [
        { label: "Este curso le permitirá", value: "Desarrollar habilidades para identificar peligros, valorar riesgos y establecer controles eficaces en diferentes contextos laborales, promoviendo la seguridad y el bienestar en el entorno de trabajo." }
      ]
    },
    {
      icon: <CheckSquare className="w-8 h-8" />,
      title: "Usted podrá:",
      content: [
        { label: "1", value: "Aplicar metodologías para identificar peligros potenciales en actividades y procesos laborales, considerando factores físicos, químicos, biológicos, ergonómicos y psicosociales." },
        { label: "2", value: "Evaluar los riesgos asociados a los peligros identificados utilizando herramientas cualitativas y cuantitativas, priorizando aquellos con mayor impacto en la seguridad y salud ocupacional." },
        { label: "3", value: "Diseñar e implementar controles efectivos para minimizar o eliminar los riesgos, garantizando el cumplimiento de normativas legales y estándares internacionales de seguridad industrial." }
      ]
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Recomendaciones",
      content: [
        { label: "1", value: "Estar dispuesto a adquirir nuevos conocimientos y reforzar los existentes para asegurar tu seguridad durante las actividades a ejecutar." },
        { label: "2", value: "Disponer del tiempo mínimo estimado de duración para completar el curso." },
        { label: "3", value: "Contar con una conexión a internet estable." },
        { label: "4", value: "Realizar todas las actividades de refuerzo y repetirlas si es necesario." },
        { label: "5", value: "No olvides firmar tu compromiso y presentar la evaluación del curso." },
        { label: "6", value: "Si estás en un lugar abierto, usa audífonos solo en áreas permitidas; hay audios con información valiosa que no te querrás perder." },
        { label: "7", value: "Toma el curso en un lugar cómodo y seguro, donde esté autorizado el uso de dispositivos móviles o electrónicos, y no estés expuesto a ningún tipo de riesgo." }
      ]
    }
  ];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/slides");
  };

  return (
    <div className="mx-auto p-6 md:h-screen h-auto"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className={`relative mb-8 md:mb-14 flex ${isMobile ? 'flex-col items-center' : 'flex-col'}`}>
        <div style={{ justifyContent: isMobile ? 'center' : 'center', }} className={`absolute flex top-0 ${isMobile ? 'relative' : 'left-0'}`}>
          <img src={logoMorelco} className="w-60" alt="logo" />
        </div>

        {/* Título centrado */}
        <h1
          className="text-3xl font-bold text-white pt-2"
          style={{
            justifyContent: isMobile ? 'center' : 'center',
            alignItems: isMobile ? 'center' : 'center',
            textAlign: isMobile ? 'center' : 'center'
          }}
        >
          Información del Curso
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl hover:shadow-main-color/30 transition-shadow size-cuadros">
            <div className="p-4 bg-introduccion">
              <div className="flex items-center space-x-4">
                <div className="text-white font-bold bg-introduccion p-2 rounded-full">{section.icon}</div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
            </div>
            <div className="p-4">
              {section.content.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-2">
                  <span className="font-medium text-gray-700">{item.label}: </span>
                  {Array.isArray(item.value) ? (
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      {item.value.map((subItem, subIndex) => (
                        <li key={subIndex} className="text-gray-600">{subItem}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-600">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center items-center my-6'>
        <Button
          bold={false}
          icon={faArrowRight}
          roundedFull={true}
          onClick={handleClick}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
