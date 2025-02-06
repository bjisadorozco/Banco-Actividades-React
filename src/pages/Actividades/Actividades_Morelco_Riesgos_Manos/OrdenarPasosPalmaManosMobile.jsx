import React, { useState } from "react";
import "./styles/OrdenarPasosPalmaManosMobile.css";
import Button from "../../components/Button";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";

const OrdenarPasos = () => {
  const pasosCorrectos = [
    "Primeros auxilios y atencion médica.",
    "Reporte e investigación de accidentes.",
    "Rehabilitación y reinserción laboral.",
  ];

  const [respuestas, setRespuestas] = useState(Array(3).fill(""));
  const [colores, setColores] = useState(Array(3).fill(""));
  const [correctCount, setCorrectCount] = useState(0);
  const [habilitarValidar, setHabilitarValidar] = useState(false);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [porcentaje, setPorcentaje] = useState(0);
  const [mensajeRetroalimentacion, setMensajeRetroalimentacion] = useState("");

  const opciones = ["Paso 1", "Paso 2", "Paso 3"];
  const numerosDesordenados = opciones.sort(() => Math.random() - 0.3);

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
    const nuevoPorcentaje = Math.round((correctas / pasosCorrectos.length) * 100); // Redondea el porcentaje
    setPorcentaje(nuevoPorcentaje);

    // Determinar el mensaje de retroalimentación
    if (correctas === pasosCorrectos.length) {
      setMensajeRetroalimentacion(
        <>
          <span className="texto-verde">¡Correcto!</span> Todas las respuestas son correctas. ({nuevoPorcentaje}%)
        </>
      );
    } else {
      setMensajeRetroalimentacion(
        <>
          <span className="texto-rojo">¡Incorrecto!</span> Tus respuestas correctas son: {correctas} de {pasosCorrectos.length}. Intenta de nuevo. ({nuevoPorcentaje}%)
        </>
      );
    }

    setMostrarResultado(true); // Muestra el mensaje al validar
  };

  const reiniciarRespuestas = () => {
    setRespuestas(Array(3).fill(""));
    setColores(Array(3).fill(""));
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