import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
// import Instruction from "../../components/Instruction";
import { useMediaQuery } from "react-responsive";
// import imgIngenieroHerramientas from '../../assets/img/ingenieroMorelcoHerramientas.webp';
import trabajoTechos from '../../../assets/img/trabajos_techos.webp';
import trabajosFachados from '../../../assets/img/trabajos_paredes_fachadas.webp';
import trabajosMontajes from '../../../assets/img/trabajos_montajes_estructura.webp';
import trabajosAndamios from '../../../assets/img/trabajos_andamios.webp';
import instalacionPisos from '../../../assets/img/instalacion_pisos.webp';
import instalacionElectrica from '../../../assets/img/instalacion_electrica.webp';
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
  const [validationMessage, setValidationMessage] = useState('');
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const correctImages = [trabajoTechos, trabajosFachados, trabajosMontajes,trabajosAndamios];

  const explanationsMap = {
    [trabajoTechos]: 'Trabajos en techos y cubiertas:   Bien!  Estos normalmente se hacen a más de 2 mts de altura.',
    [trabajosFachados]: 'Trabajos en paredes y fachadas:   Bien!  Estos siempre se hacen a más de 2 mts de altura',
    [trabajosMontajes]: 'Tabajos de montajes de estructuras:   Bien!  Estos normalmente se hacen a más de 2 mts de altura',
    [trabajosAndamios]: 'Trabajos en andamios:   Bien!  Estos normalmente permiten acceder a alturas superiores a 2 mts',
    [instalacionPisos]: 'Instalación de pisos:  Este tipo de tareas normalmente NO se hacen a más de 2 metros de altura.',
    [instalacionElectrica]: 'Instalación electrica de piso: Este tipo de tareas normalmente NO se hacen a más de 2 metros de altura.',
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

    updateValidationMessage(newSelectedImages);
  };

	const updateValidationMessage = (selected) => {
			if (selected.length === 0) {
        setValidationMessage('');
        return;
      }

      const totalCorrect = selected.filter(img => correctImages.includes(img)).length;
      const percentage = Math.round((totalCorrect / 4) * 100);

      if (totalCorrect === 4) {
        setValidationMessage(
          `Tus respuestas correctas son: ${totalCorrect} de 4 (${percentage}%)`
        );
      } else {
        setValidationMessage(
          `Tus respuestas correctas son: ${totalCorrect} de 4 (${percentage}%)`
        );
      }
    };

  const resetActivity = () => {
    setResults({});
    setSelectedImages([]);
    setExplanation(null);
    setIsModalOpen(false);
    setValidationMessage('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center">

            {/* Image Container */}
              <div className="actSelectImg text-center">
                <div className="items-container grid-container">
                  {[trabajoTechos, trabajosFachados, trabajosMontajes, trabajosAndamios, instalacionPisos, instalacionElectrica].map((imgSrc, index) => (
                    <div
                      key={index}
                      className={`itemAct ${selectedImages.includes(imgSrc) ? 'selected' : ''} ${correctImages.includes(imgSrc) ? 'check' : 'xmark'}`}
                      onClick={() => actSelectImg(imgSrc)}
                    >
                      <img src={imgSrc} alt={`Imagen ${index}`} style={{ marginBottom: '0' }}/>
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
                    style={{ fontSize: '16px', textAlign: 'center', marginTop: '10px' }}
                    className={`p-2 md:w-[100%] w-[100%] text-white ${explanation.isCorrect ? 'bg-[#4CAF50]' : 'bg-[#F44336]'} rounded`}
                  >
                    {explanationsMap[explanation.image]}
                  </div>
                  </Paragraph>
                )}
							 {/* Mensaje de validación en tiempo real */}
                        {validationMessage && (
                          <Paragraph>
                            <div
                              style={{ fontWeight: 'bold', textAlign: 'center', color: 'grey' }}
                              className="p-2 w-[100%] rounded"
                            >
                              {validationMessage}
                            </div>
                          </Paragraph>
                        )}

                {/* Botón de reinicio centrado en la parte inferior */}
                <div className="flex justify-center items-center" style={{ marginTop: '0' }}>
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
