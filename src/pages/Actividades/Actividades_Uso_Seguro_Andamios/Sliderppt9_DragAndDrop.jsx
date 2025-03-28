"use client"

import { useState, useEffect } from "react"
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core"
import { useDroppable, useDraggable } from "@dnd-kit/core"
import mano1 from "../../../assets/img/fisicas_correccion_sin_ruido_visual.webp"
import mano2 from "../../../assets/img/economicas_correccion-sin_flecha.webp"
import mano3 from "../../../assets/img/laborales_con_fondo_sld5.webp"
import checkIcon from "../../../assets/img/checkAct.png"
import xmarkIcon from "../../../assets/img/xmarkAct.png"
import audioFisicas from "../../../assets/audio/FISICAS-Morelco.mp3"
import audioEconomicas from "../../../assets/audio/ECONOMICAS-Morelco.mp3"
import audioLaborales from "../../../assets/audio/LABORALES-Morelco.mp3"
import "./styles/Sliderppt9_DragAndDrop.css"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import Button from "../../components/Button"

function DraggableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  )
}

function DroppableArea({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  })

  return (
    <div ref={setNodeRef} className={`drop-item-ppt9-USADAD ${isOver ? "dropbox-over-USADAD" : ""}`}>
      {children}
    </div>
  )
}

