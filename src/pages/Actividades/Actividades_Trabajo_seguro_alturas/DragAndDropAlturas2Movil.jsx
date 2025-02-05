import { useState, useEffect } from "react";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";

import uncheck from "../../../assets/img/xmarkAct.png";
import check from "../../../assets/img/checkAct.png";

export default function SelectAlturas2() {
  const [verificationImages, setVerificationImages] = useState({});
  const [items, setItems] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
  });
  const [validationMessages, setValidationMessages] = useState({
    drop1: { text: "", class: "" },
    drop2: { text: "", class: "" },
    drop3: { text: "", class: "" },
  });
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  const options = [
    {
      id: "option1",
      text: [
        "Inspección previa y periódica de los equipos de sujeción",
        "Capacitación sobre el uso correcto de arneses y sistemas de sujeción",
        "Uso obligatorio de líneas de vida certificadas",
        "Sistema de doble anclaje",
      ],
      label: "Caso 1",
    },
    {
      id: "option2",
      text: [
        "Verificación de estabilidad de la plataforma antes de usarla",
        "Certificación del equipo",
        "Uso de líneas de vida adicionales para seguridad",
      ],
      label: "Caso 2",
    },
    {
      id: "option3",
      text: [
        "Uso de arneses con líneas de vida",
        "Implementar áreas de exclusión debajo de la zona de trabajo",
        "Uso de redes de protección para caída de herramientas o materiales",
      ],
      label: "Caso 3",
    },
  ];

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  useEffect(() => {
    const hasSelectedItems = Object.values(items).some((item) => item !== null);
    setIsResetDisabled(!hasSelectedItems);
  }, [items]);

  const handleReset = () => {
    setItems({ drop1: null, drop2: null, drop3: null });
    setVerificationImages({});
    setValidationMessages({
      drop1: { text: "", class: "" },
      drop2: { text: "", class: "" },
      drop3: { text: "", class: "" },
    });
    setIsResetDisabled(true);
  };

  const handleSelect = (dropId, optionId) => {
    setItems((prevItems) => ({
      ...prevItems,
      [dropId]: optionId,
    }));

    const correctOptions = {
      drop1: "option1",
      drop2: "option2",
      drop3: "option3",
    };

    const isCorrect = correctOptions[dropId] === optionId;

    setVerificationImages((prev) => ({
      ...prev,
      [dropId]: isCorrect ? "correct" : "incorrect",
    }));

    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [dropId]: {
        text: isCorrect
          ? "¡Muy bien! estas medidas de control te ayudarán a controlar estos riesgos.​"
          : "¡Piénsalo bien! Estas medidas de control NO son las adecuadas para estos riesgos.",
        class: isCorrect ? "success" : "error",
      },
    }));
  };

  return (
    <div className="flex flex-col overflow-x-hidden" style = {{ padding: "0" }}>
      <div className="flex flex-col items-center gap-4 mb-4" style = {{ padding: "0" }}>
        {options.map((option, index) => (
          <div
            key={option.id}
            className="p-6 border rounded-lg shadow-md flex flex-col items-center relative"
            style={{
              width: "100%",
              maxWidth: "350px",
              backgroundColor:
                verificationImages[`drop${index + 1}`] === "correct"
                  ? "#4CAF50"
                  : verificationImages[`drop${index + 1}`] === "incorrect"
                    ? "#F44336"
                    : "white",
            }}
          >
            {verificationImages[`drop${index + 1}`] && (
              <img
                src={
                  verificationImages[`drop${index + 1}`] === "correct"
                    ? check
                    : uncheck
                }
                alt={
                  verificationImages[`drop${index + 1}`] === "correct"
                    ? "Correcto"
                    : "Incorrecto"
                }
                style={{
                  position: "absolute",
                  top: "45%",
                  right: "3%",
                  width: "54px",
                  height: "54px",
                }}
              />
            )}
            <Paragraph
              theme={
                verificationImages[`drop${index + 1}`] ? undefined : "light"
              }
              justify="left"
              style={{
                border: "1px solid",
                borderColor: verificationImages[`drop${index + 1}`]
                  ? "white"
                  : "#ccc",
                padding: "10px",
                color: verificationImages[`drop${index + 1}`]
                  ? "white"
                  : "black",
              }}
            >
              <ul style={{ listStyleType: "disc" }}>
                {option.text.map((item, i) => (
                  <li key={i} style = {{ marginLeft: "15px" }}>{item} </li>
                ))}
              </ul>
            </Paragraph>
            <select
              onChange={(e) => handleSelect(`drop${index + 1}`, e.target.value)}
              value={items[`drop${index + 1}`] || ""}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="" disabled>
                Seleccione...
              </option>
              {options
                .filter(
                  (opt) =>
                    !Object.values(items).includes(opt.id) ||
                    opt.id === items[`drop${index + 1}`]
                )
                .map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
            </select>
            {validationMessages[`drop${index + 1}`]?.text && (
              <p
                className={`validation-message ${
                  validationMessages[`drop${index + 1}`]?.class
                }`}
                style={{
                  marginTop: "8px",
                  textAlign: "center",
                  width: "100%",
                  backgroundColor:
                    validationMessages[`drop${index + 1}`]?.class === "success"
                      ? "#4CAF50"
                      : "#F44336",
                  color: "white",
                  fontWeight: "bold",
                  padding: "5px",
                  borderRadius: "4px",
                }}
              >
                {validationMessages[`drop${index + 1}`]?.text}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-6">
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
