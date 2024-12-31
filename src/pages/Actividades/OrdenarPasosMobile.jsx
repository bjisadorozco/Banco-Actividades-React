import React, { useState } from "react";
import "./styles/OrdenarPasosMobile.css";
import Button from "../components/Button";
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
  const [habilitarValidar, setHabilitarValidar] = useState(false);

  const numerosDesordenados = [5, 4, 3, 2, 1].sort(() => Math.random() - 0.5);

  const handleSelectChange = (e, index) => {
    const newRespuestas = [...respuestas];
    newRespuestas[index] = e.target.value;
    setRespuestas(newRespuestas);
    setHabilitarValidar(newRespuestas.every((respuesta) => respuesta !== ""));
  };

  const validarRespuestas = () => {
    const nuevosColores = respuestas.map((respuesta, index) =>
      parseInt(respuesta) === index + 1 ? "correcto" : "incorrecto"
    );
    setColores(nuevosColores);
  };

  const reiniciarRespuestas = () => {
    setRespuestas(Array(5).fill(""));
    setColores(Array(5).fill(""));
    setHabilitarValidar(false);
  };

  const opcionesDisponibles = (index) => {
    const seleccionadas = respuestas.filter((r) => r !== "");
    return numerosDesordenados.filter(
      (numero) =>
        !seleccionadas.includes(numero.toString()) ||
        respuestas[index] === numero.toString()
    );
  };

  return (
    <div className="ordenar-pasos-container">
      <div className="contenedor-pasos">
        {pasosCorrectos.map((paso, index) => (
          <div
            key={index}
            className={`tarjeta-paso ${colores[index]}`} // Aplicamos el color a las tarjetas
          >
            <p>{paso}</p>
            <div className="respuesta-item">
              <select
                id={`respuesta-${index}`}
                value={respuestas[index]}
                onChange={(e) => handleSelectChange(e, index)}
                className={`respuesta-select ${colores[index]}`}
              >
                <option value="">Seleccione...</option>
                {opcionesDisponibles(index).map((numero) => (
                  <option key={numero} value={numero}>
                    {numero}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

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
