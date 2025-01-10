'use client'

import { useState, useEffect } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";

import imgOption1 from "../../../assets/img/describir_las_tareas_sldM1.webp";
import imgOption2 from "../../../assets/img/difundir_riesgos_sldM1.webp";
import imgOption3 from "../../../assets/img/identificar_riesgos_sldM1.webp";

import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import imgVerdadero from "../../../assets/img/checkAct.png";
import imgFalso from "../../../assets/img/xmarkAct.png";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";

// DraggableOption component remains the same
function DraggableOption({ id, text, isDropped }) {
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
      className="draggable-option cursor-pointer bg-white border-2 border-gray-300 rounded-md flex items-center justify-center"
    >
      <div className="w-full h-full text-center p-2 overflow-hidden">
        {text}
      </div>
    </div>
  );
}

// DropArea component remains the same
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
        {children && (
          <div className="w-full h-full bg-white border-2 border-gray-300 rounded-md flex items-center justify-center">
            <Paragraph theme="light">
              <textarea
                className="w-[145px] h-[150px] resize-none text-center p-2"
                defaultValue={children}
                readOnly
              />
            </Paragraph>
          </div>
        )}
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

export default function DragAndDropAlturas2() {
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
  const [isResetDisabled, setIsResetDisabled] = useState(true);

  const options = [
    { id: "option1", text: "-Inspección previa y periódica de los equipos de sujeción. -Capacitación sobre el uso correcto de arneses y sistemas de sujeción. -uso obligatorio de líneas de vida certificadas. -Sistema de doble anclaje.", label: "Caso 1", value: 1, imgSrc: imgOption1 },
    { id: "option2", text: "-Verificación de estabilidad de la plataforma antes de usarla. -Certificación del equipo. -Uso de líneas de vida adicionales para seguridad.", label: "Caso 2", value: 2, imgSrc: imgOption2 },
    { id: "option3", text: "-Uso de arneses con líneas de vida. -Implementar árias de exclusión debajo de la zona de trabajo. -Uso de redes de protección para caída de herramientas o materiales.", label: "Caso 3", value: 3, imgSrc: imgOption3 },
  ];

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  );

  const handleReset = () => {
    setItems({
      drop1: null,
      drop2: null,
      drop3: null,
    });
    setFeedback("");
    setFeedbackColor("");
    setVerificationImages({});
    setCorrectAnswersCount(0);
    setIsResetDisabled(true);
  };

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
        (over.id === "drop3" && active.id === "option3");

      let feedbackText = "";
      if (isCorrect) {
        switch (active.id) {
          case "option1":
            feedbackText = "Los guantes son esenciales para proteger las manos de cortes, abrasiones y sustancias peligrosas durante la manipulación de cargas.";
            break;
          case "option2":
            feedbackText = "El casco es crucial para proteger la cabeza de impactos y caídas de objetos, especialmente en áreas de construcción.";
            break;
          case "option3":
            feedbackText = "Las botas de seguridad protegen los pies de caídas de objetos pesados y proporcionan estabilidad en superficies irregulares.";
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

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:flex-2 bg-white md:w-3/3 w-full px-2 flex justify-center items-center pb-2">
          <div className="md:flex-2 display-mobile ligth-display bg-white md:w-full w-full px-6 md:pr-20 flex flex-col justify-center items-center mb-3 mt-10"
            style={{
              position: "relative",
              top: "-40px",
            }}
          >
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
              <div className="flex flex-row justify-center gap-4 mb-2">
                <div className="flex flex-col gap-4 justify-center z-10">
                  <Paragraph theme="light">
                    {options.map((option) => (
                      <DraggableOption
                        key={option.id}
                        id={option.id}
                        text={option.text}
                        isDropped={Object.values(items).includes(option.id)}
                      />
                    ))}
                  </Paragraph>
                </div>
                <div className="flex flex-col gap-4 justify-center">
                  {options.map((option, index) => (
                    <div key={option.id} className="flex flex-row items-center">
                      <DropArea
                        id={`drop${index + 1}`}
                        verificationImage={verificationImages[`drop${index + 1}`]}
                      >
                        {items[`drop${index + 1}`] && options.find(opt => opt.id === items[`drop${index + 1}`])?.text}
                      </DropArea>
                      <div className="p-2 border-2 border-gray-300 rounded" style={{ width: "150px", height: "150px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#C0185D" }}>
                        <Paragraph style={{ color: "white" }} className="font-bold">
                          {option.label}
                        </Paragraph>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DndContext>
            <div className="flex flex-row gap-4 justify-center mt-4">
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
        </div>
      </div>
    </div>
  );
}

