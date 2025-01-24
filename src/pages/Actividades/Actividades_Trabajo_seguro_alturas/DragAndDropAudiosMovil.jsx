import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";

export default function SelectAudios() {
  const [selectedOptions, setSelectedOptions] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
  });

  const [message, setMessage] = useState("");
  const [cardStatus, setCardStatus] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
  });

  const [shuffledOptions, setShuffledOptions] = useState([]);

  const options = [
    { id: "option1", label: "Procedimiento de rescate" },
    { id: "option2", label: "Procediminento de evacuación" },
    { id: "option3", label: "Plan para respuestas a emergencia" },
  ];

  const audios = [
    "audio1.mp3", // Reemplaza con las rutas reales de los audios
    "audio2.mp3",
    "audio3.mp3",
  ];

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
        ? `¡Muy bien! Estás listo para profundizar en los elementos de manejo de emergencias​. Obtuviste un ${percentage}%`
        : `¡Piénsalo bien! ¡Escucha nuevamente el audio y vuelve a intentarlo! Obtuviste un ${percentage}%`
    );
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
    shuffleOptions();
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
      style={{ width: "90%", gap: "20px" }}
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
            <audio controls style={{ height: "30px", width: "270px" }}>
              <source src={audio} type="audio/mp3" />
              Tu navegador no soporta audio HTML5.
            </audio>

            {/* Selector */}
            <select
              value={selectedOptions[dropId]}
              onChange={(event) => handleSelectChange(event, dropId)}
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

      <div className="flex justify-center gap-4">
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
    </div>
  );
}
