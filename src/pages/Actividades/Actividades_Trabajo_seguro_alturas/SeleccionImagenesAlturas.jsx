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
  const correctImages = [martillo, cintaMetrica, destornillador];

  const explanationsMap = {
    [martillo]: 'Muy bien! Este tipo de herramienta SOLO usa energía manual, y hace parte de las HERRAMIENTAS DE GOLPEO.',
    [cintaMetrica]: 'Este tipo de herramienta SOLO usa energía manual, y hace parte de las HERRAMIENTAS DE MEDICIÓN.',
    [destornillador]: 'Este tipo de herramienta SOLO usa energía manual, y hace parte de las HERRAMIENTAS DE SUJECIÓN.',
    [taladro]: 'Piénsalo bien! Este tipo de herramienta NO es manual ya que usa energía eléctrica, y hace parte de las HERRAMIENTAS DE PERFORACIÓN.',
    [sierraElectrica]: 'Revisa bien! Este tipo de herramienta NO es manual ya que usa energía eléctrica para su funcionamiento, hace parte de las HERRAMIENTAS DE CORTE.',
    [mezcladoraCemento]: 'Revisa bien! Este tipo de herramienta NO es manual, ya que cuenta con otros mecanismos además de la fuerza humana para su operación.',
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

    if (newSelectedImages.length === 6) {
      setIsModalOpen(true);
    }
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
      <div className="flex flex-col md:flex-row mb-36 md:mb-0">
       

        {/* Columna derecha */}
        <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
            <div className="md:flex-2 bg-white md:w-full w-full px-2 md:pl-20 flex justify-center items-center pb-2">
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
                    style={{ fontSize: '16px', textAlign: 'left', marginBottom: '10px' }}
                    className={`p-2 md:w-[95%] w-[100%] text-white ${explanation.isCorrect ? 'bg-[#4CAF50]' : 'bg-[#F44336]'} rounded`}
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
                    className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white"
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
        <Paragraph theme="light" className='text-center font-bold'>Has seleccionado las 4 imágenes permitidas</Paragraph>
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
