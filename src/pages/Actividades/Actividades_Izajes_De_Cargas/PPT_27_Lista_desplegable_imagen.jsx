import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import imgP from "../../../assets/img/ImagenesPESV/letra_p_sld_M1.webp";
import imgE from "../../../assets/img/ImagenesPESV/letra_e_sld_M1.webp";
import imgS from "../../../assets/img/ImagenesPESV/letra_s_sld_M1.webp";
import imgV from "../../../assets/img/ImagenesPESV/letra_v_sld_M1.webp";
import correctIcon from "../../../assets/img/checkAct.png";
import incorrectIcon from "../../../assets/img/xmarkAct.png";
import "./styles/PPT_27_Lista_desplegable_imagen.css";

// function PPT_27_Lista_desplegable_imagen() {
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isVerified, setIsVerified] = useState(false);
//   const [correctCount, setCorrectCount] = useState(0);
//   const [validationMessage, setValidationMessage] = useState("");
//   const [items, setItems] = useState([
//     {
//       image: imgP,
//       // description:
//       //   "Este método se centra en indagar en las causas raíz de un incidente haciendo repetidamente (5 veces) la pregunta '¿por qué?' hasta llegar a la causa raíz.",
//       correctAnswer: "1",
//       selectedAnswer: "",
//       isCorrect: false,
//     },
//     {
//       image: imgE,
//       // description:
//       //   "Mediante diagramas gráficos tipo árbol, este método visualiza las relaciones causa-efecto en incidentes complejos.",
//       correctAnswer: "2",
//       selectedAnswer: "",
//       isCorrect: false,
//     },
//     {
//       image: imgS,
//       // description:
//       //   "Este diagrama clasifica las causas de un problema en categorías como personas, máquinas, materiales, métodos, medio ambiente y medición.",
//       correctAnswer: "3",
//       selectedAnswer: "",
//       isCorrect: false,
//     },
//     {
//       image: imgV,
//       // description:
//       //   "Este diagrama clasifica las causas de un problema en categorías como personas, máquinas, materiales, métodos, medio ambiente y medición.",
//       correctAnswer: "4",
//       selectedAnswer: "",
//       isCorrect: false,
//     },
//   ]);

//   const [availableOptions] = useState([
//     { value: "2", label: "Levantar la pluma" },
//     { value: "4", label: "Asegurar todo" },
//     { value: "1", label: "Usar gancho principal" },
//     { value: "3", label: "Girar" },
//   ]);

//   const handleSelect = (index, value) => {
//     const updatedItems = [...items];
//     updatedItems[index].selectedAnswer = value;
//     setItems(updatedItems);
//   };

//   const handleValidate = () => {
//     if (items.some((item) => item.selectedAnswer === "")) {
//       setErrorMessage("Debe seleccionar todas las opciones antes de validar.");
//       return;
//     }

//     let correct = 0;
//     const updatedItems = items.map((item) => {
//       const isCorrect = item.selectedAnswer === item.correctAnswer;
//       if (isCorrect) correct++;
//       return { ...item, isCorrect };
//     });

//     const percentage = Math.round((correct / items.length) * 100);

//     if (correct === items.length) {
//       setValidationMessage(
//         `¡Muy bien! Tus respuestas correctas son: ${correct} de 4 (${percentage}%)`
//       );
//     } else {
//       setValidationMessage(
//         `¡Piénsalo bien! Tus respuestas correctas son: ${correct} de 4 (${percentage}%)`
//       );
//     }

//     setItems(updatedItems);
//     setCorrectCount(correct);
//     setIsVerified(true);
//     setErrorMessage("");
//   };

//   const handleReset = () => {
//     setItems(
//       items.map((item) => ({ ...item, selectedAnswer: "", isCorrect: false }))
//     );
//     setErrorMessage("");
//     setIsVerified(false);
//     setCorrectCount(0);
//     setValidationMessage("");
//   };

//   return (
//     <div className="quiz-container">
//       <div className="items-grid">
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className={`item-box ${
//               isVerified ? (item.isCorrect ? "correct" : "incorrect") : ""
//             }`}
//             style={{ minHeight: "0" }}
//           >
//             <div className="image-container">
//               <img
//                 src={item.image}
//                 alt={`Item ${index + 1}`}
//                 className="item-image"
//               />
//               {isVerified && (
//                 <img
//                   src={item.isCorrect ? correctIcon : incorrectIcon}
//                   alt={item.isCorrect ? "Correcto" : "Incorrecto"}
//                   className="feedback-icon"
//                 />
//               )}
//             </div>

//             <select
//               className="item-select"
//               value={item.selectedAnswer}
//               onChange={(e) => handleSelect(index, e.target.value)}
//               disabled={isVerified}
//             >
//               <option value="" disabled>
//                 Seleccione...
//               </option>
//               {availableOptions
//                 .filter(
//                   (option) =>
//                     !items.some(
//                       (item, i) =>
//                         i !== index && item.selectedAnswer === option.value
//                     )
//                 )
//                 .map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//             </select>

