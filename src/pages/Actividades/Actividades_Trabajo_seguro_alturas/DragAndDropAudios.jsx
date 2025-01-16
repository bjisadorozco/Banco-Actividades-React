import { useState } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import Button from "../../components/Button";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";

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
        width: "190px",
        height: "60px",
        backgroundColor: "#C0185D",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        fontWeight: "bold",
        textAlign: "center",
        marginRight: "20px", // Espaciado entre drag y drop
      }}
      {...listeners}
      {...attributes}
    >
      {label}
    </div>
  );
}

function DropArea({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = {
    backgroundColor: children ? "#C0185D" : isOver ? "#e6e6e6" : "#f3f4f6",
    width: "190px",
    height: "60px",
    border: `2px dashed ${children ? "#C0185D" : "#e2e8f0"}`,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    marginRight: "20px", // Espaciado entre drop y audio
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children && <div style={{ color: "white" }}>{children}</div>}
    </div>
  );
}

export default function DragAndDropAudios() {
  const [items, setItems] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
  });

  const [message, setMessage] = useState("");

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  );

  const options = [
    { id: "option1", label: "Seguridad" },
    { id: "option2", label: "Velocidad" },
    { id: "option3", label: "Comunicación" },
  ];

  const audios = [
    "audio1.mp3", // Reemplaza con las rutas reales de los audios
    "audio2.mp3",
    "audio3.mp3",
  ];

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over && over.id) {
      if (items[over.id]) return;

      setItems((prevItems) => ({
        ...prevItems,
        [over.id]: active.id,
      }));
    }
  };

  const handleValidate = () => {
    const correctAnswers = {
      drop1: "option1",
      drop2: "option2",
      drop3: "option3",
    };

    const isCorrect = Object.keys(correctAnswers).every(
      (key) => items[key] === correctAnswers[key]
    );

    setMessage(
      isCorrect
        ? "¡Muy bien! Estas listo para profundizar en los elementos de manejo de Rescate en trabajo en alturas​"
        : "¡Piénsalo bien ! Escucha de nuevo el audio para relacionarlo correctamente​"
    );
  };

  const handleReset = () => {
    setItems({
      drop1: null,
      drop2: null,
      drop3: null,
    });
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center gap-4" style={{ width: "70%" }}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {options.map((option, index) => (
          <div
            key={option.id}
            className="flex flex-row items-center gap-4"
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              {/* Área Drag */}
              <DraggableOption
                id={option.id}
                label={option.label}
                isDropped={Object.values(items).includes(option.id)}
              />

              {/* Área Drop */}
              <DropArea id={`drop${index + 1}`}>
                {items[`drop${index + 1}`] &&
                  options.find((opt) => opt.id === items[`drop${index + 1}`])
                    ?.label}
              </DropArea>
            </div>
            {/* Botón de audio */}
            <audio controls style={{ height: "30px", width: "270px" }}>
              <source src={audios[index]} type="audio/mp3" />
              Tu navegador no soporta audio HTML5.
            </audio>
          </div>
        ))}
      </DndContext>

      <div className="flex justify-center gap-4">
        <Button onClick={handleValidate} icon={faCheck} roundedFull={true}>
          Validar
        </Button>
        <Button onClick={handleReset} icon={faRepeat} roundedFull={true}>
          Reiniciar
        </Button>
      </div>

      {message && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            color: "white",
            backgroundColor: message.includes("Muy bien")
              ? "#28A745"
              : "#DC3545",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