const Sliderppt9_DragAndDrop = () => {
  const [droppedItems, setDroppedItems] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
  })
  const [validationStatus, setValidationStatus] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
  })
  const [draggedItems, setDraggedItems] = useState({
    btn1: true,
    btn2: true,
    btn3: true,
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [correctCount, setCorrectCount] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [isActivityCompleted, setIsActivityCompleted] = useState(false)
  const [isResetEnabled, setIsResetEnabled] = useState(false)

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  useEffect(() => {
    const correct = Object.values(validationStatus).filter((status) => status === "correcto").length
    setCorrectCount(correct)
    setPercentage(Math.round((correct / 3) * 100))
  }, [validationStatus])

  useEffect(() => {
    if (Object.values(droppedItems).every((item) => item !== null)) {
      setIsActivityCompleted(true)
    }
  }, [droppedItems])

  useEffect(() => {
    setIsResetEnabled(Object.values(droppedItems).some((item) => item !== null))
  }, [droppedItems])

  const handleDragEnd = (event) => {
    const { over, active } = event

    if (over && over.id) {
      const dropId = over.id
      const draggedElementId = active.id

      if (droppedItems[dropId]) {
        if (droppedItems[dropId] === draggedElementId) {
          return
        } else {
          setErrorMessage("¡Ya hay una imagen en este lugar! Arrastra a otro lugar.")
          setTimeout(() => setErrorMessage(""), 2000)
          return
        }
      }

      const isCorrect =
        (dropId === "drop1" && draggedElementId === "btn1-ppt9") ||
        (dropId === "drop2" && draggedElementId === "btn2-ppt9") ||
        (dropId === "drop3" && draggedElementId === "btn3-ppt9")

      setDroppedItems((prevState) => ({
        ...prevState,
        [dropId]: draggedElementId,
      }))

      setValidationStatus((prevState) => ({
        ...prevState,
        [dropId]: isCorrect ? "correcto" : "incorrecto",
      }))

      setDraggedItems((prevState) => ({
        ...prevState,
        [draggedElementId.split("-")[0]]: false,
      }))

      if (isCorrect) {
        setSuccessMessage(
          "Respuesta(s) correcta(s): ¡Muy bien! Sigue atento a ubicar los andamios en nuestra organización.",
        )
        setErrorMessage("")
      } else {
        setErrorMessage(
          "Respuesta(s) incorrecta(s): ¡Piénsalo bien! Trata de pensar en espacios pequeños o de difícil acceso para trabajar.",
        )
        setSuccessMessage("")
      }
    }
  }

  const handleReset = () => {
    setDroppedItems({
      drop1: null,
      drop2: null,
      drop3: null,
    })
    setValidationStatus({
      drop1: null,
      drop2: null,
      drop3: null,
    })
    setDraggedItems({
      btn1: true,
      btn2: true,
      btn3: true,
    })
    setErrorMessage("")
    setSuccessMessage("")
    setCorrectCount(0)
    setPercentage(0)
    setIsActivityCompleted(false)
    setIsResetEnabled(false)
  }

  return (
    <div className="col-lg-6 col-md-12">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="activity-container-ppt9-USADAD">
          <div className="image-row-ppt9-USADAD">
            <div className="image-container-ppt9-USADAD">
              <img src={mano1 || "/placeholder.svg"} className="draggable-ppt9-USADAD" alt="Físicas" />
              <audio controls>
                <source src={audioFisicas} type="audio/mp3" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
            <div className="image-container-ppt9-USADAD">
              <img src={mano2 || "/placeholder.svg"} className="draggable-ppt9-USADAD" alt="Económicas" />
              <audio controls>
                <source src={audioEconomicas} type="audio/mp3" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
            <div className="image-container-ppt9-USADAD">
              <img src={mano3 || "/placeholder.svg"} className="draggable-ppt9-USADAD" alt="Laborales" />
              <audio controls>
                <source src={audioLaborales} type="audio/mp3" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
          </div>

          <div className="drop-row-ppt9-USADAD">
            <DroppableArea id="drop1">
              <div
                className={`drop-item-ppt9-USADAD ${validationStatus.drop1 === "correcto" ? "correct-USADAD" : validationStatus.drop1 === "incorrecto" ? "incorrect-USADAD" : ""}`}
              >
                <div
                  className={`dropbox-ppt9-USADAD ${droppedItems.drop1 === "btn1-ppt9" ? "bg-estructural" : droppedItems.drop1 === "btn2-ppt9" ? "bg-colgante" : droppedItems.drop1 === "btn3-ppt9" ? "bg-prefabricado" : ""}`}
                  id="drop1-ppt9"
                >
                  {droppedItems.drop1 ? (
                    <span className="drop-text-USADAD">
                      {droppedItems.drop1 === "btn1-ppt9"
                        ? "ANDAMIO ESTRUCTURAL"
                        : droppedItems.drop1 === "btn2-ppt9"
                          ? "ANDAMIO COLGANTE"
                          : "ANDAMIO PREFABRICADO"}
                    </span>
                  ) : (
                    <span className="drop-text-USADAD">Arrastre aquí</span>
                  )}
                  {validationStatus.drop1 && (
                    <img
                      src={validationStatus.drop1 === "correcto" ? checkIcon : xmarkIcon}
                      className="status-icon-ppt9-USADAD"
                      alt={validationStatus.drop1 === "correcto" ? "Correcto" : "Incorrecto"}
                    />
                  )}
                </div>
              </div>
            </DroppableArea>

            <DroppableArea id="drop2">
              <div
                className={`drop-item-ppt9-USADAD ${validationStatus.drop2 === "correcto" ? "correct-USADAD" : validationStatus.drop2 === "incorrecto" ? "incorrect-USADAD" : ""}`}
              >
                <div
                  className={`dropbox-ppt9-USADAD ${droppedItems.drop2 === "btn1-ppt9" ? "bg-estructural" : droppedItems.drop2 === "btn2-ppt9" ? "bg-colgante" : droppedItems.drop2 === "btn3-ppt9" ? "bg-prefabricado" : ""}`}
                  id="drop2-ppt9"
                >
                  {droppedItems.drop2 ? (
                    <span className="drop-text-USADAD">
                      {droppedItems.drop2 === "btn1-ppt9"
                        ? "ANDAMIO ESTRUCTURAL"
                        : droppedItems.drop2 === "btn2-ppt9"
                          ? "ANDAMIO COLGANTE"
                          : "ANDAMIO PREFABRICADO"}
                    </span>
                  ) : (
                    <span className="drop-text-USADAD">Arrastre aquí</span>
                  )}
                  {validationStatus.drop2 && (
                    <img
                      src={validationStatus.drop2 === "correcto" ? checkIcon : xmarkIcon}
                      className="status-icon-ppt9-USADAD"
                      alt={validationStatus.drop2 === "correcto" ? "Correcto" : "Incorrecto"}
                    />
                  )}
                </div>
              </div>
            </DroppableArea>

            <DroppableArea id="drop3">
              <div
                className={`drop-item-ppt9-USADAD ${validationStatus.drop3 === "correcto" ? "correct-USADAD" : validationStatus.drop3 === "incorrecto" ? "incorrect-USADAD" : ""}`}
              >
                <div
                  className={`dropbox-ppt9-USADAD ${droppedItems.drop3 === "btn1-ppt9" ? "bg-estructural" : droppedItems.drop3 === "btn2-ppt9" ? "bg-colgante" : droppedItems.drop3 === "btn3-ppt9" ? "bg-prefabricado" : ""}`}
                  id="drop3-ppt9"
                >
                  {droppedItems.drop3 ? (
                    <span className="drop-text-USADAD">
                      {droppedItems.drop3 === "btn1-ppt9"
                        ? "ANDAMIO ESTRUCTURAL"
                        : droppedItems.drop3 === "btn2-ppt9"
                          ? "ANDAMIO COLGANTE"
                          : "ANDAMIO PREFABRICADO"}
                    </span>
                  ) : (
                    <span className="drop-text-USADAD">Arrastre aquí</span>
                  )}
                  {validationStatus.drop3 && (
                    <img
                      src={validationStatus.drop3 === "correcto" ? checkIcon : xmarkIcon}
                      className="status-icon-ppt9-USADAD"
                      alt={validationStatus.drop3 === "correcto" ? "Correcto" : "Incorrecto"}
                    />
                  )}
                </div>
              </div>
            </DroppableArea>
          </div>

          <div className="button-row-ppt9-USADAD">
            {draggedItems.btn2 && (
              <DraggableItem id="btn2-ppt9">
                <button className="option-ppt9-USADAD bg-colgante" id="btn2-ppt9" draggable="false">
                  ANDAMIO COLGANTE
                </button>
              </DraggableItem>
            )}
            {draggedItems.btn3 && (
              <DraggableItem id="btn3-ppt9">
                <button className="option-ppt9-USADAD bg-prefabricado" id="btn3-ppt9" draggable="false">
                  ANDAMIO PREFABRICADO
                </button>
              </DraggableItem>
            )}
            {draggedItems.btn1 && (
              <DraggableItem id="btn1-ppt9">
                <button className="option-ppt9-USADAD bg-estructural" id="btn1-ppt9" draggable="false">
                  ANDAMIO ESTRUCTURAL
                </button>
              </DraggableItem>
            )}
          </div>
        </div>
      </DndContext>

      {errorMessage && (
        <div className="error-message-ppt9-USADAD">
          <span className="error-label">Respuesta incorrecta:</span>{" "}
          <span className="error-text">
            ¡Piénsalo bien! Trata de pensar en espacios pequeños o de difícil acceso para trabajar.
          </span>
        </div>
      )}
      {successMessage && (
        <div className="success-message-ppt9-USADAD">
          <span className="success-label">Respuesta correcta:</span>{" "}
          <span className="success-text">¡Muy bien! Sigue atento a ubicar los andamios en nuestra organización.</span>
        </div>
      )}

      {isActivityCompleted && (
        <div className="results-container-USADAD text-center mt-4 mb-4">
          <h3 className="text-md font-bold text-paragraph-light-color text-monserrat-USADAD">
            Tus respuestas correctas son: {correctCount} de 3 ({percentage}%)
          </h3>
        </div>
      )}

      {/* Botón de reinicio */}
      <div className="flex-container-USADAD">
        <Button
          bold={false}
          icon={faRepeat}
          roundedFull={true}
          onClick={handleReset}
          disabled={!isResetEnabled}
          className={`reset-button ${isResetEnabled ? "" : "disabled"}`}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  )
}

export default Sliderppt9_DragAndDrop

