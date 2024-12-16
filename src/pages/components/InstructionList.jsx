import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTurnUp, faTurnDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Instruction = ({ children, theme='dark', arrow='up' }) => {
  const textColor = theme === 'dark' ? 'text-instruction-color' : 'text-secondary-color';
  const backgroundColor = theme === 'dark' ? 'bg-instruction-color-background' : 'bg-secondary-color-background'
  const arrowDirection = arrow === 'up' ? faTurnUp : arrow === 'down' ? faTurnDown : faArrowRight;
  return (
    <div className={`${backgroundColor} justify-center rounded-lg px-4 py-2 text-center my-2 italic flex items-center gap-2`}>
      <p className={`${textColor} text-instructions-size`} style={{lineHeight: '1.3rem,', fontSize: '14px'}}>{children}</p>
      <FontAwesomeIcon icon={arrowDirection} className={`${textColor}`} />
    </div>
  );
}

export default Instruction;