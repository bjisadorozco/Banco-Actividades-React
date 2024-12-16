// import "../assets/bootstrap/css/bootstrap.css";
// import "../assets/bootstrap/css/bootstrap-grid.css";
// import "../assets/bootstrap/css/bootstrap-reboot.css";
// import "../assets/bootstrap/css/bootstrap-utilities.css";
// import "../assets/css/style.css";
// import "../assets/css/styleSlider.css";

// import "../assets/bootstrap/js/bootstrap.bundle.js";
// import "../assets/bootstrap/js/bootstrap.esm.js";
// import "../assets/bootstrap/js/bootstrap.js";

// import Recomendacion1 from "../assets/img/instrucciones/recomendacion-1.svg";
// import Recomendacion2 from "../assets/img/instrucciones/recomendacion-2.svg";
// import Recomendacion3 from "../assets/img/instrucciones/recomendacion-3.svg";
// import Recomendacion4 from "../assets/img/instrucciones/recomendacion-4.svg";
// import RelojIns from "../assets/img/instrucciones/reloj-ins.svg";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Introduccion2() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/slides");
  };
  return (
    <div className="imagen-instruccion">
      <div className="ctMd darkinstrucciones ">
        <div className="contentModule2">
          <div className="container current dividerBgInstruccion">
            <div className="row">
              <div className="col-lg-12 col-md-12 ">
                <h1 className="tituloh1-center text-white text-4xl font-bold pb-5">
                  Recomendaciones para tomar este curso:
                </h1>
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="cardInstrucciones-body">
                      <div className="cardInstrucciones">
                        <img src={Recomendacion1} />
                        <p className="parrafo-white">
                          1. Disponerse a adquirir nuevos conocimientos y
                          reforzar los existentes para su seguridad
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="cardInstrucciones-body">
                      <div className="cardInstrucciones">
                        <img src={RelojIns} />
                        <p className="parrafo-white">
                          2. Disponer del tiempo mínimo estimado de duración{" "}
                          <br />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="cardInstrucciones-body">
                      <div className="cardInstrucciones">
                        <img src={Recomendacion3} />
                        <p className="parrafo-white">
                          3. Contar con conexión a Internet <br />{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="cardInstrucciones-body">
                      <div className="cardInstrucciones">
                        <img src={Recomendacion4} />
                        <p className="parrafo-white">
                          4. Realizar, hasta finalizar, los contenidos del curso
                          y realizar la evaluación
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 contenedor-center">
                    <div>
                      <div className="cardInstrucciones">
                        <img src={Recomendacion2} />
                        <p className="parrafo-white">
                          5. Realizar todas las actividades de refuerzo y
                          repetirlas si es necesario <br />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  id="siguiente"
                  className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-md shadow-main-color text-white mx-auto my-6"
                  onClick={handleClick}
                >
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="mr-1 group-hover:translate-x-1 transition-transform duration-200"
                  />
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduccion2;
