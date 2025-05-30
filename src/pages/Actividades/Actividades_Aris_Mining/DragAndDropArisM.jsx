import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faUndo } from "@fortawesome/free-solid-svg-icons";
import imgTrue from "/src/assets/img/checkAct.png";
import imgFalse from "/src/assets/img/xmarkAct.png";
import DragAndDropMobile from "./DragAndDropArisMobile";
import casco from "/src/assets/img/casco_sldM2.webp";
import botas from "/src/assets/img/botas_sldM2.webp";
import arnes from "/src/assets/img/arnes_sldM2.webp";
import overol from "/src/assets/img/overoles_resistentes_quimicos_sldM2.webp";
import protector from "/src/assets/img/protectores_auditivos_sldM2.webp";
import gafas from "/src/assets/img/gafas_seguridad_sldM2.webp";
import guantes from "/src/assets/img/guantes_sldM2.webp";
import respirador from "/src/assets/img/respiradores_sldM2.webp";
import trabajador from "/src/assets/img/avatar_elementos_epp.webp";

const items = [
  {
    id: "A",
    name: "Casco de Protección",
    image: casco,
    correctBoxId: "A",
  },
  {
    id: "B",
    name: "Botas",
    image: botas,
    correctBoxId: "B",
  },
  {
    id: "C",
    name: "Arnés de Cuerpo Completo",
    image: arnes,
    correctBoxId: "C",
  },
  {
    id: "D",
    name: "Overol",
    image: overol,
    correctBoxId: "D",
  },
  {
    id: "E",
    name: "Tapones Auditivos",
    image: protector,
    correctBoxId: "E",
  },
  {
    id: "F",
    name: "Gafas de Seguridad",
    image: gafas,
    correctBoxId: "F",
  },
  {
    id: "G",
    name: "Guantes Resistentes a Químicos",
    image: guantes,
    correctBoxId: "G",
  },
  {
    id: "H",
    name: "Respirador Purificador de Aire",
    image: respirador,
    correctBoxId: "H",
  },
  {
    id: "I",
    name: "Casco de Protección Extra",
    image: casco,
    correctBoxId: "I",
  },
  {
    id: "J",
    name: "Botas Extra",
    image: botas,
    correctBoxId: "J",
  },
];

