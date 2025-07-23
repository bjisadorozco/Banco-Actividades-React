import { useState, useEffect, useRef } from "react"
import useStore from "../../../store"
import Button from "../../components/Button"
import Paragraph from "../../components/Paragraph"
import imgArana from "../../../assets/img/araña.webp"
import imgAlacran from "../../../assets/img/alacran.webp"
import imgSerpiente from "../../../assets/img/serpiente.webp"
import imgMosquito from "../../../assets/img/mosquitos.webp"
import imgRata from "../../../assets/img/rata.webp"
import imgMurcielago from "../../../assets/img/murcielago.webp"
import audioArana from "../../../assets/audio/m2_slide19_comite_seguridad_vial.mp3"
import audioAlacran from "../../../assets/audio/m2_slide19_comite_seguridad_vial.mp3"
import audioSerpiente from "../../../assets/audio/m2_slide19_comite_seguridad_vial.mp3"
import audioMosquito from "../../../assets/audio/m2_slide19_comite_seguridad_vial.mp3"
import audioRata from "../../../assets/audio/m2_slide19_comite_seguridad_vial.mp3"
import audioMurcielago from "../../../assets/audio/m2_slide19_comite_seguridad_vial.mp3"
import { faRefresh } from "@fortawesome/free-solid-svg-icons"
import "./styles/PicadurasAnimalesPeligrosos.css"
import imgVerdadero from "../../../assets/img/checkAct.png"
import imgFalso from "../../../assets/img/xmarkAct.png"

