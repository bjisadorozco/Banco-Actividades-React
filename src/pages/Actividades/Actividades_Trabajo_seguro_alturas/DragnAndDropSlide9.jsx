import { useState, useEffect } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import { faRepeat, faCheck } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";
import check from "../../../assets/img/checkAct.png";
import unchek from "../../../assets/img/xmarkAct.png";
import img from "../../../assets/img/caida_perdida_estabilidad_sldM2.webp";
import img1 from "../../../assets/img/colapsio_andamio_sldM2.webp";
import img2 from "../../../assets/img/desplazamiento_herramientas_sldM2.webp";
import img3 from "../../../assets/img/golpe_estructura_sldM2.webp";
import "./styles/DragAndDropSlide9.css";

function DraggableOption({ id, label, isDropped }) {
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
      className="draggable-option"
      style={style}
      {...listeners}
      {...attributes}
    >
      {label}
    </div>
  );
}

function DropArea({ id, children, isValidated, isCorrect }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const dropAreaClass = isValidated
    ? isCorrect
      ? "drop-area drop-area-correct"
      : "drop-area drop-area-incorrect"
    : children
      ? "drop-area drop-area-filled"
      : isOver
        ? "drop-area drop-area-hover"
        : "drop-area drop-area-default";

  return (
    <div ref={setNodeRef} className={dropAreaClass}>
      {children}
    </div>
  );
}

export default function DragAndDropSlide9() {
  const [verificationImages, setVerificationImages] = useState({});
  const [items, setItems] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
    drop4: null,
  });
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [isValidateDisabled, setValidateDisabled] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const options = [
    {
      id: "option1",
      text: "Golpes con la estructura durante el movimiento vertical​",
      label: "Trabajo en estructuras​",
      image: img,
    },
    {
      id: "option2",
      text: "Colapso del andamio por mal montaje o sobrecarga.​",
      label: "Trabajos en andamios​",
      image: img1,
    },
    {
      id: "option3",
      text: "Caídas por pérdida de estabilidad en superficies inclinadas.​",
      label: "Trabajos en techos y cubiertas​",
      image: img2,
    },
    {
      id: "option4",
      text: "Desplazamiento de materiales desde alturas que impacten a trabajadores en niveles inferiores​​",
      label: "Trabajos en paredes",
      image: img3,
    },
  ];

  useEffect(() => {
    setIsOnDivisor(false);
    const shuffled = [...options].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  }, []);

  useEffect(() => {
    const hasDroppedItems = Object.values(items).some((item) => item !== null);
    setIsResetDisabled(!hasDroppedItems);
  }, [items]);

  useEffect(() => {
    const areAllDropsFilled = Object.values(items).every((item) => item !== null);
    setValidateDisabled(!areAllDropsFilled);
  }, [items]);
  

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  );

  const handleReset = () => {
    setItems({
      drop1: null,
      drop2: null,
      drop3: null,
      drop4: null,
    });
    setVerificationImages({});
    setCorrectAnswersCount(0);
    setIsResetDisabled(true);
    setValidationMessage("");
    // Rebarajar las opciones al reiniciar
    const shuffled = [...options].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  };

  const handleValidation = () => {
    const totalCorrect = Object.values(verificationImages).filter(
      (status) => status === "correct"
    ).length;

    const percentage = Math.round((totalCorrect / options.length) * 100);

    if (totalCorrect === 4) {
      setValidationMessage(
        `¡Muy bien ! ¡Este es un riesgo de la actividad seleccionada! 
        \nTus respuestas correctas son: ${totalCorrect} de 4 (${percentage}%)`
      );
      // setValidationMessage(
      //   "¡Muy bien ! ¡Este es un riesgo de la actividad seleccionada !"
      // );
    } else {
      setValidationMessage(
        `¡Piénsalo bien! Este riesgo no se relaciona con la actividad seleccionada
        \nTus respuestas correctas son: ${totalCorrect} de 4 (${percentage}%)`
      );
    }
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over && over.id) {
      if (items[over.id]) return;

      setItems((prevItems) => ({
        ...prevItems,
        [over.id]: active.id,
      }));

      const isCorrect =
        (over.id === "drop1" && active.id === "option1") ||
        (over.id === "drop2" && active.id === "option2") ||
        (over.id === "drop3" && active.id === "option3") ||
        (over.id === "drop4" && active.id === "option4");

      setVerificationImages((prev) => ({
        ...prev,
        [over.id]: isCorrect ? "correct" : "incorrect",
      }));
    }
  };

  return (
    <div className="flex flex-col overflow-x-hidden mb-36">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex flex-row justify-center gap-4 mb-4">
          {shuffledOptions.map((option, index) => (
            <div
              key={option.id}
              className={`p-6 mt-4 border rounded-lg shadow-md flex flex-col items-center relative card ${
                validationMessage
                  ? verificationImages[`drop${index + 1}`] === "correct"
                    ? "card-correct"
                    : verificationImages[`drop${index + 1}`] === "incorrect"
                      ? "card-incorrect"
                      : ""
                  : ""
              }`}
            >
              {validationMessage && (
                <img
                  className="verification-icon"
                  src={
                    verificationImages[`drop${index + 1}`] === "correct"
                      ? check
                      : unchek
                  }
                  alt={
                    verificationImages[`drop${index + 1}`] === "correct"
                      ? "Correcto"
                      : "Incorrecto"
                  }
                />
              )}
              <img
                className="card-image"
                src={option.image}
                alt={option.text}
              />
              <Paragraph
                theme={
                  !validationMessage
                    ? "light" // Si no está validado, usa el tema "light"
                    : "dark"
                }
              >
                {option.text}
              </Paragraph>

              <DropArea
                id={`drop${index + 1}`}
                isValidated={!!validationMessage}
                isCorrect={verificationImages[`drop${index + 1}`] === "correct"}
              >
                {items[`drop${index + 1}`] &&
                  options.find((opt) => opt.id === items[`drop${index + 1}`])
                    ?.label}
              </DropArea>
            </div>
          ))}
        </div>

        <div
          className="flex flex-row justify-center gap-4"
          style={{
            display: options.some(
              (option) => !Object.values(items).includes(option.id)
            )
              ? "flex"
              : "none",
          }}
        >
          {options.map((option) => (
            <DraggableOption
              key={option.id}
              id={option.id}
              label={option.label}
              isDropped={Object.values(items).includes(option.id)}
            />
          ))}
        </div>
      </DndContext>

      {validationMessage && (
        <div className="justify-center mt-4">
          <p
            className={`validation-message ${
              validationMessage.includes("correcta") ? "successs" : "errors"
            }`}
          >
            {validationMessage}
          </p>
        </div>
      )}

      <div className="flex justify-center mt-4 gap-4">
        <Button
          onClick={handleValidation}
          icon={faCheck}
          roundedFull={true}
          disabled={isValidateDisabled}
        >
          Validar
        </Button>
        <Button
          onClick={handleReset}
          icon={faRepeat}
          roundedFull={true}
          disabled={isResetDisabled}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
}
