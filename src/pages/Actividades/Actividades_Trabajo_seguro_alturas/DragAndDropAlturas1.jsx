import { useState, useEffect } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import imgOption1 from "../../../assets/img/caida_perdida_estabilidad_sldM2.webp";
import imgOption2 from "../../../assets/img/colapsio_andamio_sldM2.webp";
import imgOption3 from "../../../assets/img/desplazamiento_herramientas_sldM2.webp";
import imgOption4 from "../../../assets/img/golpe_estructura_sldM2.webp";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import '../../Actividades/Actividades_Trabajo_seguro_alturas/styles/DragAndDropAlturas1.css';
import imgVerdadero from "../../../assets/img/checkAct.png";
import imgFalso from "../../../assets/img/xmarkAct.png";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";

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
      className="draggable-option1 cursor-pointer"
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
        className={`drop-area1 ${isOver ? "drop-area-active" : ""}`}
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

export default function DragAndDropAlturas1() {
  const [items, setItems] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
    drop4: null,
  });
  const [verificationImages, setVerificationImages] = useState({});
  const [feedback, setFeedback] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("");
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  const options = [
    { id: "option1", imgSrc: imgOption1, label: "caida", value: 1 },
    { id: "option2", imgSrc: imgOption2, label: "colapso", value: 2 },
    { id: "option3", imgSrc: imgOption3, label: "golpe", value: 3 },
    { id: "option4", imgSrc: imgOption4, label: "desplazamiento", value: 4 },
  ];

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  );

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over && over.id) {
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
        (over.id === "drop4" && active.id === "option4");

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
      setVerificationImages((prev) => ({
        ...prev,
        [over.id]: isCorrect ? imgVerdadero : imgFalso,
      }));
    }
  };

  const handleReset = () => {
    setItems({
      drop1: null,
      drop2: null,
      drop3: null,
      drop4: null,
    });
    setVerificationImages({});
    setFeedback("");
    setFeedbackColor("");
    setCorrectAnswersCount(0);
  };

  return (
      <div className="flex flex-col md:flex-row w-full">
          <div className="md:flex-2 display-mobile ligth-display bg-white md:w-1/2 w-full px-6 md:pr-20 flex flex-col justify-center items-center mb-3">
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
              <div className="flex flex-col justify-center gap-4 mb-2">
                <div className="flex flex-row gap-4 justify-center">
                  {options.map((option, index) => (
                    <div key={option.id} className="flex flex-col items-center">
                      <DropArea
                        id={`drop${index + 1}`}
                        verificationImage={verificationImages[`drop${index + 1}`]}
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
                      <Paragraph
                        theme="light"
                        style={{ color: "gray" }}
                        className="font-bold mt-2"
                      >
                        {option.label}
                      </Paragraph>
                    </div>
                  ))}
                </div>

                <div className="flex flex-row gap-4 justify-center">
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

                <div className="flex flex-row gap-4 justify-center mt-4">
                  <Button
                    onClick={handleReset}
                    icon={faRepeat}
                    roundedFull={true}
                    className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white"
                  >
                    Reiniciar
                  </Button>
                </div>
              </div>
            </DndContext>
          </div>
        </div>
  );
}

