import React, { useState } from "react"
import "./styles/SeleccionPreguntas.css"
import Paragraph from "../../components/Paragraph"
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons"
import Button from "../../components/Button"

const SeleccionPreguntas = () => {
  const preguntasCorrectas = [
    "Primeros auxilios y atención médica.",
    "Reporte e investigación de accidentes.",
    "Rehabilitación y reinserción laboral.",
  ]

  const todasLasPreguntas = [
    { id: 1, texto: "Primeros auxilios y atención médica." },
    { id: 2, texto: "Reporte e investigación de accidentes." },
    { id: 3, texto: "Rehabilitación y reinserción laboral." },
    { id: 4, texto: "Evaluación de riesgos laborales." },
    { id: 5, texto: "Implementación de medidas preventivas." },
  ]

  const [seleccionadas, setSeleccionadas] = useState([])
  const [resultado, setResultado] = useState("")
  const [correctCount, setCorrectCount] = useState(0)
  const [isButtonActive, setIsButtonActive] = useState(false)

  const reiniciarSeleccion = () => {
    setSeleccionadas([])
    setResultado("")
    setCorrectCount(0)
    setIsButtonActive(false)
  }

  const handleSeleccion = (id) => {
    const newSeleccionadas = seleccionadas.includes(id)
      ? seleccionadas.filter((selectedId) => selectedId !== id)
      : [...seleccionadas, id]
    setSeleccionadas(newSeleccionadas)
    setIsButtonActive(newSeleccionadas.length > 0)
  }

  const validarSeleccion = () => {
    const preguntasSeleccionadas = todasLasPreguntas
      .filter((pregunta) => seleccionadas.includes(pregunta.id))
      .map((pregunta) => pregunta.texto)

    const correctCount = preguntasSeleccionadas.filter((pregunta) => preguntasCorrectas.includes(pregunta)).length

    const isCorrect = correctCount === preguntasCorrectas.length && seleccionadas.length === preguntasCorrectas.length
    setResultado(isCorrect ? "correcto" : "incorrecto")
    setCorrectCount(correctCount)
  }

  return (
    <div className="seleccion-preguntas-wrapper">
      <div className="seleccion-preguntas-container">
        <div className="contenedor-preguntas">
          {todasLasPreguntas.map((pregunta) => (
            <div
              key={pregunta.id}
              className={`tarjeta-pregunta ${seleccionadas.includes(pregunta.id) ? "seleccionada" : ""} ${
                resultado && (preguntasCorrectas.includes(pregunta.texto) ? "correcto" : "incorrecto")
              }`}
              onClick={() => handleSeleccion(pregunta.id)}
            >
              {pregunta.texto}
            </div>
          ))}
        </div>

        <div className="botones-container">
          <Button
            bold={false}
            icon={faCheck}
            roundedFull={true}
            onClick={isButtonActive ? validarSeleccion : undefined}
            disabled={!isButtonActive}
            className={`boton-validar ${isButtonActive ? "activo" : "inactivo"}`}
          >
            Validar
          </Button>
          <Button bold={false} icon={faRepeat} roundedFull={true} onClick={reiniciarSeleccion}>
            Reiniciar
          </Button>
        </div>
      </div>

      {resultado && (
        <div className="feedback-container">
          <p className="text-md mt-0 font-bold text-center">
            {resultado === "correcto" ? (
              <span>
                <span style={{ color: "#4caf50" }}>¡Correcto!</span>{" "}
                <span style={{ color: "#8F8F8F" }}>
                  Todas las respuestas son correctas. ({Math.round((correctCount / preguntasCorrectas.length) * 100)}%)
                </span>
              </span>
            ) : (
              <span>
                <span style={{ color: "#f44336" }}>¡Incorrecto!</span>{" "}
                <span style={{ color: "#8F8F8F" }}>
                  Tienes {correctCount} de {preguntasCorrectas.length} respuestas correctas. Intenta de nuevo. (
                  {Math.round((correctCount / preguntasCorrectas.length) * 100)}%)
                </span>
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  )
}

export default SeleccionPreguntas

