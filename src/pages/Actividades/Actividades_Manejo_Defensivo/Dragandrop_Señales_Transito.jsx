import React, { useState, useEffect } from "react";
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import imgCheck from "../../../assets/img/checkAct.png";
import imgXmark from "../../../assets/img/xmarkAct.png";
import imgInformativas from "../../../assets/img/informativas_sld17.webp";
import imgPreventivas from "../../../assets/img/señal4.webp";
import imgReglamentarios from "../../../assets/img/reglamentarios_sld17.webp";
import imgTransitorias from "../../../assets/img/transitorias_sld17.webp";
import "./styles/Dragandrop_Señales_Transito.css";

function DraggableItem({ id, children, isHidden }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    if (isHidden) return null;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
}

function DroppableArea({ id, children, isOver, isValidated, isCorrect }) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div
            ref={setNodeRef}
            className={`drop-zone-dadstrans ${isOver ? 'drop-over-dadstrans' : ''} ${isValidated ? (isCorrect ? 'correct-dropzone-dadstrans' : 'incorrect-dropzone-dadstrans') : ''
                }`}
        >
            {children}
        </div>
    );
}

const Dragandrop_Señales_Transito = () => {
    const [droppedItems, setDroppedItems] = useState({
        transitorias: null,
        reglamentarios: null,
        informativas: null,
        preventivas: null,
        semaforos: null,
        demarcaciones: null,
    });
    const [hiddenItems, setHiddenItems] = useState([]);
    const [isOver, setIsOver] = useState(null);
    const [validationResult, setValidationResult] = useState(null);
    const [isValidated, setIsValidated] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({
        transitorias: "",
        preventivas: "",
        informativas: "",
        reglamentarios: "",
        semaforos: "",
        demarcaciones: "",
    });
    const [hasInteraction, setHasInteraction] = useState(false);

    // Señales desordenadas (solo una vez al montar el componente)
    const [signals] = useState(() => [
        { id: "reglamentarios", text: "REGLAMENTARIOS" },
        { id: "preventivas", text: "PREVENTIVAS" },
        { id: "transitorias", text: "TRANSITORIAS" },
        { id: "informativas", text: "INFORMATIVAS" },
        { id: "semaforos", text: "SEMÁFOROS" },
        { id: "demarcaciones", text: "DEMARCACIONES" },
    ].sort(() => Math.random() - 0.5));

    const images = {
        transitorias: imgTransitorias,
        reglamentarios: imgReglamentarios,
        informativas: imgInformativas,
        preventivas: imgPreventivas,
        semaforos: imgInformativas, // Reutilizando imagen existente
        demarcaciones: imgPreventivas, // Reutilizando imagen existente
    };

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDragEnd = (event) => {
        const { over, active } = event;

        if (over && over.id) {
            const dropZoneId = over.id;
            const signalId = active.id;

            if (droppedItems[dropZoneId]) return;

            setDroppedItems(prev => ({
                ...prev,
                [dropZoneId]: signalId
            }));

            setHiddenItems(prev => [...prev, signalId]);
            setValidationResult(null);
            setIsValidated(false);
            setHasInteraction(true);
        }
        setIsOver(null);
    };

    const handleDragOver = (event) => {
        const { over } = event;
        setIsOver(over ? over.id : null);
    };

    const handleSelectChange = (dropZoneId, value) => {
        // Eliminar la opción seleccionada de otros selects
        const updatedSelectedOptions = { ...selectedOptions };
        Object.keys(updatedSelectedOptions).forEach(key => {
            if (updatedSelectedOptions[key] === value) {
                updatedSelectedOptions[key] = "";
            }
        });

        updatedSelectedOptions[dropZoneId] = value;
        setSelectedOptions(updatedSelectedOptions);

        // Actualizar droppedItems para la validación
        const signalId = signals.find(s => s.text === value)?.id || null;
        setDroppedItems(prev => ({
            ...prev,
            [dropZoneId]: signalId
        }));

        setValidationResult(null);
        setIsValidated(false);
        setHasInteraction(true);
    };

    const handleValidate = () => {
        // Validar cada emparejamiento individualmente
        const results = {};
        let correctCount = 0;
        const totalCount = Object.keys(droppedItems).length;

        for (const [dropZone, signalId] of Object.entries(droppedItems)) {
            const isCorrect = signalId === dropZone;
            results[dropZone] = isCorrect;
            if (isCorrect) {
                correctCount++;
            }
        }

        setValidationResult({ ...results, correctCount, totalCount });
        setIsValidated(true);
    };

    const handleReset = () => {
        setDroppedItems({
            transitorias: null,
            reglamentarios: null,
            informativas: null,
            preventivas: null,
            semaforos: null,
            demarcaciones: null,
        });
        setHiddenItems([]);
        setValidationResult(null);
        setIsValidated(false);
        setSelectedOptions({
            transitorias: "",
            reglamentarios: "",
            informativas: "",
            preventivas: "",
            semaforos: "",
            demarcaciones: "",
        });
        setHasInteraction(false);
    };

    const allItemsPlaced = isMobile
        ? Object.values(selectedOptions).every(option => option !== "")
        : Object.values(droppedItems).every(item => item !== null);

    const getAvailableOptions = (currentDropZone) => {
        const selectedValues = Object.values(selectedOptions);
        return signals.filter(signal =>
            selectedOptions[currentDropZone] === signal.text ||
            !selectedValues.includes(signal.text)
        );
    };

    return (
        <div className="container-dadstrans">
            {!isMobile ? (
                <>
                    <DndContext
                        sensors={sensors}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                    >
                        <div className="cards-container-dadstrans">
                            {Object.keys(droppedItems).map((dropZone) => (
                                <div
                                    key={dropZone}
                                    className={`card-dadstrans ${isValidated
                                        ? validationResult[dropZone]
                                            ? 'correct-card-dadstrans'
                                            : 'incorrect-card-dadstrans'
                                        : ''
                                        }`}
                                >
                                    <div className="image-container-dadstrans">
                                        <img src={images[dropZone]} alt={dropZone} className="signal-image-dadstrans" />
                                        {isValidated && (
                                            <div className="validation-icon-dadstrans">
                                                <img
                                                    src={validationResult && validationResult[dropZone] ? imgCheck : imgXmark}
                                                    alt={validationResult && validationResult[dropZone] ? "Correcto" : "Incorrecto"}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <DroppableArea
                                        id={dropZone}
                                        isOver={isOver === dropZone}
                                        isValidated={isValidated}
                                        isCorrect={validationResult && validationResult[dropZone]}
                                    >
                                        {droppedItems[dropZone] && (
                                            <div className={`dropped-item-dadstrans ${isValidated
                                                ? validationResult[dropZone]
                                                    ? 'correct-dropped-dadstrans'
                                                    : 'incorrect-dropped-dadstrans'
                                                : ''
                                                }`}>
                                                {signals.find(s => s.id === droppedItems[dropZone])?.text}
                                            </div>
                                        )}
                                    </DroppableArea>
                                </div>
                            ))}
                        </div>

                        <div className={`drag-container-dadstrans ${hiddenItems.length === signals.length ? 'drag-container-hidden-dadstrans' : ''}`}>
                            {signals.map((signal) => (
                                <DraggableItem
                                    key={signal.id}
                                    id={signal.id}
                                    isHidden={hiddenItems.includes(signal.id)}
                                >
                                    <div className="drag-item-dadstrans">
                                        {signal.text}
                                    </div>
                                </DraggableItem>
                            ))}
                        </div>
                    </DndContext>
                </>
            ) : (
                <div className="mobile-container-dadstrans">
                    <div className="cards-container-dadstrans">
                        {Object.keys(droppedItems).map((dropZone) => (
                            <div
                                key={dropZone}
                                className={`card-dadstrans ${isValidated
                                    ? validationResult[dropZone]
                                        ? 'correct-card-dadstrans'
                                        : 'incorrect-card-dadstrans'
                                    : ''
                                    }`}
                            >
                                <div className="image-container-dadstrans">
                                    <img src={images[dropZone]} alt={dropZone} className="signal-image-dadstrans" />
                                    {isValidated && (
                                        <div className="validation-icon-dadstrans">
                                            <img
                                                src={validationResult && validationResult[dropZone] ? imgCheck : imgXmark}
                                                alt={validationResult && validationResult[dropZone] ? "Correcto" : "Incorrecto"}
                                            />
                                        </div>
                                    )}
                                </div>
                                <select
                                    className={`mobile-select-dadstrans ${isValidated
                                        ? validationResult[dropZone]
                                            ? 'correct-select-dadstrans'
                                            : 'incorrect-select-dadstrans'
                                        : ''
                                        }`}
                                    value={selectedOptions[dropZone]}
                                    onChange={(e) => handleSelectChange(dropZone, e.target.value)}
                                >
                                    <option value="">Seleccione una opción</option>
                                    {getAvailableOptions(dropZone).map((signal) => (
                                        <option key={signal.id} value={signal.text}>
                                            {signal.text}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isValidated && validationResult && (
                <div className="validation-message-dadstrans">
                    {validationResult.correctCount === validationResult.totalCount ? (
                        <>
                            <p className="validation-text-dadstrans">
                                <strong>¡Muy bien! ¡Has identificado correctamente las señales de tránsito!</strong>
                            </p>
                            <p className="validation-score-dadstrans">
                                <strong>Tus respuestas correctas son: {validationResult.correctCount} de {validationResult.totalCount} {Math.round((validationResult.correctCount / validationResult.totalCount) * 100)}%</strong>
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="validation-text-dadstrans">
                                <strong>¡Ups! Algunas respuestas no son correctas.</strong>
                            </p>
                            <p className="validation-score-dadstrans">
                                <strong>Tus respuestas correctas son: {validationResult.correctCount} de {validationResult.totalCount} {Math.round((validationResult.correctCount / validationResult.totalCount) * 100)}%</strong>
                            </p>
                        </>
                    )}
                </div>
            )}

            <div className="button-container-dadstrans">
                <Button
                    bold={false}
                    icon={faCheck}
                    roundedFull={true}
                    onClick={handleValidate}
                    disabled={!allItemsPlaced || isValidated}
                    style={{
                        opacity: (!allItemsPlaced || isValidated) ? 0.4 : 1,
                        backgroundColor: (!allItemsPlaced || isValidated) ? "#ccc" : "#4CAF50",
                        marginRight: "10px"
                    }}
                >
                    Validar
                </Button>
                <Button
                    bold={false}
                    icon={faRepeat}
                    roundedFull={true}
                    onClick={handleReset}
                    disabled={!hasInteraction}
                    style={{
                        backgroundColor: "#f44336",
                        opacity: !hasInteraction ? 0.4 : 1
                    }}
                >
                    Reiniciar
                </Button>
            </div>
        </div>
    );
};

export default Dragandrop_Señales_Transito;