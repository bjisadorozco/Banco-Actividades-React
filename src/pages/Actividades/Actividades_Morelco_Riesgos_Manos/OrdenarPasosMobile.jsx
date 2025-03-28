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
  const [porcentaje, setPorcentaje] = useState(0);
  const [mensajeRetroalimentacion, setMensajeRetroalimentacion] = useState(""); // Nuevo estado para el mensaje

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
    const nuevoPorcentaje = (correctas / pasosCorrectos.length) * 100;
    setPorcentaje(nuevoPorcentaje);

    // Determinar el mensaje de retroalimentación
    if (correctas === pasosCorrectos.length) {
      setMensajeRetroalimentacion("¡Excelente trabajo! Has ordenado todo correctamente.");
    } else {
      setMensajeRetroalimentacion("Sigue practicando, ¡puedes hacerlo mejor!");
    }

    setMostrarResultado(true); // Muestra el mensaje al validar
  };

  const reiniciarRespuestas = () => {
    setRespuestas(Array(5).fill(""));
    setColores(Array(5).fill(""));
    setCorrectCount(0);
    setPorcentaje(0);
    setHabilitarValidar(false);
    setMostrarResultado(false); // Oculta el mensaje al reiniciar
    setMensajeRetroalimentacion(""); // Reinicia el mensaje de retroalimentación
  };

  const opcionesDisponibles = (index) => {
    const seleccionadas = respuestas.filter((r) => r !== "");
    return numerosDesordenados.filter(
      (opcion) =>
        !seleccionadas.includes(opcion) || respuestas[index] === opcion
    );
  };

  // Función para determinar si el select tiene una opción seleccionada
  const tieneSeleccion = (index) => {
    return respuestas[index] !== "" && !mostrarResultado; // Solo aplica morado si no se ha validado
  };

  return (
    <div className="ordenar-pasos-container">
      <div className="contenedor-pasos">
        {pasosCorrectos.map((paso, index) => (
          <div
            key={index}
            className={`tarjeta-paso ${colores[index]} ${
              tieneSeleccion(index) ? "seleccionado" : ""
            }`}
          >
            <p>{paso}</p>
            <select
              id={`respuesta-${index}`}
              value={respuestas[index]}
              onChange={(e) => handleSelectChange(e, index)}
              className={`respuesta-select ${colores[index]} ${
                tieneSeleccion(index) ? "seleccionado" : ""
              }`}
              disabled={mostrarResultado} // Deshabilita el select después de validar
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
          <p className="text-md mt-4 font-bold text-center resultado-mensaje">
            Respuestas correctas: {correctCount} de {pasosCorrectos.length} ({porcentaje}%)
          </p>
          {/* Mensaje de retroalimentación */}
          <p
            className={`text-md mt-2 text-center ${
              correctCount === pasosCorrectos.length ? "texto-verde" : "texto-rojo"
            }`}
          >
            {mensajeRetroalimentacion}
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