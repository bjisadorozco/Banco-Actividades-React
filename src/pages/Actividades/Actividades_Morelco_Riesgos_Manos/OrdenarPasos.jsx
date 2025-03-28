import React, { useState, useEffect } from "react";
import "./styles/OrdenarPasos.css";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import checkIcon from "../../../assets/img/checkAct.png";
import xmarkIcon from "../../../assets/img/xmarkAct.png";

const OrdenarPasos = () => {
  const pasosCorrectos = [
    "Se evalúan riesgos para identificar áreas peligrosas durante el montaje de la estructura metálica.",
    "Se instalan guardas metálicas resistentes en herramientas como sierras y taladros para evitar contactos accidentales.",
    "Los trabajadores reciben capacitación sobre el uso correcto de las guardas.",
    "Se implementa un programa de mantenimiento para inspeccionar y asegurar el buen estado de las guardas.",
    "Antes de cada turno, los trabajadores verifican que las guardas estén en su lugar y funcionando.",
  ];

  const pasosDesordenadosIniciales = [
    { numero: 3, texto: pasosCorrectos[2] },
    { numero: 1, texto: pasosCorrectos[0] },
    { numero: 5, texto: pasosCorrectos[4] },
    { numero: 2, texto: pasosCorrectos[1] },
    { numero: 4, texto: pasosCorrectos[3] },
  ];

  const [pasos, setPasos] = useState([]);
  const [resultado, setResultado] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [ordenando, setOrdenando] = useState(false);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    setPasos(pasosDesordenadosIniciales);
  }, []);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setOrdenando(true);
  };

  const handleDrop = (e, targetIndex) => {
    const draggedIndex = e.dataTransfer.getData("index");
    const newPasos = [...pasos];
    const temp = newPasos[draggedIndex];
    newPasos[draggedIndex] = newPasos[targetIndex];
    newPasos[targetIndex] = temp;
    setPasos(newPasos);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const validarOrden = () => {
    const correctAnswers = pasos.filter(
      (paso, index) => paso.texto === pasosCorrectos[index]
    );
    const correctCount = correctAnswers.length;
    const totalCount = pasosCorrectos.length;
    const porcentajeCorrecto = Math.round((correctCount / totalCount) * 100);

    setCorrectCount(correctCount);
    setPorcentaje(porcentajeCorrecto);
    setResultado(correctCount === totalCount ? "correcto" : "incorrecto");
  };

  const reiniciarPasos = () => {
    setPasos([...pasosDesordenadosIniciales]);
    setResultado("");
    setCorrectCount(0);
    setPorcentaje(0);
    setOrdenando(false);
  };

  return (
    <div className="ordenar-pasos-container">
      <div className="contenedor-pasosWEB">
        {pasos.map((paso, index) => {
          const esCorrecto = resultado && paso.texto === pasosCorrectos[index];
          return (
            <div
              key={index}
              className={`tarjeta-paso1 ${
                resultado ? (esCorrecto ? "correcto" : "incorrecto") : ""
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="contenido-tarjeta">
                <span>
                  {paso.numero}. {paso.texto}
                </span>
                {resultado && (
                  <div className="feedback-tarjeta">
                    <img
                      src={esCorrecto ? checkIcon : xmarkIcon}
                      alt={esCorrecto ? "Correcto" : "Incorrecto"}
                      className="icono-resultado"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {resultado && (
        <div className="resultado-contenedor">
          <p className="text-md mt-4 font-bold text-center">
            {correctCount} de {pasosCorrectos.length} respuestas correctas {porcentaje}%

          </p>
          <p className={`resultadoOP ${resultado}`}>
            {resultado === "correcto"
              ? "¡Excelente trabajo! Has ordenado todo correctamente."
              : porcentaje > 50
              ? "Buen intento, pero hay espacio para mejorar."
              : "Sigue practicando, ¡puedes hacerlo mejor!"}
          </p>
        </div>
      )}

      <div className="botones-containerOP">
        <Button
          bold={false}
          icon={faCheck}
          roundedFull={true}
          onClick={validarOrden}
          disabled={!ordenando}
        >
          Validar
        </Button>
        <Button
          bold={false}
          icon={faRepeat}
          roundedFull={true}
          onClick={reiniciarPasos}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
};

export default OrdenarPasos;
