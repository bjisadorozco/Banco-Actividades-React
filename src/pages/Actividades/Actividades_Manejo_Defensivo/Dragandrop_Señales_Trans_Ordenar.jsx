import React, { useState, useRef, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import imgCheck from "../../../assets/img/checkAct.png";
import imgXmark from "../../../assets/img/xmarkAct.png";
import imgAgenteTransito from "../../../assets/img/agente_transito_sld18.webp";
import imgSeñalesTransitorias from "../../../assets/img/señales_transitorias_sld18.webp";
import imgSemaforos from "../../../assets/img/semaforos_sld18.webp";
import imgVerticales from "../../../assets/img/verticales_sld18.webp";
import imgHorizontales from "../../../assets/img/horizontales_sld18.webp";
import "./styles/Dragandrop_Señales_Trans_Ordenar.css";

const images = [
    {
        id: "agente_transito_sld18",
        src: imgAgenteTransito,
        text: "Señales y órdenes emitidas por los agentes de tránsito"
    },
    {
        id: "señales_transitorias_sld18",
        src: imgSeñalesTransitorias,
        text: "Señales transitorias"
    },
    {
        id: "semaforos_sld18",
        src: imgSemaforos,
        text: "Semáforos"
    },
    {
        id: "verticales_sld18",
        src: imgVerticales,
        text: "Señales verticales"
    },
    {
        id: "horizontales_sld18",
        src: imgHorizontales,
        text: "Señales horizontales o marcas sobre la vía"
    }
];

// Orden correcto
const correctOrder = [
    "agente_transito_sld18",
    "señales_transitorias_sld18",
    "semaforos_sld18",
    "verticales_sld18",
    "horizontales_sld18"
];

// Orden inicial desordenado (fijo, no aleatorio)
const initialMobileOrder = [
    "señales_transitorias_sld18",
    "horizontales_sld18",
    "agente_transito_sld18",
    "verticales_sld18",
    "semaforos_sld18"
];

function SortableItem({ id, src, text, isCorrect, isValidated }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`sortable-item-dadarrast ${isValidated && isCorrect !== undefined ? (isCorrect ? 'correct-item-dadarrast' : 'incorrect-item-dadarrast') : ''}`}
        >
            <div className="image-container-dadarrast">
                <img src={src} alt={id} className="sortable-image-dadarrast" />
                <div className="image-text-overlay-dadarrast">{text}</div>
            </div>
            {isValidated && (
                <div className="validation-icon-dadarrast">
                    <img
                        src={isCorrect ? imgCheck : imgXmark}
                        alt={isCorrect ? "Correcto" : "Incorrecto"}
                    />
                </div>
            )}
        </div>
    );
}