//             {isVerified && (
//               <p className="feedback-text">
//                 {item.isCorrect ? "¡Correcto!" : "¡Incorrecto!"}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="feedback-container-ppt27">
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         {isVerified && (
//           // <p className="validation-message">
//           //   ¡Muy bien! Tus respuestas correctas son: {correctCount} de 4 (
//           //   {(correctCount / 4) * 100}%)
//           // </p>
//           <p
//             className={`validation-message ${
//               validationMessage.includes("Muy bien") ? "successs" : "errors"
//             }`}
//           >
//             {validationMessage}
//           </p>
//         )}
//         <div className="button-container" style={{ marginTop: "20px" }}>
//           <Button
//             bold={false}
//             icon={faCheck}
//             roundedFull={true}
//             onClick={handleValidate}
//           >
//             Validar
//           </Button>
//           <Button
//             bold={false}
//             icon={faRepeat}
//             roundedFull={true}
//             onClick={handleReset}
//           >
//             Reiniciar
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PPT_27_Lista_desplegable_imagen;

export default function PPT_27_Lista_desplegable_imagen() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isResetActive, setIsResetActive] = useState(false);
  const [items, setItems] = useState([
    {
      image: imgP,
      correctAnswer: "1",
      selectedAnswer: "",
      isCorrect: false,
    },
    {
      image: imgP,
      correctAnswer: "2",
      selectedAnswer: "",
      isCorrect: false,
    },
    {
      image: imgP,
      correctAnswer: "3",
      selectedAnswer: "",
      isCorrect: false,
    },
    {
      image: imgP,
      correctAnswer: "4",
      selectedAnswer: "",
      isCorrect: false,
    },
  ]);

  const [availableOptions] = useState([
    { value: "2", label: "Levantar la pluma" },
    { value: "4", label: "Asegurar todo" },
    { value: "1", label: "Usar gancho principal" },
    { value: "3", label: "Girar" },
  ]);

  useEffect(() => {
    const anySelected = items.some((item) => item.selectedAnswer !== "");
    setIsResetActive(anySelected);
  }, [items]);

  useEffect(() => {
    // Evitar el scroll temporal al recargar la página
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 100);
  }, []);

  const handleSelect = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].selectedAnswer = value;
    setItems(updatedItems);
  };

  const handleValidate = () => {
    if (items.some((item) => item.selectedAnswer === "")) {
      setErrorMessage("Debe seleccionar todas las opciones antes de validar.");
      return;
    }

    let correct = 0;
    const updatedItems = items.map((item) => {
      const isCorrect = item.selectedAnswer === item.correctAnswer;
      if (isCorrect) correct++;
      return { ...item, isCorrect };
    });

    setItems(updatedItems);
    setCorrectCount(correct);
    setPercentage(Math.round((correct / items.length) * 100));
    setIsVerified(true);
    setErrorMessage("");
  };

  const handleReset = () => {
    setItems(
      items.map((item) => ({ ...item, selectedAnswer: "", isCorrect: false }))
    );
    setErrorMessage("");
    setIsVerified(false);
    setCorrectCount(0);
    setPercentage(0);
    setIsResetActive(false);
  };

  return (
    <div className="quiz-containerALD">
      <div className="items-grid">
        {items.map((item, index) => (
          <div
            key={index}
            className={`item-box ${
              item.selectedAnswer !== "" && !isVerified ? "selected" : ""
            } ${isVerified ? (item.isCorrect ? "correct" : "incorrect") : ""}`}
          >
            <div className="image-containerALD">
              <img
                src={item.image || "/placeholder.svg"}
                alt={`Item ${index + 1}`}
                className="item-image"
              />
              {isVerified && (
                <img
                  src={item.isCorrect ? correctIcon : incorrectIcon}
                  className="feedback-iconALD"
                />
              )}
            </div>

            {/* <p
              className={`item-description ${isVerified ? "text-white" : ""}`}
            ></p> */}

            <select
              className={`item-select ${
                item.selectedAnswer !== "" && !isVerified ? "selected" : ""
              }`}
              value={item.selectedAnswer}
              onChange={(e) => handleSelect(index, e.target.value)}
              disabled={isVerified}
            >
              <option value="" disabled>
                Seleccione...
              </option>
              {availableOptions
                .filter(
                  (option) =>
                    !items.some(
                      (item, i) =>
                        i !== index && item.selectedAnswer === option.value
                    )
                )
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>

            {isVerified && (
              <p className="feedback-text">
                {item.isCorrect ? "¡Correcto!" : "¡Incorrecto!"}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="feedback-containerALD">
        {errorMessage && (
          <p
            className="text-center text-md font-bold mt-2"
            style={{ color: "gray" }}
          >
            {errorMessage}
          </p>
        )}
        {isVerified && (
          <div className="results-containerALD text-center">
            <p className={`text-md font-bold text-paragraph-light-color`}>
              Tus respuestas correctas son: {correctCount} de {items.length} (
              {percentage}%)
            </p>
          </div>
        )}
        <div className="button-container">
          <Button
            bold={false}
            icon={faCheck}
            roundedFull={true}
            onClick={handleValidate}
          >
            {"Validar"}
          </Button>
          <Button
            bold={false}
            icon={faRepeat}
            roundedFull={true}
            onClick={handleReset}
            disabled={!isResetActive}
            className={`${!isResetActive ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {"Reiniciar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
