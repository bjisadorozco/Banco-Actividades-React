import CardComponent from "../pages/components/CardComponent";
const image1 = "https://picsum.photos/700/400";
const image2 = "https://picsum.photos/600/400";
const image3 = "https://picsum.photos/700/400";

/*

Este template es una guía para implementar un slider de tarjetas en el proyecto.
Se utilizará el componente CardComponent, que se encuentra en src/components/CardComponent.jsx.

PARÁMETROS:
- title: el título de la tarjeta.
- content: el contenido de la tarjeta.
- imageURL: la URL de la imagen que se mostrará en la tarjeta.

*/

function CardSlide() {
  return (
    <div className="py-6 m-auto w-full flex flex-col md:flex-row items-center justify-center gap-3">
      <CardComponent
        title="Card 1"
        content="Contenido de la Card 1"
        imageURL={image1}
      />
      <CardComponent
        title="Card 2"
        content="Contenido de la Card 2"
        imageURL={image2}
      />
      <CardComponent
        title="Card 3"
        content="Contenido de la Card 3"
        imageURL={image3}
      />
    </div>
  );
}

export default CardSlide;
