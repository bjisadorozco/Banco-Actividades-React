import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import imgTrue from "../../../assets/img/checkAct.png";
import imgFalse from "../../../assets/img/xmarkAct.png";

const items = [
  {
    id: "A",
    name: "Casco de Protección",
    audio: "/src/assets/audio/EPP/casco_de_proteccion.mp3",
    image: "/src/assets/img/Elementos_EPP/casco_sldM2.webp",
    correctBoxId: "leftColumn",
  },

  {
    id: "H",
    name: "Botas",
    audio: "/src/assets/audio/EPP/botas_con_punta_de_acero.mp3",
    image: "/src/assets/img/Elementos_EPP/botas_sldM2.webp",
    correctBoxId: "rightColumn",
  },
  {
    id: "C",
    name: "Arnés de Cuerpo Completo",
    audio: "/src/assets/audio/EPP/arnes_de_cuerpo_completo.mp3",
    image: "/src/assets/img/Elementos_EPP/arnes_sldM2.webp",
    correctBoxId: "leftColumn",
  },
  {
    id: "D",
    name: "Overol",
    audio: "/src/assets/audio/EPP/overoles_resistente_a_quimicos.mp3",
    image:
      "/src/assets/img/Elementos_EPP/overoles_resistentes_quimicos_sldM2.webp",
    correctBoxId: "leftColumn",
  },
  {
    id: "B",
    name: "Tapones Auditivos",
    audio: "/src/assets/audio/EPP/tapones_o_protectore_auditivos.mp3",
    image: "/src/assets/img/Elementos_EPP/protectores_auditivos_sldM2.webp",
    correctBoxId: "leftColumn",
  },
  {
    id: "E",
    name: "Gafas de Seguridad",
    audio: "/src/assets/audio/EPP/gafas_de_seguridad.mp3",
    image: "/src/assets/img/Elementos_EPP/gafas_seguridad_sldM2.webp",
    correctBoxId: "rightColumn",
  },
  {
    id: "G",
    name: "Guantes Resistentes a Químicos",
    audio: "/src/assets/audio/EPP/guantes_resistentes_a_quimicos.mp3",
    image: "/src/assets/img/Elementos_EPP/guantes_sldM2.webp",
    correctBoxId: "rightColumn",
  },
  {
    id: "F",
    name: "Respirador Purificador de Aire",
    audio: "/src/assets/audio/EPP/respiradores_purificadores_de_aire.mp3",
    image: "/src/assets/img/Elementos_EPP/respiradores_sldM2.webp",
    correctBoxId: "rightColumn",
  },
];

const leftColumnItems = ["A", "B", "C", "D"];
const rightColumnItems = ["E", "F", "G", "H"];

