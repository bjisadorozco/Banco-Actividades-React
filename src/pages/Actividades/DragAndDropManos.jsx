import React, { useState } from "react";
import mano1 from "../../assets/img/mano1.png";
import mano2 from "../../assets/img/mano2.png";
import mano3 from "../../assets/img/mano3.png";
import audioFisicas from "../../assets/audio/FISICAS-Morelco.mp3";
import audioEconomicas from "../../assets/audio/ECONOMICAS-Morelco.mp3";
import audioLaborales from "../../assets/audio/LABORALES-Morelco.mp3";
import "./styles/DragAndDropManos.css"; // Asegúrate de incluir los estilos

const DragAndDropManos = () => {
  const [droppedItems, setDroppedItems] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
  });
  const [draggedItems, setDraggedItems] = useState({
    img1: true,
    img2: true,
    img3: true,
  });
  const [playedAudio, setPlayedAudio] = useState({
    img1: false,
    img2: false,
    img3: false,
  });
  const [errorMessage, setErrorMessage] = useState(""); // Nuevo estado para manejar el mensaje de error

  // Función para reproducir el audio correspondiente a cada imagen
  const playAudio = (imageId) => {
    let audio = new Audio();
    switch (imageId) {
      case "img1-sld5": // mano1.png
        audio.src = audioFisicas;
        break;
      case "img2-sld5": // mano2.png
        audio.src = audioEconomicas;
        break;
      case "img3-sld5": // mano3.png
        audio.src = audioLaborales;
        break;
      default:
        return;
    }
    audio.play();
  };

  const handleDrop = (e, dropId) => {
    e.preventDefault();
    const draggedElementId = e.dataTransfer.getData("text");

    // Verificamos si la imagen ya está en un contenedor
    if (droppedItems[dropId]) {
      if (droppedItems[dropId] === draggedElementId) {
        return; // Si es la misma imagen, no hacemos nada
      }
    }

    // Verificar si la imagen es la correcta para el contenedor
    if ((dropId === "drop1" && draggedElementId === "img1-sld5") ||
        (dropId === "drop2" && draggedElementId === "img2-sld5") ||
        (dropId === "drop3" && draggedElementId === "img3-sld5")) {
      // Asignamos la imagen al contenedor correspondiente
      setDroppedItems((prevState) => ({
        ...prevState,
        [dropId]: draggedElementId,
      }));

      // Eliminar la imagen de su origen
      setDraggedItems((prevState) => ({
        ...prevState,
        [draggedElementId]: false,
      }));

      // Reproducir el audio si no se ha reproducido antes
      if (!playedAudio[draggedElementId]) {
        playAudio(draggedElementId);
        setPlayedAudio((prevState) => ({
          ...prevState,
          [draggedElementId]: true,
        }));
      }

      // Limpiar el mensaje de error en caso de éxito
      setErrorMessage("");
    } else {
      // Mostrar el mensaje de error y evitar que se reproduzca el audio
      setErrorMessage("Oops, esta imagen solo puede soltarse en el contenedor correcto.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text", item);
  };

  const handleReset = () => {
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
    setPlayedAudio({
      img1: false,
      img2: false,
      img3: false,
    });
    setErrorMessage(""); // Limpiar mensaje de error al reiniciar
  };

  return (
    <div className="col-lg-6 col-md-12">
      <br />
      <div className="activity-container-sld5">
        {/* Imágenes importadas */}
        <div className="image-group-sld5">
          {draggedItems.img1 && (
            <img
              src={mano1} // Usamos la variable importada
              className="draggable-sld5"
              id="img1-sld5"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, "img1-sld5")}
            />
          )}
          {draggedItems.img2 && (
            <img
              src={mano2} // Usamos la variable importada
              className="draggable-sld5"
              id="img2-sld5"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, "img2-sld5")}
            />
          )}
          {draggedItems.img3 && (
            <img
              src={mano3} // Usamos la variable importada
              className="draggable-sld5"
              id="img3-sld5"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, "img3-sld5")}
            />
          )}
        </div>

        {/* Cuadros donde se puede soltar */}
        <div className="drop-group-sld5">
          <div
            className="dropbox-sld5"
            id="drop1-sld5"
            onDrop={(e) => handleDrop(e, "drop1")}
            onDragOver={handleDragOver}
          >
            {droppedItems.drop1 && <img src={mano1} alt="Físicas" />}
          </div>
          <div
            className="dropbox-sld5"
            id="drop2-sld5"
            onDrop={(e) => handleDrop(e, "drop2")}
            onDragOver={handleDragOver}
          >
            {droppedItems.drop2 && <img src={mano2} alt="Económicas" />}
          </div>
          <div
            className="dropbox-sld5"
            id="drop3-sld5"
            onDrop={(e) => handleDrop(e, "drop3")}
            onDragOver={handleDragOver}
          >
            {droppedItems.drop3 && <img src={mano3} alt="Laborales" />}
          </div>
        </div>

        {/* Mensaje de error */}
        {errorMessage && <div className="error-message-sld5">{errorMessage}</div>}

        {/* Botones de opción */}
        <div className="button-group-sld5">
          <button
            className="option-sld5"
            id="btn1-sld5"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, "img1-sld5")}
            disabled={!draggedItems.img1}
          >
            Físicas
          </button>
          <button
            className="option-sld5"
            id="btn2-sld5"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, "img2-sld5")}
            disabled={!draggedItems.img2}
          >
            Económicas
          </button>
          <button
            className="option-sld5"
            id="btn3-sld5"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, "img3-sld5")}
            disabled={!draggedItems.img3}
          >
            Laborales
          </button>
        </div>
      </div>

      {/* Botones para reiniciar */}
      <div className="flex-container">
        <button className="btn" onClick={handleReset}>
          <i className="fas fa-question-circle"></i> Reiniciar
        </button>
      </div>
    </div>
  );
};

export default DragAndDropManos;
