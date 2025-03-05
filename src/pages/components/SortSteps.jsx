import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from './Button';
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import imgTrue from "../../assets/img/checkAct.png";
import imgFalse from "../../assets/img/xmarkAct.png";

const baseTextStyle = {
    fontFamily: "Montserrat, sans-serif"
};

const SortableStep = ({ id, children, isCorrect, showResult, originalIndex, disabled }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        disabled
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: disabled ? 'default' : 'grab',
        ...baseTextStyle
    };

    const dragProps = disabled ? {} : {
        ...attributes,
        ...listeners
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...dragProps}
            className={`tarjeta-paso relative ${isDragging ? 'dragging' : ''} ${showResult ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
        >
            <div className="step-content">
                <span className="text-base" style={baseTextStyle}>{`${originalIndex + 1}. ${children}`}</span>
                {showResult && (
                    <img
                        src={isCorrect ? imgTrue : imgFalse}
                        alt={isCorrect ? "Correcto" : "Incorrecto"}
                        className="absolute top-[-0.3rem] right-[-0.3rem] w-6 h-5"
                    />
                )}
            </div>
        </div>
    );
};

const SortSteps = ({
    steps,
    correctOrder,
    title,
    feedbackCorrect = "¡Excelente trabajo! Has ordenado todo correctamente.",
    feedbackPartial = "Buen intento, pero hay espacio para mejorar.",
    feedbackIncorrect = "Sigue practicando, ¡puedes hacerlo mejor!",
    onComplete
}) => {
    const [currentSteps, setCurrentSteps] = useState(steps.map((step, index) => ({
        ...step,
        originalIndex: index
    })));
    const [resultado, setResultado] = useState("");
    const [correctCount, setCorrectCount] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setCurrentSteps((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const validarOrden = () => {
        const correctAnswers = currentSteps.filter(
            (step, index) => step.texto === correctOrder[index]
        );

        const correctCount = correctAnswers.length;
        const porcentajeCorrecto = Math.round((correctCount / correctOrder.length) * 100);

        setCorrectCount(correctCount);
        setPorcentaje(porcentajeCorrecto);
        setResultado("validado");

        if (onComplete) {
            onComplete({
                correct: correctCount,
                total: correctOrder.length,
                percentage: porcentajeCorrecto
            });
        }
    };

    const reiniciarPasos = () => {
        setCurrentSteps(steps.map((step, index) => ({
            ...step,
            originalIndex: index
        })));
        setResultado("");
        setCorrectCount(0);
        setPorcentaje(0);
    };

    const getFeedbackMessage = () => {
        if (porcentaje === 100) {
            return {
                type: 'correct',
                label: 'Respuesta correcta:',
                message: feedbackCorrect,
                color: 'text-correct-feedback'
            };
        } else if (porcentaje > 20) {
            return {
                type: 'partial',
                label: 'Respuesta parcial:',
                message: feedbackPartial,
                color: 'text-orange-500'
            };
        }
        return {
            type: 'incorrect',
            label: 'Respuesta incorrecta:',
            message: feedbackIncorrect,
            color: 'text-incorrect-feedback'
        };
    };

    return (
        <div className="sort-steps-container">
            {title && (
                <h2 className="sort-steps-title text-paragraph-size font-bold text-center text-button-figma mb-4" style={baseTextStyle}>
                    {title}
                </h2>
            )}

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={currentSteps.map(step => step.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="steps-container">
                        {currentSteps.map((step, index) => {
                            const isCorrect = resultado === "validado" && step.texto === correctOrder[index];

                            return (
                                <SortableStep
                                    key={step.id}
                                    id={step.id}
                                    isCorrect={isCorrect}
                                    showResult={resultado === "validado"}
                                    originalIndex={step.originalIndex}
                                    disabled={resultado === "validado"}
                                >
                                    {step.texto}
                                </SortableStep>
                            );
                        })}
                    </div>
                </SortableContext>
            </DndContext>

            {resultado === "validado" && (
                <div className="space-y-2">
                    <p className="text-center text-response-figma my-2 font-bold" style={baseTextStyle}>
                        Tus respuestas correctas son {correctCount} de {correctOrder.length}. ({porcentaje}%)
                    </p>
                    <div className="text-center" style={baseTextStyle}>
                        <span className={`font-bold ${getFeedbackMessage().color}`}>
                            {getFeedbackMessage().label}
                        </span>{' '}
                        <span className="text-response-figma font-medium">
                            {getFeedbackMessage().message}
                        </span>
                    </div>
                </div>
            )}

            <div className="buttons-container mt-2">
                <Button
                    bold={false}
                    icon={resultado === "validado" ? faRepeat : faCheck}
                    roundedFull={true}
                    onClick={resultado === "validado" ? reiniciarPasos : validarOrden}
                >
                    {resultado === "validado" ? "Reiniciar" : "Validar"}
                </Button>
            </div>
        </div>
    );
};

SortSteps.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            texto: PropTypes.string.isRequired,
        })
    ).isRequired,
    correctOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string,
    feedbackCorrect: PropTypes.string,
    feedbackPartial: PropTypes.string,
    feedbackIncorrect: PropTypes.string,
    onComplete: PropTypes.func,
};

export default SortSteps;