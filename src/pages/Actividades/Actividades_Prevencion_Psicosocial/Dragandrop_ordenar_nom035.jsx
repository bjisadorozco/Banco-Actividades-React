import React, { useState, useRef, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import imgCheck from "../../../assets/img/checkAct.png";
import imgXmark from "../../../assets/img/xmarkAct.png";
import audioNOM035 from "../../../assets/audio/fisicas-m1-slide-8-audio.mp3";
import "./styles/Dragandrop_ordenar_nom035.css";

const letters = [
    { id: "N", letter: "N" },
    { id: "O", letter: "O" },
    { id: "M", letter: "M" },
    { id: "0", letter: "0" },
    { id: "3", letter: "3" },
    { id: "5", letter: "5" }
];

// Orden correcto (NOM 035)
const correctOrder = ["N", "O", "M", "0", "3", "5"];

// Orden inicial desordenado (M05 ON3)
const initialOrder = ["M", "0", "5", "O", "N", "3"];

function SortableItem({ id, letter, isCorrect, isValidated }) {
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
            className={`sortable-item-nom035 ${isValidated && isCorrect !== undefined ? (isCorrect ? 'correct-item-nom035' : 'incorrect-item-nom035') : ''}`}
        >
            <div className="letter-container-nom035">
                <span className="letter-nom035">{letter}</span>
            </div>
            {isValidated && (
                <div className="validation-icon-nom035">
                    <img
                        src={isCorrect ? imgCheck : imgXmark}
                        alt={isCorrect ? "Correcto" : "Incorrecto"}
                    />
                </div>
            )}
        </div>
    );
}

const Dragandrop_ordenar_nom035 = () => {
    const initialDesktopOrder = useRef(initialOrder.map(id => letters.find(letter => letter.id === id)));
    const [items, setItems] = useState([...initialDesktopOrder.current]);
    const [mobileItems, setMobileItems] = useState([...initialDesktopOrder.current]);
    const [isValidated, setIsValidated] = useState(false);
    const [validationResult, setValidationResult] = useState(null);
    const [hasInteraction, setHasInteraction] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedPositions, setSelectedPositions] = useState({});
    const audioRef = useRef(null);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    useEffect(() => {
        if (validationResult && validationResult.correctCount === validationResult.totalCount) {
            if (audioRef.current) {
                audioRef.current.play().catch(error => {
                    console.error("Error al reproducir audio:", error);
                });
            }
        }
    }, [validationResult]);

    const handleDragStart = () => {
        document.body.style.overflow = 'hidden';
    };

    const handleDragEnd = (event) => {
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
            ? letters.map(letter => ({
                id: letter.id,
                isCorrect: selectedPositions[letter.id] === correctOrder.indexOf(letter.letter) + 1
            }))
            : items.map((item, index) => ({
                id: item.id,
                isCorrect: item.letter === correctOrder[index]
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

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const allItemsPlaced = isMobile
        ? Object.keys(selectedPositions).length === letters.length
        : true;

    const getAvailablePositions = (currentId) => {
        const usedPositions = Object.keys(selectedPositions)
            .filter(id => id !== currentId)
            .map(id => selectedPositions[id]);

        return [1, 2, 3, 4, 5, 6].filter(pos => !usedPositions.includes(pos));
    };

    return (
        <div className="container-nom035">
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
                        <div className="sortable-container-nom035">
                            {items.slice(0, 3).map((item) => {
                                const result = validationResult?.results.find(r => r.id === item.id);
                                const isCorrect = result ? result.isCorrect : undefined;

                                return (
                                    <SortableItem
                                        key={item.id}
                                        id={item.id}
                                        letter={item.letter}
                                        isCorrect={isCorrect}
                                        isValidated={isValidated}
                                    />
                                );
                            })}
                            <div className="gap" /> {/* Separación visual */}
                            {items.slice(3).map((item) => {
                                const result = validationResult?.results.find(r => r.id === item.id);
                                const isCorrect = result ? result.isCorrect : undefined;

                                return (
                                    <SortableItem
                                        key={item.id}
                                        id={item.id}
                                        letter={item.letter}
                                        isCorrect={isCorrect}
                                        isValidated={isValidated}
                                    />
                                );
                            })}
                        </div>
                    </SortableContext>
                </DndContext>
            ) : (
                <div className="mobile-container-nom035">
                    {mobileItems.map((item) => {
                        const result = validationResult?.results.find(r => r.id === item.id);
                        const isCorrect = result ? result.isCorrect : undefined;
                        const availablePositions = getAvailablePositions(item.id);

                        return (
                            <div
                                key={item.id}
                                className={`mobile-item-nom035 ${isValidated && isCorrect !== undefined ? (isCorrect ? 'correct-item-nom035' : 'incorrect-item-nom035') : ''}`}
                            >
                                <div className="letter-container-nom035">
                                    <span className="letter-nom035">{item.letter}</span>
                                </div>
                                <select
                                    className="mobile-select-nom035"
                                    value={selectedPositions[item.id] || ""}
                                    onChange={(e) => handleSelectChange(item.id, parseInt(e.target.value))}
                                    disabled={isValidated}
                                >
                                    <option value="">Seleccione posición...</option>
                                    {availablePositions.map(pos => (
                                        <option key={pos} value={pos}>
                                            Posición {pos}
                                        </option>
                                    ))}
                                    {selectedPositions[item.id] && (
                                        <option value={selectedPositions[item.id]}>
                                            Posición {selectedPositions[item.id]}
                                        </option>
                                    )}
                                </select>
                                {isValidated && (
                                    <div className="validation-icon-nom035">
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

            {isValidated && validationResult?.correctCount === validationResult?.totalCount && (
                <div className="audio-container-nom035">
                    <audio ref={audioRef} controls autoPlay>
                        <source src={audioNOM035} type="audio/mp3" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            )}

            {isValidated && validationResult && (
                <div className="validation-message-nom035">
                    {validationResult.correctCount === validationResult.totalCount ? (
                        <>
                            <p className="validation-text-nom035">
                                <strong>¡Correcto! Has formado la frase NOM 035.</strong>
                            </p>
                            <p className="validation-score-nom035">
                                <strong>Tus respuestas correctas son: {validationResult.correctCount} de {validationResult.totalCount} ({Math.round((validationResult.correctCount / validationResult.totalCount) * 100)}%)</strong>
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="validation-text-nom035">
                                <strong>¡Incorrecto! El orden correcto es N-O-M 0-3-5.</strong>
                            </p>
                            <p className="validation-score-nom035">
                                <strong>Tus respuestas correctas son: {validationResult.correctCount} de {validationResult.totalCount} ({Math.round((validationResult.correctCount / validationResult.totalCount) * 100)}%)</strong>
                            </p>
                        </>
                    )}
                </div>
            )}

            <div className="button-container-nom035">
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

export default Dragandrop_ordenar_nom035;