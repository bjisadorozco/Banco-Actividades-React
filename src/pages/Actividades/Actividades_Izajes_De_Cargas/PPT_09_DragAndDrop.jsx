import { useState, useEffect } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import { faRepeat, faCheck } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";
import img from "../../../assets/img/caida_perdida_estabilidad_sldM2.webp";
import img1 from "../../../assets/img/colapsio_andamio_sldM2.webp";
import img2 from "../../../assets/img/desplazamiento_herramientas_sldM2.webp";
import img3 from "../../../assets/img/golpe_estructura_sldM2.webp";
import uncheck from "../../../assets/img/xmarkAct.png";
import check from "../../../assets/img/checkAct.png";

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

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
        width: "160px",
        height: "60px",
        padding: "10px",
        backgroundColor: "#0F172A",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
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
        ? "#0F172A"
        : isOver
          ? "#e6e6e6"
          : "#f3f4f6",
    width: "100%",
    height: "50px",
    padding: "1.6rem",
    border: `2px dashed ${
      isValidated
        ? isCorrect
          ? "#90EE90"
          : "#FFB6C1"
        : children
          ? "#0F172A"
          : "#e2e8f0"
    }`,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
    color: isValidated ? "inherit" : "white",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export default function PPT_09_DragAndDrop() {
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
      id: "option4",
      text: "Son coeficientes establecidos para garantizar que los equipos de izaje operen dentro de límites seguros.​​​",
      label: "Factores de seguridad​",
      image: img3,
    },
    {
      id: "option3",
      text: "Es el punto en el que el peso de la carga está equilibrado. Identificarlo es fundamental para evitar vuelcos o movimientos inesperados durante el izaje​.​",
      label: "Centro de gravedad​​",
      image: img2,
    },
    {
      id: "option1",
      text: "Es el peso máximo que un equipo o accesorio de izaje puede levantar sin comprometer su integridad estructural.​​",
      label: "Carga Máxima Segura​​",
      image: img,
    },
    {
      id: "option2",
      text: "Representa el límite de resistencia de un accesorio o equipo antes de fallar o romperse​.​",
      label: "Carga de rotura​​",
      image: img1,
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
        `¡Muy bien! ¡Este es un riesgo de la actividad seleccionada! 
        \nTus resp1uestas correctas son: ${totalCorrect} de 4 (${percentage}%)`
      );
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

  const areAllItemsDropped = Object.values(items).every(
    (item) => item !== null
  );

  return (
    <div className="container1">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="content-options">
          {options.map((option, index) => (
            <div
              key={option.id}
              className="p-[0.5rem] border rounded-lg shadow-md  items-center relative"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "35%",
                height: "310px",
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
              <div className="image">
                <img
                  src={option.image || "/placeholder.svg"}
                  alt={option.text}
                  // className="card-image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "2px solid #ccc",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
              <Paragraph
                theme={
                  !validationMessage
                    ? "light" // Si no está validado, usa el tema "light"
                    : "dark"
                }
                justify="center"
              >
                {option.text}
              </Paragraph>

              <div className="area" style={{ width: "100%" }}>
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
          className="feedback1"
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
        <div className="justify-center" style={{ display: "flex" }}>
          <p
            className={`validation-message ${
              validationMessage.includes("Muy bien") ? "successs" : "errors"
            }`}
          >
            {validationMessage}
          </p>
        </div>
      )}

      <div className="content-button">
        <Button
          onClick={handleValidation}
          icon={faCheck}
          roundedFull={true}
          disabled={!areAllItemsDropped}
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
