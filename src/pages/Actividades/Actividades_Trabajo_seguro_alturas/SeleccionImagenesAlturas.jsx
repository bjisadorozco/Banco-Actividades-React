import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
// import Instruction from "../../components/Instruction";
import { useMediaQuery } from "react-responsive";
// import imgIngenieroHerramientas from '../../assets/img/ingenieroMorelcoHerramientas.webp';
import martillo from '../../../assets/img/trabajos_techos.webp';
import cintaMetrica from '../../../assets/img/trabajos_paredes_fachadas.webp';
import destornillador from '../../../assets/img/trabajos_montajes_estructura.webp';
import taladro from '../../../assets/img/trabajos_andamios.webp';
import sierraElectrica from '../../../assets/img/instalacion_pisos.webp';
import mezcladoraCemento from '../../../assets/img/instalacion_electrica.webp';
import '../../Actividades/Actividades_Trabajo_seguro_alturas/styles/SeleccionImagenesAlturas.css';
import imgVerdadero from '../../../assets/img/checkAct.png';
import imgFalso from '../../../assets/img/xmarkAct.png';
import { faRepeat } from "@fortawesome/free-solid-svg-icons";

import ModalDialog from '../../components/ModalDialog';
import Button from '../../components/Button';


function SeleccionImagenesAlturas() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [results, setResults] = useState({});
  const [explanation, setExplanation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const correctImages = [martillo, cintaMetrica, destornillador,taladro];

  const explanationsMap = {
    [martillo]: 'Tabajos de montajes de estructuras:   Bien!  Estos normalmente se hacen a más de 2 mts de altura.',
    [cintaMetrica]: 'Trabajos en techos y cubiertas:   Bien!  Estos siempre se hacen a más de 2 mts de altura',
    [destornillador]: 'Trabajos en paredes y fachadas:   Bien !  Estos normalmente se hacen a más de 2 mts de altura',
    [taladro]: 'Trabajos en andamios:   Bien !  Estos normalmente permiten acceder a alturas superiores a 2 mts',
    [sierraElectrica]: 'Instalación electrica de piso:   Piénsalo bien!  Este tipo de tareas normalmente NO se hacen a más de 2 metros de altura.',
    [mezcladoraCemento]: 'Instalación de pisos:   Piénsalo bien!  Este tipo de tareas normalmente NO se hacen a más de 2 metros de altura.',
  };

  const actSelectImg = (image) => {
    const isSelected = selectedImages.includes(image);
    let newSelectedImages = [...selectedImages];

    if (isSelected) {
      newSelectedImages = newSelectedImages.filter(img => img !== image);
      setExplanation(null);
    } else if (newSelectedImages.length < 6) {
      newSelectedImages.push(image);
      setExplanation({ image, isCorrect: correctImages.includes(image) });
    }

    setSelectedImages(newSelectedImages);

    const isCorrect = correctImages.includes(image);
    setResults(prevResults => ({
      ...prevResults,
      [image]: isSelected ? undefined : isCorrect
    }));
  };

  const resetActivity = () => {
    setResults({});
    setSelectedImages([]);
    setExplanation(null);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center">
       

        {/* Columna derecha */}
        <div className="flex flex-col md:flex-row ">
            <div className="md:flex-2  md:w-full w-full px-2 flex justify-center items-center pb-2">
                <div className="w-full flex flex-col justify-center items-center">

            {/* Image Container */}
            <div className="col-lg-9 col-md-12">
              <div className="actSelectImg text-center">
                <div className="items-container grid-container">
                  {[martillo, cintaMetrica, destornillador, taladro, sierraElectrica, mezcladoraCemento].map((imgSrc, index) => (
                    <div
                      key={index}
                      className={`itemAct ${selectedImages.includes(imgSrc) ? 'selected' : ''} ${correctImages.includes(imgSrc) ? 'check' : 'xmark'}`}
                      onClick={() => actSelectImg(imgSrc)}
                    >
                      <img src={imgSrc} alt={`Imagen ${index}`} />
                      {selectedImages.includes(imgSrc) && (
                        <img
                          className="resAct"
                          src={results[imgSrc] === true ? imgVerdadero : results[imgSrc] === false ? imgFalso : ''}
                          alt={results[imgSrc] === true ? 'Correcto' : 'Incorrecto'}
                        />
                      )}
                    </div>
                  ))}
                </div>
                {/* Explicación de la imagen seleccionada, movido encima del botón de reiniciar */}
                {explanation && (
                  <Paragraph>
                  <div
                    style={{ fontSize: '16px', textAlign: 'center', marginBottom: '10px' }}
                    className={`p-2 md:w-[100%] w-[100%] text-white ${explanation.isCorrect ? 'bg-[#4CAF50]' : 'bg-[#F44336]'} rounded`}
                  >
                    {explanationsMap[explanation.image]}
                  </div>
                  </Paragraph>
                )}
                {/* Botón de reinicio centrado en la parte inferior */}
                <div className="flex justify-center items-center">
                  <Button
                    onClick={resetActivity}
                    roundedFull={true}
                    icon={faRepeat}
                 
                  >
                    Reiniciar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>

      {/* Modal de resultados */}
      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Resultados"
      >
        <Paragraph theme="light" className='text-center font-bold'>Has seleccionado 4 imagenes correctas</Paragraph>
        <h2 className='text-center text-secondary-color font-bold mt-1 mb-1'>Imágenes seleccionadas:</h2>
        <div className="flex flex-wrap justify-center">
          {selectedImages.map((imgSrc, index) => (
            <div key={index} className="relative m-2">
              <img
                src={imgSrc}
                alt={`Imagen seleccionada ${index}`}
                className="w-20 h-20"
              />
              {results[imgSrc] !== undefined && (
                <img
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10"
                  src={results[imgSrc] === true ? imgVerdadero : imgFalso}
                  alt={results[imgSrc] === true ? 'Correcto' : 'Incorrecto'}
                />
              )}
            </div>
          ))}
        </div>
      </ModalDialog>

      {/* Modal "Sabías que" */}
    </>
  );
}

export default SeleccionImagenesAlturas;
