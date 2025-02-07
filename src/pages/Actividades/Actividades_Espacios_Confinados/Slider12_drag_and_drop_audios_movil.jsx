import { useState, useEffect, useRef } from "react";
import Button from "../../components/Button";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import audio1 from "../../../assets/audio/sld13_procedimiento_recaste.mp3";
import audio2 from "../../../assets/audio/sld13_procedimiento_evacuacion.mp3";
import audio3 from "../../../assets/audio/sld13_plan_para_respuesta_emer.mp3";
import "./styles/Slider12_drag_and_drop_audios.css"

export default function slider12_drag_and_drop_audios_movil() {  
  const [correctAnswersMessage, setCorrectAnswersMessage] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
  });

  const [message, setMessage] = useState("");
  const [currentAudio, setCurrentAudio] = useState(null);
  const [cardStatus, setCardStatus] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
  });

	const audioRefs = {
    drop1: useRef(null),
    drop2: useRef(null),
    drop3: useRef(null),
  };

  const [shuffledOptions, setShuffledOptions] = useState([]);

  const options = [
    { id: "option2", label: "Procediminento de evacuación" },
    { id: "option3", label: "Plan para respuestas a emergencia" },
    { id: "option1", label: "Procedimiento de rescate" },
  ];


  const audios = [audio1, audio2, audio3];

  useEffect(() => {
    shuffleOptions();
  }, []);

  const shuffleOptions = () => {
    const shuffled = [...options].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  };

  const handleSelectChange = (event, dropId) => {
    const { value } = event.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [dropId]: value,
    }));
  };

  const handleValidate = () => {
    const correctAnswers = {
      drop1: "option1",
      drop2: "option2",
      drop3: "option3",
    };

    const newCardStatus = { ...cardStatus };
    let totalCorrect = 0;

    Object.keys(correctAnswers).forEach((key) => {
      if (selectedOptions[key] === correctAnswers[key]) {
        newCardStatus[key] = "correct"; // Verde si es correcto
        totalCorrect++;
      } else {
        newCardStatus[key] = "incorrect"; // Rojo si es incorrecto
      }
    });

    setCardStatus(newCardStatus);

    const percentage = Math.round(
      (totalCorrect / Object.keys(correctAnswers).length) * 100
    );

    setMessage(
      totalCorrect === Object.keys(correctAnswers).length
        ? `¡Muy bien! Estás listo para profundizar en los elementos de manejo de emergencias​.`
        : `¡Piénsalo bien! ¡Escucha nuevamente el audio y vuelve a intentarlo!`
    );

    // Mensaje adicional con las respuestas correctas
    setCorrectAnswersMessage(
      `Tus respuestas correctas son: ${totalCorrect} de 3 (${percentage}%).`
    );
	// Pausar cualquier audio en reproducción al resetear
     if (currentAudio) {
			 currentAudio.pause();
       setCurrentAudio(null);
     }
  };

  const handleReset = () => {
    setSelectedOptions({
      drop1: "",
      drop2: "",
      drop3: "",
    });
    setCardStatus({
      drop1: "",
      drop2: "",
      drop3: "",
    });
    setMessage("");
    setCorrectAnswersMessage("");
    shuffleOptions();
  };

	const handlePlayAudio = (dropId) => {
      if (currentAudio && currentAudio !== audioRefs[dropId].current) {
        currentAudio.pause(); // Pausar el audio en reproducción
      }

      setCurrentAudio(audioRefs[dropId].current);
    };

  const getAvailableOptions = (currentDropId) => {
    const selectedValues = Object.values(selectedOptions).filter(
      (value) => value !== "" && value !== selectedOptions[currentDropId]
    );
    return shuffledOptions.filter((option) => !selectedValues.includes(option.id));
  };

  const isValidateDisabled = Object.values(selectedOptions).some(
    (value) => value === ""
  );
  const isResetDisabled = Object.values(selectedOptions).every(
    (value) => value === ""
  );

  return (
    <div
      className="flex flex-col items-center gap-6"
      style={{ width: "90%", gap: "20px", padding: "0" }}
    >
      {audios.map((audio, index) => {
        const dropId = `drop${index + 1}`;
        const cardColor =
          cardStatus[dropId] === "correct"
            ? "#4CAF50" // Verde
            : cardStatus[dropId] === "incorrect"
            ? "#F44336" // Rojo
            : "#FFFFFF"; // Blanco (sin validar)

        return (
          <div
            key={dropId}
            className="p-4 border rounded-lg shadow-md flex flex-col items-center"
            style={{
              backgroundColor: cardColor,
              transition: "background-color 0.3s ease",
              borderColor: "#e2e8f0",
            }}
          >
            {/* Botón de audio */}
            <audio
              ref={audioRefs[`drop${index + 1}`]}
              controls
              className="audio-control"
              onPlay={() => handlePlayAudio(`drop${index + 1}`)}
            >
              <source src={audio} type="audio/mp3" />
              Tu navegador no soporta audio HTML5.
            </audio>

            {/* Selector */}
            <select
              value={selectedOptions[dropId]}
              onChange={(event) => handleSelectChange(event, dropId)}
              className={`${cardStatus[dropId] === "correct" ? "select-correct" : cardStatus[dropId] === "incorrect" ? "select-incorrect" : ""}`}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                padding: "8px",
                fontSize: "16px",
                marginTop: "15px",
              }}
            >
              <option value="">Seleccione...</option>
              {getAvailableOptions(dropId).map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      })}

{message && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            color: "white",
            backgroundColor: message.includes("Muy bien")
              ? "#4CAF50"
              : "#F44336",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}
      {correctAnswersMessage && (
        <div className="correct-answers-message">{correctAnswersMessage}</div>
      )}

      <div className="flex justify-center gap-4"
      style={{ padding: "0" }}>
        <Button
          onClick={handleValidate}
          icon={faCheck}
          roundedFull={true}
          disabled={isValidateDisabled}
        >
          Validar
        </Button>
        <Button
          onClick={handleReset}
          icon={faRepeat}
          roundedFull={true}
          disabled={isResetDisabled}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
}
