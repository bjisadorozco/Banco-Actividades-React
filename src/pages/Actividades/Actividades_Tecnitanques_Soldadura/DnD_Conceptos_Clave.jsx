import { useState, useEffect } from "react"
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core"
import { useDroppable, useDraggable } from "@dnd-kit/core"
import { faRepeat, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../components/Button"
import "../../Actividades/Actividades_Tecnitanques_Soldadura/styles/DnD_Conceptos_clave.css"
// Import your images here
import image1 from "../../../assets/img/areas_diseñadas.webp" // Área específica
import image3 from "../../../assets/img/permiso_trabajo.webp" // Trabajo con llama
import image2 from "../../../assets/img/trabajo_caliente.webp" // Permiso de trabajo
import image4 from "../../../assets/img/soldadura.webp"
import checkIcon from "../../../assets/img/checkAct.png"
import xmarkIcon from "../../../assets/img/xmarkAct.png"

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

const MatchingActivity = () => {
    const [droppedItems, setDroppedItems] = useState({
        drop1: null,
        drop2: null,
        drop3: null,
        drop4: null,
    })
    const [validationStatus, setValidationStatus] = useState({
        drop1: null,
        drop2: null,
        drop3: null,
        drop4: null,
    })
    const [draggedItems, setDraggedItems] = useState({
        btn1: true,
        btn2: true,
        btn3: true,
        btn4: true,
    })
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [correctCount, setCorrectCount] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [isActivityCompleted, setIsActivityCompleted] = useState(false)
    const [isValidated, setIsValidated] = useState(false)
    const [isResetEnabled, setIsResetEnabled] = useState(false)

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

    // Custom drop area texts
    const dropAreaTexts = {
        drop1:
            "Área específica y diseñada para estos trabajos en caliente, como un taller de soldadura o una localización exterior especifica",
        drop2:
            "Trabajo que involucra la presencia de llama abierta generada por equipos de soldadura o corte que pueden transformarse en una fuente de ignición en áreas con riesgos de incendio",
        drop3:
            "Permiso que aplica para trabajos de trabajo en caliente a menos que se trabaje en un área designada a 'prueba de incendio'",
        drop4:
            "Experto encargado de dar conocimiento, capacitación y experiencia para identificar, evaluar y asegurar controles adecuados de los peligros asociados con el trabajo en caliente",
    }

    // Correct answers for each drop area
    const correctAnswers = {
        drop1: "btn4",
        drop2: "btn1",
        drop3: "btn2",
        drop4: "btn3",
    }

    // Option texts
    const optionTexts = {
        btn1: "Trabajo con Fuego o LLama",
        btn2: "Permiso de Trabajo en Caliente",
        btn3: "Soldadura",
        btn4: "Diseñadas o Autorizadas",
    }

    useEffect(() => {
        if (isValidated) {
            const correct = Object.entries(droppedItems).filter(([dropId, dragId]) =>
                dragId && dragId.split("-")[0] === correctAnswers[dropId]
            ).length;
            setCorrectCount(correct)
            setPercentage(Math.round((correct / 4) * 100))
        }
    }, [isValidated, droppedItems])

    useEffect(() => {
        // Verifica si TODOS los drop areas tienen un elemento
        const allItemsDropped = Object.values(droppedItems).every(item => item !== null);
        setIsResetEnabled(allItemsDropped);
    }, [droppedItems]);

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

            setDroppedItems((prevState) => ({
                ...prevState,
                [dropId]: draggedElementId,
            }))

            setDraggedItems((prevState) => ({
                ...prevState,
                [draggedElementId.split("-")[0]]: false,
            }))

            setErrorMessage("")
            setSuccessMessage("")
        }
    }

    const handleValidate = () => {
        // Validar todas las respuestas
        const newValidationStatus = {}
        let correct = 0

        Object.entries(droppedItems).forEach(([dropId, dragId]) => {
            if (dragId) {
                const isCorrect = dragId.split("-")[0] === correctAnswers[dropId]
                newValidationStatus[dropId] = isCorrect ? "correcto" : "incorrecto"
                if (isCorrect) correct++
            }
        })

        setValidationStatus(newValidationStatus)
        setIsValidated(true)
        setIsActivityCompleted(true)

        if (correct === 4) {
            setSuccessMessage("¡Excelente! Has identificado correctamente todos los elementos.")
        } else {
            setErrorMessage("Revisa bien la relación entre los elementos y sus descripciones.")
        }
    }

    const handleReset = () => {
        setDroppedItems({
            drop1: null,
            drop2: null,
            drop3: null,
            drop4: null,
        })
        setValidationStatus({
            drop1: null,
            drop2: null,
            drop3: null,
            drop4: null,
        })
        setDraggedItems({
            btn1: true,
            btn2: true,
            btn3: true,
            btn4: true,
        })
        setErrorMessage("")
        setSuccessMessage("")
        setCorrectCount(0)
        setPercentage(0)
        setIsActivityCompleted(false)
        setIsValidated(false)
    }

    return (
        <div className="col-lg-12 col-md-12">
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <div className="activity-container-ppt9-USADAD">
                    {/* Cards con imágenes y texto */}
                    <div className="cards-row-ppt9-USADAD">
                        <div className="card-ppt9-USADAD">
                            <div style={{ position: 'relative' }}>
                                <img src={image1 || "/placeholder.svg"} className="card-image-ppt9-USADAD mb-0" alt="Área específica" />
                                {isValidated && (
                                    <div >
                                        <img
                                            src={validationStatus.drop1 === "correcto" ? checkIcon : xmarkIcon}
                                            className="status-icon-ppt9-USADAD"
                                            style={{
                                                width: '40px',
                                                height: '40px'
                                            }}
                                            alt={validationStatus.drop1 === "correcto" ? "Correcto" : "Incorrecto"}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={`card-text-ppt9-USADAD ${isValidated && validationStatus.drop1 === "correcto" ? "correct-card-text" : isValidated && validationStatus.drop1 === "incorrecto" ? "incorrect-card-text" : ""}`}>
                                <p>Área específica y diseñada para estos trabajos en caliente, como un taller de soldadura o una localización exterior especifica</p>
                            </div>
                        </div>
                        <div className="card-ppt9-USADAD">
                            <div style={{ position: 'relative' }}>
                                <img src={image2 || "/placeholder.svg"} className="card-image-ppt9-USADAD mb-0" alt="Trabajo con llama" />
                                {isValidated && (
                                    <div>
                                        <img
                                            src={validationStatus.drop2 === "correcto" ? checkIcon : xmarkIcon}
                                            className="status-icon-ppt9-USADAD"
                                            style={{
                                                width: '40px',
                                                height: '40px'
                                            }}
                                            alt={validationStatus.drop2 === "correcto" ? "Correcto" : "Incorrecto"}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={`card-text-ppt9-USADAD ${isValidated && validationStatus.drop2 === "correcto" ? "correct-card-text" : isValidated && validationStatus.drop2 === "incorrecto" ? "incorrect-card-text" : ""}`}>
                                <p>Trabajo que involucra la presencia de llama abierta generada por equipos de soldadura o corte que pueden transformarse en una fuente de ignición en áreas con riesgos de incendio</p>
                            </div>
                        </div>
                        <div className="card-ppt9-USADAD">
                            <div style={{ position: 'relative' }}>
                                <img src={image3 || "/placeholder.svg"} className="card-image-ppt9-USADAD mb-0" alt="Permiso de trabajo" />
                                {isValidated && (
                                    <div>
                                        <img
                                            src={validationStatus.drop3 === "correcto" ? checkIcon : xmarkIcon}
                                            className="status-icon-ppt9-USADAD"
                                            style={{
                                                width: '40px',
                                                height: '40px'
                                            }}
                                            alt={validationStatus.drop3 === "correcto" ? "Correcto" : "Incorrecto"}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={`card-text-ppt9-USADAD ${isValidated && validationStatus.drop3 === "correcto" ? "correct-card-text" : isValidated && validationStatus.drop3 === "incorrecto" ? "incorrect-card-text" : ""}`}>
                                <p>Permiso que aplica para trabajos de trabajo en caliente a menos que se trabaje en un área designada a 'prueba de incendio'</p>
                            </div>
                        </div>
                        <div className="card-ppt9-USADAD">
                            <div style={{ position: 'relative' }}>
                                <img src={image4 || "/placeholder.svg"} className="card-image-ppt9-USADAD mb-0" alt="Experto en evaluación" />
                                {isValidated && (
                                    <div >
                                        <img
                                            src={validationStatus.drop4 === "correcto" ? checkIcon : xmarkIcon}
                                            className="status-icon-ppt9-USADAD"
                                            style={{
                                                width: '40px',
                                                height: '40px'
                                            }}
                                            alt={validationStatus.drop4 === "correcto" ? "Correcto" : "Incorrecto"}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={`card-text-ppt9-USADAD ${isValidated && validationStatus.drop4 === "correcto" ? "correct-card-text" : isValidated && validationStatus.drop4 === "incorrecto" ? "incorrect-card-text" : ""}`}>
                                <p>Experto encargado de dar conocimiento, capacitación y experiencia para identificar, evaluar y asegurar controles adecuados de los peligros asociados con el trabajo en caliente</p>
                            </div>
                        </div>
                    </div>

                    {/* Drop areas */}
                    <div className="drop-row-ppt9-USADAD">
                        <DroppableArea id="drop1">
                            <div className={`drop-item-ppt9-USADAD ${validationStatus.drop1 === "correcto" ? "correct-USADAD" : validationStatus.drop1 === "incorrecto" ? "incorrect-USADAD" : ""}`}>
                                <div className={`dropbox-ppt9-USADAD ${droppedItems.drop1 ? "bg-estructural" : ""}`} id="drop1-USADAD">
                                    {droppedItems.drop1 ? (
                                        <span className="drop-text-USADAD">{optionTexts[droppedItems.drop1.split("-")[0]]}</span>
                                    ) : (
                                        <span className="drop-text-USADAD">Arrastra aquí</span>
                                    )}
                                </div>
                            </div>
                        </DroppableArea>

                        <DroppableArea id="drop2">
                            <div className={`drop-item-ppt9-USADAD ${validationStatus.drop2 === "correcto" ? "correct-USADAD" : validationStatus.drop2 === "incorrecto" ? "incorrect-USADAD" : ""}`}>
                                <div className={`dropbox-ppt9-USADAD ${droppedItems.drop2 ? "bg-colgante" : ""}`} id="drop2-USADAD">
                                    {droppedItems.drop2 ? (
                                        <span className="drop-text-USADAD">{optionTexts[droppedItems.drop2.split("-")[0]]}</span>
                                    ) : (
                                        <span className="drop-text-USADAD">Arrastra aquí</span>
                                    )}
                                </div>
                            </div>
                        </DroppableArea>

                        <DroppableArea id="drop3">
                            <div className={`drop-item-ppt9-USADAD ${validationStatus.drop3 === "correcto" ? "correct-USADAD" : validationStatus.drop3 === "incorrecto" ? "incorrect-USADAD" : ""}`}>
                                <div className={`dropbox-ppt9-USADAD ${droppedItems.drop3 ? "bg-prefabricado" : ""}`} id="drop3-USADAD">
                                    {droppedItems.drop3 ? (
                                        <span className="drop-text-USADAD">{optionTexts[droppedItems.drop3.split("-")[0]]}</span>
                                    ) : (
                                        <span className="drop-text-USADAD">Arrastra aquí</span>
                                    )}
                                </div>
                            </div>
                        </DroppableArea>

                        <DroppableArea id="drop4">
                            <div className={`drop-item-ppt9-USADAD ${validationStatus.drop4 === "correcto" ? "correct-USADAD" : validationStatus.drop4 === "incorrecto" ? "incorrect-USADAD" : ""}`}>
                                <div className={`dropbox-ppt9-USADAD ${droppedItems.drop4 ? "bg-prefabricado" : ""}`} id="drop4-USADAD">
                                    {droppedItems.drop4 ? (
                                        <span className="drop-text-USADAD">{optionTexts[droppedItems.drop4.split("-")[0]]}</span>
                                    ) : (
                                        <span className="drop-text-USADAD">Arrastra aquí</span>
                                    )}
                                </div>
                            </div>
                        </DroppableArea>
                    </div>

                    {/* Botones de arrastrar */}
                    <div className="button-row-ppt9-USADAD">
                        {draggedItems.btn1 && (
                            <DraggableItem id="btn1-USADAD">
                                <button className="option-ppt9-USADAD bg-estructural" id="btn1-USADAD" draggable="false">
                                    {optionTexts.btn1}
                                </button>
                            </DraggableItem>
                        )}
                        {draggedItems.btn2 && (
                            <DraggableItem id="btn2-USADAD">
                                <button className="option-ppt9-USADAD bg-colgante" id="btn2-USADAD" draggable="false">
                                    {optionTexts.btn2}
                                </button>
                            </DraggableItem>
                        )}
                        {draggedItems.btn3 && (
                            <DraggableItem id="btn3-USADAD">
                                <button className="option-ppt9-USADAD bg-prefabricado" id="btn3-USADAD" draggable="false">
                                    {optionTexts.btn3}
                                </button>
                            </DraggableItem>
                        )}
                        {draggedItems.btn4 && (
                            <DraggableItem id="btn4-USADAD">
                                <button className="option-ppt9-USADAD bg-prefabricado" id="btn4-USADAD" draggable="false">
                                    {optionTexts.btn4}
                                </button>
                            </DraggableItem>
                        )}
                    </div>
                </div>
            </DndContext>

            {/* Resultados y botón de validación/reinicio */}
            {isActivityCompleted && (
                <div className="results-container-USADAD text-center mt-4 mb-4">
                    <h3 className="text-md font-bold text-paragraph-light-color text-monserrat-USADAD">
                        Has completado {correctCount} de 4 correctamente ({percentage}%)
                    </h3>
                </div>
            )}

            {/* <div className="flex-container-USADAD">
                {!isValidated ? (
                    <Button
                        onClick={handleValidate}
                        icon={faCheck}
                        roundedFull={true}
                        className={`${isResetEnabled ? "" : "disabled"}`}
                        disabled={!isResetEnabled}
                    >
                        Validar
                    </Button>
                ) : (
                    <Button
                        onClick={handleReset}
                        icon={faRepeat}
                        roundedFull={true}
                        className="reset-button"
                    >
                        Reiniciar
                    </Button>
                )}
            </div> */}
            <div className="flex-container-USADAD" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <Button
                    onClick={handleValidate}
                    icon={faCheck}
                    roundedFull={true}
                    disabled={!isResetEnabled}
                >
                    Validar
                </Button>
                <Button
                    onClick={handleReset}
                    icon={faRepeat}
                    roundedFull={true}
                    disabled={!isValidated}
                >
                    Reiniciar
                </Button>
            </div>
        </div>
    )
}

export default MatchingActivity