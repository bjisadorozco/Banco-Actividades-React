import React, { useState, useRef } from "react";
import mano1 from "../../../assets/img/fisicas_sld5.webp";
import mano2 from "../../../assets/img/economicas_sld5.webp";
import mano3 from "../../../assets/img/laborales_sld5.webp";
import checkIcon from "../../../assets/img/checkAct.png";
import xmarkIcon from "../../../assets/img/xmarkAct.png";
import audioFisicas from "../../../assets/audio/FISICAS-Morelco.mp3";
import audioEconomicas from "../../../assets/audio/ECONOMICAS-Morelco.mp3";
import audioLaborales from "../../../assets/audio/LABORALES-Morelco.mp3";
import "./styles/DragAndDropManos.css";
import Paragraph from "../../components/Paragraph";
import { faCheck, faRepeat, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Button from '../../components/Button';

const DragAndDropManos = () => {
  const [droppedItems, setDroppedItems] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
  });
  const [validationStatus, setValidationStatus] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
  });
  const [draggedItems, setDraggedItems] = useState({
    img1: true,
    img2: true,
    img3: true,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [audioElement, setAudioElement] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);

  const audioRef1 = useRef(new Audio(audioFisicas));
  const audioRef2 = useRef(new Audio(audioEconomicas));
  const audioRef3 = useRef(new Audio(audioLaborales));

  const playAudio = (audioSource) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    let newAudio = null;
    if (audioSource === "audioFisicas") {
      newAudio = audioRef1.current;
    } else if (audioSource === "audioEconomicas") {
      newAudio = audioRef2.current;
    } else if (audioSource === "audioLaborales") {
      newAudio = audioRef3.current;
    }

    setCurrentAudio(newAudio);
    setAudioElement(audioSource);
    newAudio.play();
  };

  const handleDrop = (e, dropId) => {
    e.preventDefault();
    const draggedElementId = e.dataTransfer.getData("text");
  
    if (droppedItems[dropId]) {
      if (droppedItems[dropId] === draggedElementId) {
        return;
      } else {
        setErrorMessage("¡Ya hay una imagen en este lugar! Arrastra a otro lugar.");
        setTimeout(() => setErrorMessage(""), 2000);
        return;
      }
    }
  
    const isCorrect =
      (dropId === "drop1" && draggedElementId === "img1-sld5") ||
      (dropId === "drop2" && draggedElementId === "img2-sld5") ||
      (dropId === "drop3" && draggedElementId === "img3-sld5");
  
    setDroppedItems((prevState) => ({
      ...prevState,
      [dropId]: draggedElementId,
    }));
  
    // Ocultar la imagen arrastrada, sea correcta o incorrecta
    setDraggedItems((prevState) => ({
      ...prevState,
      [draggedElementId.split('-')[0]]: false,
    }));
  
    if (isCorrect) {
      setValidationStatus((prevState) => ({
        ...prevState,
        [dropId]: "correcto",
      }));
      setSuccessMessage("¡Correcto! Ahora, escucha el siguiente audio que complementa esta información");
  
      let audioSource = null;
      switch (draggedElementId) {
        case "img1-sld5":
          audioSource = "audioFisicas";
          break;
        case "img2-sld5":
          audioSource = "audioEconomicas";
          break;
        case "img3-sld5":
          audioSource = "audioLaborales";
          break;
        default:
          break;
      }
  
      if (audioSource) {
        setAudioElement(audioSource);
      }
    } else {
      setValidationStatus((prevState) => ({
        ...prevState,
        [dropId]: "incorrecto",
      }));
      setErrorMessage("Oops, esta imagen solo puede soltarse en el contenedor correcto.");
      setTimeout(() => setErrorMessage(""), 2000);
      setSuccessMessage("");
      setCurrentAudio(null);
      setAudioElement(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text", item);
  };

  const handleReset = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setDroppedItems({
      drop1: null,
      drop2: null,
      drop3: null,
    });
    setDraggedItems({
      img1: true,
      img2: true,
      img3: true,
    });
    setValidationStatus({
      drop1: null,
      drop2: null,
      drop3: null,
    });
    setCurrentAudio(null);
    setAudioElement(null);
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="col-lg-6 col-md-12">
      <div className="activity-container-sld5">
        <div className="image-group-sld5">
          {draggedItems.img1 && (
            <img
              src={mano1}
              className="draggable-sld5"
              id="img1-sld5"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, "img1-sld5")}
            />
          )}
          {draggedItems.img2 && (
            <img
              src={mano2}
              className="draggable-sld5"
              id="img2-sld5"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, "img2-sld5")}
            />
          )}
          {draggedItems.img3 && (
            <img
              src={mano3}
              className="draggable-sld5"
              id="img3-sld5"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, "img3-sld5")}
            />
          )}
        </div>

        <div className="drop-group-sld5">
          {/* Contenedor 1: Físicas */}
          <div className={`drop-item-sld5 ${validationStatus.drop1 === "correcto" ? "correct" : validationStatus.drop1 === "incorrecto" ? "incorrect" : ""}`}>
            <div
              className="dropbox-sld5"
              id="drop1-sld5"
              onDrop={(e) => handleDrop(e, "drop1")}
              onDragOver={handleDragOver}
            >
              {droppedItems.drop1 && <img src={droppedItems.drop1 === "img1-sld5" ? mano1 : droppedItems.drop1 === "img2-sld5" ? mano2 : mano3} alt="Físicas" />}
              {validationStatus.drop1 === "correcto" && (
                <img src={checkIcon} className="status-icon-sld5" alt="Correcto" />
              )}
              {validationStatus.drop1 === "incorrecto" && (
                <img src={xmarkIcon} className="status-icon-sld5" alt="Incorrecto" />
              )}
            </div>
            <button
              className={`option-sld5 ${validationStatus.drop1 === "correcto" ? "correct" : validationStatus.drop1 === "incorrecto" ? "incorrect" : ""}`}
              id="btn1-sld5"
              draggable="false"
            >
              Físicas
            </button>
          </div>

          {/* Contenedor 2: Económicas */}
          <div className={`drop-item-sld5 ${validationStatus.drop2 === "correcto" ? "correct" : validationStatus.drop2 === "incorrecto" ? "incorrect" : ""}`}>
            <div
              className="dropbox-sld5"
              id="drop2-sld5"
              onDrop={(e) => handleDrop(e, "drop2")}
              onDragOver={handleDragOver}
            >
              {droppedItems.drop2 && <img src={droppedItems.drop2 === "img1-sld5" ? mano1 : droppedItems.drop2 === "img2-sld5" ? mano2 : mano3} alt="Económicas" />}
              {validationStatus.drop2 === "correcto" && (
                <img src={checkIcon} className="status-icon-sld51" alt="Correcto" />
              )}
              {validationStatus.drop2 === "incorrecto" && (
                <img src={xmarkIcon} className="status-icon-sld51" alt="Incorrecto" />
              )}
            </div>
            <button
              className={`option-sld5 ${validationStatus.drop2 === "correcto" ? "correct" : validationStatus.drop2 === "incorrecto" ? "incorrect" : ""}`}
              id="btn2-sld5"
              draggable="false"
            >
              Económicas
            </button>
          </div>

          {/* Contenedor 3: Laborales */}
          <div className={`drop-item-sld5 ${validationStatus.drop3 === "correcto" ? "correct" : validationStatus.drop3 === "incorrecto" ? "incorrect" : ""}`}>
            <div
              className="dropbox-sld5"
              id="drop3-sld5"
              onDrop={(e) => handleDrop(e, "drop3")}
              onDragOver={handleDragOver}
            >
              {droppedItems.drop3 && <img src={droppedItems.drop3 === "img1-sld5" ? mano1 : droppedItems.drop3 === "img2-sld5" ? mano2 : mano3} alt="Laborales" />}
              {validationStatus.drop3 === "correcto" && (
                <img src={checkIcon} className="status-icon-sld52" alt="Correcto" />
              )}
              {validationStatus.drop3 === "incorrecto" && (
                <img src={xmarkIcon} className="status-icon-sld52" alt="Incorrecto" />
              )}
            </div>
            <button
              className={`option-sld5 ${validationStatus.drop3 === "correcto" ? "correct" : validationStatus.drop3 === "incorrecto" ? "incorrect" : ""}`}
              id="btn3-sld5"
              draggable="false"
            >
              Laborales
            </button>
          </div>
        </div>
      </div>
      <div className="audio-container-sld5">
        {droppedItems.drop1 && audioElement === "audioFisicas" && (
          <div className="audio-player-sld5">
            <audio data-audio="audioFisicas" controls autoPlay>
              <source src={audioFisicas} type="audio/mp3" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        )}
        {droppedItems.drop2 && audioElement === "audioEconomicas" && (
          <div className="audio-player-sld5">
            <audio data-audio="audioEconomicas" controls autoPlay>
              <source src={audioEconomicas} type="audio/mp3" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        )}
        {droppedItems.drop3 && audioElement === "audioLaborales" && (
          <div className="audio-player-sld5">
            <audio data-audio="audioLaborales" controls autoPlay>
              <source src={audioLaborales} type="audio/mp3" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        )}
      </div>

      {errorMessage && <div className="error-message-sld5">{errorMessage}</div>}
      {successMessage && ( <div className="success-message-sld5"> <p>{successMessage}</p> </div>)}

      <div className="flex-container">
        <Button
          bold={false}
          icon={faRepeat}
          roundedFull={true}
          onClick={handleReset}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
};

export default DragAndDropManos;

