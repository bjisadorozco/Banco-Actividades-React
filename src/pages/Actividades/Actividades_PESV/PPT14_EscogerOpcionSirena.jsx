import React, { useState } from 'react';
import './styles/PPT14_EscogerOpcionSirena.css'; // Importamos los estilos
import alertaroja from "../../../assets/img/alerta_roja.webp"; // Importar imagen de alerta roja
import alertaverde from "../../../assets/img/alerta_verde.webp"; // Importar imagen de alerta verde
import Button from "../../components/Button"; // Importar el componente Button
import { faRefresh } from "@fortawesome/free-solid-svg-icons"; // Importar el ícono de reinicio

const PPT14_EscogerOpcionSirena = () => {
  const [respuestas, setRespuestas] = useState({});
  const [mensajeError, setMensajeError] = useState('');
  const [resultado, setResultado] = useState('');
  const [isResetEnabled, setIsResetEnabled] = useState(false); // Estado para habilitar/deshabilitar el botón de reinicio
  const [validado, setValidado] = useState(false); // Estado para saber si se ha validado

  const correctas = {
    1: 'roja_alertas',
    2: 'verde_alertas',
    3: 'verde_alertas',
    4: 'roja_alertas',
    5: 'roja_alertas',
    6: 'roja_alertas'
  };

  const preguntas = [
    {
      id: 1,
      texto: "1. Realizar excavaciones profundas en zonas húmedas y oscuras."
    },
    {
      id: 2,
      texto: "2. Trabajar en áreas urbanas con baja probabilidad de fauna peligrosa."
    },
    {
      id: 3,
      texto: "3. Revisar matrices de probabilidad y severidad en la oficina."
    },
    {
      id: 4,
      texto: "4. Manipular madera o ladrillos que no hayan sido removidos recientemente."
    },
    {
      id: 5,
      texto: "5. Realizar trabajo en alturas en zonas tropicales."
    },
    {
      id: 6,
      texto: "6. Acceder a depósitos húmedos o tener aguas estancadas."
    }
  ];

  const seleccionarSirena = (idPregunta, tipo) => {
    setRespuestas(prevRespuestas => ({
      ...prevRespuestas,
      [idPregunta]: tipo
    }));
    setIsResetEnabled(true); // Habilitar el botón de reinicio al seleccionar una opción
  };

  const validarRespuestas = () => {
    let puntaje = 0;
    let preguntasSinRespuesta = 0;

    preguntas.forEach(pregunta => {
      if (respuestas[pregunta.id] === undefined) {
        preguntasSinRespuesta++;
      }
    });

    if (preguntasSinRespuesta === 6) {
      setMensajeError("No has seleccionado ninguna señal de alerta en todas las preguntas.");
      setResultado("");
      return;
    }

    if (preguntasSinRespuesta > 0) {
      setMensajeError("Te faltan seleccionar señales de alerta.");
      setResultado("");
      return;
    }

    setMensajeError("");

    preguntas.forEach(pregunta => {
      if (respuestas[pregunta.id] === correctas[pregunta.id]) {
        puntaje++;
      }
    });
    const porcentaje = Math.round((puntaje / 6) * 100);
    setResultado(`Tus respuestas correctas son: ${puntaje} de 6 (${porcentaje}%)`);
    setValidado(true); // Marcar como validado
  };

  const handleReset = () => {
    setRespuestas({});
    setMensajeError('');
    setResultado('');
    setIsResetEnabled(false); // Deshabilitar el botón de reinicio después de usarlo
    setValidado(false); // Restablecer el estado de validado
  };

  return (
    <div className="contenedor-alertas">
      <div id="preguntas_alertas">
        {preguntas.map(pregunta => (
          <div key={pregunta.id} id={`pregunta_${pregunta.id}`} className={`pregunta_alertas ${validado ? (respuestas[pregunta.id] === correctas[pregunta.id] ? 'correcta_alertas' : 'incorrecta_alertas') : ''}`}>
            <p>{pregunta.texto}</p>
            <div className="opciones_alertas">
              <img
                src={alertaroja} // Usar la imagen importada
                alt="Roja"
                className={`sirena_alertas ${respuestas[pregunta.id] === 'roja_alertas' ? 'seleccionada_alertas' : ''}`}
                onClick={() => seleccionarSirena(pregunta.id, 'roja_alertas')}
              />
              <img
                src={alertaverde} // Usar la imagen importada
                alt="Verde"
                className={`sirena_alertas ${respuestas[pregunta.id] === 'verde_alertas' ? 'seleccionada_alertas' : ''}`}
                onClick={() => seleccionarSirena(pregunta.id, 'verde_alertas')}
              />
            </div>
          </div>
        ))}
      </div>
      <div id="mensaje_error" style={{ display: mensajeError ? 'block' : 'none' }}>
        {mensajeError}
      </div>
      <div id="resultado_alertas">
        {resultado}
      </div>
      <div className="botones_alertas">
          <Button
            bold={false}
            icon={faRefresh}
            roundedFull={true}
            onClick={validarRespuestas}
          >
            Validar
          </Button>
        <div>
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
    </div>
  );
};

export default PPT14_EscogerOpcionSirena;