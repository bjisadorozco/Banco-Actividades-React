import  { useState, useEffect,  } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
// import "../../assets/css/cards.css";

import imgOption1 from "../../../assets/img/caida_perdida_estabilidad_sldM2.webp";
import imgOption2 from "../../../assets/img/colapsio_andamio_sldM2.webp";
import imgOption3 from "../../../assets/img/desplazamiento_herramientas_sldM2.webp";
import imgOption4 from "../../../assets/img/golpe_estructura_sldM2.webp"; // Added import for option4 image
// import Title from "../../components/Title";
// import Subtitle from "../../components/Subtitle";
import Paragraph from "../../components/Paragraph";
import Instruction from "../../components/Instruction";
import Button from "../../components/Button";
// import ModalDialog from "../../components/ModalDialog";
import '../../Actividades/Actividades_Trabajo_seguro_alturas/styles/DragAndDropAlturas1.css';
import imgVerdadero from "../../../assets/img/checkAct.png";
import imgFalso from "../../../assets/img/xmarkAct.png";
// import imgSabiasQue from "../../assets/img/botones/no-olvides-color.png";
import {  faRepeat,  } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";
// import imgRecordemos from "../../assets/img/botones_nuevos/recuerda_icono.webp";

import { useMediaQuery } from "react-responsive";

function DraggableOption({ id, imgSrc, isDropped }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  if (isDropped) {
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        width: "150px",
        height: "150px",
      }}
      {...listeners}
      {...attributes}
      className="draggable-option cursor-pointer"
    >
      <img
        src={imgSrc}
        alt={id}
        className="w-full h-full object-cover rounded-md"
      />
    </div>
  );
}

