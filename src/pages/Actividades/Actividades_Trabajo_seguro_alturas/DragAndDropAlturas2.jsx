import { useState, useEffect } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";

import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";

import uncheck from "../../../assets/img/xmarkAct.png";
import check from "../../../assets/img/checkAct.png";
import "./styles/DragAndDropAlturas2.css";

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
      style={style}
      {...listeners}
      {...attributes}
      className="draggable-option1"
    >
      {label}
    </div>
  );
}

function DropArea({ id, children, verificationImage }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`drop-area1 ${
        isOver
          ? "drop-over1"
          : children
            ? verificationImage === "correct"
              ? "drop-correct1"
              : "drop-incorrect1"
            : "drop-over1"
      }`}
    >
      {children}
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
  const [validationMessages, setValidationMessages] = useState({
    drop1: { text: "", class: "" },
    drop2: { text: "", class: "" },
    drop3: { text: "", class: "" },
  });

  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [validationMessage, setValidationMessage] = useState(null);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  const options = [
    {
      id: "option3",
      text: [
        "Uso de arneses con líneas de vida",
        "Implementar áreas de exclusión debajo de la zona de trabajo",
        "Uso de redes de protección para caída de herramientas o materiales",
      ],
      label: "Caso 3",
    },
    {
      id: "option1",
      text: [
        "Inspección previa y periódica de los equipos de sujeción",
        "Capacitación sobre el uso correcto de arneses y sistemas de sujeción",
        "Uso obligatorio de líneas de vida certificadas",
        "Sistema de doble anclaje",
      ],
      label: "Caso 1",
    },
    {
      id: "option2",
      text: [
        "Verificación de estabilidad de la plataforma antes de usarla",
        "Certificación del equipo",
        "Uso de líneas de vida adicionales para seguridad",
      ],
      label: "Caso 2",
    },
  ];

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  useEffect(() => {
    const hasDroppedItems = Object.values(items).some((item) => item !== null);
    setIsResetDisabled(!hasDroppedItems);
  }, [items]);

  useEffect(() => {
    if (Object.values(items).every(Boolean)) {
      const totalCorrect = Object.values(verificationImages).filter(
        (status) => status === "correct"
      ).length;

      const percentage = Math.round((totalCorrect / options.length) * 100);

      setValidationMessage(
        `Tus respuestas correctas son: ${totalCorrect} de 3 (${percentage}%)`
      );
    }
  }, [verificationImages]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  );

  const handleValidation = () => {
    const totalCorrect = Object.values(verificationImages).filter(
      (status) => status === "correct"
    ).length;

    const percentage = Math.round((totalCorrect / options.length) * 100);

    setValidationMessage(
      `Tus respuestas correctas son: ${totalCorrect} de 3 (${percentage}%)`
    );
  };

  const handleReset = () => {
    setItems({ drop1: null, drop2: null, drop3: null });
    setVerificationImages({});
    setValidationMessages({
      drop1: { text: "", class: "" },
      drop2: { text: "", class: "" },
      drop3: { text: "", class: "" },
    });
    setValidationMessage(null);
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

      const isCorrect =
        (over.id === "drop1" && active.id === "option1") ||
        (over.id === "drop2" && active.id === "option2") ||
        (over.id === "drop3" && active.id === "option3");

      setVerificationImages((prev) => ({
        ...prev,
        [over.id]: isCorrect ? "correct1" : "incorrect1",
      }));

      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        [over.id]: {
          text: isCorrect
            ? "¡Correcto!​"
            : "¡Incorrecto!",
          class: isCorrect ? "success1" : "error1",
        },
      }));
    }

    if (Object.values({ ...items, [over.id]: active.id }).every(Boolean)) {
      handleValidation();
    }
  };

  const remainingOptions = options.filter(
    (option) => !Object.values(items).includes(option.id)
  );

  return (
    <div className="activity-container1">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="drop-zones1">
          {options.map((option, index) => (
            <div
              key={option.id}
              className={`drop-zone1 ${
                verificationImages[`drop${index + 1}`] || ""
              }`}
            >
              {verificationImages[`drop${index + 1}`] && (
                <img
                  src={
                    verificationImages[`drop${index + 1}`] === "correct1"
                      ? check
                      : uncheck
                  }
                  alt={verificationImages[`drop${index + 1}`]}
                  className="verification-image1"
                />
              )}
              <Paragraph
                theme={
                  verificationImages[`drop${index + 1}`] ? undefined : "light"
                }
              >
                <ul className="option-text1">
                  {option.text.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Paragraph>
              <div className="drop-area1-wrapper1">
                <DropArea
                  id={`drop${index + 1}`}
                  verificationImage={verificationImages[`drop${index + 1}`]}
                >
                  {items[`drop${index + 1}`] &&
                    options.find((opt) => opt.id === items[`drop${index + 1}`])
                      ?.label}
                </DropArea>
                {validationMessages[`drop${index + 1}`]?.text && (
                  <p
                    className={`validation-message1 ${
                      validationMessages[`drop${index + 1}`]?.class
                    }`}
                  >
                    {validationMessages[`drop${index + 1}`]?.text}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {remainingOptions.length > 0 && (
          <div className="remaining-options1">
            {remainingOptions.map((option) => (
              <DraggableOption
                key={option.id}
                id={option.id}
                label={option.label}
                isDropped={Object.values(items).includes(option.id)}
              />
            ))}
          </div>
        )}

        {validationMessage && (
          <div className="validation-summary1">
            <p>{validationMessage}</p>
          </div>
        )}

        <div className="action-buttons1">
          <Button onClick={handleReset} icon={faRepeat} roundedFull={true}>
            Reiniciar
          </Button>
        </div>
      </DndContext>
    </div>
  );
}
