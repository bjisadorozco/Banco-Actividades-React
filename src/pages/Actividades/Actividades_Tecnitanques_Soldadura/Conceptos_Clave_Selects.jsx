import { useState, useEffect } from "react"
import { faRepeat, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../components/Button"
import "../../Actividades/Actividades_Tecnitanques_Soldadura/styles/Conceptos_Clave_Selects.css"
// Import your images here
import image1 from "../../../assets/img/areas_diseñadas.webp" // Área específica
import image3 from "../../../assets/img/permiso_trabajo.webp" // Trabajo con llama
import image2 from "../../../assets/img/trabajo_caliente.webp" // Permiso de trabajo
import image4 from "../../../assets/img/soldadura.webp"
import checkIcon from "../../../assets/img/checkAct.png"
import xmarkIcon from "../../../assets/img/xmarkAct.png"

const MatchingSelectActivity = () => {
    const [selectedItems, setSelectedItems] = useState({
        drop1: "",
        drop2: "",
        drop3: "",
        drop4: "",
    })
    const [validationStatus, setValidationStatus] = useState({
        drop1: null,
        drop2: null,
        drop3: null,
        drop4: null,
    })
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [correctCount, setCorrectCount] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [isActivityCompleted, setIsActivityCompleted] = useState(false)
    const [isValidated, setIsValidated] = useState(false)
    const [isResetEnabled, setIsResetEnabled] = useState(false)
    const [missingSelections, setMissingSelections] = useState(4)

    // Custom drop area texts
    const dropAreaTexts = {
        drop1:
            "Área específica y diseñada para estos trabajos en caliente, como un taller de soldadura o una localización exterior especifica",
        drop2:
            "Trabajo que involucra la presencia de llama abierta generada por equipos de soldadura o corte que pueden transformarse en una fuente de ignición en áreas con riesgos de incendio",
        drop3:
            "Permiso que aplica para trabajos de trabajo en caliente a menos que se trabaje en un área designada a 'prueba de incendio'",
        drop4:
            "Es una persona con el conocimiento, capacitación y experiencia para reconocer, evaluar y asegurar controles adecuados de los peligros asociados con el trabajo en caliente.​",
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
        btn1: "Trabajo en caliente",
        btn2: "Permiso de Trabajo en Caliente",
        btn3: "Supervisor de trabajo en caliente",
        btn4: "Áreas Diseñadas o Autorizadas",
    }

    useEffect(() => {
        if (isValidated) {
            const correct = Object.entries(selectedItems).filter(([dropId, btnId]) =>
                btnId && btnId === correctAnswers[dropId]
            ).length;
            setCorrectCount(correct)
            setPercentage(Math.round((correct / 4) * 100))
        }
    }, [isValidated, selectedItems])

    useEffect(() => {
        const selectedCount = Object.values(selectedItems).filter(item => item !== "").length;
        setMissingSelections(4 - selectedCount);
        setIsResetEnabled(selectedCount > 0);
    }, [selectedItems])

    const handleSelectChange = (dropId, value) => {
        setSelectedItems(prev => ({
            ...prev,
            [dropId]: value
        }))
        setErrorMessage("")
        setSuccessMessage("")
    }

    // Get list of options that haven't been selected yet
    const getAvailableOptions = (currentDropId) => {
        const selectedValues = Object.entries(selectedItems)
            .filter(([dropId, _]) => dropId !== currentDropId)
            .map(([_, value]) => value);

        return Object.keys(optionTexts).filter(key => !selectedValues.includes(key));
    }

    const handleValidate = () => {
        // Verificar si todas las opciones están seleccionadas
        const allSelected = Object.values(selectedItems).every(item => item !== "");

        if (!allSelected) {
            setErrorMessage(`Debes seleccionar todas las opciones antes de validar. Te faltan ${missingSelections} selecciones.`);
            return;
        }

        // Validar todas las respuestas
        const newValidationStatus = {}
        let correct = 0

        Object.entries(selectedItems).forEach(([dropId, btnId]) => {
            if (btnId) {
                const isCorrect = btnId === correctAnswers[dropId]
                newValidationStatus[dropId] = isCorrect ? "correcto" : "incorrecto"
                if (isCorrect) correct++
            }
        })

        setValidationStatus(newValidationStatus)
        setIsValidated(true)
        setIsActivityCompleted(true)
        setErrorMessage("")

        if (correct === 4) {
            setSuccessMessage("¡Excelente! Has identificado correctamente todos los elementos.")
        } else {
            setErrorMessage("Revisa bien la relación entre los elementos y sus descripciones.")
        }
    }

    const handleReset = () => {
        setSelectedItems({
            drop1: "",
            drop2: "",
            drop3: "",
            drop4: "",
        })
        setValidationStatus({
            drop1: null,
            drop2: null,
            drop3: null,
            drop4: null,
        })
        setErrorMessage("")
        setSuccessMessage("")
        setCorrectCount(0)
        setPercentage(0)
        setIsActivityCompleted(false)
        setIsValidated(false)
        setMissingSelections(4)
    }

    return (
        <div className="col-lg-12 col-md-12">
            <div className="activity-container-select">
                <div className="cards-row-select">
                    <div className="card-select">
                        <div style={{ position: 'relative' }}>
                            <img src={image1 || "/placeholder.svg"} className="card-image-select mb-0" alt="Área específica" />
                            {isValidated && (
                                <div>
                                    <img
                                        src={validationStatus.drop1 === "correcto" ? checkIcon : xmarkIcon}
                                        className="status-icon-select"
                                        style={{
                                            width: '40px',
                                            height: '40px'
                                        }}
                                        alt={validationStatus.drop1 === "correcto" ? "Correcto" : "Incorrecto"}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={`card-text-select ${isValidated && validationStatus.drop1 === "correcto" ? "correct-card-text" : isValidated && validationStatus.drop1 === "incorrecto" ? "incorrect-card-text" : ""}`}>
                            <p>{dropAreaTexts.drop1}</p>
                        </div>
                        <div className="select-container">
                            <select
                                className={`select-option ${isValidated && validationStatus.drop1 === "correcto" ? "correct-select" : isValidated && validationStatus.drop1 === "incorrecto" ? "incorrect-select" : ""}`}
                                value={selectedItems.drop1}
                                onChange={(e) => handleSelectChange("drop1", e.target.value)}
                                disabled={isValidated}
                            >
                                <option value="">Selecciona una opción</option>
                                {getAvailableOptions("drop1").map(key => (
                                    <option key={key} value={key}>
                                        {optionTexts[key]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="card-select">
                        <div style={{ position: 'relative' }}>
                            <img src={image2 || "/placeholder.svg"} className="card-image-select mb-0" alt="Trabajo con llama" />
                            {isValidated && (
                                <div>
                                    <img
                                        src={validationStatus.drop2 === "correcto" ? checkIcon : xmarkIcon}
                                        className="status-icon-select"
                                        style={{
                                            width: '40px',
                                            height: '40px'
                                        }}
                                        alt={validationStatus.drop2 === "correcto" ? "Correcto" : "Incorrecto"}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={`card-text-select ${isValidated && validationStatus.drop2 === "correcto" ? "correct-card-text" : isValidated && validationStatus.drop2 === "incorrecto" ? "incorrect-card-text" : ""}`}>
                            <p>{dropAreaTexts.drop2}</p>
                        </div>
                        <div className="select-container">
                            <select
                                className={`select-option ${isValidated && validationStatus.drop2 === "correcto" ? "correct-select" : isValidated && validationStatus.drop2 === "incorrecto" ? "incorrect-select" : ""}`}
                                value={selectedItems.drop2}
                                onChange={(e) => handleSelectChange("drop2", e.target.value)}
                                disabled={isValidated}
                            >
                                <option value="">Selecciona una opción</option>
                                {getAvailableOptions("drop2").map(key => (
                                    <option key={key} value={key}>
                                        {optionTexts[key]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="card-select">
                        <div style={{ position: 'relative' }}>
                            <img src={image3 || "/placeholder.svg"} className="card-image-select mb-0" alt="Permiso de trabajo" />
                            {isValidated && (
                                <div>
                                    <img
                                        src={validationStatus.drop3 === "correcto" ? checkIcon : xmarkIcon}
                                        className="status-icon-select"
                                        style={{
                                            width: '40px',
                                            height: '40px'
                                        }}
                                        alt={validationStatus.drop3 === "correcto" ? "Correcto" : "Incorrecto"}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={`card-text-select ${isValidated && validationStatus.drop3 === "correcto" ? "correct-card-text" : isValidated && validationStatus.drop3 === "incorrecto" ? "incorrect-card-text" : ""}`}>
                            <p>{dropAreaTexts.drop3}</p>
                        </div>
                        <div className="select-container">
                            <select
                                className={`select-option ${isValidated && validationStatus.drop3 === "correcto" ? "correct-select" : isValidated && validationStatus.drop3 === "incorrecto" ? "incorrect-select" : ""}`}
                                value={selectedItems.drop3}
                                onChange={(e) => handleSelectChange("drop3", e.target.value)}
                                disabled={isValidated}
                            >
                                <option value="">Selecciona una opción</option>
                                {getAvailableOptions("drop3").map(key => (
                                    <option key={key} value={key}>
                                        {optionTexts[key]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="card-select">
                        <div style={{ position: 'relative' }}>
                            <img src={image4 || "/placeholder.svg"} className="card-image-select mb-0" alt="Experto en evaluación" />
                            {isValidated && (
                                <div>
                                    <img
                                        src={validationStatus.drop4 === "correcto" ? checkIcon : xmarkIcon}
                                        className="status-icon-select"
                                        style={{
                                            width: '40px',
                                            height: '40px'
                                        }}
                                        alt={validationStatus.drop4 === "correcto" ? "Correcto" : "Incorrecto"}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={`card-text-select ${isValidated && validationStatus.drop4 === "correcto" ? "correct-card-text" : isValidated && validationStatus.drop4 === "incorrecto" ? "incorrect-card-text" : ""}`}>
                            <p>{dropAreaTexts.drop4}</p>
                        </div>
                        <div className="select-container">
                            <select
                                className={`select-option ${isValidated && validationStatus.drop4 === "correcto" ? "correct-select" : isValidated && validationStatus.drop4 === "incorrecto" ? "incorrect-select" : ""}`}
                                value={selectedItems.drop4}
                                onChange={(e) => handleSelectChange("drop4", e.target.value)}
                                disabled={isValidated}
                            >
                                <option value="">Selecciona una opción</option>
                                {getAvailableOptions("drop4").map(key => (
                                    <option key={key} value={key}>
                                        {optionTexts[key]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Mensaje de error cuando faltan selecciones */}
                {errorMessage && !isValidated && (
                    <div className="feedback-container-picaduras mt-1 p-0 rounded-lg text-center">
                        <p className="text-md">
                            <span className="text-red-personalizado font-bold">Atención:</span>{" "}
                            <span className="texto-gray">{errorMessage}</span>
                        </p>
                    </div>
                )}

                {/* Resultados */}
                {isActivityCompleted && (
                    <div className="results-container-select text-center">
                        <h3 className="text-md font-bold text-paragraph-light-color text-monserrat-select">
                            Tus respuestas correctas son: {correctCount} de 4 ({percentage}%)
                        </h3>
                    </div>
                )}
                {/* Resultados y Feedback - Versión idéntica a DnD */}
                {isActivityCompleted && (
                    <div className="feedback-container-picaduras mt-1 p-0 rounded-lg text-center">
                        {correctCount === 4 ? (
                            <p className="text-md">
                                <span className="text-green-personalizado font-bold">Respuesta correcta:</span>{" "}
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
                                    ¡Piénsalo bien! Revisa la relación entre los elementos y sus descripciones.
                                </span>
                            </p>
                        )}
                    </div>
                )}

                {/* Botón de validación/reinicio */}
                <div className="flex-container-select">
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
                </div>
            </div>
        </div>
    )
}

export default MatchingSelectActivity