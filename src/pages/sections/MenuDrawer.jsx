/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCaretRight } from "@fortawesome/free-solid-svg-icons";

// import RutaIcon from "../../assets/img/icons/ruta.png";
// import TiempoIcon from "../../assets/img/icons/tiempo.png";

function Drawer({ isOpen, closeDrawer }) {
  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 ${isOpen ? "block" : "hidden"}`}
      onClick={closeDrawer}
    >
      <div
        className={`fixed right-0 top-0 h-full w-90 bg-white shadow-lg z-50 p-4 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end items-center">
          <a onClick={closeDrawer} className="text-gray-700">
            <FontAwesomeIcon icon={faTimes} />
          </a>
        </div>
        <div className="p-4">
          <h1 className="text-blue-600 font-arial font-bold text-xl">Hola!</h1>
          <p className="text-green-600 font-bold">
            Bienvenido a su Ruta de Aprendizaje!
          </p>
          <div className="my-4">
            <p className="font-bold">
              Progreso:{" "}
              <span className="bg-green-500 text-white rounded-full px-2">
                %
              </span>
            </p>
          </div>
          <hr className="bg-orange-500 h-2 w-1/3 mx-auto my-4" />
          <ul className="space-y-2">
            {[
              "Presentación",
              "Contenido",
              "Evaluación",
              "Tutorial",
              "Mis cursos",
              "Cerrar sesión",
            ].map((item, index) => (
              <li
                key={index}
                className={`p-2 ${item === "Contenido" ? "bg-green-200" : "bg-gray-100"} flex justify-start gap-2 items-center rounded-lg hover:bg-gray-300 hover:cursor-pointer`}
              >
                <FontAwesomeIcon icon={faCaretRight} size="md" />
                {item}
              </li>
            ))}
          </ul>
          <div className="my-4">
            <hr className="bg-orange-500 h-2 w-1/3 mx-auto my-4" />
            <p className="font-bold text-center text-black text-sm">
              TUS ESTADISTICAS GENERALES
            </p>
            <div className="flex justify-start items-center gap-2 ">
              <img src={RutaIcon} className=" w-12 p-0 m-0" />
              <p>Has recorrido un % de tu ruta de aprendizaje.</p>
            </div>
            <div className="flex justify-start items-center gap-2 py-2">
              <img src={TiempoIcon} className="h-12 w-12 p-0 m-0" />
              <p>Llevas horas de formación.</p>
            </div>
            <hr className="bg-orange-500 h-2 w-1/3 mx-auto my-4" />
            <div className="bg-zinc-200 p-6">
              <p className="text-center text-black font-bold text-xs">
                © Sofactia. powered by Unydos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
