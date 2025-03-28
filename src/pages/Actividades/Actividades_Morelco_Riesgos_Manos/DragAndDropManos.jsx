import { useState, useRef } from "react"
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
import "./styles/DragAndDropManos.css"
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
    <div ref={setNodeRef} className={`drop-item-sld5 ${isOver ? "dropbox-over" : ""}`}>
      {children}
    </div>
  )
}

const DragAndDropManos = () => {
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
    img1: true,
    img2: true,
    img3: true,
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [audioElement, setAudioElement] = useState(null)
  const [currentAudio, setCurrentAudio] = useState(null)

  // Nuevos estados para el conteo de respuestas correctas y el porcentaje
  const [correctCount, setCorrectCount] = useState(0)
  const [percentage, setPercentage] = useState(0)

  // Nuevo estado para controlar si la actividad está completa
  const [isActivityCompleted, setIsActivityCompleted] = useState(false)

  const audioRef1 = useRef(new Audio(audioFisicas))
  const audioRef2 = useRef(new Audio(audioEconomicas))
  const audioRef3 = useRef(new Audio(audioLaborales))

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const playAudio = (audioSource) => {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }

    let newAudio = null
    if (audioSource === "audioFisicas") {
      newAudio = audioRef1.current
    } else if (audioSource === "audioEconomicas") {
      newAudio = audioRef2.current
    } else if (audioSource === "audioLaborales") {
      newAudio = audioRef3.current
    }

    setCurrentAudio(newAudio)
    setAudioElement(audioSource)
    newAudio.play()
  }

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
        (dropId === "drop1" && draggedElementId === "img1-sld5") ||
        (dropId === "drop2" && draggedElementId === "img2-sld5") ||
        (dropId === "drop3" && draggedElementId === "img3-sld5")

      // Actualizar droppedItems y validationStatus
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

      // Verificar si todas las imágenes han sido arrastradas
      const updatedDroppedItems = {
        ...droppedItems,
        [dropId]: draggedElementId,
      }
      const allItemsDropped = Object.values(updatedDroppedItems).every((item) => item !== null)

      if (allItemsDropped) {
        // Calcular respuestas correctas y porcentaje
        const updatedValidationStatus = {
          ...validationStatus,
          [dropId]: isCorrect ? "correcto" : "incorrecto",
        }
        const correctAnswers = Object.values(updatedValidationStatus).filter((status) => status === "correcto").length
        setCorrectCount(correctAnswers)
        setPercentage(Math.round((correctAnswers / 3) * 100))
        setIsActivityCompleted(true)
      }

      if (isCorrect) {
        setSuccessMessage("¡Correcto! Ahora, escucha el siguiente audio que complementa esta información")
        setErrorMessage("") // Clear error message on correct placement
        let audioSource = null
        switch (draggedElementId) {
          case "img1-sld5":
            audioSource = "audioFisicas"
            break
          case "img2-sld5":
            audioSource = "audioEconomicas"
            break
          case "img3-sld5":
            audioSource = "audioLaborales"
            break
          default:
            break
        }

        if (audioSource) {
          setAudioElement(audioSource)
        }
      } else {
        setErrorMessage("Nos has arrastrado correctamente la imagen")
        setSuccessMessage("")
        setCurrentAudio(null)
        setAudioElement(null)
      }
    }
  }

  const handleReset = () => {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }
    setDroppedItems({
      drop1: null,
      drop2: null,
      drop3: null,
    })
    setDraggedItems({
      img1: true,
      img2: true,
      img3: true,
    })
    setValidationStatus({
      drop1: null,
      drop2: null,
      drop3: null,
    })

    setCurrentAudio(null)
    setAudioElement(null)
    setErrorMessage("")
    setSuccessMessage("")
    setCorrectCount(0)
    setPercentage(0)
    setIsActivityCompleted(false)
  }

  const calculateResults = () => {
    const totalDrops = Object.keys(validationStatus).length;
    const correctAnswers = Object.values(validationStatus).filter(status => status === "correcto").length;
    const percentage = Math.round((correctAnswers / totalDrops) * 100);
    return { correctAnswers, percentage };
  };
  
  const allDropped = Object.values(droppedItems).every(item => item !== null);
  const { correctAnswers, percentage } = calculateResults();

  return (
    <div className="col-lg-6 col-md-12">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="activity-container-sld5">
          
          <div className="image-group-sld5">

            {draggedItems.img1 && (
              <DraggableItem id="img1-sld5">
                <img src={mano1 || "/placeholder.svg"} className="draggable-sld5" id="img1-sld5" alt="Físicas" />
              </DraggableItem>
            )}
            {draggedItems.img2 && (
              <DraggableItem id="img2-sld5">
                <img src={mano2 || "/placeholder.svg"} className="draggable-sld5" id="img2-sld5" alt="Económicas" />
              </DraggableItem>
            )}
            {draggedItems.img3 && (
              <DraggableItem id="img3-sld5">
                <img src={mano3 || "/placeholder.svg"} className="draggable-sld5" id="img3-sld5" alt="Laborales" />
              </DraggableItem>
            )}
          </div>

          <div className="drop-group-sld5">
            <DroppableArea id="drop1">
              <div
                className={`drop-item-sld5 ${validationStatus.drop1 === "correcto" ? "correct" : validationStatus.drop1 === "incorrecto" ? "incorrect" : ""}`}
              >
                <div className="dropbox-sld5" id="drop1-sld5">
                  {droppedItems.drop1 ? (
                    <img
                      src={
                        droppedItems.drop1 === "img1-sld5" ? mano1 : droppedItems.drop1 === "img2-sld5" ? mano2 : mano3
                      }
                      alt="Físicas"
                    />
                  ) : (
                    <span className="drop-text">Arrastre aquí</span>
                  )}
                  {validationStatus.drop1 === "correcto" && (
                    <img src={checkIcon || "/placeholder.svg"} className="status-icon-sld5" alt="Correcto" />
                  )}
                  {validationStatus.drop1 === "incorrecto" && (
                    <img src={xmarkIcon || "/placeholder.svg"} className="status-icon-sld5" alt="Incorrecto" />
                  )}
                </div>
                <button
                  className={`option-sld5 ${validationStatus.drop1 === "correcto" ? "correct" : validationStatus.drop1 === "incorrecto" ? "incorrect" : ""}`}
                  id="btn1-sld5"
                  draggable="false"
                >
                  Físicas
                </button>
              </div>
            </DroppableArea>

            <DroppableArea id="drop2">
              <div
                className={`drop-item-sld5 ${validationStatus.drop2 === "correcto" ? "correct" : validationStatus.drop2 === "incorrecto" ? "incorrect" : ""}`}
              >
                <div className="dropbox-sld5" id="drop2-sld5">
                  {droppedItems.drop2 ? (
                    <img
                      src={
                        droppedItems.drop2 === "img1-sld5" ? mano1 : droppedItems.drop2 === "img2-sld5" ? mano2 : mano3
                      }
                      alt="Físicas"
                    />
                  ) : (
                    <span className="drop-text">Arrastre aquí</span>
                  )}
                  {validationStatus.drop2 === "correcto" && (
                    <img src={checkIcon || "/placeholder.svg"} className="status-icon-sld51" alt="Correcto" />
                  )}
                  {validationStatus.drop2 === "incorrecto" && (
                    <img src={xmarkIcon || "/placeholder.svg"} className="status-icon-sld51" alt="Incorrecto" />
                  )}
                </div>
                <button
                  className={`option-sld5 ${validationStatus.drop2 === "correcto" ? "correct" : validationStatus.drop2 === "incorrecto" ? "incorrect" : ""}`}
                  id="btn2-sld5"
                  draggable="false"
                >
                  Económicas
                </button>
              </div>
            </DroppableArea>

            <DroppableArea id="drop3">
              <div
                className={`drop-item-sld5 ${validationStatus.drop3 === "correcto" ? "correct" : validationStatus.drop3 === "incorrecto" ? "incorrect" : ""}`}
              >
                <div className="dropbox-sld5" id="drop3-sld5">
                  {droppedItems.drop3 ? (
                    <img
                      src={
                        droppedItems.drop3 === "img1-sld5" ? mano1 : droppedItems.drop3 === "img2-sld5" ? mano2 : mano3
                      }
                      alt="Laborales"
                    />
                  ) : (
                    <span className="drop-text">Arrastre aquí</span>
                  )}
                  {validationStatus.drop3 === "correcto" && (
                    <img src={checkIcon || "/placeholder.svg"} className="status-icon-sld52" alt="Correcto" />
                  )}
                  {validationStatus.drop3 === "incorrecto" && (
                    <img src={xmarkIcon || "/placeholder.svg"} className="status-icon-sld52" alt="Incorrecto" />
                  )}
                </div>
                <button
                  className={`option-sld5 ${validationStatus.drop3 === "correcto" ? "correct" : validationStatus.drop3 === "incorrecto" ? "incorrect" : ""}`}
                  id="btn3-sld5"
                  draggable="false"
                >
                  Laborales
                </button>
              </div>
            </DroppableArea>
          </div>
        </div>
      </DndContext>
      <div className="audio-container-sld5 my-1">
        {droppedItems.drop1 && audioElement === "audioFisicas" && (
          <div className="audio-player-sld5">
            <audio data-audio="audioFisicas" controls autoPlay>
              <source src={audioFisicas} type="audio/mp3" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        )}
        {droppedItems.drop2 && audioElement === "audioEconomicas" && (
          <div className="audio-player-sld5">
            <audio data-audio="audioEconomicas" controls autoPlay>
              <source src={audioEconomicas} type="audio/mp3" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        )}
        {droppedItems.drop3 && audioElement === "audioLaborales" && (
          <div className="audio-player-sld5">
            <audio data-audio="audioLaborales" controls autoPlay>
              <source src={audioLaborales} type="audio/mp3" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        )}
      </div>
              {/* Resto del código de la actividad */}
          <p className="text-gray-500 font-semibold text-center my-0">Respuestas correctas: {correctAnswers} de {Object.keys(validationStatus).length} ({percentage}%)</p>
      {errorMessage && <div className="error-message-sld5 ">{errorMessage}</div>}
      {successMessage && ( <div className="success-message-sld5 mt-0"> <p>{successMessage}</p> </div>)}

      <div className="flex-container mt-0">
        <Button
          bold={false}
          icon={faRepeat}
          roundedFull={true}
          onClick={handleReset}
          disabled={!allDropped} 
        >
          Reiniciar
        </Button>
      </div>
    </div>
  )
}

export default DragAndDropManos

