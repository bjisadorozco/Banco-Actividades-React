import React, { useState, useEffect } from "react";
import { DndContext, useSensors, useSensor, MouseSensor } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Componente para un paso individual
function Step({ id, text }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        margin: "0 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      {...attributes}
      {...listeners}
    >
      <div
        style={{
          width: "220px",
          height: "60px",
          backgroundColor: "#C0185D",
          color: "white",
          clipPath:
            "polygon(0 50%, 10% 0, 100% 0, 90% 50%, 100% 100%, 10% 100%)",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {text}
      </div>
    </div>
  );
}

// Componente principal
export const OrderAudio = () => {
  const [steps, setSteps] = useState([
    {
      id: "step1",
      text: "Describir las tareas",
      audioSrc: "audio1.mp3",
    },
    {
      id: "step2",
      text: "Identificar RIESGOS",
      audioSrc: "audio2.mp3",
    },
    {
      id: "step3",
      text: "Establecer MÉTODOS DE CONTROL",
      audioSrc: "audio3.mp3",
    },
    {
      id: "step4",
      text: "Entregar herramientas de CONTROL",
      audioSrc: "audio4.mp3",
    },
    {
      id: "step5",
      text: "Difundir los RIESGOS y sus MEDIDAS DE CONTROL",
      audioSrc: "audio5.mp3",
    },
  ]);

  // Barajar los pasos al cargar el componente
  useEffect(() => {
    setSteps((prevSteps) =>
      [...prevSteps].sort(() => Math.random() - 0.5) // Orden aleatorio
    );
  }, []);

  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = steps.findIndex((step) => step.id === active.id);
      const newIndex = steps.findIndex((step) => step.id === over.id);

      setSteps((prevSteps) => arrayMove(prevSteps, oldIndex, newIndex));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={steps} strategy={horizontalListSortingStrategy}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <Step id={step.id} text={step.text} />
                <audio controls style={{ marginTop: "10px", width: "200px" }}>
                  <source src={step.audioSrc} type="audio/mpeg" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default OrderAudio;
