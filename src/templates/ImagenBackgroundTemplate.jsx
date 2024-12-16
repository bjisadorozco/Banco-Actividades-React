/* eslint-disable react/prop-types */
const backgroundImage = "https://placehold.co/1960x1080";

import useStore from "../../store";

/*
Esta plantilla es ideal para implementar las divisiones de los diferentes momentos del curso.
Tendrá una imagen que ocupará todo el fondo, un título grande, y un botón de acción para dirigir
al usuario a la siguiente slide.

PARÁMETROS:
- background: la imagen de fondo que se mostrará en la diapositiva.
- index: el índice de la diapositiva actual.
- line1: la primera línea de texto que se mostrará en la diapositiva.
- line2: la segunda línea de texto que se mostrará en la diapositiva.
- line3: la tercera línea de texto que se mostrará en la diapositiva.

*/

function ImagenBackgroundTemplate({
  background = backgroundImage,
  index,
  line1,
  line2,
  line3,
}) {
  const setSlideIndex = useStore((state) => state.setSlideIndex);

  return (
    <div className="container slider02 relative min-h-screen p-0 m-0">
      <div
        className="absolute z-0 inset-0 bg-cover bg-center w-full"
        style={{
          backgroundImage: `url(${background})`,
          width: "100vw",
          height: "100%",
        }}
      >
        <div className="flex flex-col text-7xl z-50 justify-center h-full -mt-20 px-40 font-bold content-start">
          <h1 className="text-white">
            {line1}
            <span className="text-main-color">.</span>
          </h1>
          <h1 className="text-white">
            {line2}
            <span className="text-main-color">.</span>
          </h1>
          <h1 className="text-white">
            {line3}
            <span className="text-main-color">.</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ImagenBackgroundTemplate;
