import { useDraggable } from "@dnd-kit/core";

export default function DraggableOption({ id, label, isDropped }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  if (isDropped) return null;

  return (
    <div
      ref={setNodeRef}
      className="draggable-option"
      style={style}
      {...listeners}
      {...attributes}
    >
      {label}
    </div>
  );
}