function PicadurasAnimalesPeligrosos() {
    const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)
    const [selections, setSelections] = useState({
        drop1: "",
        drop2: "",
        drop3: "",
        drop4: "",
        drop5: "",
        drop6: "",
    })
    const [isVerified, setIsVerified] = useState({
        drop1: false,
        drop2: false,
        drop3: false,
        drop4: false,
        drop5: false,
        drop6: false,
    })
    const [showAudio, setShowAudio] = useState({
        drop1: false,
        drop2: false,
        drop3: false,
        drop4: false,
        drop5: false,
        drop6: false,
    })
    const [isResetEnabled, setIsResetEnabled] = useState(false)
    const [correctCount, setCorrectCount] = useState(0)
    const [showValidationMessage, setShowValidationMessage] = useState(false)
    // Nuevo estado para seguir las selecciones validadas
    const [validatedSelections, setValidatedSelections] = useState({
        drop1: false,
        drop2: false,
        drop3: false,
        drop4: false,
        drop5: false,
        drop6: false,
    })

    const audioRefs = useRef({
        drop1: null,
        drop2: null,
        drop3: null,
        drop4: null,
        drop5: null,
        drop6: null,
    })

    useEffect(() => {
        setIsOnDivisor(false)
    }, [setIsOnDivisor])

    const handleChange = (dropId, value) => {
        // Detener todos los audios anteriores antes de procesar la nueva selección
        Object.values(audioRefs.current).forEach((audio) => {
            if (audio && !audio.paused) {
                audio.pause()
                audio.currentTime = 0
            }
        })

        setSelections((prev) => {
            const newSelections = { ...prev, [dropId]: value }

            // Verificar si la selección es correcta
            const isCorrect = value === correctItems[dropId]
            setIsVerified((prev) => ({ ...prev, [dropId]: isCorrect }))
            setShowAudio((prev) => ({ ...prev, [dropId]: isCorrect }))

            // Marcar la selección como validada (para el cambio de color del select)
            setValidatedSelections((prev) => ({ ...prev, [dropId]: value !== "" }))

            // Si es correcto, reproducir el nuevo audio
            if (isCorrect) {
                if (audioRefs.current[dropId]) {
                    audioRefs.current[dropId].play()
                }
            }

            // Habilitar el botón de reinicio si se ha hecho al menos una selección
            setIsResetEnabled(true)

            // Contar respuestas correctas
            const correctAnswers = Object.keys(newSelections).filter(
                (key) => newSelections[key] === correctItems[key]
            ).length
            setCorrectCount(correctAnswers)

            // Mostrar feedback si todas las preguntas han sido respondidas
            if (Object.values(newSelections).every((val) => val !== "")) {
                setShowValidationMessage(true)
            }

            return newSelections
        })
    }

    const handleReset = () => {
        setSelections({
            drop1: "",
            drop2: "",
            drop3: "",
            drop4: "",
            drop5: "",
            drop6: "",
        })
        setIsVerified({
            drop1: false,
            drop2: false,
            drop3: false,
            drop4: false,
            drop5: false,
            drop6: false,
        })
        setShowAudio({
            drop1: false,
            drop2: false,
            drop3: false,
            drop4: false,
            drop5: false,
            drop6: false,
        })
        // Reiniciar el estado de validación de selecciones
        setValidatedSelections({
            drop1: false,
            drop2: false,
            drop3: false,
            drop4: false,
            drop5: false,
            drop6: false,
        })
        setIsResetEnabled(false)
        setCorrectCount(0)
        setShowValidationMessage(false)

        // Detener todos los audios
        Object.values(audioRefs.current).forEach((audio) => {
            if (audio) {
                audio.pause()
                audio.currentTime = 0
            }
        })
    }

    const animales = [
        {
            image: imgArana,
            audio: audioArana,
            dropId: "drop1",
        },
        {
            image: imgAlacran,
            audio: audioAlacran,
            dropId: "drop2",
        },
        {
            image: imgSerpiente,
            audio: audioSerpiente,
            dropId: "drop3",
        },
        {
            image: imgMosquito,
            audio: audioMosquito,
            dropId: "drop4",
        },
        {
            image: imgRata,
            audio: audioRata,
            dropId: "drop5",
        },
        {
            image: imgMurcielago,
            audio: audioMurcielago,
            dropId: "drop6",
        },
    ]

    const options = [
        { value: "option3", label: "Serpientes" },
        { value: "option2", label: "Alacranes" },
        { value: "option1", label: "Araña" },
        { value: "option6", label: "Murciélago" },
        { value: "option4", label: "Mosquito" },
        { value: "option5", label: "Rata" },
    ]

    const correctItems = {
        drop1: "option1", // Araña
        drop2: "option2", // Alacranes
        drop3: "option3", // Serpientes
        drop4: "option4", // Mosquito
        drop5: "option5", // Rata
        drop6: "option6", // Murciélago
    }

    // Función para obtener la clase CSS según el estado de validación
    const getSelectClass = (dropId) => {
        if (!validatedSelections[dropId]) return "custom-select";
        return isVerified[dropId] ? "custom-select select-correct" : "custom-select select-incorrect";
    }

    return (
        <div className="quiz-container-picaduras">
            <div className="cards-container-picaduras">
                {animales.map((animal, index) => (
                    <>
                        <div className="image-select-container" key={index}>
                            <div className="top-content">
                                {showAudio[animal.dropId] && (
                                    <div className="audio-container">
                                        <audio ref={(el) => (audioRefs.current[animal.dropId] = el)} controls autoPlay>
                                            <source src={animal.audio} type="audio/mpeg" />
                                            Tu navegador no soporta el elemento de audio.
                                        </audio>
                                    </div>
                                )}
                            </div>

                            <div className="image-validation-container">
                                <img
                                    src={animal.image || "/placeholder.svg"}
                                    alt={`Imagen ${index + 1}`}
                                    className="circular-image mb-2"
                                />
                                {selections[animal.dropId] && (
                                    <div className="validation-icon-container">
                                        <img
                                            src={isVerified[animal.dropId] ? imgVerdadero : imgFalso}
                                            alt="Validation Icon"
                                            className="validation-icon-picaduras"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="bottom-content">
                                <div className="custom-select-wrapper text-monserrat">
                                    <select
                                        value={selections[animal.dropId]}
                                        onChange={(e) => handleChange(animal.dropId, e.target.value)}
                                        className={getSelectClass(animal.dropId)}
                                        disabled={isVerified[animal.dropId]}
                                    >
                                        <option value="">Seleccione...</option>
                                        {options
                                            .filter(
                                                (option) =>
                                                    !Object.values(selections).includes(option.value) ||
                                                    selections[animal.dropId] === option.value
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
                        {index === 2 && <hr className="divider" />} {/* Línea divisoria después de la tercera imagen */}
                    </>
                ))}
            </div>

            {showValidationMessage && (
                <div className="text-center mt-1">
                    <p theme="ligth" bold="true" className="bold-text">
                        Tus respuestas correctas son: {correctCount} de {Object.keys(correctItems).length} (
                        {Math.round((correctCount / Object.keys(correctItems).length) * 100)}%).
                    </p>
                </div>
            )}

            {showValidationMessage && (
                <div className="feedback-container-picaduras mt-1 p-0 rounded-lg text-center">
                    {correctCount === Object.keys(correctItems).length ? (
                        <Paragraph>
                            <span className="text-green-personalizado font-bold">Respuesta correcta:</span>{" "}
                            <span className="texto-gray">¡Muy bien! Conoces los animales peligrosos.</span>
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
                            <span className="text-red-personalizado font-bold">Respuesta Incorrecta:</span>{" "}
                            <span className="texto-gray">
                                ¡Piénsalo bien! Observa las imágenes e inténtalo de nuevo.
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
    )
}

export default PicadurasAnimalesPeligrosos