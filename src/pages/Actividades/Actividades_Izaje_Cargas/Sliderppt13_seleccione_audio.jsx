import { useState, useEffect, useRef } from "react";
import useStore from "../../../store";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import imgEslingas from "../../../assets/img/eslingas.webp";
import imgGanchos_de_izaje from "../../../assets/img/ganchos_de_izaje.webp";
import imgGrilletes_de_izaje from "../../../assets/img/grillete_izaje.webp";
import imgCables_de_acero from "../../../assets/img/cables_acero.webp";
import imgTensores from "../../../assets/img/tensores.webp";
import imgEstrobos from "../../../assets/img/estrobos.webp";
import audioEslingas from "../../../assets/audio/eslingas-de-izaje-m1-slide-13-audio.mp3";
import audioGanchos_de_izaje from "../../../assets/audio/ganchos-de-izaje-m1-slide-13-audio.mp3";
import audioGrilletes_de_izaje from "../../../assets/audio/grilletes-de-izaje-m1-slide-13-audio.mp3";
import audioCables_de_acero from "../../../assets/audio/cables-de-acero-m1-slide-13-audio.mp3";
import audioTensores from "../../../assets/audio/Tensores-m1-slide-13-audio.mp3";
import audioEstrobos from "../../../assets/audio/estrobos-m1-slide-13-audio.mp3";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import "./styles/Sliderppt13_seleccione_audio.css";
import imgVerdadero from "../../../assets/img/checkAct.png";
import imgFalso from "../../../assets/img/xmarkAct.png";

