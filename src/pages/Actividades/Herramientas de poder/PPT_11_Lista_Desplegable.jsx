import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import { faRefresh, faCheck } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../store";
import img1 from "../../../assets/img/ImagenesPESV/letra_e_sld_M1.webp";
import imgVerdadero from "../../../assets/img/checkAct.png";
import imgFalso from "../../../assets/img/xmarkAct.png";
import "./styles/PPT_11_Lista_Desplegable.css";

export default function PPT8_List_Desplegable() {
  const [isVerified, setIsVerified] = useState(false);
  const [results, setResults] = useState({ correct: 0, total: 4 });
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [correctCount, setCorrectCount] = useState(0);
  const [selections, setSelections] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
    drop4: "",
  });
  const [availableOptions, setAvailableOptions] = useState({
    drop1: [],
    drop2: [],
    drop3: [],
    drop4: [],
  });

  useEffect(() => {
    setIsOnDivisor(false);
    // Initialize available options
    const initialOptions = options.slice(1);
    setAvailableOptions({
      drop1: initialOptions,
      drop2: initialOptions,
      drop3: initialOptions,
      drop4: initialOptions,
    });
  }, [setIsOnDivisor]);

  const risks = [
    {
      dropId: "drop1",
      title: "Lesiones por corte",
      image: img1,
      description:
        "Al minimizar los riesgos, se evitan los accidentes laborales​​",
      gradient: "from-red-400 to-red-600",
    },
    {
      dropId: "drop2",
      title: "Lesiones por aplastamiento",
      image: img1,
      description:
        "Un entorno seguro de trabajo incrementa su eficiencia y disminuye los costos​",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      dropId: "drop3",
      title: "Golpes y proyecciones",
      image: img1,
      description:
        "Un ambiente seguro y saludable genera confianza en los empleados​",
      gradient: "from-green-400 to-green-600",
    },
    {
      dropId: "drop4",
      title: "Riesgo ergonómico",
      image: img1,
      description:
        "Cumplir con las normativas de seguridad laboral evita sanciones legales y proyecta una imagen positiva de la organización​",
      gradient: "from-yellow-400 to-yellow-600",
    },
  ];

  const options = [
    { value: "", label: "Seleccione..." },
    { value: "option1", label: "Da cumplimiento legal​" },
    { value: "option2", label: "Mejora la productividad​​" },
    { value: "option3", label: "Mejora el compromiso" },
    { value: "option4", label: "Reduce accidentes​" },
  ];

  const correctItems = {
    drop1: "option4",
    drop2: "option2",
    drop3: "option3",
    drop4: "option1",
  };

  // useEffect(() => {
  //   updateAvailableOptions({});
  // }, []);

  // const updateAvailableOptions = (newSelections) => {
  //   const selectedValues = Object.values(newSelections);
  //   const newAvailableOptions = {};

  //   risks.forEach((risk) => {
  //     newAvailableOptions[risk.id] = options.filter(
  //       (option) =>
  //         !selectedValues.includes(option.value) ||
  //         option.value === newSelections[risk.id]
  //     );
  //   });

  //   setAvailableOptions(newAvailableOptions);
  // };

  const handleChange = (dropId, value) => {
    setSelections((prev) => {
      const newSelections = { ...prev, [dropId]: value };

      // Update available options for all dropdowns
      const selectedValues = Object.values(newSelections).filter(
        (v) => v !== ""
      );
      const newAvailableOptions = {};
      Object.keys(availableOptions).forEach((key) => {
        newAvailableOptions[key] = options
          .slice(1)
          .filter(
            (option) =>
              !selectedValues.includes(option.value) ||
              option.value === newSelections[key]
          );
      });
      setAvailableOptions(newAvailableOptions);

      return newSelections;
    });
  };

  const handleVerify = () => {
    let count = 0;
    Object.keys(selections).forEach((key) => {
      if (selections[key] === correctItems[key]) {
        count++;
      }
    });
    setCorrectCount(count);
    setIsVerified(true);
    setResults({ correct: count, total: Object.keys(correctItems).length });
  };

  const handleReset = () => {
    setSelections({
      drop1: "",
      drop2: "",
      drop3: "",
      drop4: "",
    });
    setIsVerified(false);
    setCorrectCount(0);
    // Reset available options
    const initialOptions = options.slice(1);
    setAvailableOptions({
      drop1: initialOptions,
      drop2: initialOptions,
      drop3: initialOptions,
      drop4: initialOptions,
    });
  };

  const isResetDisabled = Object.values(selections).every(
    (value) => value === ""
  );
  const isVerifyDisabled = Object.values(selections).some(
    (value) => value === ""
  );

  return (
    <div className="container-actividad">
      <div className="cards-container-ra">
        {risks.map((risk) => (
          <div
            className="quiz-card-ra"
            key={risk.dropId}
            style={{ minHeight: "230px" }}
          >
            <div className="card-front-ra">
              <div
                className={`card-image-ra bg-gradient-to-b ${risk.gradient}`}
                style={{ position: "relative" }}
              >
                <img
                  src={risk.image}
                  alt={risk.title}
                  className="w-full h-full object-cover"
                  style={{
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}
                />
                {isVerified && (
                  <div className="validation-icon-container">
                    <img
                      src={
                        selections[risk.dropId] === correctItems[risk.dropId]
                          ? imgVerdadero
                          : imgFalso
                      }
                      alt="Validation Icon"
                      className="validation-icon"
                    />
                  </div>
                )}
              </div>
            </div>
            <div
              className={`card-content-ra ${
                isVerified
                  ? selections[risk.dropId] === correctItems[risk.dropId]
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : ""
              }`}
              style={{ borderRadius: "0 0 10px 10px", minHeight: "61%" }}
            >
              <p className="text-sm text-muted-foreground">
                {risk.description}
              </p>
              <select
                value={selections[risk.dropId]}
                onChange={(e) => handleChange(risk.dropId, e.target.value)}
                className="my-2 w-full p-2 border rounded"
                disabled={isVerified}
                style={{
                  backgroundColor: isVerified ? "white" : "white",
                  color: isVerified ? "gray" : "black",
                }}
              >
                <option value="">Seleccione...</option>
                {availableOptions[risk.dropId]?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {isVerified && (
        <div className="validation text-center">
          <Paragraph
            theme="light"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            Tus respuestas correctas son {results.correct} de{" "}
            {Object.keys(correctItems).length} (
            {(results.correct / results.total) * 100}%)
          </Paragraph>
        </div>
      )}

      <div className="button-container">
        <Button
          bold={false}
          icon={faCheck}
          roundedFull={true}
          onClick={handleVerify}
          disabled={isVerifyDisabled}
        >
          Validar
        </Button>
        <Button
          bold={false}
          icon={faRefresh}
          roundedFull={true}
          onClick={handleReset}
          disabled={isResetDisabled}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
}
