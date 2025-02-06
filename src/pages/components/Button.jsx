import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  children,
  bold = false,
  icon = faHatWizard,
  roundedFull = false,
  onClick,
  disabled = false, // Nueva propiedad
}) => {
  const boldClass = bold ? "font-bold" : "";
  const roundedFullClass = roundedFull ? "rounded-full" : "rounded-lg";

  // Estilo deshabilitado
  const disabledStyle = disabled
    ? {
        //backgroundColor: "#6A8EBB", // Color más claro azul tti
        backgroundColor: "#8d5fe4", // Color más claro morado
        cursor: "not-allowed",
        boxShadow: "none",
      }
    : {};

  return (
    <button
      onClick={!disabled ? onClick : undefined} // Deshabilitar evento si está deshabilitado
      disabled={disabled} // Propiedad HTML nativa
      className={`bg-main-color text-white px-2 py-2 text-p-size shadow-sm hover:shadow-md shadow-main-color/50 hover:shadow-main-color/40 transition-shadow duration-300 ${boldClass} ${roundedFullClass}`}
      style={{
				//backgroundColor: "#003454", //color azul tti
        fontFamily: "Montserrat, sans-serif",
        ...disabledStyle, // Aplicar estilos condicionalmente
      }}
    >
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {children}
    </button>
  );
};

export default Button;
