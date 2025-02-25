import React, { useState, useCallback } from 'react';
import "../Actividades_PESV/styles/OrdenarElementosSelects.css"
import Button from "../../components/Button"
import Paragraph from "../../components/Paragraph"
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons"
import imgTrue from "../../../assets/img/checkAct.png";
import imgFalse from "../../../assets/img/xmarkAct.png";

const baseTextStyle = {
    fontFamily: "Montserrat, sans-serif"
};

const initialItems = [
    { id: "3", content: "Implementación del PESV.", correctPosition: 3 },
    { id: "1", content: "Diagnóstico y análisis.", correctPosition: 1 },
    { id: "4", content: "Monitoreo y evaluación del PESV.", correctPosition: 4 },
    { id: "2", content: "Diseño del PESV.", correctPosition: 2 },
];

const OrdenarElementosSelects = () => {
    const [items] = useState(initialItems);
    const [selectedPositions, setSelectedPositions] = useState({});
    const [validationResults, setValidationResults] = useState({});
    const [hasValidated, setHasValidated] = useState(false);
    const [correctPercentage, setCorrectPercentage] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [remainingSelections, setRemainingSelections] = useState(4);

    const feedbackCorrect = "¡Muy bien! Has organizado correctamente las 4 etapas de implementación del PESV.";
    const feedbackPartial = "Buen intento, pero revisa el orden de algunos elementos.";
    const feedbackIncorrect = "¡Piénsalo bien! Ordena correctamente las 4 etapas de implementación del PESV en las empresas.";

    const getAvailablePositions = useCallback((currentItemId) => {
        const usedPositions = Object.entries(selectedPositions)
            .filter(([id]) => id !== currentItemId)
            .map(([, pos]) => pos);
        return [1, 2, 3, 4].filter((pos) => !usedPositions.includes(pos));
    }, [selectedPositions]);

    const handleSelectChange = useCallback((event, itemId) => {
        const newPosition = Number.parseInt(event.target.value);
        setSelectedPositions((prev) => {
            const newPositions = {
                ...prev,
                [itemId]: newPosition,
            };
            const selectedCount = Object.keys(newPositions).length;
            setRemainingSelections(4 - selectedCount);
            return newPositions;
        });
        setHasValidated(false);
        setValidationResults({});
        setCorrectPercentage(0);
        setShowFeedback(false);
    }, []);

    const getFeedbackMessage = useCallback(() => {
        if (correctPercentage === 100) {
            return {
                type: 'correct',
                label: 'Respuesta correcta:',
                message: feedbackCorrect,
                color: 'text-correct-feedback'
            };
        } else if (correctPercentage > 20) {
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
    }, [correctPercentage]);

    const validateOrder = useCallback(() => {
        const newValidationResults = {};
        let correctCount = 0;
        const totalCount = items.length;

        items.forEach((item) => {
            const isCorrect = item.correctPosition === selectedPositions[item.id];
            newValidationResults[item.id] = isCorrect;
            if (isCorrect) correctCount++;
        });

        setValidationResults(newValidationResults);
        const percentage = Math.round((correctCount / totalCount) * 100);
        setCorrectPercentage(percentage);
        setHasValidated(true);
        setShowFeedback(true);
    }, [items, selectedPositions]);

    const handleReset = useCallback(() => {
        setSelectedPositions({});
        setValidationResults({});
        setHasValidated(false);
        setCorrectPercentage(0);
        setShowFeedback(false);
        setRemainingSelections(4);
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div className="sortable-list w-full">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`list-group-item ${hasValidated ? (validationResults[item.id] ? "correct-order" : "incorrect-order") : ""}`}
                        style={baseTextStyle}
                    >
                        <select
                            value={selectedPositions[item.id] || ""}
                            onChange={(e) => handleSelectChange(e, item.id)}
                            className="mr-2 p-2 border rounded"
                            disabled={hasValidated}
                            style={baseTextStyle}
                        >
                            <option value="">Seleccionar</option>
                            {getAvailablePositions(item.id).map((position) => (
                                <option key={position} value={position}>
                                    {position}
                                </option>
                            ))}
                        </select>
                        <span className="flex-1">{item.content}</span>
                        {hasValidated && (
                            <img
                                src={validationResults[item.id] ? imgTrue : imgFalse}
                                alt={validationResults[item.id] ? "Correcto" : "Incorrecto"}
                                className="validation-icon ml-4"
                            />
                        )}
                    </div>
                ))}
            </div>

            {!hasValidated && remainingSelections > 0 && Object.keys(selectedPositions).length > 0 && (
                <div className="mt-4 text-center" style={baseTextStyle}>
                    <p className="text-response-figma bg-counter mb-2">
                        Te faltan <span className="font-bold">{remainingSelections}</span> opciones por seleccionar.
                    </p>
                </div>
            )}

            {showFeedback && (
                <div className="feedback-container-selects flex flex-col items-center justify-center text-center mt-6" style={baseTextStyle}>
                    <div className="space-y-2">
                        <p className="text-center text-response-figma font-bold">
                            Respuestas correctas: {Object.values(validationResults).filter(Boolean).length} de{" "}
                            {items.length} ({correctPercentage}%)
                        </p>
                        <div className="text-center">
                            <span className={`font-bold ${getFeedbackMessage().color}`}>
                                {getFeedbackMessage().label}
                            </span>{' '}
                            <span className="text-response-figma font-medium">
                                {getFeedbackMessage().message}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-center mt-6">
                <Button
                    roundedFull={true}
                    icon={hasValidated ? faRepeat : faCheck}
                    onClick={hasValidated ? handleReset : validateOrder}
                    disabled={!hasValidated && Object.keys(selectedPositions).length !== items.length}
                >
                    {hasValidated ? "Reiniciar" : "Validar"}
                </Button>
            </div>
        </div>
    );
};

export default OrdenarElementosSelects;