function Sliderppt13_seleccione_audio() {
    const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
    const [selections, setSelections] = useState({
        drop1: "",
        drop2: "",
        drop3: "",
        drop4: "",
        drop5: "",
        drop6: "",
    });
    const [isVerified, setIsVerified] = useState({
        drop1: false,
        drop2: false,
        drop3: false,
        drop4: false,
        drop5: false,
        drop6: false,
    });
    const [isResetEnabled, setIsResetEnabled] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [validatedSelections, setValidatedSelections] = useState({
        drop1: false,
        drop2: false,
        drop3: false,
        drop4: false,
        drop5: false,
        drop6: false,
    });
    const [activeAudio, setActiveAudio] = useState(null);

    const audioRefs = useRef({
        drop1: null,
        drop2: null,
        drop3: null,
        drop4: null,
        drop5: null,
        drop6: null,
    });

    useEffect(() => {
        setIsOnDivisor(false);
    }, [setIsOnDivisor]);

    const handleChange = (dropId, value) => {
        Object.values(audioRefs.current).forEach((audio) => {
            if (audio && !audio.paused) {
                audio.pause();
                audio.currentTime = 0;
            }
        });

        setSelections((prev) => {
            const newSelections = { ...prev, [dropId]: value };
            const isCorrect = value === correctItems[dropId];
            setIsVerified((prev) => ({ ...prev, [dropId]: isCorrect }));
            setValidatedSelections((prev) => ({ ...prev, [dropId]: value !== "" }));

            if (isCorrect) {
                setActiveAudio(dropId);
                setTimeout(() => {
                    if (audioRefs.current[dropId]) {
                        audioRefs.current[dropId].play();
                    }
                }, 0);
            }

            setIsResetEnabled(true);
            const correctAnswers = Object.keys(newSelections).filter(
                (key) => newSelections[key] === correctItems[key]
            ).length;
            setCorrectCount(correctAnswers);

            if (Object.values(newSelections).every((val) => val !== "")) {
                setShowValidationMessage(true);
            }

            return newSelections;
        });
    };

    const handleReset = () => {
        setSelections({
            drop1: "",
            drop2: "",
            drop3: "",
            drop4: "",
            drop5: "",
            drop6: "",
        });
        setIsVerified({
            drop1: false,
            drop2: false,
            drop3: false,
            drop4: false,
            drop5: false,
            drop6: false,
        });
        setValidatedSelections({
            drop1: false,
            drop2: false,
            drop3: false,
            drop4: false,
            drop5: false,
            drop6: false,
        });
        setIsResetEnabled(false);
        setCorrectCount(0);
        setShowValidationMessage(false);
        setActiveAudio(null);

        Object.values(audioRefs.current).forEach((audio) => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
    };

    const izajes = [
        {
            image: imgEslingas,
            audio: audioEslingas,
            dropId: "drop1",
        },
        {
            image: imgGanchos_de_izaje,
            audio: audioGanchos_de_izaje,
            dropId: "drop2",
        },
        {
            image: imgGrilletes_de_izaje,
            audio: audioGrilletes_de_izaje,
            dropId: "drop3",
        },
        {
            image: imgCables_de_acero,
            audio: audioCables_de_acero,
            dropId: "drop4",
        },
        {
            image: imgTensores,
            audio: audioTensores,
            dropId: "drop5",
        },
        {
            image: imgEstrobos,
            audio: audioEstrobos,
            dropId: "drop6",
        },
    ];

    const options = [
        { value: "option3", label: "Grilletes de izaje" },
        { value: "option2", label: "Ganchos de izaje" },
        { value: "option1", label: "Eslingas" },
        { value: "option6", label: "Estrobos" },
        { value: "option4", label: "Cables de acero" },
        { value: "option5", label: "Tensores" },
    ];

    const correctItems = {
        drop1: "option1", // Eslingas
        drop2: "option2", // Ganchos de izaje
        drop3: "option3", // Grilletes de izaje
        drop4: "option4", // Cables de acero
        drop5: "option5", // Tensores
        drop6: "option6", // Estrobos
    };

    const getSelectClass = (dropId) => {
        if (!validatedSelections[dropId]) return "custom-selectPPT13";
        return isVerified[dropId] ? "custom-selectPPT13 select-correctppt13" : "custom-selectPPT13 select-incorrectppt13";
    };

    return (
        <div className="quiz-container-izajes">
            <div className="cards-container-izajes">
                {izajes.map((izaje, index) => (
                    <div className="quiz-card-SEC" key={index}>
                        <div className={`card-front-SEC ${isVerified[izaje.dropId] ? "bg-green-personalizado" : selections[izaje.dropId] && !isVerified[izaje.dropId] ? "bg-red-personalizado" : ""}`}>
                            <div className="card-image-SEC">
                                <img
                                    src={izaje.image || "/placeholder.svg"}
                                    alt={`Imagen ${index + 1}`}
                                    className="square-image mb-0"
                                />
                                {selections[izaje.dropId] && (
                                    <div className="validation-icon-container">
                                        <img
                                            src={isVerified[izaje.dropId] ? imgVerdadero : imgFalso}
                                            alt="Validation Icon"
                                            className="validation-icon-izajes"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="card-content-SEC">
                                <select
                                    value={selections[izaje.dropId]}
                                    onChange={(e) => handleChange(izaje.dropId, e.target.value)}
                                    className={getSelectClass(izaje.dropId)}
                                    disabled={isVerified[izaje.dropId]}
                                    style={{
                                        backgroundColor: isVerified[izaje.dropId] ? "rgba(255, 255, 255, 0.2)" : "white",
                                        color: isVerified[izaje.dropId] ? "white" : "gray",
                                        border: isVerified[izaje.dropId] ? "1px solid white" : "1px solid #e5e7eb",
                                    }}
                                >
                                    <option value="">Seleccione...</option>
                                    {options
                                        .filter(
                                            (option) =>
                                                !Object.values(selections).includes(option.value) ||
                                                selections[izaje.dropId] === option.value
                                        )
                                        .map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {activeAudio && (
                <div className="audio-global-containerPPT13">
                    <audio
                        ref={(el) => (audioRefs.current[activeAudio] = el)}
                        controls
                        autoPlay
                        key={activeAudio}
                    >
                        <source src={izajes.find((izaje) => izaje.dropId === activeAudio)?.audio} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            )}

            {showValidationMessage && (
                <div className="text-center mt-1">
                    <p theme="ligth" bold="true" className="bold-text">
                        Tus respuestas correctas son: {correctCount} de {Object.keys(correctItems).length} (
                        {Math.round((correctCount / Object.keys(correctItems).length) * 100)}%).
                    </p>
                </div>
            )}

            {showValidationMessage && (
                <div className="feedback-container-izajes mt-1 p-0 rounded-lg text-center">
                    {correctCount === Object.keys(correctItems).length ? (
                        <Paragraph>
                            <span className="text-green-personalizado font-bold">Selección Incorrecta:</span>{" "}
                            <span className="texto-gray">¡Muy bien! Conoces los izajes de carga.</span>
                        </Paragraph>
                    ) : correctCount >= Object.keys(correctItems).length - 2 ? (
                        <Paragraph>
                            <span className="text-orange-personalizado font-bold">Piénsalo bien:</span>{" "}
                            <span className="texto-gray">
                                Algunas opciones NO las has relacionado correctamente.
                            </span>
                        </Paragraph>
                    ) : (
                        <Paragraph>
                            <span className="text-red-personalizado font-bold">Selección Incorrecta:</span>{" "}
                            <span className="texto-gray">
                                ¡Piénsalo bien! Revisa nuevamente y vuelve a intentarlo.
                            </span>
                        </Paragraph>
                    )}
                </div>
            )}

            <div className="reset-button-container">
                <Button
                    bold={false}
                    icon={faRefresh}
                    roundedFull={true}
                    onClick={handleReset}
                    disabled={!isResetEnabled}
                    className={isResetEnabled ? "" : "disabled"}
                >
                    Reiniciar
                </Button>
            </div>
        </div>
    );
}

export default Sliderppt13_seleccione_audio;