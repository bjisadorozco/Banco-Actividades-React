/* eslint-disable react/prop-types */
function CardComponent({
  title = "título",
  content = "contenido",
  imageURL = "https://placehold.co/600x400",
}) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={imageURL} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <h1 className="font-bold text-main-color text-xl mb-2">{title}</h1>
        <p className="text-gray-700 text-base">{content}</p>
      </div>
    </div>
  );
}

export default CardComponent;
