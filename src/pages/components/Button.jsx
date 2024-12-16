import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ children, bold=false, icon=faHatWizard, roundedFull=false, onClick }) => {
  
  const boldClass = bold ? 'font-bold' : '';
  const roundedFullClass = roundedFull ? 'rounded-full' : 'rounded-lg';

  return (
  <button onClick={onClick} className={`bg-main-color text-white px-4 py-2 text-p-size shadow-sm hover:shadow-md shadow-main-color/50 hover:shadow-main-color/40 transition-shadow duration-300 ${boldClass} ${roundedFullClass}`}>
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {children}
    </button>
  );
}

export default Button;