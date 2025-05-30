
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import metodo5Porque from "../../../assets/img/metodo_5_porque_sldM3.webp";
import metodoArbolFallas from "../../../assets/img/metodo_arbol_fallas_sldM3.webp";
import metodoEspinaPescado from "../../../assets/img/metodo_espina_pescado_sldm3.webp";
import correctIcon from "../../../assets/img/checkAct.png";
import incorrectIcon from "../../../assets/img/xmarkAct.png";
import "./styles/ActividadListaDesplegable.css";

function ActividadListaDesplegable() {
  const [errorMessage, setErrorMessage] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [isResetActive, setIsResetActive] = useState(false)
  const [items, setItems] = useState([
    {
      image: metodo5Porque,
      description: `Este método se centra en indagar en las causas raíz de un incidente haciendo repetidamente (5 veces) la pregunta "¿por qué?" hasta llegar a la causa raíz.​`,
      correctAnswer: "1",
      selectedAnswer: "",
      isCorrect: false,
    },
    {
      image: metodoArbolFallas,
      description:
        "Mediante diagramas gráficos tipo árbol, este método visualiza las relaciones causa-efecto en incidentes complejos​",
      correctAnswer: "2",
      selectedAnswer: "",
      isCorrect: false,
    },
    {
      image: metodoEspinaPescado,
      description:
        "Este diagrama clasifica las causas de un problema en categorías como personas, máquinas, materiales, métodos, medio ambiente y medición​",
      correctAnswer: "3",
      selectedAnswer: "",
      isCorrect: false,
    },
  ])

  const [availableOptions] = useState([
    { value: "3", label: "Método Espina de pescado​" },
    { value: "1", label: "Método de los 5 porqués​" },
    { value: "2", label: "Método Árbol de fallas" },
  ])

  useEffect(() => {
    const anySelected = items.some((item) => item.selectedAnswer !== "")
    setIsResetActive(anySelected)
  }, [items])

  useEffect(() => {
    // Evitar el scroll temporal al recargar la página
    document.body.style.overflow = "hidden"
    setTimeout(() => {
      document.body.style.overflow = "auto"
    }, 100)
  }, [])

  const handleSelect = (index, value) => {
    const updatedItems = [...items]
    updatedItems[index].selectedAnswer = value
    setItems(updatedItems)
  }

  const handleValidate = () => {
    if (items.some((item) => item.selectedAnswer === "")) {
      setErrorMessage("Debe seleccionar todas las opciones antes de validar.")
      return
    }

    let correct = 0
    const updatedItems = items.map((item) => {
      const isCorrect = item.selectedAnswer === item.correctAnswer
      if (isCorrect) correct++
      return { ...item, isCorrect }
    })

    setItems(updatedItems)
    setCorrectCount(correct)
    setPercentage(Math.round((correct / items.length) * 100))
    setIsVerified(true)
    setErrorMessage("")
  }

  const handleReset = () => {
    setItems(items.map((item) => ({ ...item, selectedAnswer: "", isCorrect: false })))
    setErrorMessage("")
    setIsVerified(false)
    setCorrectCount(0)
    setPercentage(0)
    setIsResetActive(false)
  }

  const allSelected = items.every((item) => item.selectedAnswer !== "");
  return (
    <div className="quiz-containerALD">
      <div className="items-grid">
        {items.map((item, index) => (
          <div
            key={index}
            className={`item-box ${
              item.selectedAnswer !== "" && !isVerified ? "selected" : ""
            } ${isVerified ? (item.isCorrect ? "correct" : "incorrect") : ""}`}
          >
            <div className="image-containerALD">
              <img src={item.image || "/placeholder.svg"} alt={`Item ${index + 1}`} className="item-image" />
              {isVerified && (
                <img
                  src={item.isCorrect ? correctIcon : incorrectIcon}
                  className="feedback-iconALD"
                />
              )}
            </div>

            <p className={`item-description ${isVerified ? "text-white" : ""}`}>{item.description}</p>

            <select
              className={`item-select ${
                item.selectedAnswer !== "" && !isVerified ? "selected" : ""
              }`}
              value={item.selectedAnswer}
              onChange={(e) => handleSelect(index, e.target.value)}
              disabled={isVerified}
            >
              <option value="" disabled>
                Seleccione...
              </option>
              {availableOptions
                .filter(
                  (option) =>
                    !items.some(
                      (item, i) =>
                        i !== index && item.selectedAnswer === option.value
                    )
                )
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>

            {isVerified && <p className="feedback-text">{item.isCorrect ? "¡Correcto!" : "¡Incorrecto!"}</p>}
          </div>
        ))}
      </div>

      <div className="mt-4">
        {errorMessage && (
          <p className="text-secondary-color text-center text-md font-bold">
            {errorMessage}
          </p>
        )}
        {isVerified && (
          <p className="text-md font-bold text-paragraph-light-color">
            {correctCount} de {items.length} respuestas correctas (
            {Math.round((correctCount / items.length) * 100)}%)
          </p>
        )}
        <div className="button-container">
          <Button bold={false} icon={faCheck} roundedFull={true} onClick={handleValidate}>
            {"Validar"}
          </Button>
          <Button
            bold={false}
            icon={faRepeat}
            roundedFull={true}
            onClick={handleReset}
            disabled={!allSelected}
          >
            {"Reiniciar"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ActividadListaDesplegable;

