"use client"

import { useState, useRef } from "react"
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core"
import { useDroppable, useDraggable } from "@dnd-kit/core"
import izaje1 from "../../../assets/img/eslingas.webp"
import izaje2 from "../../../assets/img/cables_acero.webp"
import izaje3 from "../../../assets/img/tensores.webp"
import checkIcon from "../../../assets/img/checkAct.png"
import xmarkIcon from "../../../assets/img/xmarkAct.png"
import audioCablesDeAcero from "../../../assets/audio/eslingas-de-izaje-m1-slide-13-audio.mp3"
import audioEslingas from "../../../assets/audio/cables-de-acero-m1-slide-13-audio.mp3"
import audioTensores from "../../../assets/audio/Tensores-m1-slide-13-audio.mp3"
import "./styles/Sliderppt15_dragandrop_audios.css"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import Button from "../../components/Button"

function DraggableItem({ id, children, isVisible }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  })

  if (!isVisible) return null

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000, // Asegura que esté por encima durante el arrastre
      }
    : { zIndex: 1000 }

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
    <div ref={setNodeRef} className={`dropbox-ppt15 ${isOver ? "dropbox-over" : ""}`}>
      {children}
    </div>
  )
}

const Sliderppt15_dragandrop_audios = () => {
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
  const [visibleItems, setVisibleItems] = useState({
    "img1-ppt15": true,
    "img2-ppt15": true,
    "img3-ppt15": true,
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [currentAudio, setCurrentAudio] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [isActivityCompleted, setIsActivityCompleted] = useState(false)

  // Referencias para los elementos de audio
  const audioRef1 = useRef(null)
  const audioRef2 = useRef(null)
  const audioRef3 = useRef(null)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // Distancia mínima para activar el arrastre
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // Retraso para activar en dispositivos táctiles
        tolerance: 5, // Tolerancia para pequeños movimientos
      },
    }),
  )

  // Orden fijo de imágenes: izaje2 (arriba), izaje3 (centro), izaje1 (abajo)
  const orderedImages = ["img2-ppt15", "img3-ppt15", "img1-ppt15"]

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
        (dropId === "drop1" && draggedElementId === "img1-ppt15") ||
        (dropId === "drop2" && draggedElementId === "img2-ppt15") ||
        (dropId === "drop3" && draggedElementId === "img3-ppt15")

      // Actualizar el estado de los elementos arrastrados
      setDroppedItems((prevState) => ({
        ...prevState,
        [dropId]: draggedElementId,
      }))

      // Ocultar el elemento original
      setVisibleItems((prevState) => ({
        ...prevState,
        [draggedElementId]: false,
      }))

      setValidationStatus((prevState) => ({
        ...prevState,
        [dropId]: isCorrect ? "correcto" : "incorrecto",
      }))

      // Mensajes de feedback inmediato
      if (isCorrect) {
        setSuccessMessage(
          <span className="text-green-personalizado font-bold">¡Muy bien!</span>
        )
        setErrorMessage("")
      } else {
        setErrorMessage(
          <span className="text-red-personalizado font-bold">¡Piénsalo bien!</span>
        )
        setSuccessMessage("")
      }

      // Verificar si todas las imágenes han sido arrastradas
      const updatedDroppedItems = {
        ...droppedItems,
        [dropId]: draggedElementId,
      }
      const allItemsDropped = Object.values(updatedDroppedItems).every((item) => item !== null)

      if (allItemsDropped) {
        const updatedValidationStatus = {
          ...validationStatus,
          [dropId]: isCorrect ? "correcto" : "incorrecto",
        }
        const correctAnswers = Object.values(updatedValidationStatus).filter((status) => status === "correcto").length
        setCorrectCount(correctAnswers)
        setPercentage(Math.round((correctAnswers / 3) * 100))
        setIsActivityCompleted(true)
      }
    }
  }

  const handleReset = () => {
    // Reiniciar los audios
    if (audioRef1.current) {
      audioRef1.current.pause()
      audioRef1.current.currentTime = 0
    }
    if (audioRef2.current) {
      audioRef2.current.pause()
      audioRef2.current.currentTime = 0
    }
    if (audioRef3.current) {
      audioRef3.current.pause()
      audioRef3.current.currentTime = 0
    }

    // Reiniciar el estado
    setDroppedItems({
      drop1: null,
      drop2: null,
      drop3: null,
    })
    setVisibleItems({
      "img1-ppt15": true,
      "img2-ppt15": true,
      "img3-ppt15": true,
    })
    setValidationStatus({
      drop1: null,
      drop2: null,
      drop3: null,
    })
    setCurrentAudio(null)
    setErrorMessage("")
    setSuccessMessage("")
    setCorrectCount(0)
    setPercentage(0)
    setIsActivityCompleted(false)
  }

  // Función para pausar otros audios cuando uno comienza a reproducirse
  const handleAudioPlay = (audio) => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause()
    }
    setCurrentAudio(audio)
  }

  return (
    <div className="col-lg-6 col-md-12">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="activity-container-ppt15">
          <div className="image-group-ppt15">
            {orderedImages.map((id) => (
              <DraggableItem key={id} id={id} isVisible={visibleItems[id]}>
                <img
                  src={id === "img1-ppt15" ? izaje1 : id === "img2-ppt15" ? izaje2 : izaje3}
                  className="draggable-ppt15"
                  alt={id}
                />
              </DraggableItem>
            ))}
          </div>

          <div className="drop-group-ppt15">
            <div className="drop-audio-container">
              <div className="drop-container">
                <DroppableArea id="drop1">
                  {droppedItems.drop1 ? (
                    <img
                      src={
                        droppedItems.drop1 === "img1-ppt15"
                          ? izaje1
                          : droppedItems.drop1 === "img2-ppt15"
                            ? izaje2
                            : izaje3
                      }
                      alt="Cables de acero"
                    />
                  ) : (
                    <span className="drop-text">Arrastre aquí</span>
                  )}
                  {validationStatus.drop1 === "correcto" && (
                    <img src={checkIcon || "/placeholder.svg"} className="status-icon-ppt15" alt="Correcto" />
                  )}
                  {validationStatus.drop1 === "incorrecto" && (
                    <img src={xmarkIcon || "/placeholder.svg"} className="status-icon-ppt15" alt="Incorrecto" />
                  )}
                </DroppableArea>
              </div>
              <div className="audio-player-ppt15">
                <audio
                  ref={audioRef1}
                  controls
                  onPlay={(e) => handleAudioPlay(e.target)}
                >
                  <source src={audioCablesDeAcero} type="audio/mp3" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </div>
            </div>

            <div className="drop-audio-container">
              <div className="drop-container">
                <DroppableArea id="drop2">
                  {droppedItems.drop2 ? (
                    <img
                      src={
                        droppedItems.drop2 === "img1-ppt15"
                          ? izaje1
                          : droppedItems.drop2 === "img2-ppt15"
                            ? izaje2
                            : izaje3
                      }
                      alt="Eslingas"
                    />
                  ) : (
                    <span className="drop-text">Arrastre aquí</span>
                  )}
                  {validationStatus.drop2 === "correcto" && (
                    <img src={checkIcon || "/placeholder.svg"} className="status-icon-ppt15" alt="Correcto" />
                  )}
                  {validationStatus.drop2 === "incorrecto" && (
                    <img src={xmarkIcon || "/placeholder.svg"} className="status-icon-ppt15" alt="Incorrecto" />
                  )}
                </DroppableArea>
              </div>
              <div className="audio-player-ppt15">
                <audio
                  ref={audioRef2}
                  controls
                  onPlay={(e) => handleAudioPlay(e.target)}
                >
                  <source src={audioEslingas} type="audio/mp3" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </div>
            </div>

            <div className="drop-audio-container">
              <div className="drop-container">
                <DroppableArea id="drop3">
                  {droppedItems.drop3 ? (
                    <img
                      src={
                        droppedItems.drop3 === "img1-ppt15"
                          ? izaje1
                          : droppedItems.drop3 === "img2-ppt15"
                            ? izaje2
                            : izaje3
                      }
                      alt="Tensores"
                    />
                  ) : (
                    <span className="drop-text">Arrastre aquí</span>
                  )}
                  {validationStatus.drop3 === "correcto" && (
                    <img src={checkIcon || "/placeholder.svg"} className="status-icon-ppt15" alt="Correcto" />
                  )}
                  {validationStatus.drop3 === "incorrecto" && (
                    <img src={xmarkIcon || "/placeholder.svg"} className="status-icon-ppt15" alt="Incorrecto" />
                  )}
                </DroppableArea>
              </div>
              <div className="audio-player-ppt15">
                <audio
                  ref={audioRef3}
                  controls
                  onPlay={(e) => handleAudioPlay(e.target)}
                >
                  <source src={audioTensores} type="audio/mp3" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </div>
            </div>
          </div>
        </div>
      </DndContext>

      {errorMessage && (
        <div className="error-message-ppt15">
          <p>{errorMessage} <span className="texto-gray">Revisa nuevamente y vuelve a intentarlo.</span></p>
        </div>
      )}
      {successMessage && (
        <div className="success-message-ppt15">
          <p>{successMessage} <span className="texto-gray">Conoces los izajes de carga.</span></p>
        </div>
      )}

      {/* Mostrar el porcentaje de respuestas correctas */}
      {isActivityCompleted && (
        <div className="percentage-message-ppt15">
          <p>Tus respuestas correctas son: {correctCount} de 3 ({percentage}%)</p>
        </div>
      )}

      <div className="flex-container">
        <Button bold={false} icon={faRepeat} roundedFull={true} onClick={handleReset}>
          Reiniciar
        </Button>
      </div>
    </div>
  )
}

export default Sliderppt15_dragandrop_audios