import Title from "../pages/components/Title";
import Subtitle from "../pages/components/Subtitle";
import Paragraph from "../pages/components/Paragraph";
import Instruction from "../pages/components/Instruction";
import Button from "../pages/components/Button";
import ModalDialog from "../pages/components/ModalDialog";
import { faPaw, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import useStore from "../store";
import { useMediaQuery } from "react-responsive";

function CincuentaCincuenta() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="md:flex-1 bg-slate-900 md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          {/* Left Column */}
          <div className="my-8 text-center">
            <Title>Sistema Globalmente</Title>
            <Subtitle>Armonizado (SGA)</Subtitle>
          </div>
          <div className="px-6 md:px-14 text-justify">
            <Paragraph justify={isMobile ? 'justify' : 'justify'}>
              El Sistema Globalmente Armonizado (SGA) es un marco internacional
              para la clasificación y etiquetado de productos químicos, diseñado
              para comunicar los peligros y garantizar su manejo seguro mediante
              el uso de pictogramas y frases de precaución.
            </Paragraph>
          </div>
          <div className=" px-6 md:px-14 flex justify-center w-auto">
            <Instruction arrow="down" theme="dark">
              Reproduce el video para dar respuesta a las preguntas
            </Instruction>
          </div>
          <Button
            bold={true}
            icon={faThumbsUp}
            roundedFull={true}
            onClick={handleOpenModal}
          >
            Botón con ícono
          </Button>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:flex-1 bg-white md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          {/* Left Column */}
          <div className="my-8 text-center">
            <Title theme="ligth">Sistema Globalmente</Title>
            <Subtitle>Armonizado (SGA)</Subtitle>
          </div>
          <div className="px-6 md:px-14 text-justify">
            <Paragraph theme="ligth" justify={isMobile ? 'justify' : 'justify'}>
              El Sistema Globalmente Armonizado (SGA) es un marco internacional
              para la clasificación y etiquetado de productos químicos, diseñado
              para comunicar los peligros y garantizar su manejo seguro mediante
              el uso de pictogramas y frases de precaución.
            </Paragraph>
          </div>
          <div className=" px-6 md:px-14 flex justify-center w-auto">
            <Instruction arrow="down" theme="ligth">
              Reproduce el video para dar respuesta a las preguntas
            </Instruction>
          </div>
          <Button
            bold={true}
            icon={faThumbsUp}
            roundedFull={true}
            onClick={handleOpenModal}
          >
            Botón con ícono
          </Button>
        </div>
      </div>

      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Título del modal"
      >
        <p>Contenido del <strong>hola</strong>modal</p>
        <h1 className="text-4xl font-bold">titulo</h1>
      </ModalDialog>
    </div>
  );
}

export default CincuentaCincuenta;
