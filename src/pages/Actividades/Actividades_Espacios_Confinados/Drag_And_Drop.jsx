import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faUndo } from "@fortawesome/free-solid-svg-icons";
import imgTrue from "/src/assets/img/checkAct.png";
import imgFalse from "/src/assets/img/xmarkAct.png";
import DragAndDropMobile from "./Drag_And_DropMobile";
import audioCasco from "/src/assets/audio/casco_de_proteccion.mp3";
import audioBotas from "/src/assets/audio/botas_con_punta_de_acero.mp3";
import audioArnes from "/src/assets/audio/arnes_de_cuerpo_completo.mp3";
import audioOverol from "/src/assets/audio/overoles_resistente_a_quimicos.mp3";
import audioProtector from "/src/assets/audio/tapones_o_protectore_auditivos.mp3";
import audioGafas from "/src/assets/audio/gafas_de_seguridad.mp3";
import audioGuantes from "/src/assets/audio/guantes_resistentes_a_quimicos.mp3";
import audioRespirador from "/src/assets/audio/respiradores_purificadores_de_aire.mp3";
import casco from "/src/assets/img/casco_sldM2.webp";
import botas from "/src/assets/img/botas_sldM2.webp";
import arnes from "/src/assets/img/arnes_sldM2.webp";
import overol from "/src/assets/img/overoles_resistentes_quimicos_sldM2.webp";
import protector from "/src/assets/img/protectores_auditivos_sldM2.webp";
import gafas from "/src/assets/img/gafas_seguridad_sldM2.webp";
import guantes from "/src/assets/img/guantes_sldM2.webp";
import respirador from "/src/assets/img/respiradores_sldM2.webp";
import trabajador from "/src/assets/img/avatar_elementos_epp.webp";
import Magnifier from "react-magnifier";
const items = [
  {
    id: "A",
    name: "Casco de Protección",
    audio: audioCasco,
    image: casco,
    correctBoxId: "leftColumn",
  },
  {
    id: "H",
    name: "Botas",
    audio: audioBotas,
    image: botas,
    correctBoxId: "rightColumn",
  },
  {
    id: "C",
    name: "Arnés de Cuerpo Completo",
    audio: audioArnes,
    image: arnes,
    correctBoxId: "leftColumn",
  },
  {
    id: "D",
    name: "Overol",
    audio: audioOverol,
    image: overol,
    correctBoxId: "leftColumn",
  },
  {
    id: "B",
    name: "Tapones Auditivos",
    audio: audioProtector,
    image: protector,
    correctBoxId: "leftColumn",
  },
  {
    id: "E",
    name: "Gafas de Seguridad",
    audio: audioGafas,
    image: gafas,
    correctBoxId: "rightColumn",
  },
  {
    id: "G",
    name: "Guantes Resistentes a Químicos",
    audio: audioGuantes,
    image: guantes,
    correctBoxId: "rightColumn",
  },
  {
    id: "F",
    name: "Respirador Purificador de Aire",
    audio: audioRespirador,
    image: respirador,
    correctBoxId: "rightColumn",
  },
];

const leftColumnItems = ["A", "B", "C", "D"];
const rightColumnItems = ["E", "F", "G", "H"];

