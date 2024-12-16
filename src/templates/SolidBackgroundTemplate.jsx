/* eslint-disable react/prop-types */
import useStore from "../store";

/*
Esta plantilla es ideal para implementar las divisiones de los diferentes momentos del curso.
Tendrá un color sólido que ocupará todo el fondo, un título grande, y un botón de acción para dirigir
al usuario a la siguiente slide.

PARÁMETROS:
- backgroundColor: El color de fondo que se mostrará en la diapositiva, puede ser el nombre del color en inglés, su código HEX o su valor RGBA.
- index: el índice de la diapositiva actual.
- line1: la primera línea de texto que se mostrará en la diapositiva.
- line2: la segunda línea de texto que se mostrará en la diapositiva.
- line3: la tercera línea de texto que se mostrará en la diapositiva.

*/

function SolidBackgroundTemplate({
  backgroundColor = "red",
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
          backgroundColor: `${backgroundColor}`,
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
          <button
            className="bg-main-color text-lg font-normal text-white w-fit py-2.5 px-4 mt-8"
            onClick={() => setSlideIndex(index)}
          >
            VER MÁS &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default SolidBackgroundTemplate;
