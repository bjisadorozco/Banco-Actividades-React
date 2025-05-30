import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  children,
  bold = false,
  icon,
  roundedFull = true,
  onClick,
  disabled = false,
}) => {
  const boldClass = bold ? "font-bold" : "";
  const roundedFullClass = roundedFull ? "rounded-full" : "rounded-lg";

  // Estilo deshabilitado
  const disabledStyle = disabled ? {
    backgroundColor: "#102044", // Color más claro
    cursor: "not-allowed",
    boxShadow: "none",
    opacity: 0.7
  } : {};

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`
        bg-button-figma text-white px-4 py-2 text-p-size shadow-sm hover:shadow-md 
        shadow-button-figma/50 hover:shadow-button-figma/40 transition-all duration-300 
        ${boldClass} ${roundedFullClass}
      `}
      style={{
        backgroundColor: "#182032",
        fontFamily: "Montserrat, sans-serif",
        ...disabledStyle,
      }}
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;