const DragAndDropMobile = () => {
  const [droppedItems, setDroppedItems] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [audioKey, setAudioKey] = useState(0);
  const audioRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              ¡Muy bien! Identificaste este ítem correctamente. Ahora escucha el
              siguiente audio:
            </span>
          </>
        );

        // Cambiar la fuente del audio para el objeto actual
        setAudioSrc(draggedItem.audio);

        // Detener el audio anterior y empezar el nuevo
        if (audioRef.current) {
          audioRef.current.pause(); // Pausar el audio actual
          audioRef.current.currentTime = 0; // Reiniciar al principio
          audioRef.current.load(); // Recargar el nuevo archivo de audio
          audioRef.current.play(); // Reproducir el nuevo audio
        }
      } else {
        setFeedbackMessage(
          <>
            <span className="text-[#FF7043] font-bold">
              Relación incorrecta:{" "}
            </span>
            <span className="text-[#808693]">
              "¡Piénsalo bien! El ítem no corresponde a este elemento de
              protección personal, vuelve a intentarlo."
            </span>
          </>
        );
        setAudioSrc("");
      }
    }
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

  // Función para abrir el modal
  const openModal = () => setIsModalOpen(true);

  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-full bg-white flex flex-col justify-center md:static relative md:top-0 top-0">
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 gap-2 justify-start md:flex md:flex-col mb-3 h-auto w-full">
            <div className="leading-loose"></div>
            <div className="bg-white flex flex-col items-center justify-center text-[#808693] border-[#e0e0e0] md:rounded-lg md:shadow-md mb-[1px] md:m-4 p-4 border rounded-md shadow-md m-6">
              {/* Retroalimentación y Audio */}
              <div className="mt-4">
                <div className="shadow-lg bg-[#FCFCFC] p-4 rounded-lg text-[16px] text-center items-center justify-center flex flex-col">
                  {/* Imagen central */}
                  <div className="flex-col relative items-center flex my-2">
                    {/* Botón para abrir el modal */}
                    <button
                      className="bg-[#6E3CD2] text-white rounded-full p-2 mt-4"
                      onClick={openModal}
                    >
                      Ver Imagen
                    </button>
                  </div>

                  {/* Modal */}
                  {isModalOpen && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white p-4 rounded-md w-[70%] max-w-lg relative">
                        <button
                          className="absolute top-0 right-2 text-[#6E3CD2] text-[40px] font-semibold"
                          onClick={closeModal}
                        >
                          &times;
                        </button>
                        <img
                          src="/src/assets/img/Elementos_EPP/avatar_elementos_epp.webp"
                          alt="Trabajador con equipo de protección"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  )}

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
                          className="mt-2 border border-gray-300 rounded-md shadow-sm"
                        >
                          <source src={audioSrc} type="audio/mp3" />
                          Tu navegador no soporta la etiqueta de audio.
                        </audio>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Objetos arrastrables */}
              <div className="flex flex-wrap justify-center gap-4 my-6">
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
                        className="w-20 h-20 cursor-pointer border-2 border-[#6E3CD2] rounded mb-0"
                      />
                    )
                )}
              </div>

              {/* Contenedor principal */}
              <div className="w-full flex justify-center items-center relative">
                <div className="flex w-full justify-center items-center py-0">
                  {/* Columna izquierda */}
                  <div className="flex flex-col items-center mx-2">
                    {leftColumnItems.map((itemId) => {
                      const item = items.find((i) => i.id === itemId);
                      const isCorrect = isItemCorrect(item.id, itemId);
                      return (
                        <div
                          key={item.id}
                          id={item.id}
                          className={`relative w-28 h-28 border-2 flex flex-col items-center justify-center border-dashed border-[#9C99A1] ${
                            droppedItems[item.id]
                              ? isItemCorrect(droppedItems[item.id].id, itemId)
                                ? "bg-[#4CAF50] border-solid"
                                : "bg-[#FF7043] border-solid"
                              : "bg-[#ebebeb] hover:bg-[#D3C4F1]"
                          } rounded flex items-center justify-center my-2`}
                          onDrop={(e) => handleDrop(e, item.id)}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          {/* {droppedItems[item.id] &&
                            isItemCorrect(droppedItems[item.id].id, itemId) && (
                              <span className="w-[200px] bg-[#4CAF50] text-white text-[16px] absolute z-30 object-cover top-10 right-28 text-center px-4 py-1 rounded-full">
                                {droppedItems[item.id].name}
                              </span>
                            )} */}
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
                              className="w-8 h-8 left-10 top-6 p-1"
                            />
                          )}
                          {droppedItems[item.id] ? (
                            <img
                              src={droppedItems[item.id].image}
                              alt={droppedItems[item.id].name}
                              className="w-full h-full relative z-20 object-cover bottom-6 rounded m-0"
                            />
                          ) : (
                            <span className="text-[#808693] text-center text-[16px] px-2">
                              Arrastre aquí <br /> {item.id}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Columna derecha */}
                  <div className="flex flex-col items-center mx-2">
                    {rightColumnItems.map((itemId) => {
                      const item = items.find((i) => i.id === itemId);
                      const isCorrect = isItemCorrect(item.id, itemId);
                      return (
                        <div
                          key={item.id}
                          id={item.id}
                          className={`relative w-28 h-28 border-2 flex flex-col items-center justify-center border-dashed border-[#9C99A1] ${
                            droppedItems[item.id]
                              ? isItemCorrect(droppedItems[item.id].id, itemId)
                                ? "bg-[#4CAF50] border-solid"
                                : "bg-[#FF7043] border-solid"
                              : "bg-[#ebebeb] hover:bg-[#D3C4F1]"
                          } rounded flex items-center justify-center my-2`}
                          onDrop={(e) => handleDrop(e, item.id)}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          {droppedItems[item.id] && (
                            <>
                              {/* {droppedItems[item.id] &&
                                isItemCorrect(
                                  droppedItems[item.id].id,
                                  itemId
                                ) && (
                                  <span className="w-[200px] bg-[#4CAF50] text-white text-[16px] absolute z-10 object-cover top-10 left-28 text-center px-4 py-1 rounded-full">
                                    {droppedItems[item.id].name}
                                  </span>
                                )} */}
                              <img
                                src={
                                  isItemCorrect(
                                    droppedItems[item.id].id,
                                    itemId
                                  )
                                    ? imgTrue
                                    : imgFalse
                                }
                                alt={
                                  isItemCorrect(
                                    droppedItems[item.id].id,
                                    itemId
                                  )
                                    ? "Correcto"
                                    : "Incorrecto"
                                }
                                className="w-8 h-8 left-10 top-6 p-1"
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
                            <span className="text-[#808693] text-center text-[16px] px-2">
                              Arrastre aquí <br /> {item.id}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* Botón de reinicio */}
              <div className="w-full flex justify-center py-6">
                <button
                  className={`bg-[#6E3CD2] text-white rounded-full h-12 px-8 py-2 text-lg`}
                  onClick={handleReset}
                >
                  <FontAwesomeIcon icon={faRepeat} /> Reiniciar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragAndDropMobile;