const DragAndDrop = () => {
  const [droppedItems, setDroppedItems] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [history, setHistory] = useState([]);
  const audioRef = useRef(null);

  // Usamos useEffect para escuchar los cambios de audioSrc y reproducir el audio automáticamente
  useEffect(() => {
    if (audioSrc && audioRef.current) {
      // Asegurarse de que el audio se pause, se reinicie y luego se reproduzca
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [audioSrc]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item.id);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();

    const itemId = e.dataTransfer.getData("text/plain");
    const draggedItem = items.find((item) => item.id === itemId);

    if (!draggedItem) {
      console.error("Item no encontrado:", itemId);
      return;
    }

    // Guardamos el estado anterior antes de actualizar
    const previousDroppedItems = { ...droppedItems };
    const previousHistory = [...history];

    // Verificar si el item ya está en alguna caja
    const existingItem = Object.values(droppedItems).find(
      (droppedItem) => droppedItem.id === draggedItem.id
    );

    if (existingItem) {
      // Eliminarlo de su caja anterior
      const updatedDroppedItems = { ...droppedItems };
      delete updatedDroppedItems[existingItem.correctBoxId];

      // Actualizar el estado con el item en su nueva caja
      setDroppedItems({
        ...updatedDroppedItems,
        [targetId]: draggedItem,
      });
    } else {
      // Si no está en ninguna caja, colocarlo en la caja correspondiente
      const isCorrect = isItemCorrect(draggedItem.id, targetId);

      if (!droppedItems[targetId]) {
        setDroppedItems((prevDroppedItems) => ({
          ...prevDroppedItems,
          [targetId]: draggedItem,
        }));

        if (isCorrect) {
          setFeedbackMessage(
            <>
              <span className="text-[#4CAF50] font-bold">
                Relación correcta:{" "}
              </span>
              <span className="text-[#808693]">
                ¡Muy bien! Identificaste este ítem correctamente. Ahora escucha
                el siguiente audio:
              </span>
            </>
          );
          // Guardamos el historial de la acción realizada
          setAudioSrc(draggedItem.audio);
          previousHistory.push({
            action: "add",
            item: draggedItem,
            to: targetId,
          });
        } else {
          setFeedbackMessage(
            <>
              <span className="text-[#FF7043] font-bold">
                Relación incorrecta:{" "}
              </span>
              <span className="text-[#808693]">
                ¡Piénsalo bien! El ítem no corresponde a este elemento de
                protección personal, vuelve a intentarlo.
              </span>
            </>
          );
          setAudioSrc(""); // Borra el audio si es incorrecto
          previousHistory.push({
            action: "incorrect",
            item: draggedItem,
            to: targetId,
          });
        }
      }
      // Actualizamos el historial
      setHistory(previousHistory);
    }
  };
  const handleUndo = () => {
    if (history.length === 0) return;

    // Recuperamos la última acción y deshacemos la acción
    const lastAction = history[history.length - 1];
    const newDroppedItems = { ...droppedItems };

    // Deshacer la acción según el tipo de acción guardada
    if (lastAction.action === "add" || lastAction.action === "incorrect") {
      // Si fue una acción de agregar o incorrecta, eliminamos el item de la caja
      delete newDroppedItems[lastAction.to];
    }

    // Restablecer el historial
    setDroppedItems(newDroppedItems);
    setHistory(history.slice(0, -1)); // Eliminar la última acción del historial
  };

  const handleReset = () => {
    setDroppedItems({});
    setFeedbackMessage("");
    setAudioSrc("");
  };

  const isItemCorrect = (itemId, targetId) => {
    return (
      (leftColumnItems.includes(targetId) &&
        leftColumnItems.includes(itemId)) ||
      (rightColumnItems.includes(targetId) && rightColumnItems.includes(itemId))
    );
  };

  const allItemsCorrect = () => {
    return Object.values(droppedItems).every((item) => {
      return isItemCorrect(item.id, item.correctBoxId);
    });
  };

  useEffect(() => {
    if (Object.keys(droppedItems).length === items.length) {
      setIsResetDisabled(false);
    } else {
      setIsResetDisabled(true);
    }
  }, [droppedItems]);

  return (
    <div className="w-full flex flex-col items-center justify-center relative font-monserrat">
      <div className="hidden  w-full md:absolute md:top-0 md:left-0 md:flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full flex justify-center items-center overflow-hidden ">
          {/* Contenedor inicial */}
          <div className="flex items-start justify-start absolute top-[-10px] left-16">
            {" "}
            <p className="w-[45%] inline-block bg-[#c0185d33] text-[#c0185d] px-2 py-2 rounded-[10px] text-sm leading-[1.3rem]">
              Pasa el mouse por la imagen para descubrir su contenido
              <span className="icono-inst">
                <i className="fa-solid fa-arrow-turn-down"></i>
              </span>
            </p>
          </div>
          <div className="w-full flex justify-between items-center relative top-4">
            {/* Columna izquierda */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {leftColumnItems.map((itemId) => {
                const item = items.find((i) => i.id === itemId);
                const isCorrect = isItemCorrect(item.id, itemId);
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className={`relative w-20 h-20 border-2 flex flex-col items-center justify-center border-dashed border-[#9C99A1] ${
                      droppedItems[item.id]
                        ? isItemCorrect(droppedItems[item.id].id, itemId)
                          ? "bg-[#4CAF50] border-solid"
                          : "bg-[#FF7043] border-solid"
                        : "bg-[#ebebeb] hover:bg-[#D3C4F1]"
                    } rounded`}
                    onDrop={(e) => handleDrop(e, item.id)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {droppedItems[item.id] && (
                      <img
                        src={
                          isItemCorrect(droppedItems[item.id].id, itemId)
                            ? imgTrue
                            : imgFalse
                        }
                        alt={
                          isItemCorrect(droppedItems[item.id].id, itemId)
                            ? "Correcto"
                            : "Incorrecto"
                        }
                        className="w-[70%] left-8 top-2 p-1"
                      />
                    )}
                    {droppedItems[item.id] ? (
                      <img
                        src={droppedItems[item.id].image}
                        alt={droppedItems[item.id].name}
                        className="w-full h-full relative z-20 object-cover bottom-4 rounded"
                      />
                    ) : (
                      <span className="text-[#808693] text-center text-[12px] leading-4">
                        Arrastre aquí <br /> {item.id}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Imagen central */}

            <div className="w-full flex-1 flex flex-col items-center justify-center">
              <Magnifier
                src={trabajador}
                width="100%"
                mgWidth={400}
                mgHeight={400}
                mgShape="circle"
                mgBorderWidth={3}
                mgBorderColor="#f0f0f0"
                mgShadow={true}
              />
            </div>
            {/* Columna derecha */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {rightColumnItems.map((itemId) => {
                const item = items.find((i) => i.id === itemId);
                const isCorrect = isItemCorrect(item.id, itemId);
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className={`relative w-20 h-20 border-2 flex flex-col items-center justify-center border-dashed border-[#9C99A1] ${
                      droppedItems[item.id]
                        ? isItemCorrect(droppedItems[item.id].id, itemId)
                          ? "bg-[#4CAF50] border-solid"
                          : "bg-[#FF7043] border-solid"
                        : "bg-[#ebebeb] hover:bg-[#D3C4F1]"
                    } rounded`}
                    onDrop={(e) => handleDrop(e, item.id)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {droppedItems[item.id] && (
                      <>
                        <img
                          src={
                            isItemCorrect(droppedItems[item.id].id, itemId)
                              ? imgTrue
                              : imgFalse
                          }
                          alt={
                            isItemCorrect(droppedItems[item.id].id, itemId)
                              ? "Correcto"
                              : "Incorrecto"
                          }
                          className="w-[70%] left-8 top-1 p-1"
                        />
                      </>
                    )}
                    {droppedItems[item.id] ? (
                      <img
                        src={droppedItems[item.id].image}
                        alt={droppedItems[item.id].name}
                        className="w-full h-full relative z-20 object-cover bottom-6 rounded m-0"
                      />
                    ) : (
                      <span className="text-[#808693] text-center text-[12px] leading-4">
                        Arrastre aquí <br /> {item.id}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Objetos arrastrables */}
            <div className="w-full flex-1 grid grid-cols-2 gap-1">
              {items.map(
                (item) =>
                  !Object.values(droppedItems).some(
                    (droppedItem) => droppedItem.id === item.id
                  ) && (
                    <img
                      key={item.id}
                      src={item.image}
                      alt={item.name}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      className="w-20 h-20 mx-0 mb-0 cursor-pointer border-2 border-[#6E3CD2] rounded"
                    />
                  )
              )}
            </div>
            {/* Botones y retroalimentación */}
            <div className="w-[300px] flex-1 flex flex-col items-end justify-center">
              <button
                className={`w-[150px] bg-[#6E3CD2] flex items-center justify-center text-white rounded-full px-8 py-2 text-[16px]`}
                onClick={handleUndo}
                disabled={history.length === 0}
              >
                <FontAwesomeIcon icon={faUndo} style={{ marginRight: "8px" }} />
                Deshacer
              </button>
              <button
                className={`w-[150px] bg-[#6E3CD2] flex items-center justify-center text-white rounded-full px-8 py-2 text-[16px]`}
                onClick={handleReset}
                disabled={history.length === 0}
              >
                <FontAwesomeIcon
                  icon={faRepeat}
                  style={{ marginRight: "8px" }}
                />
                Reiniciar
              </button>
              {/* Retroalimentación y Audio */}
              <div className="flex-1 flex flex-col items-center justify-center shadow-lg bg-[#FCFCFC] rounded-lg text-[16px] text-center">
                {feedbackMessage && (
                  <>
                    <p
                      className={
                        audioSrc
                          ? "font-sembild text-[#4CAF50]"
                          : "font-sembild text-[#FF7043]"
                      }
                    >
                      {feedbackMessage}
                    </p>
                    {audioSrc && (
                      <audio
                        ref={audioRef}
                        controls
                        className="border w-64 border-gray-300 rounded-md shadow-sm"
                      >
                        <source src={audioSrc} type="audio/mp3" />
                        Tu navegador no soporta la etiqueta de audio.
                      </audio>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <DragAndDropMobile
          items={items}
          droppedItems={droppedItems}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          feedbackMessage={feedbackMessage}
          audioRef={audioRef}
          audioSrc={audioSrc}
          setAudioSrc={setAudioSrc}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
};

export default DragAndDrop;