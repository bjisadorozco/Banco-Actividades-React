import { useState, useEffect } from "react"
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core"
import { useDroppable, useDraggable } from "@dnd-kit/core"
import imagenOxiacetileno from "../../../assets/img/adm_programa_prevencion.webp"
import checkIcon from "../../../assets/img/checkAct.png"
import xmarkIcon from "../../../assets/img/xmarkAct.png"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import Button from "../../components/Button"
import "./styles/DnD_Sistema_Oxiacetileno.css"

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
        <div ref={setNodeRef} className={`drop-zone ${isOver ? "dropbox-over" : ""}`}>
            {children}
        </div>
    )
}

const SliderOxiacetileno_DragAndDrop = () => {
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
                    setErrorMessage("¡Ya hay un elemento en este lugar! Arrastra a otro lugar.")
                    setTimeout(() => setErrorMessage(""), 2000)
                    return
                }
            }

            const isCorrect =
                (dropId === "drop1" && draggedElementId === "btn1") ||
                (dropId === "drop2" && draggedElementId === "btn2") ||
                (dropId === "drop3" && draggedElementId === "btn3")

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
                [draggedElementId]: false,
            }))

            if (isCorrect) {
                setSuccessMessage(
                    "¡Muy bien! Has identificado correctamente una parte del sistema de oxiacetileno."
                )
                setErrorMessage("")
            } else {
                setErrorMessage(
                    "Respuesta incorrecta. Revisa bien las partes del sistema de oxiacetileno."
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
        <div className="oxiacetileno-container">
            <div className="instruction-header">
                <h3>Selecciona las 3 partes faltantes del sistema de Oxiacetileno:</h3>
            </div>

            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <div className="activity-container">
                    <div className="image-with-drops-container">
                        {/* Imagen central */}
                        <div className="image-container">
                            <img src={imagenOxiacetileno || "/placeholder.svg"} className="oxiacetileno-image" alt="Sistema de Oxiacetileno" />
                        </div>

                        {/* Partes ya posicionadas */}
                        <div className="fixed-labels">
                            <div className="fixed-label" style={{ top: '50%', right: '20%' }}>
                                <div className="connector-line"></div>
                                <div className="label-box">Sistema arrestallama</div>
                            </div>
                            <div className="fixed-label" style={{ top: '30%', right: '25%' }}>
                                <div className="connector-line"></div>
                                <div className="label-box">7 mts. de manguera</div>
                            </div>
                            <div className="fixed-label" style={{ bottom: '20%', right: '15%' }}>
                                <div className="connector-line"></div>
                                <div className="label-box">Carro de traslado</div>
                            </div>
                        </div>

                        {/* Áreas drop con líneas conectoras */}
                        <div className="droppable-areas">
                            <div className="drop-area-with-line" style={{ top: '15%', right: '20%' }}>
                                <div className="connector-line"></div>
                                <DroppableArea id="drop1">
                                    <div className={`drop-box ${validationStatus.drop1 === "correcto" ? "correct" : validationStatus.drop1 === "incorrecto" ? "incorrect" : ""}`}>
                                        {droppedItems.drop1 ? (
                                            <span className="drop-text">
                                                {droppedItems.drop1 === "btn1" ? "Válvula reguladora" :
                                                    droppedItems.drop1 === "btn2" ? "Juego de soplete" :
                                                        "Tapa de fundición"}
                                            </span>
                                        ) : (
                                            <span className="drop-text">Arrastre aquí</span>
                                        )}
                                        {validationStatus.drop1 && (
                                            <img
                                                src={validationStatus.drop1 === "correcto" ? checkIcon : xmarkIcon}
                                                className="status-icon"
                                                alt={validationStatus.drop1 === "correcto" ? "Correcto" : "Incorrecto"}
                                            />
                                        )}
                                    </div>
                                </DroppableArea>
                            </div>

                            <div className="drop-area-with-line" style={{ top: '40%', left: '10%' }}>
                                <div className="connector-line"></div>
                                <DroppableArea id="drop2">
                                    <div className={`drop-box ${validationStatus.drop2 === "correcto" ? "correct" : validationStatus.drop2 === "incorrecto" ? "incorrect" : ""}`}>
                                        {droppedItems.drop2 ? (
                                            <span className="drop-text">
                                                {droppedItems.drop2 === "btn1" ? "Válvula reguladora" :
                                                    droppedItems.drop2 === "btn2" ? "Juego de soplete" :
                                                        "Tapa de fundición"}
                                            </span>
                                        ) : (
                                            <span className="drop-text">Arrastre aquí</span>
                                        )}
                                        {validationStatus.drop2 && (
                                            <img
                                                src={validationStatus.drop2 === "correcto" ? checkIcon : xmarkIcon}
                                                className="status-icon"
                                                alt={validationStatus.drop2 === "correcto" ? "Correcto" : "Incorrecto"}
                                            />
                                        )}
                                    </div>
                                </DroppableArea>
                            </div>

                            <div className="drop-area-with-line" style={{ bottom: '30%', left: '15%' }}>
                                <div className="connector-line"></div>
                                <DroppableArea id="drop3">
                                    <div className={`drop-box ${validationStatus.drop3 === "correcto" ? "correct" : validationStatus.drop3 === "incorrecto" ? "incorrect" : ""}`}>
                                        {droppedItems.drop3 ? (
                                            <span className="drop-text">
                                                {droppedItems.drop3 === "btn1" ? "Válvula reguladora" :
                                                    droppedItems.drop3 === "btn2" ? "Juego de soplete" :
                                                        "Tapa de fundición"}
                                            </span>
                                        ) : (
                                            <span className="drop-text">Arrastre aquí</span>
                                        )}
                                        {validationStatus.drop3 && (
                                            <img
                                                src={validationStatus.drop3 === "correcto" ? checkIcon : xmarkIcon}
                                                className="status-icon"
                                                alt={validationStatus.drop3 === "correcto" ? "Correcto" : "Incorrecto"}
                                            />
                                        )}
                                    </div>
                                </DroppableArea>
                            </div>
                        </div>
                    </div>

                    <div className="options-container">
                        <div className="draggable-options">
                            {draggedItems.btn1 && (
                                <DraggableItem id="btn1">
                                    <button className="option-button" id="btn1" draggable="false">
                                        Válvula reguladora de presión de oxígeno
                                    </button>
                                </DraggableItem>
                            )}
                            {draggedItems.btn2 && (
                                <DraggableItem id="btn2">
                                    <button className="option-button" id="btn2" draggable="false">
                                        Juego de soplete tipo chapista
                                    </button>
                                </DraggableItem>
                            )}
                            {draggedItems.btn3 && (
                                <DraggableItem id="btn3">
                                    <button className="option-button" id="btn3" draggable="false">
                                        Tapa de fundición
                                    </button>
                                </DraggableItem>
                            )}
                        </div>
                    </div>
                </div>
            </DndContext>

            {errorMessage && (
                <div className="error-message">
                    <span className="error-label">Respuesta incorrecta:</span>{" "}
                    <span className="error-text">{errorMessage}</span>
                </div>
            )}
            {successMessage && (
                <div className="success-message">
                    <span className="success-label">Respuesta correcta:</span>{" "}
                    <span className="success-text">{successMessage}</span>
                </div>
            )}

            {isActivityCompleted && (
                <div className="results-container">
                    <h3 className="results-text">
                        Tus respuestas correctas son: {correctCount} de 3 ({percentage}%)
                    </h3>
                </div>
            )}

            <div className="button-container">
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

export default SliderOxiacetileno_DragAndDrop