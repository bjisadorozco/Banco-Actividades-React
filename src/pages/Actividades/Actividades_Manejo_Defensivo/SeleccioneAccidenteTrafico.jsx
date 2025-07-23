import { useState } from "react";
import paso1 from "../../../assets/img/conductor_sld15.webp";
import paso2 from "../../../assets/img/vehiculo_sld15.webp";
import paso3 from "../../../assets/img/el_medio_sld15.webp";
import checkIcon from "../../../assets/img/checkAct.png";
import xmarkIcon from "../../../assets/img/xmarkAct.png";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import "./styles/SeleccioneAccidenteTrafico.css";

const SeleccioneAccidenteTrafico = () => {
    const [selections, setSelections] = useState({
        conductor: "",
        vehiculo: "",
        medio: ""
    });

    const [isVerified, setIsVerified] = useState(false);
    const [showValidation, setShowValidation] = useState(false);
    const [validationResults, setValidationResults] = useState({
        conductor: null,
        vehiculo: null,
        medio: null
    });

    const allOptions = [
        "Señalización deficiente",
        "Fallas en los sistemas de iluminación",
        "Conducir bajo el efecto de alcohol"
    ];

    const correctAnswers = {
        conductor: "Conducir bajo el efecto de alcohol",
        vehiculo: "Fallas en los sistemas de iluminación",
        medio: "Señalización deficiente"
    };

    const getAvailableOptions = () => {
        const selectedValues = Object.values(selections).filter(val => val !== "");
        return allOptions.filter(option => !selectedValues.includes(option));
    };

    const handleChange = (category, value) => {
        setSelections(prev => ({
            ...prev,
            [category]: value
        }));

        const allSelected = Object.values({ ...selections, [category]: value }).every(val => val !== "");
        setIsVerified(allSelected);
    };

    const handleValidate = () => {
        const results = {
            conductor: selections.conductor === correctAnswers.conductor,
            vehiculo: selections.vehiculo === correctAnswers.vehiculo,
            medio: selections.medio === correctAnswers.medio
        };

        setValidationResults(results);
        setShowValidation(true);
    };

    const handleReset = () => {
        setSelections({
            conductor: "",
            vehiculo: "",
            medio: ""
        });
        setIsVerified(false);
        setShowValidation(false);
        setValidationResults({
            conductor: null,
            vehiculo: null,
            medio: null
        });
    };

    const categories = [
        {
            id: "conductor",
            title: "CONDUCTOR",
            image: paso1,
            infoTexts: [
                "Exceder los límites de velocidad",
                "Falta de pericia en la conducción"
            ]
        },
        {
            id: "vehiculo",
            title: "VEHÍCULO",
            image: paso2,
            infoTexts: [
                "Mantenimiento inadecuado del vehículo",
                "Deficiencia en los sistemas de frenos"
            ]
        },
        {
            id: "medio",
            title: "EL MEDIO",
            image: paso3,
            infoTexts: [
                "Estado de la vía en mal estado",
                "Malas condiciones atmosféricas"
            ]
        }
    ];

    return (
        <div className="quiz-container-acc-traf">
            <div className="cards-container-acc-traf">
                {categories.map((category) => (
                    <div
                        className={`card-container-acc-traf ${showValidation
                            ? validationResults[category.id]
                                ? "correct-acc-traf"
                                : "incorrect-acc-traf"
                            : ""
                            }`}
                        key={category.id}
                    >
                        <h2 className="card-title-acc-traf">{category.title}</h2>

                        <div className="image-container-acc-traf">
                            <img
                                src={category.image}
                                alt={category.title}
                                className="card-image-acc-traf"
                            />

                            {showValidation && (
                                <div className="validation-icon-container-acc-traf">
                                    <img
                                        src={validationResults[category.id] ? checkIcon : xmarkIcon}
                                        alt="Validation Icon"
                                        className="validation-icon-acc-traf"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="info-texts-container-acc-traf">
                            {category.infoTexts.map((text, index) => (
                                <div key={index} className="info-text-acc-traf">
                                    {text}
                                </div>
                            ))}
                        </div>

                        <div className="select-container-acc-traf">
                            <select
                                value={selections[category.id]}
                                onChange={(e) => handleChange(category.id, e.target.value)}
                                disabled={showValidation}
                                className={
                                    showValidation
                                        ? validationResults[category.id]
                                            ? "correct-select-acc-traf"
                                            : "incorrect-select-acc-traf"
                                        : ""
                                }
                            >
                                <option value="">Seleccione una opción</option>
                                {getAvailableOptions()
                                    .concat(selections[category.id] ? [selections[category.id]] : [])
                                    .map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {showValidation && (
                            <div className={`feedback-text-acc-traf ${validationResults[category.id]
                                ? "correct-feedback-acc-traf"
                                : "incorrect-feedback-acc-traf"
                                }`}>
                                {validationResults[category.id] ? "¡Correcto!" : "¡Incorrecto!"}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {showValidation && (
                <div className="results-container-acc-traf">
                    <h3 className="results-text-acc-traf">
                        Respuestas correctas: {Object.values(validationResults).filter(Boolean).length} de {categories.length}
                    </h3>
                </div>
            )}
            <div className="buttons-container-acc-traf">
                <Button
                    icon={faCheck}
                    roundedFull={true}
                    onClick={handleValidate}
                    disabled={!isVerified || showValidation}
                >
                    Validar
                </Button>

                <Button
                    icon={faRepeat}
                    roundedFull={true}
                    onClick={handleReset}
                    disabled={!showValidation}
                >
                    Reiniciar
                </Button>
            </div>
        </div>
    );
};

export default SeleccioneAccidenteTrafico;