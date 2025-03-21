"use client"

import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRepeat, faUndo } from "@fortawesome/free-solid-svg-icons"
import imgTrue from "../../../assets/img/checkAct.png"
import imgFalse from "../../../assets/img/xmarkAct.png"
import DragAndDropMobile from "./Drag_And_DropMobile"
import audioBotas from "/src/assets/audio/botas_con_punta_de_acero.mp3"
import audioArnes from "/src/assets/audio/arnes_de_cuerpo_completo.mp3"
import audioOverol from "/src/assets/audio/overoles_resistente_a_quimicos.mp3"
import audioProtector from "/src/assets/audio/tapones_o_protectore_auditivos.mp3"
import audioGafas from "/src/assets/audio/gafas_de_seguridad.mp3"
import audioGuantes from "/src/assets/audio/guantes_resistentes_a_quimicos.mp3"
import audioRespirador from "/src/assets/audio/respiradores_purificadores_de_aire.mp3"
import botas from "/src/assets/img/botas_sldM2.webp"
import arnes from "/src/assets/img/arnes_sldM2.webp"
import overol from "/src/assets/img/overoles_resistentes_quimicos_sldM2.webp"
import protector from "/src/assets/img/protectores_auditivos_sldM2.webp"
import gafas from "/src/assets/img/gafas_seguridad_sldM2.webp"
import guantes from "/src/assets/img/guantes_sldM2.webp"
import respirador from "/src/assets/img/respiradores_sldM2.webp"
import trabajador from "/src/assets/img/sistema_oxiacetileno_ppt17.webp"

const items = [
  {
    id: "A",
    name: "Casco de Protección",
    audio: "/src/assets/audio/EPP/casco_de_proteccion.mp3",
    image: "/src/assets/img/Elementos_EPP/casco_sldM2.webp",
    correctBoxId: "leftColumn",
  },
  {
    id: "H",
    name: "Botas",
    audio: audioBotas,
    image: botas,
    correctBoxId: "rightColumn",
  },
  {
    id: "C",
    name: "Arnés de Cuerpo Completo",
    audio: audioArnes,
    image: arnes,
    correctBoxId: "leftColumn",
  },
  {
    id: "D",
    name: "Overol",
    audio: audioOverol,
    image: overol,
    correctBoxId: "leftColumn",
  },
  {
    id: "B",
    name: "Tapones Auditivos",
    audio: audioProtector,
    image: protector,
    correctBoxId: "leftColumn",
  },
  {
    id: "E",
    name: "Gafas de Seguridad",
    audio: audioGafas,
    image: gafas,
    correctBoxId: "rightColumn",
  },
  {
    id: "G",
    name: "Guantes Resistentes a Químicos",
    audio: audioGuantes,
    image: guantes,
    correctBoxId: "rightColumn",
  },
  {
    id: "F",
    name: "Respirador Purificador de Aire",
    audio: audioRespirador,
    image: respirador,
    correctBoxId: "rightColumn",
  },
]

const leftColumnItems = ["A", "B", "C", "D"]
const rightColumnItems = ["E", "F", "G", "H"]

