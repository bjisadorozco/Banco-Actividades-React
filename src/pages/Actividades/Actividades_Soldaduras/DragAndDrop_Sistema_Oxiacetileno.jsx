"use client"

import { useState, useEffect } from "react"
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core"
import { useDroppable, useDraggable } from "@dnd-kit/core"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import sistema_oxiacetileno from "/src/assets/img/corrección_sistema_oxiacetileno.webp"
import imgVerdadero from "../../../assets/img/checkAct.png"
import imgFalso from "../../../assets/img/xmarkAct.png"
import "./styles/DragAndDrop_Sistema_Oxiacetileno.css"
import Button from "../../components/Button"

function DraggableItem({ id, children, isHidden }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  if (isHidden) return null

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  )
}

function DroppableArea({ id, children, isOver, isCorrect }) {
  const { setNodeRef } = useDroppable({
    id: id,
  })

  let className = `drop-boxppt17 ${isOver ? "dropbox-overppt17" : ""}`

  if (isCorrect !== null && isCorrect !== undefined) {
    className += isCorrect ? " correct" : " incorrect"
  }

  return (
    <div ref={setNodeRef} className={className} style={{ color: isCorrect !== undefined ? "white" : "#8f8f8f" }}>
      {children}
    </div>
  )
}

const DragAndDrop_Sistema_Oxiacetileno = () => {
  const [droppedTexts, setDroppedTexts] = useState({
    box1: "",
    box2: "",
    box3: "",
  })

  const [history, setHistory] = useState([])
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [scoreMessage, setScoreMessage] = useState("")
  const [feedbackStyle, setFeedbackStyle] = useState("")
  const [isResetDisabled, setIsResetDisabled] = useState(true)
  const [hiddenItems, setHiddenItems] = useState([])
  const [allItemsPlaced, setAllItemsPlaced] = useState(false)
  const [isOver, setIsOver] = useState(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const texts = [
    {
      title: "Juego de soplete tipo chapista c/3 picos",
    },
    {
      title: "Tapa de fundición",
    },
    {
      title: "Válvula reguladora de presión de oxígeno c/2 manómetros",
    },
  ]

  const correctItems = {
    box1: "Válvula reguladora de presión de oxígeno c/2 manómetros",
    box2: "Juego de soplete tipo chapista c/3 picos",
    box3: "Tapa de fundición",
  }

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const handleDragEnd = (event) => {
    const { over, active } = event

    if (over && over.id) {
      const dropId = over.id
      const draggedElementId = active.id

      if (droppedTexts[dropId]) {
        setFeedbackMessage("¡Ya hay un texto en este lugar! Arrastra a otro lugar.")
        setFeedbackStyle("neutral")
        setTimeout(() => {
          setFeedbackMessage("")
          setFeedbackStyle("")
        }, 2000)
        return
      }

      const isCorrect = texts[draggedElementId.split("-")[1]].title === correctItems[dropId]

      setDroppedTexts((prevState) => ({
        ...prevState,
        [dropId]: texts[draggedElementId.split("-")[1]].title,
      }))

      setHiddenItems((prevHiddenItems) => [...prevHiddenItems, draggedElementId])

      // Actualizar el puntaje
      const newCorrect = isCorrect ? score.correct + 1 : score.correct
      const newTotal = score.total + 1
      setScore({ correct: newCorrect, total: newTotal })

      // Establecer mensajes
      setFeedbackMessage(
        isCorrect ? "¡Correcto! Has colocado el texto correctamente." : "¡Incorrecto! Intenta nuevamente."
      )
      setFeedbackStyle(isCorrect ? "correct" : "incorrect")

      // Solo mostrar el porcentaje cuando se hayan colocado todos los elementos
      if (newTotal === 3) {
        const percentage = Math.round((newCorrect / newTotal) * 100)
        setScoreMessage(`Tus respuestas correctas son: ${newCorrect} de ${newTotal} (${percentage}%)`)
      } else {
        setScoreMessage("")
      }

      setHistory((prevHistory) => [
        ...prevHistory,
        {
          action: "add",
          text: texts[draggedElementId.split("-")[1]].title,
          to: dropId,
          isCorrect: isCorrect,
        },
      ])
    }
    setIsOver(null)
  }

  const handleDragOver = (event) => {
    const { over } = event
    setIsOver(over ? over.id : null)
  }

  const handleUndo = () => {
    if (history.length === 0) return

    const lastAction = history[history.length - 1]
    const newDroppedTexts = { ...droppedTexts }

    if (lastAction.action === "add") {
      delete newDroppedTexts[lastAction.to]
      setHiddenItems((prevHiddenItems) =>
        prevHiddenItems.filter((item) => item !== `text-${texts.findIndex((t) => t.title === lastAction.text)}`),
      )
      
      // Revertir el puntaje
      if (lastAction.isCorrect) {
        setScore(prev => ({...prev, correct: prev.correct - 1}))
      }
      setScore(prev => ({...prev, total: prev.total - 1}))
    }

    setDroppedTexts(newDroppedTexts)
    setHistory(history.slice(0, -1))
    
    // Actualizar mensajes de puntaje
    if (score.total > 1 && score.total === 3) {
      const percentage = Math.round((score.correct / score.total) * 100)
      setScoreMessage(`Tus respuestas correctas son: ${score.correct} de ${score.total} (${percentage}%)`)
    } else {
      setScoreMessage("")
    }
    
    setFeedbackMessage("")
    setFeedbackStyle("")
  }

  const handleReset = () => {
    setDroppedTexts({
      box1: "",
      box2: "",
      box3: "",
    })
    setFeedbackMessage("")
    setScoreMessage("")
    setFeedbackStyle("")
    setHistory([])
    setHiddenItems([])
    setAllItemsPlaced(false)
    setScore({ correct: 0, total: 0 })
  }

  useEffect(() => {
    const allPlaced = Object.values(droppedTexts).every((text) => text !== "")
    setAllItemsPlaced(allPlaced)
    setIsResetDisabled(!allPlaced)
  }, [droppedTexts])

  const getIsCorrect = (boxId) => {
    if (droppedTexts[boxId] === "") return undefined
    return droppedTexts[boxId] === correctItems[boxId]
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      <div className="drag-and-drop-containerppt17">
        <div className={`main-contentppt17 ${allItemsPlaced ? "completed-stateppt17" : ""}`}>
          <div className="image-wrapperppt17">
            <img
              src={sistema_oxiacetileno || "/placeholder.svg"}
              alt="Sistema Oxiacetileno"
              className="sistema-oxiacetileno-imageppt17"
            />
            <div className="drop-box-containerppt17">
              <DroppableArea id="box1" isOver={isOver === "box1"} isCorrect={getIsCorrect("box1")}>
                {droppedTexts.box1 ? (
                  <div className="dropped-text-containerppt17">
                    <img
                      src={droppedTexts.box1 === correctItems.box1 ? imgVerdadero : imgFalso}
                      alt={droppedTexts.box1 === correctItems.box1 ? "Correcto" : "Incorrecto"}
                      className="feedback-iconppt17"
                    />
                    <span className="textppt17">{droppedTexts.box1}</span>
                  </div>
                ) : (
                  <span className="drop-textppt17">Arrastre aquí</span>
                )}
              </DroppableArea>
              <DroppableArea id="box2" isOver={isOver === "box2"} isCorrect={getIsCorrect("box2")}>
                {droppedTexts.box2 ? (
                  <div className="dropped-text-containerppt17">
                    <img
                      src={droppedTexts.box2 === correctItems.box2 ? imgVerdadero : imgFalso}
                      alt={droppedTexts.box2 === correctItems.box2 ? "Correcto" : "Incorrecto"}
                      className="feedback-iconppt17"
                    />
                    <span className="textppt17">{droppedTexts.box2}</span>
                  </div>
                ) : (
                  <span className="drop-textppt17">Arrastre aquí</span>
                )}
              </DroppableArea>
              <DroppableArea id="box3" isOver={isOver === "box3"} isCorrect={getIsCorrect("box3")}>
                {droppedTexts.box3 ? (
                  <div className="dropped-text-containerppt17">
                    <img
                      src={droppedTexts.box3 === correctItems.box3 ? imgVerdadero : imgFalso}
                      alt={droppedTexts.box3 === correctItems.box3 ? "Correcto" : "Incorrecto"}
                      className="feedback-iconppt17"
                    />
                    <span className="textppt17">{droppedTexts.box3}</span>
                  </div>
                ) : (
                  <span className="drop-textppt17">Arrastre aquí</span>
                )}
              </DroppableArea>
            </div>
          </div>

          {!allItemsPlaced && (
            <div className="texts-containerppt17">
              {texts.map((text, index) => (
                <DraggableItem
                  key={`text-${index}`}
                  id={`text-${index}`}
                  isHidden={hiddenItems.includes(`text-${index}`)}
                >
                  <div className="draggable-textppt17">
                    <p>{text.title}</p>
                  </div>
                </DraggableItem>
              ))}
            </div>
          )}
        </div>
        <div className="feedback-containerppt17">
          {feedbackMessage && (
            <div className={`feedback-messageppt17 ${feedbackStyle}`}>
              <p>{feedbackMessage}</p>
            </div>
          )}
          {allItemsPlaced && scoreMessage && (
            <p className="score-messageppt17">{scoreMessage}</p>
          )}
        </div>
        <div className="buttons-containerppt17">
          <Button
            className="reset-buttonppt17"
            bold={false}
            icon={faRepeat}
            roundedFull={true}
            onClick={handleReset}
            disabled={isResetDisabled}
          >
            Reiniciar
          </Button>
        </div>
      </div>
    </DndContext>
  )
}

export default DragAndDrop_Sistema_Oxiacetileno