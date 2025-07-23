import React, { useState, useRef, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import imgCheck from "../../../assets/img/checkAct.png";
import imgXmark from "../../../assets/img/xmarkAct.png";
import letra_g_sld14 from "../../../assets/img/letra_g_sld14.webp";
import letra_i_sld14 from "../../../assets/img/letra_i_sld14.webp";
import letra_b_sld14 from "../../../assets/img/letra_b_sld14.webp";
import letra_e_sld14 from "../../../assets/img/letra_e_sld14.webp";
import letra_c_sld14 from "../../../assets/img/letra_c_sld14.webp";
import audioGIBEC from "../../../assets/audio/La-sigla-gibec-m2-slide-14.mp3";
import "./styles/Dragandrop_ordenar_Gibec.css";

const letters = [
    { id: "G", letter: "G", image: letra_g_sld14 },
    { id: "I", letter: "I", image: letra_i_sld14 },
    { id: "B", letter: "B", image: letra_b_sld14 },
    { id: "E", letter: "E", image: letra_e_sld14 },
    { id: "C", letter: "C", image: letra_c_sld14 }
];

// Orden correcto (GIBEC)
const correctOrder = ["G", "I", "B", "E", "C"];

// Orden inicial desordenado (BCEIG)
const initialOrder = ["B", "C", "E", "I", "G"];

function SortableItem({ id, letter, image, isCorrect, isValidated }) {
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
            className={`sortable-item-gibec ${isValidated && isCorrect !== undefined ? (isCorrect ? 'correct-item-gibec' : 'incorrect-item-gibec') : ''}`}
        >
            <div className="letter-container-gibec">
                <img src={image} alt={letter} className="letter-image-gibec" />
            </div>
            {isValidated && (
                <div className="validation-icon-gibec">
                    <img
                        src={isCorrect ? imgCheck : imgXmark}
                        alt={isCorrect ? "Correcto" : "Incorrecto"}
                    />
                </div>
            )}
        </div>
    );
}

const Dragandrop_ordenar_Gibec = () => {
    const initialDesktopOrder = useRef(initialOrder.map(id => letters.find(letter => letter.id === id)));
    const [items, setItems] = useState([...initialDesktopOrder.current]);
    const [mobileItems] = useState(initialOrder.map(id => letters.find(letter => letter.id === id)));
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

    // Efecto para reproducir audio cuando se completa correctamente
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
            ? letters.map(letter => ({
                id: letter.id,
                isCorrect: selectedPositions[letter.id] === correctOrder.indexOf(letter.id) + 1
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

        // Pausar y reiniciar el audio al resetear
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

        return [1, 2, 3, 4, 5].filter(pos => !usedPositions.includes(pos));
    };

    const getLetterAtPosition = (position) => {
        const entry = Object.entries(selectedPositions).find(([_, pos]) => pos === position);
        return entry ? letters.find(letter => letter.id === entry[0]) : null;
    };

    return (
        <div className="container-gibec">
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
                        <div className="sortable-container-gibec">
                            {items.map((item) => {
                                const result = validationResult?.results.find(r => r.id === item.id);
                                const isCorrect = result ? result.isCorrect : undefined;

                                return (
                                    <SortableItem
                                        key={item.id}
                                        id={item.id}
                                        letter={item.letter}
                                        image={item.image}
                                        isCorrect={isCorrect}
                                        isValidated={isValidated}
                                    />
                                );
                            })}
                        </div>
                    </SortableContext>
                </DndContext>
            ) : (
                <>
                    <div className="images-container-gibec">
                        {mobileItems.map((letter) => (
                            <div key={letter.id} className="image-item-gibec">
                                <img src={letter.image} alt={letter.letter} className="letter-image-gibec" />
                            </div>
                        ))}
                    </div>

                    <div className="word-container-gibec">
                        {[1, 2, 3, 4, 5].map((position) => {
                            const letter = getLetterAtPosition(position);
                            const result = validationResult?.results.find(r => r.id === letter?.id);
                            const isCorrect = result ? result.isCorrect : undefined;

                            return (
                                <div
                                    key={position}
                                    className={`letter-slot-gibec ${isValidated && isCorrect !== undefined ? (isCorrect ? 'correct-slot-gibec' : 'incorrect-slot-gibec') : ''}`}
                                >
                                    {letter && (
                                        <>
                                            <img src={letter.image} alt={letter.letter} className="slot-image-gibec" />
                                            {isValidated && (
                                                <div className="validation-icon-gibec">
                                                    <img
                                                        src={isCorrect ? imgCheck : imgXmark}
                                                        alt={isCorrect ? "Correcto" : "Incorrecto"}
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="selects-container-gibec">
                        {mobileItems.map((letter) => {
                            const availablePositions = getAvailablePositions(letter.id);
                            const currentPosition = selectedPositions[letter.id];

                            return (
                                <div key={letter.id} className="select-wrapper-gibec">
                                    <label>{letter.letter}:</label>
                                    <select
                                        value={currentPosition || ""}
                                        onChange={(e) => handleSelectChange(letter.id, parseInt(e.target.value))}
                                        disabled={isValidated}
                                        className="letter-select-gibec"
                                    >
                                        <option value="">Posición...</option>
                                        {availablePositions.map(pos => (
                                            <option key={pos} value={pos}>
                                                {pos}
                                            </option>
                                        ))}
                                        {currentPosition && (
                                            <option value={currentPosition}>
                                                {currentPosition}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Reproductor de audio visible solo cuando es correcto */}
            {isValidated && validationResult?.correctCount === validationResult?.totalCount && (
                <div className="audio-container-gibec">
                    <audio ref={audioRef} controls autoPlay>
                        <source src={audioGIBEC} type="audio/mp3" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            )}

            {isValidated && validationResult && (
                <div className="validation-message-gibec">
                    {validationResult.correctCount === validationResult.totalCount ? (
                        <>
                            <p className="validation-text-gibec">
                                <strong>¡Correcto! Has formado la palabra GIBEC.</strong>
                            </p>
                            <p className="validation-score-gibec">
                                <strong>Tus respuestas correctas son: {validationResult.correctCount} de {validationResult.totalCount} ({Math.round((validationResult.correctCount / validationResult.totalCount) * 100)}%)</strong>
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="validation-text-gibec">
                                <strong>¡Incorrecto! El orden correcto es G-I-B-E-C.</strong>
                            </p>
                            <p className="validation-score-gibec">
                                <strong>Tus respuestas correctas son: {validationResult.correctCount} de {validationResult.totalCount} ({Math.round((validationResult.correctCount / validationResult.totalCount) * 100)}%)</strong>
                            </p>
                        </>
                    )}
                </div>
            )}

            <div className="button-container-gibec">
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

export default Dragandrop_ordenar_Gibec;