const DragAndDrop = () => {
  const [droppedItems, setDroppedItems] = useState({})
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [audioSrc, setAudioSrc] = useState("")
  const [isResetDisabled, setIsResetDisabled] = useState(true)
  const [history, setHistory] = useState([])
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current.load()
      audioRef.current.play()
    }
  }, [audioSrc])

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item.id)
  }

  const handleDrop = (e, targetId) => {
    e.preventDefault()

    const itemId = e.dataTransfer.getData("text/plain")
    const draggedItem = items.find((item) => item.id === itemId)

    if (!draggedItem) {
      console.error("Item no encontrado:", itemId)
      return
    }

    const previousDroppedItems = { ...droppedItems }
    const previousHistory = [...history]

    const existingItem = Object.values(droppedItems).find((droppedItem) => droppedItem.id === draggedItem.id)

    if (existingItem) {
      const updatedDroppedItems = { ...droppedItems }
      delete updatedDroppedItems[existingItem.correctBoxId]

      setDroppedItems({
        ...updatedDroppedItems,
        [targetId]: draggedItem,
      })
    } else {
      const isCorrect = isItemCorrect(draggedItem.id, targetId)

      if (!droppedItems[targetId]) {
        setDroppedItems((prevDroppedItems) => ({
          ...prevDroppedItems,
          [targetId]: draggedItem,
        }))

        if (isCorrect) {
          setFeedbackMessage(
            <>
              <span className="text-[#4CAF50] font-bold">Relación correcta: </span>
              <span className="text-[#808693]">
                ¡Muy bien! Identificaste este ítem correctamente. Ahora escucha el siguiente audio:
              </span>
            </>,
          )
          setAudioSrc(draggedItem.audio)
          previousHistory.push({
            action: "add",
            item: draggedItem,
            to: targetId,
          })
        } else {
          setFeedbackMessage(
            <>
              <span className="text-[#FF7043] font-bold">Relación incorrecta: </span>
              <span className="text-[#808693]">
                ¡Piénsalo bien! El ítem no corresponde a este elemento de protección personal, vuelve a intentarlo.
              </span>
            </>,
          )
          setAudioSrc("") // Borra el audio si es incorrecto
          previousHistory.push({
            action: "incorrect",
            item: draggedItem,
            to: targetId,
          })
        }
      }
      setHistory(previousHistory)
    }
  }

  const handleUndo = () => {
    if (history.length === 0) return

    const lastAction = history[history.length - 1]
    const newDroppedItems = { ...droppedItems }

    if (lastAction.action === "add" || lastAction.action === "incorrect") {
      delete newDroppedItems[lastAction.to]
    }

    setDroppedItems(newDroppedItems)
    setHistory(history.slice(0, -1)) // Eliminar la última acción del historial
  }

  const handleReset = () => {
    setDroppedItems({})
    setFeedbackMessage("")
    setAudioSrc("")
  }

  const isItemCorrect = (itemId, targetId) => {
    return (
      (leftColumnItems.includes(targetId) && leftColumnItems.includes(itemId)) ||
      (rightColumnItems.includes(targetId) && rightColumnItems.includes(itemId))
    )
  }

  const allItemsCorrect = () => {
    return Object.values(droppedItems).every((item) => {
      return isItemCorrect(item.id, item.correctBoxId)
    })
  }

  useEffect(() => {
    if (Object.keys(droppedItems).length === items.length) {
      setIsResetDisabled(false)
    } else {
      setIsResetDisabled(true)
    }
  }, [droppedItems])

  return (
    <div className="md:w-full flex bg-white flex-col justify-center md:static relative mb-0">
      <div className="md:flex flex-col items-center justify-center relative hidden">
        <div className="w-full bg-white flex flex-col items-center justify-center text-[#808693] md:rounded-lg mb-[1px] rounded-md ">
          <div className="w-full flex justify-center items-center">
            {/* Contenedor inicial */}
            <div className="flex justify-start items-center relative right-16">
              {/* Columna izquierda */}
              <div className="flex flex-col items-center mr-4">
                {leftColumnItems.map((itemId) => {
                  const item = items.find((i) => i.id === itemId)
                  const isCorrect = isItemCorrect(item.id, itemId)
                  return (
                    <div
                      key={item.id}
                      id={item.id}
                      className={`relative w-16 h-16 border-2 flex flex-col items-center justify-center border-dashed border-[#9C99A1] ${
                        droppedItems[item.id]
                          ? isItemCorrect(droppedItems[item.id].id, itemId)
                            ? "bg-[#4CAF50] border-solid"
                            : "bg-[#FF7043] border-solid"
                          : "bg-[#ebebeb] hover:bg-[#D3C4F1]"
                      } rounded flex items-center justify-center my-1`}
                      onDrop={(e) => handleDrop(e, item.id)}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      {droppedItems[item.id] && isItemCorrect(droppedItems[item.id].id, itemId) && (
                        <span
                          className={`w-[150px] bg-[#4CAF50] text-white text-[14px] leading-4 absolute z-30 text-center px-2 py-1 rounded-full ${
                            leftColumnItems.includes(item.id) ? "right-[calc(100%+10px)]" : "left-[calc(100%+10px)]"
                          } top-2`}
                        >
                          {droppedItems[item.id].name}
                        </span>
                      )}
                      {droppedItems[item.id] && (
                        <img
                          src={isItemCorrect(droppedItems[item.id].id, itemId) ? imgTrue : imgFalse}
                          alt={isItemCorrect(droppedItems[item.id].id, itemId) ? "Correcto" : "Incorrecto"}
                          className="w-8 h-8 left-8 top-2 p-1"
                        />
                      )}
                      {droppedItems[item.id] ? (
                        <img
                          src={droppedItems[item.id].image || "/placeholder.svg"}
                          alt={droppedItems[item.id].name}
                          className="w-full h-full relative z-20 object-cover bottom-6 rounded m-0"
                        />
                      ) : (
                        <span className="text-[#808693] text-center text-[14px] leading-4">
                          Arrastre aquí <br /> {item.id}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Imagen central con efecto de lupa */}
              <div className="flex items-center justify-center mx-4">
                <div className="image-zoom-container">
                  <img
                    src={trabajador || "/placeholder.svg"}
                    alt="Trabajador con equipo de protección"
                    className="w-[120px] mb-0 image-zoom"
                  />
                </div>
              </div>

              {/* Columna derecha */}
              <div className="flex flex-col items-center ml-4">
                {rightColumnItems.map((itemId) => {
                  const item = items.find((i) => i.id === itemId)
                  const isCorrect = isItemCorrect(item.id, itemId)
                  return (
                    <div
                      key={item.id}
                      id={item.id}
                      className={`relative w-16 h-16 border-2 flex flex-col items-center justify-center border-dashed border-[#9C99A1] ${
                        droppedItems[item.id]
                          ? isItemCorrect(droppedItems[item.id].id, itemId)
                            ? "bg-[#4CAF50] border-solid"
                            : "bg-[#FF7043] border-solid"
                          : "bg-[#ebebeb] hover:bg-[#D3C4F1]"
                      } rounded flex items-center justify-center my-1`}
                      onDrop={(e) => handleDrop(e, item.id)}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      {droppedItems[item.id] && (
                        <>
                          {droppedItems[item.id] && isItemCorrect(droppedItems[item.id].id, itemId) && (
                            <span className="w-[150px] bg-[#4CAF50] text-white text-[14px] leading-4 absolute z-10 object-cover top-2 left-16 text-center px-2 py-1 rounded-full">
                              {droppedItems[item.id].name}
                            </span>
                          )}
                          <img
                            src={isItemCorrect(droppedItems[item.id].id, itemId) ? imgTrue : imgFalse}
                            alt={isItemCorrect(droppedItems[item.id].id, itemId) ? "Correcto" : "Incorrecto"}
                            className="w-8 h-8 left-8 top-2 p-1"
                          />
                        </>
                      )}
                      {droppedItems[item.id] ? (
                        <img
                          src={droppedItems[item.id].image || "/placeholder.svg"}
                          alt={droppedItems[item.id].name}
                          className="w-full h-full relative z-20 object-cover bottom-6 rounded m-0"
                        />
                      ) : (
                        <span className="text-[#808693] text-center text-[14px] leading-4">
                          Arrastre aquí <br /> {item.id}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Contenedor de los botones y elementos arrastrables */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    className={`bg-[#6E3CD2] flex items-center justify-center text-white rounded-full h-8 px-8 py-2 text-[16px]`}
                    onClick={handleUndo}
                    disabled={history.length === 0}
                  >
                    <FontAwesomeIcon icon={faUndo} /> Deshacer
                  </button>
                  <button
                    className={`bg-[#6E3CD2] flex items-center justify-center text-white rounded-full h-8 px-8 py-2 text-[16px]`}
                    onClick={handleReset}
                  >
                    <FontAwesomeIcon icon={faRepeat} /> Reiniciar
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 relative left-28">
                  {items.map(
                    (item) =>
                      !Object.values(droppedItems).some((droppedItem) => droppedItem.id === item.id) && (
                        <img
                          key={item.id}
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          draggable
                          onDragStart={(e) => handleDragStart(e, item)}
                          className="w-16 h-16 mb-0 cursor-pointer border-2 border-[#6E3CD2] rounded"
                        />
                      ),
                  )}
                </div>
              </div>
            </div>

            {/* Retroalimentación y Audio */}
            <div className="my-4">
              <div className="shadow-lg bg-[#FCFCFC]  p-2 rounded-lg text-[16px] text-center items-center justify-center flex flex-col">
                {feedbackMessage && (
                  <>
                    <p className={audioSrc ? "font-sembild text-[#4CAF50]" : "font-sembild text-[#FF7043]"}>
                      {feedbackMessage}
                    </p>
                    {audioSrc && (
                      <audio ref={audioRef} controls className="border border-gray-300 rounded-md shadow-sm">
                        <source src={audioSrc} type="audio/mp3" />
                        Tu navegador no soporta la etiqueta de audio.
                      </audio>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <DragAndDropMobile
          items={items}
          droppedItems={droppedItems}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          feedbackMessage={feedbackMessage}
          audioRef={audioRef}
          audioSrc={audioSrc}
          setAudioSrc={setAudioSrc}
          handleReset={handleReset}
        />
      </div>
    </div>
  )
}

export default DragAndDrop