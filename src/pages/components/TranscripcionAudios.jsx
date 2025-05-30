"use client"

import { forwardRef, useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons"

const TranscripcionAudios = forwardRef(({ src, transcripcion = [], className = "", onPlay }, ref) => {
  const audioRef = useRef(null)
  const [isTranscriptionActive, setIsTranscriptionActive] = useState(false)
  const transcriptionGlobalRef = useRef(null)

  // Exponer el elemento de audio al componente padre
  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(audioRef.current)
      } else {
        ref.current = audioRef.current
      }
    }
  }, [ref])

  useEffect(() => {
    // Crear el elemento global de transcripción si no existe
    if (!document.getElementById("transcripcion-global")) {
      const div = document.createElement("div")
      div.id = "transcripcion-global"
      document.body.appendChild(div)
      transcriptionGlobalRef.current = div
    } else {
      transcriptionGlobalRef.current = document.getElementById("transcripcion-global")
    }

    return () => {
      // Limpiar el elemento global si no hay más audios con transcripción
      const globalDiv = document.getElementById("transcripcion-global")
      if (globalDiv && document.querySelectorAll(".audio-con-transcripcion").length === 0) {
        document.body.removeChild(globalDiv)
      }
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => {
      // Llamar al callback onPlay cuando se reproduce el audio
      if (onPlay) {
        onPlay()
      }

      if (isTranscriptionActive) {
        updateTranscription()
      }
    }

    const handleTimeUpdate = () => {
      if (isTranscriptionActive && !audio.paused) {
        updateTranscription()
      }
    }

    const handlePauseOrEnd = () => {
      if (transcriptionGlobalRef.current) {
        transcriptionGlobalRef.current.style.display = "none"
      }
      // Desactivar los subtítulos cuando el audio se detiene
      setIsTranscriptionActive(false)
    }

    audio.addEventListener("play", handlePlay)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("pause", handlePauseOrEnd)
    audio.addEventListener("ended", handlePauseOrEnd)

    return () => {
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("pause", handlePauseOrEnd)
      audio.removeEventListener("ended", handlePauseOrEnd)
    }
  }, [isTranscriptionActive, transcripcion, onPlay])

  const updateTranscription = () => {
    const audio = audioRef.current
    if (!audio || !transcriptionGlobalRef.current || !transcripcion) return

    const tiempoActual = audio.currentTime
    const textoActual = transcripcion.find((item) => tiempoActual >= item.start && tiempoActual <= item.end)

    if (textoActual) {
      transcriptionGlobalRef.current.textContent = textoActual.text
      transcriptionGlobalRef.current.style.display = "block"
    } else {
      transcriptionGlobalRef.current.style.display = "none"
    }
  }

  const toggleTranscription = () => {
    const newState = !isTranscriptionActive
    setIsTranscriptionActive(newState)

    if (transcriptionGlobalRef.current) {
      if (newState && !audioRef.current.paused) {
        updateTranscription()
      } else {
        transcriptionGlobalRef.current.style.display = "none"
      }
    }
  }

  return (
    <div className={`audio-wrapper ${className}`} style={{ position: "relative" }}>
      <audio ref={audioRef} className="audio-con-transcripcion" controls>
        <source src={src} type="audio/mp3" />
      </audio>
      <FontAwesomeIcon
        icon={faClosedCaptioning}
        className={`transcription-toggle ${isTranscriptionActive ? "active" : ""}`}
        onClick={toggleTranscription}
        title={isTranscriptionActive ? "Desactivar subtítulos" : "Activar subtítulos"}
        style={{
          color: isTranscriptionActive ? "#2a7fba" : "#666",
          position: "absolute",
          right: "-30px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          fontSize: "1.2rem",
        }}
      />
    </div>
  )
})

export default TranscripcionAudios
