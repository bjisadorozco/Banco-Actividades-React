import SwiperComponent from "../pages/components/SwiperComponent";

const image1 = "https://picsum.photos/700/400";
const image2 = "https://picsum.photos/600/400";
const image3 = "https://picsum.photos/700/400";
const image4 = "https://picsum.photos/800/400";

/*

Este template es una guía para implementar un slider de imágenes en el proyecto.
Se utilizará el componente SwiperComponent, que se encuentra en src/components/SwiperComponent.jsx.

Para la definición de las diapositivas, se debe crear un arreglo de objetos, donde cada objeto
representará una diapositiva. Cada objeto debe tener las siguientes propiedades:
- imageURL: la URL de la imagen que se mostrará en la diapositiva.
- title: el título de la diapositiva.
- description: la descripción de la diapositiva.

PARÁMETROS:
- slidesContent: el arreglo de diapositivas que se mostrarán en el slider.
- delay: el tiempo de duración de cada diapositiva en milisegundos.

*/

const slidesContent = [
  {
    imageURL: image1,
    title: "Slide 1",
    description: "Description of slide 1",
  },
  {
    imageURL: image2,
    title: "Slide 2",
    description: "Description of slide 2",
  },
  {
    imageURL: image3,
    title: "Slide 3",
    description: "Description of slide 3",
  },
  {
    imageURL: image4,
    title: "Slide 4",
    description: "Description of slide 4",
  },
];

function SlideSwiper() {
  return (
    <div className="h-[80vh] mx-18">
      <SwiperComponent slides={slidesContent} delay={2500} />
    </div>
  );
}

export default SlideSwiper;
