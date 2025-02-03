import React, { useState, useEffect } from "react";
import { DndContext, useSensors, useSensor, MouseSensor } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";

import audio1 from "../../../assets/audio/Alturas1 M2 – Slide 18 Audio.mp3";
import audio2 from "../../../assets/audio/Alturas2 M2 – Slide 18 Audio.mp3";
import audio3 from "../../../assets/audio/Alturas3 M2 – Slide 18 Audio.mp3";
import audio4 from "../../../assets/audio/Alturas4 M2 – Slide 18 Audio.mp3";
import audio5 from "../../../assets/audio/Alturas5 M2 – Slide 18 Audio.mp3";

import img1 from "../../../assets/img/establecer_metodos_de_control_sldM1.webp";
import img2 from "../../../assets/img/identificar_riesgos_sldM1.webp";
import img3 from "../../../assets/img/describir_las_tareas_sldM1.webp";
import img4 from "../../../assets/img/difundir_riesgos_sldM1.webp";

function Step({ id, text, audioSrc, imgSrc, isCorrect }) {
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
          width: "100px",
          height: "100px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          marginBottom: "10px",
        }}
      >
        <img
          src={imgSrc}
          alt="Paso"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div
        style={{
          width: "220px",
          padding: "10px",
          borderRadius: "12px",
          backgroundColor: "#F3F4F6",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "70px",
            backgroundColor:
              isCorrect === null ? "#0F172A" : isCorrect ? "#4CAF50" : "#F44336",
            color: "white",
            clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%, 10% 50%)",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "normal",
            wordWrap: "break-word",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          {text}
        </div>

        <audio
          controls
          style={{ width: "100%", height: "30px", marginTop: "10px" }}
        >
          <source src={audioSrc} type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      </div>
    </div>
  );
}

export const OrderAudio = () => {
  const [steps, setSteps] = useState([
    {
      id: "step1",
      text: "1. Describir las tareas",
      audioSrc: audio1,
      img: img1,
      isCorrect: null,
    },
    {
      id: "step2",
      text: "2. Identificar riesgos",
      img: img2,
      audioSrc: audio2,
      isCorrect: null,
    },
    {
      id: "step3",
      text: "3. Establecer métodos de control",
      audioSrc: audio3,
      img: img3,
      isCorrect: null,
    },
    {
      id: "step4",
      text: "4. Entregar herramientas de control",
      audioSrc: audio4,
      img: img4,
      isCorrect: null,
    },
    {
      id: "step5",
      text: "5. Difundir los riesgos y sus medidas de control",
      audioSrc: audio5,
      img: img4,
      isCorrect: null,
    },
  ]);

  const [isLocked, setIsLocked] = useState(false);
  const [dragAttempted, setDragAttempted] = useState(false);

  const correctOrder = ["step1", "step2", "step3", "step4", "step5"];

  useEffect(() => {
    setSteps((prevSteps) =>
      [...prevSteps].sort(() => Math.random() - 0.5) // Orden aleatorio
    );
  }, []);

  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event) => {
    if (isLocked) {
      setDragAttempted(true);
      return; // Evitar movimientos si está bloqueado
    }

    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = steps.findIndex((step) => step.id === active.id);
      const newIndex = steps.findIndex((step) => step.id === over.id);

      setSteps((prevSteps) => arrayMove(prevSteps, oldIndex, newIndex));
      setDragAttempted(false);
    }
  };

  const handleValidate = () => {
    setSteps((prevSteps) =>
      prevSteps.map((step, index) => ({
        ...step,
        isCorrect: step.id === correctOrder[index],
      }))
    );
    setIsLocked(true); // Bloquear orden
    setDragAttempted(false);
  };

  const handleReset = () => {
    setSteps((prevSteps) =>
      [...prevSteps].sort(() => Math.random() - 0.5).map((step) => ({
        ...step,
        isCorrect: null,
      }))
    );
    setIsLocked(false); // Desbloquear orden
    setDragAttempted(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={steps} strategy={horizontalListSortingStrategy}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {steps.map((step) => (
              <Step
                key={step.id}
                id={step.id}
                text={step.text}
                audioSrc={step.audioSrc}
                imgSrc={step.img}
                isCorrect={step.isCorrect}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div style={{ display: "flex", gap: "10px" }}>
        <Button onClick={handleValidate} icon={faCheck}>
          Validar
        </Button>
        <Button onClick={handleReset} icon={faRepeat}>
          Reiniciar
        </Button>
      </div>

      {dragAttempted && isLocked && (
        <div style={{ color: "#F44336", fontWeight: "bold", marginTop: "10px" }}>
          No puedes arrastrar los pasos después de validarlos.
        </div>
      )}
    </div>
  );
};

export default OrderAudio;
