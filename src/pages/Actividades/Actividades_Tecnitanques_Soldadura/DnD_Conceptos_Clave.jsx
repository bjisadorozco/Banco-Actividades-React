import { useState, useEffect } from "react";
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { faRepeat, faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import "../../Actividades/Actividades_Tecnitanques_Soldadura/styles/DnD_Conceptos_clave.css";
import image1 from "../../../assets/img/areas_diseñadas.webp";
import image2 from "../../../assets/img/trabajo_caliente.webp";
import image3 from "../../../assets/img/permiso_trabajo.webp";
import image4 from "../../../assets/img/soldadura.webp";
import checkIcon from "../../../assets/img/checkAct.png";
import xmarkIcon from "../../../assets/img/xmarkAct.png";

const images = [image1, image2, image3, image4];

function DraggableItem({ id, children }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: 'transform 0.08s ease',
        cursor: 'grabbing',
        zIndex: 1000,
        touchAction: 'none'
    } : {
        cursor: 'grab',
        touchAction: 'none'
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
}

function DroppableArea({ id, children }) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div ref={setNodeRef} className={`drop-item-ppt9-USADAD ${isOver ? "dropbox-over-USADAD" : ""}`}>
            {children}
        </div>
    );
}

const MatchingActivity = () => {
    const [droppedItems, setDroppedItems] = useState({
        drop1: null,
        drop2: null,
        drop3: null,
        drop4: null,
    });

    const [validationStatus, setValidationStatus] = useState({
        drop1: null,
        drop2: null,
        drop3: null,
        drop4: null,
    });

    const [draggedItems, setDraggedItems] = useState({
        btn1: true,
        btn2: true,
        btn3: true,
        btn4: true,
    });

    const [correctCount, setCorrectCount] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [isActivityCompleted, setIsActivityCompleted] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [isResetEnabled, setIsResetEnabled] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 3,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 50,
                tolerance: 5,
            },
        })
    );

    const dropAreaTexts = {
        drop1: "Área específica y diseñada para estos trabajos en caliente, como un taller de soldadura o una localización exterior especifica",
        drop2: "Trabajo que involucra la presencia de llama abierta generada por equipos de soldadura o corte que pueden transformarse en una fuente de ignición en áreas con riesgos de incendio",
        drop3: "Permiso que aplica para trabajos de trabajo en caliente a menos que se trabaje en un área designada a 'prueba de incendio'",
        drop4: "Es una persona con el conocimiento, capacitación y experiencia para reconocer, evaluar y asegurar controles adecuados de los peligros asociados con el trabajo en caliente.​",
    };

    const correctAnswers = {
        drop1: "btn4",
        drop2: "btn1",
        drop3: "btn2",
        drop4: "btn3",
    };

    const optionTexts = {
        btn1: "Trabajo con Fuego o LLama",
        btn2: "Permiso de Trabajo en Caliente",
        btn3: "Soldadura",
        btn4: "Diseñadas o Autorizadas",
    };

    useEffect(() => {
        const allItemsDropped = Object.values(droppedItems).every(item => item !== null);
        setIsResetEnabled(allItemsDropped);
    }, [droppedItems]);

    const handleDragEnd = (event) => {
        const { over, active } = event;

        if (over && over.id) {
            const dropId = over.id;
            const draggedElementId = active.id;

            // Verificar si el elemento ya está en otro drop
            const isAlreadyDropped = Object.values(droppedItems).includes(draggedElementId);

            if (isAlreadyDropped) {
                // Encontrar dónde está actualmente el elemento
                const currentDropId = Object.keys(droppedItems).find(
                    key => droppedItems[key] === draggedElementId
                );

                // Limpiar el drop actual
                setDroppedItems(prev => ({
                    ...prev,
                    [currentDropId]: null
                }));
            }

            // Si el drop target ya tiene un elemento, devolverlo a su lugar
            if (droppedItems[dropId]) {
                setDraggedItems(prev => ({
                    ...prev,
                    [droppedItems[dropId].split("-")[0]]: true
                }));
            }

            // Colocar el nuevo elemento
            setDroppedItems(prev => ({
                ...prev,
                [dropId]: draggedElementId
            }));

            setDraggedItems(prev => ({
                ...prev,
                [draggedElementId.split("-")[0]]: false
            }));
        }
    };

    const handleValidate = () => {
        setIsValidating(true);

        const newValidationStatus = {};
        let correct = 0;

        Object.entries(droppedItems).forEach(([dropId, dragId]) => {
            if (dragId) {
                const isCorrect = dragId.split("-")[0] === correctAnswers[dropId];
                newValidationStatus[dropId] = isCorrect ? "correcto" : "incorrecto";
                if (isCorrect) correct++;
            }
        });

        setValidationStatus(newValidationStatus);
        setCorrectCount(correct);
        setPercentage(Math.round((correct / 4) * 100));
        setIsValidated(true);
        setIsActivityCompleted(true);
        setIsValidating(false);
    };

    const handleReset = () => {
        setDroppedItems({
            drop1: null,
            drop2: null,
            drop3: null,
            drop4: null,
        });
        setValidationStatus({
            drop1: null,
            drop2: null,
            drop3: null,
            drop4: null,
        });
        setDraggedItems({
            btn1: true,
            btn2: true,
            btn3: true,
            btn4: true,
        });
        setCorrectCount(0);
        setPercentage(0);
        setIsActivityCompleted(false);
        setIsValidated(false);
    };

    return (
        <div className="col-lg-12 col-md-12">
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <div className="activity-container-ppt9-USADAD">
                    {/* Cards con imágenes y texto */}
                    <div className="cards-row-ppt9-USADAD">
                        {[1, 2, 3, 4].map((num) => (
                            <div key={`card-${num}`} className="card-ppt9-USADAD">
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={images[num - 1]}
                                        className="card-image-ppt9-USADAD mb-0"
                                        alt={dropAreaTexts[`drop${num}`]}
                                    />
                                    {isValidated && (
                                        <div>
                                            <img
                                                src={validationStatus[`drop${num}`] === "correcto" ? checkIcon : xmarkIcon}
                                                className="status-icon-ppt9-USADAD"
                                                style={{ width: '40px', height: '40px' }}
                                                alt={validationStatus[`drop${num}`] === "correcto" ? "Correcto" : "Incorrecto"}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className={`card-text-ppt9-USADAD ${isValidated && validationStatus[`drop${num}`] === "correcto" ? "correct-card-text" :
                                    isValidated && validationStatus[`drop${num}`] === "incorrecto" ? "incorrect-card-text" : ""
                                    }`}>
                                    <p>{dropAreaTexts[`drop${num}`]}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Drop areas */}
                    <div className="drop-row-ppt9-USADAD">
                        {[1, 2, 3, 4].map((num) => (
                            <DroppableArea key={`drop-${num}`} id={`drop${num}`}>
                                <div className={`drop-item-ppt9-USADAD ${validationStatus[`drop${num}`] === "correcto" ? "correct-USADAD" :
                                    validationStatus[`drop${num}`] === "incorrecto" ? "incorrect-USADAD" : ""
                                    }`}>
                                    <div className={`dropbox-ppt9-USADAD ${droppedItems[`drop${num}`] ? "bg-estructural" : ""
                                        }`}>
                                        {droppedItems[`drop${num}`] ? (
                                            <span className="drop-text-USADAD">
                                                {optionTexts[droppedItems[`drop${num}`].split("-")[0]]}
                                            </span>
                                        ) : (
                                            <span className="drop-text-USADAD">Arrastra aquí</span>
                                        )}
                                    </div>
                                </div>
                            </DroppableArea>
                        ))}
                    </div>

                    {/* Botones de arrastrar */}
                    <div className="button-row-ppt9-USADAD">
                        {draggedItems.btn1 && (
                            <DraggableItem id="btn1-USADAD">
                                <button className="option-ppt9-USADAD bg-estructural" draggable="false">
                                    {optionTexts.btn1}
                                </button>
                            </DraggableItem>
                        )}
                        {draggedItems.btn2 && (
                            <DraggableItem id="btn2-USADAD">
                                <button className="option-ppt9-USADAD bg-colgante" draggable="false">
                                    {optionTexts.btn2}
                                </button>
                            </DraggableItem>
                        )}
                        {draggedItems.btn3 && (
                            <DraggableItem id="btn3-USADAD">
                                <button className="option-ppt9-USADAD bg-prefabricado" draggable="false">
                                    {optionTexts.btn3}
                                </button>
                            </DraggableItem>
                        )}
                        {draggedItems.btn4 && (
                            <DraggableItem id="btn4-USADAD">
                                <button className="option-ppt9-USADAD bg-prefabricado" draggable="false">
                                    {optionTexts.btn4}
                                </button>
                            </DraggableItem>
                        )}
                    </div>
                </div>
            </DndContext>

            {/* Resultados */}
            {isActivityCompleted && (
                <div className="results-container-USADAD text-center mt-1 mb-1">
                    <h3 className="text-md font-bold text-paragraph-light-color">
                        Tus respuestas correctas son: {correctCount} de 4 ({percentage}%)
                    </h3>
                </div>
            )}

            {/* Mensajes de feedback */}
            {isActivityCompleted && (
                <div className="feedback-container-picaduras p-0 rounded-lg text-center" style={{ margin: 0 }}>
                    {correctCount === 4 ? (
                        <p className="text-md">
                            <span className="text-green-personalizado font-bold">Respuestas correctas:</span>{" "}
                            <span className="texto-gray">¡Muy bien! Has identificado correctamente todos los elementos.</span>
                        </p>
                    ) : correctCount > 0 ? (
                        <p className="text-md">
                            <span className="text-orange-personalizado font-bold">Piénsalo bien:</span>{" "}
                            <span className="texto-gray">
                                Algunas opciones NO las has relacionado correctamente.
                            </span>
                        </p>
                    ) : (
                        <p className="text-md">
                            <span className="text-red-personalizado font-bold">Respuesta Incorrecta:</span>{" "}
                            <span className="texto-gray">
                                Ninguna respuesta es correcta. ¡Inténtalo de nuevo!
                            </span>
                        </p>
                    )}
                </div>
            )}

            {/* Botones */}
            <div className="flex-container-USADAD" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <Button
                    onClick={handleValidate}
                    icon={faCheck}
                    roundedFull={true}
                    disabled={!isResetEnabled || isValidating}
                    loading={isValidating}
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
    );
};

export default MatchingActivity;