
import { useState } from "react"
import imgVerdadero from "../../../assets/img/checkAct.png"
import imgFalso from "../../../assets/img/xmarkAct.png"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import Button from "../../components/Button"
import "../../Actividades/Actividades_Riesgo_Psicosocial/styles/ActividadApoyoSocial.css"
// Importar imágenes
import imgAislado from "../../../assets/img/apoyo-social/estar_aislado.webp"
import imgCompartirColegas from "../../../assets/img/apoyo-social/compartir_colegas.webp"
import imgExpresarInquietudes from "../../../assets/img/apoyo-social/expresar_inquietudes.webp"
import imgEquipoTrabajo from "../../../assets/img/apoyo-social/hacer_equipo.webp"
import imgAyudaEstres from "../../../assets/img/apoyo-social/ayuda_estres.webp"
import imgRenunciar from "../../../assets/img/apoyo-social/renunciar_sin_decirle_nadie.webp"
import imgQuejarseJefe from "../../../assets/img/apoyo-social/quejarse_jefe.webp"

function ActividadApoyoSocial() {
  const opciones = [
    { imagen: imgAislado, texto: "Estar aislado", correcta: false },
    { imagen: imgCompartirColegas, texto: "Compartir con colegas​", correcta: true },
    { imagen: imgExpresarInquietudes, texto: "Expresar inquietudes a superiores", correcta: true },
    { imagen: imgEquipoTrabajo, texto: "Hacer equipo de trabajo, delegar​", correcta: true },
    { imagen: imgAyudaEstres, texto: "Buscar ayuda para manejo estrés​", correcta: true },
    { imagen: imgRenunciar, texto: "Renunciar sin decirle a nadie", correcta: false },
    { imagen: imgQuejarseJefe, texto: "Quejarse y hablar mal del jefe", correcta: false },
  ]

  const [selecciones, setSelecciones] = useState([])
  const [resultados, setResultados] = useState({})
  const [feedback, setFeedback] = useState(null)
  const [mensajeValidacion, setMensajeValidacion] = useState("")

  const explicaciones = {
    "Estar aislado": "Incorrecto. El aislamiento no es una estrategia de apoyo social.",
    "Compartir con colegas​": "Correcto! Compartir con colegas fortalece las redes de apoyo.",
    "Expresar inquietudes a superiores": "Correcto! La comunicación abierta es clave para el apoyo.",
    "Hacer equipo de trabajo, delegar​": "Correcto! El trabajo en equipo promueve el apoyo mutuo.",
    "Buscar ayuda para manejo estrés​": "Correcto! Reconocer necesidades y buscar ayuda es fundamental.",
    "Renunciar sin decirle a nadie": "Incorrecto. Esta acción no construye relaciones de apoyo.",
    "Quejarse y hablar mal del jefe": "Incorrecto. Las quejas no constructivas no son apoyo social.",
  }

  const seleccionarOpcion = (opcion) => {
    const yaSeleccionada = selecciones.includes(opcion)
    let nuevasSelecciones = [...selecciones]

    if (yaSeleccionada) {
      nuevasSelecciones = nuevasSelecciones.filter((item) => item !== opcion)
    } else {
      // Eliminamos el límite de 4 selecciones
      nuevasSelecciones.push(opcion)
    }

    setSelecciones(nuevasSelecciones)

    const esCorrecta = opciones.find((o) => o.texto === opcion)?.correcta || false
    setResultados((prev) => ({
      ...prev,
      [opcion]: yaSeleccionada ? undefined : esCorrecta,
    }))

    // Mostrar feedback específico para la opción seleccionada
    if (!yaSeleccionada) {
      setFeedback({
        texto: opcion,
        correcta: esCorrecta,
      })
    } else {
      setFeedback(null)
    }

    actualizarMensajeValidacion(nuevasSelecciones)
  }

  const actualizarMensajeValidacion = (seleccionadas) => {
    if (seleccionadas.length === 0) {
      setMensajeValidacion("")
      return
    }

    const opcionesCorrectas = opciones.filter((o) => o.correcta).map((o) => o.texto)
    const totalCorrectas = seleccionadas.filter((op) => opcionesCorrectas.includes(op)).length

    const porcentaje = Math.round((totalCorrectas / 4) * 100)

    setMensajeValidacion(`Respuestas correctas: ${totalCorrectas} de 4 (${porcentaje}%)`)
  }

  const reiniciarActividad = () => {
    setResultados({})
    setSelecciones([])
    setFeedback(null)
    setMensajeValidacion("")
  }

  const todasSeleccionadas = selecciones.length === opciones.length

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="actividad-opciones text-center w-full max-w-4xl">
        <div className="grid-opciones">
          {opciones.slice(0, 4).map((opcion, index) => (
            <div
              key={index}
              className={`opcion-item ${selecciones.includes(opcion.texto) ? "seleccionada" : ""}`}
              onClick={() => seleccionarOpcion(opcion.texto)}
            >
              <img src={opcion.imagen || "/placeholder.svg"} alt={opcion.texto} className="opcion-imagen" />
              {selecciones.includes(opcion.texto) && (
                <img
                  className="resultado-icono"
                  src={
                    resultados[opcion.texto] === true
                      ? imgVerdadero
                      : resultados[opcion.texto] === false
                        ? imgFalso
                        : ""
                  }
                  alt={resultados[opcion.texto] ? "Correcto" : "Incorrecto"}
                />
              )}
            </div>
          ))}
        </div>
        <div className="grid-opciones-inferiores">
          {opciones.slice(4).map((opcion, index) => (
            <div
              key={index + 4}
              className={`opcion-item ${selecciones.includes(opcion.texto) ? "seleccionada" : ""}`}
              onClick={() => seleccionarOpcion(opcion.texto)}
            >
              <img src={opcion.imagen || "/placeholder.svg"} alt={opcion.texto} className="opcion-imagen" />
              {selecciones.includes(opcion.texto) && (
                <img
                  className="resultado-icono"
                  src={
                    resultados[opcion.texto] === true
                      ? imgVerdadero
                      : resultados[opcion.texto] === false
                        ? imgFalso
                        : ""
                  }
                  alt={resultados[opcion.texto] ? "Correcto" : "Incorrecto"}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mostrar solo un feedback a la vez */}
        {selecciones.filter((op) => opciones.find((o) => o.texto === op)?.correcta).length === 4 ? (
          <div
            className={`feedback-general mt-4 font-bold ${selecciones.filter((op) => opciones.find((o) => o.texto === op)?.correcta).length === 4
                ? "text-green-600"
                : "text-red-600"
              }`}
          >
            {selecciones.filter((op) => opciones.find((o) => o.texto === op)?.correcta).length === 4
              ? "Muy bien! Has identificado los 4 factores de apoyo"
              : "Piénsalo bien! Hay factores de apoyo social que no has identificado correctamente."}
          </div>
        ) : feedback ? (
          <div
            className={`feedback-especifico mt-4 font-bold ${feedback.correcta ? "text-green-600" : "text-red-600"}`}
          >
            {explicaciones[feedback.texto]}
          </div>
        ) : null}

        {/* Mensaje de validación */}
        {mensajeValidacion && <div className="validacion mt-3 font-bold text-gray-700">{mensajeValidacion}</div>}

        {/* Botón de reinicio */}
        <div className="flex justify-center mt-6">
          <Button
            onClick={reiniciarActividad}
            roundedFull={true}
            icon={faRepeat}
            className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white"
          >
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ActividadApoyoSocial