const DragAndDropArisM = () => {
  const [droppedItems, setDroppedItems] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [history, setHistory] = useState([]);

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

    const previousHistory = [...history];

    const existingItem = Object.values(droppedItems).find(
      (droppedItem) => droppedItem.id === draggedItem.id
    );

    if (existingItem) {
      const updatedDroppedItems = { ...droppedItems };
      delete updatedDroppedItems[existingItem.correctBoxId];

      setDroppedItems({
        ...updatedDroppedItems,
        [targetId]: draggedItem,
      });
    } else {
      const isCorrect = draggedItem.id === targetId;

      if (!droppedItems[targetId]) {
        setDroppedItems((prevDroppedItems) => ({
          ...prevDroppedItems,
          [targetId]: draggedItem,
        }));

        if (isCorrect) {
          setFeedbackMessage(
            <>
              <span className="text-[#4CAF50] font-bold ArisM">
                Relación correcta:{" "}
              </span>
              <span className="text-[#808693] ArisM">
                ¡Muy bien! Identificaste este ítem correctamente.
              </span>
            </>
          );
          previousHistory.push({
            action: "add",
            item: draggedItem,
            to: targetId,
          });
        } else {
          setFeedbackMessage(
            <>
              <span className="text-[#FF7043] font-bold ArisM">
                Relación incorrecta:{" "}
              </span>
              <span className="text-[#808693] ArisM">
                ¡Piénsalo bien! El ítem no corresponde a este elemento de
                protección personal, vuelve a intentarlo.
              </span>
            </>
          );
          previousHistory.push({
            action: "incorrect",
            item: draggedItem,
            to: targetId,
          });
        }
      }
      setHistory(previousHistory);
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const lastAction = history[history.length - 1];
    const newDroppedItems = { ...droppedItems };

    if (lastAction.action === "add" || lastAction.action === "incorrect") {
      delete newDroppedItems[lastAction.to];
    }

    setDroppedItems(newDroppedItems);
    setHistory(history.slice(0, -1));
  };

  const handleReset = () => {
    setDroppedItems({});
    setFeedbackMessage("");
  };

  const isItemCorrect = (itemId, targetId) => {
    return itemId === targetId;
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
    <div className="w-full flex flex-col items-center justify-center font-monserrat ArisM">
      <div className="hidden w-full md:flex flex-col items-center justify-center ArisM">
        <div className="w-full flex justify-center items-center ArisM">
          <div className="w-full flex justify-between items-center ArisM">
            {/* Contenedor de drop targets */}
            <div className="flex-1 grid grid-cols-2 ArisM">
              {items.map((item) => (
                <div
                  key={item.id}
                  id={item.id}
                  className={`relative w-20 h-20 border-2 flex flex-col items-center justify-center border-dashed border-[#9C99A1] ${
                    droppedItems[item.id]
                      ? isItemCorrect(droppedItems[item.id].id, item.id)
                        ? "bg-[#4CAF50] border-solid ArisM"
                        : "bg-[#FF7043] border-solid ArisM"
                      : "bg-[#ebebeb] hover:bg-[#D3C4F1] ArisM"
                  } rounded ArisM`}
                  onDrop={(e) => handleDrop(e, item.id)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {droppedItems[item.id] && (
                    <img
                      src={
                        isItemCorrect(droppedItems[item.id].id, item.id)
                          ? imgTrue
                          : imgFalse
                      }
                      alt={
                        isItemCorrect(droppedItems[item.id].id, item.id)
                          ? "Correcto"
                          : "Incorrecto"
                      }
                      className="w-[70%] left-8 top-2 p-1 ArisM"
                    />
                  )}
                  {droppedItems[item.id] ? (
                    <img
                      src={droppedItems[item.id].image || "/placeholder.svg"}
                      alt={droppedItems[item.id].name}
                      className="w-full h-full relative z-20 object-cover bottom-4 rounded ArisM"
                    />
                  ) : (
                    <span className="text-[#808693] text-center text-[12px] leading-4 ArisM">
                      Arrastre aquí <br /> {item.id}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Imagen del trabajador */}
            <div className="flex-1 flex items-center justify-center ArisM">
              <img
                src={trabajador || "/placeholder.svg"}
                alt="Trabajador con EPP"
                className="max-w-[40%] h-auto ArisM"
              />
            </div>

            {/* Objetos arrastrables */}
            <div className="flex-1 grid grid-cols-2 gap-2 p-4 ArisM">
              {items.map(
                (item) =>
                  !Object.values(droppedItems).some(
                    (droppedItem) => droppedItem.id === item.id
                  ) && (
                    <img
                      key={item.id}
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      className="w-20 h-20 cursor-pointer border-2 border-[#6E3CD2] rounded ArisM"
                    />
                  )
              )}
            </div>
          </div>
        </div>

        {/* Botones y retroalimentación */}
        <div className="w-full flex justify-center mt-4 ArisM">
          <div className="w-[300px] flex flex-col items-center ArisM">
            <div className="flex gap-4 mb-4 ArisM">
              <button
                className={`w-[150px] bg-[#6E3CD2] flex items-center justify-center text-white rounded-full px-8 py-2 text-[16px] ArisM`}
                onClick={handleUndo}
                disabled={history.length === 0}
              >
                <FontAwesomeIcon icon={faUndo} style={{ marginRight: "8px" }} />
                Deshacer
              </button>
              <button
                className={`w-[150px] bg-[#6E3CD2] flex items-center justify-center text-white rounded-full px-8 py-2 text-[16px] ArisM`}
                onClick={handleReset}
                disabled={history.length === 0}
              >
                <FontAwesomeIcon
                  icon={faRepeat}
                  style={{ marginRight: "8px" }}
                />
                Reiniciar
              </button>
            </div>

            {/* Retroalimentación */}
            <div className="w-full p-4 flex flex-col items-center justify-center shadow-lg bg-[#FCFCFC] rounded-lg ArisM">
              {feedbackMessage && (
                <p className="text-[16px] text-center mb-2 ArisM">
                  {feedbackMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Versión móvil */}
      <div className="md:hidden ArisM">
        <DragAndDropMobile
          items={items}
          droppedItems={droppedItems}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          feedbackMessage={feedbackMessage}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
};

export default DragAndDropArisM;