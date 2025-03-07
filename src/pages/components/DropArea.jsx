import { useDroppable } from "@dnd-kit/core";
import check from "../../../assets/img/checkAct.png";
import uncheck from "../../../assets/img/xmarkAct.png";

export default function DropArea({ id, children, isCorrect, verificationImage }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`drop-area ${isOver ? "drop-area-hover" : ""} ${children ? "drop-area-filled" : ""} ${isCorrect !== null ? (isCorrect ? "drop-area-correct" : "drop-area-incorrect") : ""}`}
    >
      {children && <div className="drop-area-content">{children}</div>}
      {verificationImage && (
        <img
          src={verificationImage === "correct" ? check : uncheck}
          alt={verificationImage}
          className="verification-image"
        />
      )}
    </div>
  );
}