const Dragandrop_Señales_Trans_Ordenar = () => {
    const initialDesktopOrder = useRef([...images].sort(() => Math.random() - 0.5));
    const [items, setItems] = useState([...initialDesktopOrder.current]);
    const [mobileItems, setMobileItems] = useState(
        initialMobileOrder.map(id => images.find(img => img.id === id))
    );
    const [isValidated, setIsValidated] = useState(false);
    const [validationResult, setValidationResult] = useState(null);
    const [hasInteraction, setHasInteraction] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedPositions, setSelectedPositions] = useState({});

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const handleDragStart = () => {
        // Prevenir scroll del body durante el drag
        document.body.style.overflow = 'hidden';
    };

    const handleDragEnd = (event) => {
        // Restaurar scroll del body
        document.body.style.overflow = '';

        const { active, over } = event;

        if (active.id !== over?.id && over) {
            setItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                if (!hasInteraction) {
                    setHasInteraction(true);
                }

                return newItems;
            });
        }
    };

    const handleSelectChange = (id, position) => {
        const newSelectedPositions = { ...selectedPositions };

        // Limpiar cualquier posición previa para este id
        Object.keys(newSelectedPositions).forEach(key => {
            if (newSelectedPositions[key] === position) {
                delete newSelectedPositions[key];
            }
        });

        newSelectedPositions[id] = position;
        setSelectedPositions(newSelectedPositions);
        setHasInteraction(true);
        setIsValidated(false);
        setValidationResult(null);
    };

    const handleValidate = () => {
        const results = isMobile
            ? images.map(img => ({
                id: img.id,
                isCorrect: selectedPositions[img.id] === correctOrder.indexOf(img.id) + 1
            }))
            : items.map((item, index) => ({
                id: item.id,
                isCorrect: item.id === correctOrder[index]
            }));

        const correctCount = results.filter(r => r.isCorrect).length;
        const totalCount = correctOrder.length;

        setValidationResult({ results, correctCount, totalCount });
        setIsValidated(true);
    };

    const handleReset = () => {
        if (isMobile) {
            setSelectedPositions({});
        } else {
            setItems([...initialDesktopOrder.current]);
        }
        setIsValidated(false);
        setValidationResult(null);
        setHasInteraction(false);
    };

    const allItemsPlaced = isMobile
        ? Object.keys(selectedPositions).length === images.length
        : true;

    const getAvailablePositions = (currentId) => {
        const usedPositions = Object.keys(selectedPositions)
            .filter(id => id !== currentId)
            .map(id => selectedPositions[id]);

        return [1, 2, 3, 4, 5].filter(pos => !usedPositions.includes(pos));
    };

    return (
        <div className="container-dadarrast">
            {!isMobile ? (
                <DndContext
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    autoScroll={false}
                >
                    <SortableContext
                        items={items}
                        strategy={horizontalListSortingStrategy}
                    >
                        <div className="sortable-container-dadarrast">
                            {items.map((item) => {
                                const result = validationResult?.results.find(r => r.id === item.id);
                                const isCorrect = result ? result.isCorrect : undefined;

                                return (
                                    <SortableItem
                                        key={item.id}
                                        id={item.id}
                                        src={item.src}
                                        text={item.text}
                                        isCorrect={isCorrect}
                                        isValidated={isValidated}
                                    />
                                );
                            })}
                        </div>
                    </SortableContext>
                </DndContext>
            ) : (
                <div className="mobile-container-dadarrast">
                    {mobileItems.map((item) => {
                        const result = validationResult?.results.find(r => r.id === item.id);
                        const isCorrect = result ? result.isCorrect : undefined;
                        const availablePositions = getAvailablePositions(item.id);

                        return (
                            <div
                                key={item.id}
                                className={`mobile-item-dadarrast ${isValidated && isCorrect !== undefined ? (isCorrect ? 'correct-item-dadarrast' : 'incorrect-item-dadarrast') : ''}`}
                            >
                                <div className="image-container-dadarrast">
                                    <img src={item.src} alt={item.id} className="mobile-image-dadarrast" />
                                    <div className="image-text-overlay-dadarrast">{item.text}</div>
                                </div>
                                <select
                                    className="mobile-select-dadarrast"
                                    value={selectedPositions[item.id] || ""}
                                    onChange={(e) => handleSelectChange(item.id, parseInt(e.target.value))}
                                    disabled={isValidated}
                                >
                                    <option value="">Seleccione...</option>
                                    {availablePositions.map(pos => (
                                        <option key={pos} value={pos}>
                                            Paso {pos}
                                        </option>
                                    ))}
                                    {selectedPositions[item.id] && (
                                        <option value={selectedPositions[item.id]}>
                                            Paso {selectedPositions[item.id]}
                                        </option>
                                    )}
                                </select>
                                {isValidated && (
                                    <div className="validation-icon-dadarrast">
                                        <img
                                            src={isCorrect ? imgCheck : imgXmark}
                                            alt={isCorrect ? "Correcto" : "Incorrecto"}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {isValidated && validationResult && (
                <div className="validation-message-dadarrast">
                    {validationResult.correctCount === validationResult.totalCount ? (
                        <>
                            <p className="validation-text-dadarrast">
                                <strong>¡Muy bien! ¡Has ordenado correctamente las señales de tránsito!</strong>
                            </p>
                            <p className="validation-score-dadarrast">
                                <strong>Tus respuestas correctas son: {validationResult.correctCount} de {validationResult.totalCount} ({Math.round((validationResult.correctCount / validationResult.totalCount) * 100)}%)</strong>
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="validation-text-dadarrast">
                                <strong>¡Ups! El orden no es correcto.</strong>
                            </p>
                            <p className="validation-score-dadarrast">
                                <strong>Tus respuestas correctas son: {validationResult.correctCount} de {validationResult.totalCount} ({Math.round((validationResult.correctCount / validationResult.totalCount) * 100)}%)</strong>
                            </p>
                        </>
                    )}
                </div>
            )}

            <div className="button-container-dadarrast">
                <Button
                    bold={false}
                    icon={faCheck}
                    roundedFull={true}
                    onClick={handleValidate}
                    disabled={(!hasInteraction && !isMobile) || (isMobile && !allItemsPlaced) || isValidated}
                    style={{
                        opacity: ((!hasInteraction && !isMobile) || (isMobile && !allItemsPlaced) || isValidated) ? 0.4 : 1,
                        backgroundColor: ((!hasInteraction && !isMobile) || (isMobile && !allItemsPlaced) || isValidated) ? "#ccc" : "#4CAF50",
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
                    disabled={!isValidated}
                    style={{
                        backgroundColor: "#f44336",
                        opacity: !isValidated ? 0.4 : 1
                    }}
                >
                    Reiniciar
                </Button>
            </div>
        </div>
    );
};

export default Dragandrop_Señales_Trans_Ordenar;