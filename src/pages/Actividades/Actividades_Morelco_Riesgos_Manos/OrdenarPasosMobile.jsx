import React, { useState } from "react";
import "./styles/OrdenarPasosMobile.css";
import Button from "../../components/Button";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";

const OrdenarPasos = () => {
  const pasosCorrectos = [
    "Se evalúan riesgos para identificar áreas peligrosas durante el montaje de la estructura metálica.",
    "Se instalan guardas metálicas resistentes en herramientas como sierras y taladros para evitar contactos accidentales.",
    "Los trabajadores reciben capacitación sobre el uso correcto de las guardas.",
    "Se implementa un programa de mantenimiento para inspeccionar y asegurar el buen estado de las guardas.",
    "Antes de cada turno, los trabajadores verifican que las guardas estén en su lugar y funcionando.",
  ];

  const [respuestas, setRespuestas] = useState(Array(5).fill(""));
  const [colores, setColores] = useState(Array(5).fill(""));
  const [correctCount, setCorrectCount] = useState(0);
  const [habilitarValidar, setHabilitarValidar] = useState(false);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const opciones = ["Paso 1", "Paso 2", "Paso 3", "Paso 4", "Paso 5"];
  const numerosDesordenados = opciones.sort(() => Math.random() - 0.5);

  const handleSelectChange = (e, index) => {
    const newRespuestas = [...respuestas];
    newRespuestas[index] = e.target.value;
    setRespuestas(newRespuestas);
    setHabilitarValidar(newRespuestas.every((respuesta) => respuesta !== ""));
    setMostrarResultado(false); // Oculta el mensaje al cambiar las respuestas
  };

  const validarRespuestas = () => {
    const nuevosColores = respuestas.map((respuesta, index) =>
      respuesta === `Paso ${index + 1}` ? "correcto" : "incorrecto"
    );
    setColores(nuevosColores);

    const correctas = nuevosColores.filter((color) => color === "correcto").length;
    setCorrectCount(correctas);
    setMostrarResultado(true); // Muestra el mensaje al validar
  };

  const reiniciarRespuestas = () => {
    setRespuestas(Array(5).fill(""));
    setColores(Array(5).fill(""));
    setCorrectCount(0);
    setHabilitarValidar(false);
    setMostrarResultado(false); // Oculta el mensaje al reiniciar
  };

  const opcionesDisponibles = (index) => {
    const seleccionadas = respuestas.filter((r) => r !== "");
    return numerosDesordenados.filter(
      (opcion) =>
        !seleccionadas.includes(opcion) || respuestas[index] === opcion
    );
  };

  return (
    <div className="ordenar-pasos-container">
      <div className="contenedor-pasos">
        {pasosCorrectos.map((paso, index) => (
          <div key={index} className={`tarjeta-paso ${colores[index]}`}>
            <p>{paso}</p>
            <select
              id={`respuesta-${index}`}
              value={respuestas[index]}
              onChange={(e) => handleSelectChange(e, index)}
              className={`respuesta-select ${colores[index]}`}
            >
              <option value="">Seleccione...</option>
              {opcionesDisponibles(index).map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {mostrarResultado && (
        <div className="contador-correctas">
          <p className="text-md mt-0 font-bold text-center resultado-mensaje">
            {correctCount} de {pasosCorrectos.length} respuestas correctas
          </p>
        </div>
      )}

      <div className="botones-container">
        <Button
          bold={false}
          icon={faCheck}
          roundedFull={true}
          onClick={validarRespuestas}
          disabled={!habilitarValidar}
        >
          Validar
        </Button>
        <Button
          bold={false}
          icon={faRepeat}
          roundedFull={true}
          onClick={reiniciarRespuestas}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
};

export default OrdenarPasos;
