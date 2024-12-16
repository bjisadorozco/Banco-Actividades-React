import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useStore from "../../store";
import EstructuraTematica from '../../templates/EstructuraTematicaTemplate';
import CincuentaCincuenta from '../../templates/CincuentaCincuenta';
import DivisorMomentos from '../../templates/DivisorMomentosTemplate';
import TreintaSetentaTemplate from '../../templates/treintaSetentaTemplate';
import DivisonArribaAbajo from "../../templates/DivisonArribaAbajo"
import EvaluacionCursoTemplate from "../../templates/EvaluaconCursoTemplate";
import BienvenidosModulo from "../../pages/slides/BienvenidosModulo"
import { useNavigate } from 'react-router-dom';
/*
* El componente SlideNavigator es el encargado de mostrar las diapositivas y de permitir la navegación entre ellas.

* ASPECTOS CONFIGURABLES:
* - Arriba hay varios import. Se deben añadir tantos como sea necesario para importar las diapositivas que se desean mostrar.
* - Después de importar los componentes, se deben incluir en la lista slides, que es un arreglo de las diapositivas. Expandir la estructura actual en el arreglo "Slides" ubicado abajo.
* - Colores: Se pueden cambiar los colores de los botones de navegación, y de las barras de navegación. Todo esto se cambia desde el className.
*  Hay algunas clases "bg-main-color/80" o "text-main-color/50". Ese "/80" o "/50" es la opacidad del color, se puede cambiar a gusto.

* FUNCIONAMIENTO DEL COMPONENTE:
* Aquí se importan todas las slides que se van a renderizar en el proyecto. 
* Una parte de la lógica se encarga de determinar el número total de slides para mostrar en la barra de navegación,
* otra se encarga de manejar el estado de la slide actual y de permitir la navegación entre ellas. Adicionalmente,
* se definió lógica para manejar los eventos clic de los botones, desaparecer los botones de navegación cuando se llega al final o al principio de las slides,
* y actualizar el estado global de las diapositivas, para que otros componentes puedan saber en qué diapositiva se encuentra el usuario.
*/

function SlideNavigator() {
  const slides = [
    <CincuentaCincuenta key='CincuentaCincuenta' />, //slide 1
    <BienvenidosModulo key="BienvenidosModulo" />, //slide 2
    <EstructuraTematica key='EstructuraTematica' />,//slide 3
    <DivisorMomentos key="DivisorMomentos" />, //slide 4
    <TreintaSetentaTemplate key="treintaSetentaTemplate" />, //slide 5
    <DivisonArribaAbajo key="DivisonArribaAbajo" /> //slide 6
    // <EvaluacionCursoTemplate key="EvaluacionCursoTemplate" />,
  ];

  const setSlideIndex = useStore((state) => state.setSlideIndex);
  const slideIndex = useStore((state) => state.slideIndex);
  const setTotalSlides = useStore((state) => state.setTotalSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const setCurrentProgress = useStore((state) => state.setCurrentProgress);
  const isOnDivisor = useStore((state) => state.isOnDivisor);
  const navigate = useNavigate();
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);

    if (currentSlide === slides.length - 1) {
      null;
    } else {
      setSlideIndex(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
    if (currentSlide === 0) {
      null;
    } else {
      setSlideIndex(currentSlide - 1);
    }
  };

  // set progress from 0 to 100 based on currentSlide
  const setProgress = (currentSlide) => {
    const progress = (currentSlide / (slides.length - 1)) * 100;
    setCurrentProgress(parseInt(progress));
  };

  useEffect(() => {
    setCurrentSlide(slideIndex);
    setProgress(slideIndex);
  }, [slideIndex, setCurrentSlide]);

  useEffect(() => {
    setTotalSlides(slides.length);
  }, []);

  return (
    <div
      className="relative p-0 m-0"
    // style={{ height: "94vh", overflowX: "hidden" }}
    >
      {currentSlide === 0 ? null : (
        <div
          className="absolute  bottom-0 right-1/2 md:right-auto md:left-0 md:top-1/2 md:bottom-auto group md:h-fit transform -translate-y-1/2 z-10 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer"
          onClick={prevSlide}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="4x"
            className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
          />
        </div>
      )}
      <div className="flex justify-between w-full">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-full mx-1 my-0 hover:cursor-pointer ${currentSlide >= index ? "bg-secondary-color " : "bg-main-color/30"} `}
            onClick={() => {
              setCurrentSlide(index);
              setSlideIndex(index);
            }}
          ></div>
        ))}
      </div>
      {currentSlide === slides.length - 1 ? (
        <div
          className={`absolute bottom-0 left-1/2 md:right-0 md:top-1/2 md:bottom-auto md:left-auto group md:h-fit transform z-10 -translate-y-1/2 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer`}
          onClick={() => navigate('/evaluación')}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            size="4x"
            className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
          />
        </div>
      ) : (
        <div
          className={`absolute bottom-0 left-1/2 md:right-0 md:top-1/2 md:bottom-auto md:left-auto group md:h-fit transform z-10 -translate-y-1/2 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer`}
          onClick={nextSlide}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            size="4x"
            className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
          />
        </div>
      )}
      <div
        className="overflow-hidden p-0 m-0 w-screen hide-scrollbar"
      // style={{ height: "100vh" }}
      >
        {slides[currentSlide]}
      </div>
    </div>
  );
}

export default SlideNavigator;

