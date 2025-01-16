import { useState, useEffect } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import { faRepeat, faCheck } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";
import "./styles/DragAndDropSlide9.css";
import img from "../../../assets/img/caida_perdida_estabilidad_sldM2.webp";
import img1 from "../../../assets/img/colapsio_andamio_sldM2.webp";
import img2 from "../../../assets/img/desplazamiento_herramientas_sldM2.webp";
import img3 from "../../../assets/img/golpe_estructura_sldM2.webp";
import uncheck from "../../../assets/img/xmarkAct.png";
import check from "../../../assets/img/checkAct.png";

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
      style={{
        ...style,
        width: "220px",
        height: "60px",
        backgroundColor: "#C0185D",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        fontWeight: "bold",
        textAlign: "center",
      }}
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

  const style = {
    backgroundColor: isValidated
      ? isCorrect
        ? "#90EE90" // Light green
        : "#FFB6C1" // Light red
      : children
        ? "#C0185D"
        : isOver
          ? "#e6e6e6"
          : "#f3f4f6",
    width: "100%",
    height: "60px",
    padding: "1.5rem",
    border: `2px dashed ${
      isValidated
        ? isCorrect
          ? "#90EE90"
          : "#FFB6C1"
        : children
          ? "#C0185D"
          : "#e2e8f0"
    }`,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
    color: isValidated ? "#0F172A" : "white",
    fontWeight: "bold",
  };

  return (
    <div ref={setNodeRef} style={style}>
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
  const [validationMessage, setValidationMessage] = useState("");

  const options = [
    {
      id: "option1",
      text: "Golpes con la estructura durante el movimiento vertical​",
      label: "Labores en fachadas y paredes​",
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
      text: "Desplazamiento de herramientas o materiales desde alturas que impacten a trabajadores en niveles inferiores​​",
      label: "Trabajos en paredes",
      image: img3,
    },
  ];

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  useEffect(() => {
    const hasDroppedItems = Object.values(items).some((item) => item !== null);
    setIsResetDisabled(!hasDroppedItems);
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
  };

  const handleValidation = () => {
    const totalCorrect = Object.values(verificationImages).filter(
      (status) => status === "correct"
    ).length;

    const percentage = Math.round((totalCorrect / options.length) * 100);

    if (totalCorrect === 4) {
      setValidationMessage(
        `¡Muy bien! ¡Este es un riesgo de la actividad seleccionada!. Tus respuestas correctas son: ${totalCorrect} de 4 (${percentage}%)`
      );
    } else {
      setValidationMessage(
        `Has asociado un riesgo de manera errónea. ¡Inténtalo de nuevo!.Tus respuestas correctas son: ${totalCorrect} de 4 (${percentage}%)`
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
          {options.map((option, index) => (
            <div
              key={option.id}
              className="p-6 mt-4 border rounded-lg shadow-md flex flex-col items-center relative"
              style={{
                width: "350px",
                justifyContent: "space-between",
                textAlign: "center",
                backgroundColor: validationMessage
                  ? verificationImages[`drop${index + 1}`] === "correct"
                    ? "#4CAF50"
                    : verificationImages[`drop${index + 1}`] === "incorrect"
                      ? "#F44336"
                      : "white"
                  : "white",
              }}
            >
              {validationMessage && (
                <div
                  style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  <img
                    src={
                      verificationImages[
                        `drop${index + 1 || "/placeholder.svg"}`
                      ] === "correct"
                        ? check
                        : uncheck
                    }
                    alt={
                      verificationImages[`drop${index + 1}`] === "correct"
                        ? "Correcto"
                        : "Incorrecto"
                    }
                    style={{
                      width: "64px",
                      height: "64px",
                    }}
                  />
                </div>
              )}
              <img
                src={option.image || "/placeholder.svg"}
                alt={option.text}
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  position: "relative",
                }}
              />
              <Paragraph
                theme={validationMessage ? undefined : "light"}
                justify="center"
              >
                {option.text}
              </Paragraph>

              <div style={{ width: "100%" }}>
                <DropArea
                  id={`drop${index + 1}`}
                  isValidated={!!validationMessage}
                  isCorrect={
                    verificationImages[`drop${index + 1}`] === "correct"
                  }
                >
                  {items[`drop${index + 1}`] &&
                    options.find((opt) => opt.id === items[`drop${index + 1}`])
                      ?.label}
                </DropArea>
              </div>
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
            marginTop: "1rem",
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
        <div className="flex justify-center mt-4">
          <p
            className={`validation-message ${
              validationMessage.includes("Muy bien") ? "success" : "error"
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
          disabled={isResetDisabled}
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
