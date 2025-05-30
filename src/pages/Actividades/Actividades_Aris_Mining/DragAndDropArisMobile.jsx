import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import checkIcon from "/src/assets/img/checkAct.png";
import xmarkIcon from "/src/assets/img/xmarkAct.png";
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
import { faRepeat } from "@fortawesome/free-solid-svg-icons";

const DragAndDropArisMobile = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
    F: "",
    G: "",
    H: "",
  });

  const [validationStatus, setValidationStatus] = useState({
    A: null,
    B: null,
    C: null,
    D: null,
    E: null,
    F: null,
    G: null,
    H: null,
  });

  const [audioSource, setAudioSource] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const items = [
    { id: "A", name: "Casco de Protección", audio: audioCasco, image: casco },
    { id: "B", name: "Botas", audio: audioBotas, image: botas },
    { id: "C", name: "Arnés de Cuerpo Completo", audio: audioArnes, image: arnes },
    { id: "D", name: "Overol", audio: audioOverol, image: overol },
    { id: "E", name: "Tapones Auditivos", audio: audioProtector, image: protector },
    { id: "F", name: "Gafas de Seguridad", audio: audioGafas, image: gafas },
    { id: "G", name: "Guantes Resistentes a Químicos", audio: audioGuantes, image: guantes },
    { id: "H", name: "Respirador Purificador de Aire", audio: audioRespirador, image: respirador },
  ];

  const handleSelectChange = (e, itemId, correctName) => {
    const selectedValue = e.target.value;
    const selectedItem = items.find(item => item.name === selectedValue);

    setSelectedOptions(prev => ({
      ...prev,
      [itemId]: selectedValue
    }));

    if (selectedValue === correctName) {
      setValidationStatus(prev => ({
        ...prev,
        [itemId]: "correcto"
      }));
      setAudioSource(selectedItem.audio);
      setFeedbackMessage(
        <>
          <span className="text-[#4CAF50] font-bold">Relación correcta: </span>
          <span className="text-[#808693]">
            ¡Muy bien! Identificaste este ítem correctamente. Ahora escucha
            el siguiente audio:
          </span>
        </>
      );
    } else {
      setValidationStatus(prev => ({
        ...prev,
        [itemId]: "incorrecto"
      }));
      setAudioSource(null);
      setFeedbackMessage(
        <>
          <span className="text-[#FF7043] font-bold">Relación incorrecta: </span>
          <span className="text-[#808693]">
            ¡Piénsalo bien! El ítem no corresponde a este elemento de
            protección personal, vuelve a intentarlo.
          </span>
        </>
      );
    }
  };

  const handleReset = () => {
    setSelectedOptions({
      A: "", B: "", C: "", D: "",
      E: "", F: "", G: "", H: ""
    });
    setValidationStatus({
      A: null, B: null, C: null, D: null,
      E: null, F: null, G: null, H: null
    });
    setAudioSource(null);
    setFeedbackMessage("");
  };

  const getFilteredOptions = (currentItemId) => {
    const selectedValues = Object.values(selectedOptions).filter(Boolean);
    return items
      .filter(item => 
        !selectedValues.includes(item.name) || 
        selectedOptions[currentItemId] === item.name
      )
      .map(item => item.name);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative my-2">
      <div className="w-full flex flex-col items-center justify-center mx-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="w-full bg-[#E5E7EB] rounded-lg flex flex-col items-center justify-center p-2">
            <div className={`relative w-full flex flex-col items-center ${
              validationStatus[item.id] === "correcto" ? "bg-[#4CAF50]/20" :
              validationStatus[item.id] === "incorrecto" ? "bg-[#FF7043]/20" : ""
            } rounded-xl p-2`}>
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-20 h-20 object-contain mb-2"
              />
              {validationStatus[item.id] === "correcto" && (
                <img src={checkIcon} className="absolute top-2 right-2 w-6 h-6" alt="Correcto" />
              )}
              {validationStatus[item.id] === "incorrecto" && (
                <img src={xmarkIcon} className="absolute top-2 right-2 w-6 h-6" alt="Incorrecto" />
              )}
              <select
                value={selectedOptions[item.id]}
                onChange={(e) => handleSelectChange(e, item.id, item.name)}
                className="w-full p-2 rounded-lg border-none text-[#9C99A1] text-center"
              >
                <option value="">Selecciona...</option>
                {getFilteredOptions(item.id).map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {feedbackMessage && (
        <div className="w-full p-4 my-2 bg-[#FCFCFC] rounded-lg shadow">
          <p className="text-center text-sm">{feedbackMessage}</p>
        </div>
      )}

      {audioSource && (
        <div className="w-full p-4">
          <audio controls autoPlay key={audioSource} className="w-full">
            <source src={audioSource} type="audio/mp3" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      )}

      <button
        className="w-[80%] py-3 bg-[#6E3CD2] text-white rounded-lg text-lg mt-4"
        onClick={handleReset}
      >
        <FontAwesomeIcon icon={faRepeat} className="mr-2" />
        Reiniciar
      </button>
    </div>
  );
};

export default DragAndDropArisMobile;