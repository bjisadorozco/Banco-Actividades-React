"use client"

import { useState, useEffect } from "react"
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core"
import { useDroppable, useDraggable } from "@dnd-kit/core"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import sistema_oxiacetileno from "/src/assets/img/sistema_oxiacetileno_ppt17.webp"
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

function DroppableArea({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  })

  return (
    <div ref={setNodeRef} className={`drop-boxppt17 ${isOver ? "dropbox-overppt17" : ""}`}>
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
  const [isResetDisabled, setIsResetDisabled] = useState(true)
  const [hiddenItems, setHiddenItems] = useState([])
  const [allItemsPlaced, setAllItemsPlaced] = useState(false)

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
        setTimeout(() => setFeedbackMessage(""), 2000)
        return
      }

      const isCorrect = texts[draggedElementId.split("-")[1]].title === correctItems[dropId]

      setDroppedTexts((prevState) => ({
        ...prevState,
        [dropId]: texts[draggedElementId.split("-")[1]].title,
      }))

      setHiddenItems((prevHiddenItems) => [...prevHiddenItems, draggedElementId])

      setFeedbackMessage(
        isCorrect ? "¡Correcto! Has colocado el texto correctamente." : "¡Incorrecto! Intenta nuevamente.",
      )

      setHistory((prevHistory) => [
        ...prevHistory,
        {
          action: "add",
          text: texts[draggedElementId.split("-")[1]].title,
          to: dropId,
        },
      ])
    }
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
    }

    setDroppedTexts(newDroppedTexts)
    setHistory(history.slice(0, -1))
  }

  const handleReset = () => {
    setDroppedTexts({
      box1: "",
      box2: "",
      box3: "",
    })
    setFeedbackMessage("")
    setHistory([])
    setHiddenItems([])
    setAllItemsPlaced(false)
  }

  useEffect(() => {
    const allPlaced = Object.values(droppedTexts).every((text) => text !== "")
    setAllItemsPlaced(allPlaced)
    setIsResetDisabled(!allPlaced)
  }, [droppedTexts])

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="drag-and-drop-containerppt17">
        <div className={`main-contentppt17 ${allItemsPlaced ? "completed-stateppt17" : ""}`}>
          <div className={`image-containerppt17 ${allItemsPlaced ? "centered-imageppt17" : ""}`}>
            <img
              src={sistema_oxiacetileno || "/placeholder.svg"}
              alt="Sistema Oxiacetileno"
              className="sistema-oxiacetileno-imageppt17"
            />
            <div className="drop-boxppt17" style={{ top: "12%", left: "68%" }}>
              <DroppableArea id="box1">
                {droppedTexts.box1 && (
                  <div className="dropped-text-containerppt17">
                    <span
                      className={`textppt17 ${
                        droppedTexts.box1 === correctItems.box1 ? "text-greenppt17" : "text-redppt17"
                      }`}
                    >
                      {droppedTexts.box1}
                    </span>
                  </div>
                )}
              </DroppableArea>
            </div>
            <div className="drop-boxppt17" style={{ top: "45%", left: "0%" }}>
              <DroppableArea id="box2">
                {droppedTexts.box2 && (
                  <div className="dropped-text-containerppt17">
                    <span
                      className={`textppt17 ${
                        droppedTexts.box2 === correctItems.box2 ? "text-greenppt17" : "text-redppt17"
                      }`}
                    >
                      {droppedTexts.box2}
                    </span>
                  </div>
                )}
              </DroppableArea>
            </div>
            <div className="drop-boxppt17" style={{ top: "75%", left: "0%" }}>
              <DroppableArea id="box3">
                {droppedTexts.box3 && (
                  <div className="dropped-text-containerppt17">
                    <span
                      className={`textppt17 ${
                        droppedTexts.box3 === correctItems.box3 ? "text-greenppt17" : "text-redppt17"
                      }`}
                    >
                      {droppedTexts.box3}
                    </span>
                  </div>
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
        {feedbackMessage && (
          <div className="feedback-messageppt17">
            <p>{feedbackMessage}</p>
          </div>
        )}
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