function DropArea({ id, children, verificationImage }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver ? "#e6e6e6" : "rgb(235, 235, 235)",
    width: "150px",
    height: "150px",
    border: "2px dashed gray",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    flexDirection: "column",
  };

  const textStyle = {
    color: children ? "transparent" : "#604792",
    opacity: children ? 0 : 0.7,
    position: "absolute",
    pointerEvents: "none",
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={setNodeRef}
        style={style}
        className={`drop-area ${isOver ? "drop-area-active" : ""}`}
      >
        <span style={textStyle}>Arrastre aquí</span>
        {children}
        {verificationImage && (
          <img
            src={verificationImage}
            alt="verification"
            className="absolute inset-0 w-1/2 h-1/2 object-cover"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function UltimaBarreraProteccion({ isActive }) {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [verificationImages, setVerificationImages] = useState({});


  
  
  const [items, setItems] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
  });
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("");
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  //const audioRef = useRef(new Audio());
  //const currentMobileAudioRef = useRef(null);
  const [isResetDisabled, setIsResetDisabled] = useState(true);

  const [options, setOptions] = useState([
    { id: "option1", imgSrc: imgOption1, label: "caida", value: 1 },
    { id: "option2", imgSrc: imgOption2, label: "colapso", value: 2 },
    { id: "option3", imgSrc: imgOption3, label: "golpe", value: 3 },
    { id: "option4", imgSrc: imgOption4, label: "desplazamiento", value: 4 }, // Added option 4
  ]);

  const [availableOptions, setAvailableOptions] = useState(options);
  const [dropdownSelections, setDropdownSelections] = useState(
    Array(options.length).fill("0")
  );
  // useEffect(() => {
  //   // Reproduce el audio cuando el slide está activo
  //   if (isActive) {
  //     audioRef.current.play();
  //   } else {
  //     // Pausa el audio cuando el slide deja de estar activo
  //     // audioRef.current.pause();
  //     audioRef.current.currentTime = 0; // Reinicia el audio
  //   }

  //   // Cleanup para detener el audio cuando el componente se desmonte
  //   return () => {
  //     if (audioRef.current) {
  //       // audioRef.current.pause();
  //       audioRef.current.currentTime = 0; // Reinicia el audio
  //     }
  //   };
  // }, [isActive]);

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  );

  const handleValidateMobile = () => {
    let correctCount = 0;

    dropdownSelections.forEach((value, index) => {
      const isCorrect =
        (index === 0 && value === "option1") ||
        (index === 1 && value === "option2") ||
        (index === 2 && value === "option3") ||
        (index === 3 && value === "option4"); // New condition

      if (isCorrect) {
        correctCount++;
      }
    });

    const feedbackMessage = `${correctCount} de ${options.length} respuestas correctas`;
    setFeedback(feedbackMessage);
    setCorrectAnswersCount(correctCount);

    // Cambia el color del feedback según los resultados
    setFeedbackColor(
      correctCount === options.length
        ? "bg-green-100 border-green-500"
        : "bg-red-100 border-red-500"
    );
  };

  const handleDropdownChange = (index, value) => {
    const stopAllAudios = () => {
      // Detener audios de elementos audio
      const audioElements = document.getElementsByTagName("audio");
      Array.from(audioElements).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });

      // Detener audio móvil si existe
      // if (currentMobileAudioRef.current) {
      //   currentMobileAudioRef.current.pause();
      //   currentMobileAudioRef.current.currentTime = 0;
      //   currentMobileAudioRef.current = null;
      // }
    };

    stopAllAudios();

    setDropdownSelections((prev) => {
      const updatedSelections = [...prev];
      updatedSelections[index] = value;

      const selectedValues = updatedSelections.filter((val) => val !== "0");
      const remainingOptions = options.filter(
        (option) => !selectedValues.includes(option.id)
      );
      setAvailableOptions(remainingOptions);

      const isCorrect =
        (index === 0 && value === "option1") ||
        (index === 1 && value === "option2") ||
        (index === 2 && value === "option3") ||
        (index === 3 && value === "option4"); // New condition

      // Set feedback immediately
      if (isCorrect) {
        let feedbackText = "";
        switch (value) {
          case "option1":
            feedbackText = "Los guantes son esenciales para proteger las manos...";
            break;
          case "option2":
            feedbackText = "El casco es crucial para proteger la cabeza...";
            break;
          case "option3":
            feedbackText = "Las botas de seguridad protegen los pies...";
            break;
          case "option4":
            feedbackText = "El arnés es fundamental para prevenir caídas desde alturas...";
            break;
        }
        setFeedback(feedbackText);
        setFeedbackColor("bg-correct-feedback border-green-500");
      } else {
        setFeedback("Esta no es la opción correcta para esta posición.");
        setFeedbackColor("bg-incorrect-feedback border-red-500");
      }


      setVerificationImages((prevImages) => ({
        ...prevImages,
        [index]: isCorrect ? "border-green-600" : "border-red-600",
      }));


      const isAnySelected = updatedSelections.some((val) => val !== "0");
      setIsResetDisabled(!isAnySelected);

      return updatedSelections;
    });
  };

  const getFilteredOptions = (index) => {
    const selectedValues = dropdownSelections.filter((_, i) => i !== index);
    return options.filter((option) => !selectedValues.includes(option.id));
  };

  const handleReset = () => {
    setItems({
      drop1: null,
      drop2: null,
      drop3: null,
      drop4: null,
    });
    setDropdownSelections(Array(options.length).fill("0")); // Reiniciar dropdowns
    setAvailableOptions(options); // Restaurar todas las opciones
    setFeedback(""); // Limpiar el feedback
    setFeedbackColor("");
    setVerificationImages({}); // Reiniciar imágenes de verificación
    setCorrectAnswersCount(0); // Reiniciar contador de respuestas correctas
    setIsResetDisabled(true); // Deshabilitar el botón de reinicio
    // audioRef.current.pause();
    // audioRef.current.currentTime = 0; // Reiniciar el audio

    // Detener audio móvil si existe
    // if (currentMobileAudioRef.current) {
    //   currentMobileAudioRef.current.pause();
    //   currentMobileAudioRef.current.currentTime = 0;
    //   currentMobileAudioRef.current = null;
    // }
  };


  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over && over.id) {
      // Prevent adding more than one item per drop area
      if (items[over.id]) return;

      setItems((prevItems) => ({
        ...prevItems,
        [over.id]: active.id,
      }));

      const optionLabel = options.find((opt) => opt.id === active.id)?.label;
      const isCorrect =
        (over.id === "drop1" && active.id === "option1") ||
        (over.id === "drop2" && active.id === "option2") ||
        (over.id === "drop3" && active.id === "option3") ||
        (over.id === "drop4" && active.id === "option4"); // New condition

      let feedbackText = "";
      if (isCorrect) {
        switch (active.id) {
          case "option1":
            feedbackText =
              "Los guantes son esenciales para proteger las manos de cortes, abrasiones y sustancias peligrosas durante la manipulación de cargas.";
            break;
          case "option2":
            feedbackText =
              "El casco es crucial para proteger la cabeza de impactos y caídas de objetos, especialmente en áreas de construcción.";
            break;
          case "option3":
            feedbackText =
              "Las botas de seguridad protegen los pies de caídas de objetos pesados y proporcionan estabilidad en superficies irregulares.";
            break;
          case "option4":
            feedbackText =
              "El arnés es fundamental para prevenir caídas desde alturas y proporcionar seguridad en trabajos elevados.";
            break;
        }
        setFeedbackColor("bg-correct-feedback border-green-500");
        setCorrectAnswersCount((prev) => prev + 1);
      } else {
        feedbackText = `${optionLabel} no es el elemento correcto para esta posición. Piensa en la función específica de cada equipo de protección.`;
        setFeedbackColor("bg-incorrect-feedback border-red-500");
      }

      setFeedback(feedbackText);

      // Update verification images
      setVerificationImages((prev) => ({
        ...prev,
        [over.id]: isCorrect ? imgVerdadero : imgFalso,
      }));
    }
  };

  const allItemsPlaced = Object.values(items).every((item) => item !== null);

  return (
    <>
       <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
                <div className="flex flex-col md:flex-row w-full">
                    <div className="md:flex-2 bg-white md:w-3/3 w-full px-2  flex justify-center items-center pb-2">
          
       

        {/* Right Column */}
        <div className="md:flex-2 display-mobile ligth-display bg-white md:w-1/2 w-full px-6 md:pr-20 flex flex-col justify-center items-center mb-3"
          style={{
            position: isMobile ? "static" : "relative",
            top: isMobile ? "0" : "-40px",
          }}
        >
          {!isMobile && (
            <div className="mt-4">
              <Instruction arrow="down" theme="light">
                {isMobile
                  ? "Selecciona las opciones correctas"
                  : "Arrastra los elementos donde corresponden"}
              </Instruction>
            </div>
          )}

          {!isMobile && (
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
              <div
                className={`flex ${
                  isMobile ? "flex-center" : "flex-col"
                } justify-center gap-4 mb-2`}
              >
                {isMobile ? <div></div> : <div></div>}
                {/* Drop Areas */}
                <div
                  className={`flex ${
                    isMobile ? "flex-col" : "flex-row"
                  } gap-4 justify-center`}
                >
                  {options.map((option, index) => (
                    <div key={option.id} className="flex flex-col items-center">
                      <DropArea
                        id={`drop${index + 1}`}
                        verificationImage={
                          verificationImages[`drop${index + 1}`]
                        }
                      >
                        {items[`drop${index + 1}`] && (
                          <img
                            src={
                              options.find(
                                (opt) => opt.id === items[`drop${index + 1}`]
                              )?.imgSrc
                            }
                            alt={items[`drop${index + 1}`]}
                            className="w-full h-full object-cover mb-0"
                          />
                        )}
                      </DropArea>
                      <Paragraph theme="light"
                        style={{ color: "gray" }}
                        className="font-bold mt-2"
                      >
                        {option.label}
                      </Paragraph>
                    </div>
                  ))}
                </div>

                {/* Draggable Options */}
                <div
                  className={`flex ${
                    isMobile
                      ? "flex-col gap-14 justify-start"
                      : "flex-row gap-4 justify-center"
                  }`}
                >
                  {options
                    .map((option) => (
                      <DraggableOption
                        key={option.id}
                        id={option.id}
                        imgSrc={option.imgSrc}
                        isDropped={Object.values(items).includes(option.id)}
                      />
                    ))
                    .reverse()}
                </div>
                {/* Botones para reiniciar */}
                <div className="flex flex-row gap-4 justify-center mt-4">
                  <Button
                    onClick={handleReset}
                    icon={faRepeat}
                    roundedFull={true}
                    className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white"
                  >
                    {" "}
                    Reiniciar
                  </Button>
                </div>
              </div>
            </DndContext>
          )}

          {!isMobile && feedback && (
            <div className="w-full flex justify-center items-center mt-4">
              <Paragraph>
              <div
                className={`text-center p-4 rounded-md border-2 ${feedbackColor} max-w-md`}
              >
                {feedback}
              </div>
              </Paragraph>
            </div>
          )}

          {isMobile && (
            <div className="block md:hidden">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`relative mb-6 w-full flex flex-col items-center justify-center p-4 rounded-md mx-auto ${
                    verificationImages[index] === "border-green-600"
                      ? "bg-[#4CAF50]" // Fondo verde
                      : verificationImages[index] === "border-red-600"
                        ? "bg-[#F44336]" // Fondo rojo
                        : "bg-gray-200"
                  }`}
                >
                  <div className="relative w-full flex flex-col items-center">
                    <img
                      src={option.imgSrc}
                      alt={`Opción ${index + 1}`}
                      className="w-[60%] object-contain"
                    />
                    {verificationImages[index] === "border-green-600" && (
                      <div className="absolute inset-0 flex justify-center items-center text-5xl text-[#4CAF50]">
                        <i className="fa fa-check-circle"></i>
                      </div>
                    )}
                    {verificationImages[index] === "border-red-600" && (
                      <div className="absolute inset-0 flex justify-center items-center text-5xl text-[#F44336]">
                        <i className="fa fa-times-circle"></i>
                      </div>
                    )}
                    
                  </div>
                  {/* Dropdown */}
                  <div className="w-full text-center mt-4">
                    <select
                      key={index}
                      className={`border-2 w-3/4 rounded-md text-black ${verificationImages[index] || ""}`}
                      value={dropdownSelections[index]}
                      onChange={(e) =>
                        handleDropdownChange(index, e.target.value)
                      }
                    >
                      <option value="0" disabled>
                        Seleccione...
                      </option>
                      {getFilteredOptions(index).map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4 w-full text-center ">
                    <Paragraph>
                    {verificationImages[index] === "border-green-600"
                      ? "¡Correcto!"
                      : verificationImages[index] === "border-red-600"
                        ? "¡Incorrecto! Piénsalo bien."
                        : ""}
                        </Paragraph>
                  </div>
                </div>
              ))}

              {/* Botones */}
              <div className="flex flex-row gap-4 justify-center mt-4">
                {/* <button
                  onClick={handleValidateMobile}
                  className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white"
                >
                  <FontAwesomeIcon icon={faCheck} className="mr-2" /> Validar
                </button> */}
                <Button
                  onClick={handleReset}
                  icon={faRepeat}
                  roundedFull={true}
                  
                  disabled={isResetDisabled}
                >
                  Reiniciar
                </Button>
              </div>

              {/* Feedback */}
              {feedback && (
                <Paragraph>
                <div
                  className={`mt-4 text-center p-4 rounded-md border-2 ${feedbackColor}`}
                >
                  {feedback}
                </div>
                </Paragraph>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

