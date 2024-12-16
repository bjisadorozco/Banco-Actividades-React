import Title from "../pages/components/Title";
import momento1 from "../assets/img/momentos/moment-1.png";
import momento2 from "../assets/img/momentos/moment-2.png";
import momento3 from "../assets/img/momentos/moment-3.png";
import Paragraph from "../pages/components/Paragraph";
import Instruction from "../pages/components/Instruction";
import "../templates/styles/EstructuraTematica.css"

import { useEffect } from "react";
import useStore from "../store";

function EstructuraTematica() {

  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [])
  return (
    <div className="px-4 w-full flex items-center justify-center mb-36 md:mb-0 bg-slate-900 md:h-screen h-auto">
      <div className="container current pt-3">
        <div className="col-lg-12 col-md-12 flex flex-col justify-center items-center">
          <div className="my-2 text-center">
            <Title>Estructura <span className="text-subtitle-color-qa">temática</span></Title>
          </div>
          <div>
            <Paragraph theme='dark' justify='center'>
              En este curso encontrarás estos <span className="text-subtitle-color-qa">tres (3) momentos </span>claves de acercamiento <br />
              a nuestra organización continúa adelante para irlos revisando en el mismo orden
            </Paragraph>
          </div>
          <div className="w-auto flex justify-center items-center">
            <Instruction arrow="down" theme="dark">
              Pasa el mouse por cada sección para descubrir su contenido
            </Instruction>
          </div>
          <section className="section-tours my-3">
            <div className="container bgazul-doble-lateral p-0">
              <div className="row">
                <div className="col-lg-12 col-md-12 grid justify-center p-0 bg-slate-900">
                  <div className="contenido-central">
                    <div className="col-lg-12 col-md-12 pcslide-flex_sld3">
                      <div className="col-lg-4 col-md-6 col-sm-12 flex justify-center">
                        <article className="card_new ">
                          <img
                            className="card_new__background"
                            src={momento1}
                            alt="Momento 1"
                            width="1920"
                            height="2193"
                          />
                          <div className="card_new__content | flow">
                            <div className="card_new__content--container | flow">
                              <h2 className="card_new__title cardh2" style={{ lineHeight: '1.3rem' }}>
                                1 - Identificación de Peligros
                              </h2>
                              <p className="card_new__description pt-4">
                                Abordaremos la identificación de los tipos de peligros en la operación, así como los métodos para identificarlos fácilmente.
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 flex justify-center">
                        <article className="card_new">
                          <img
                            className="card_new__background"
                            src={momento2}
                            alt="Momento 2"
                            width="1920"
                            height="2193"
                          />
                          <div className="card_new__content | flow">
                            <div className="card_new__content--container | flow">
                              <h2 className="card_new__title cardh2">
                                2- Valoración de Riesgos
                              </h2>
                              <p className="card_new__description pt-4">
                                Recordaremos las definiciones de Peligro y Riesgo, y los diferentes métodos para realizar la valoración de los riesgos.
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>

                      <div className="col-lg-4 col-md-6 col-sm-12 flex justify-center">
                        <article className="card_new">
                          <img
                            className="card_new__background"
                            src={momento3}
                            alt="Momento 3"
                            width="1920"
                            height="2193"
                          />
                          <div className="card_new__content | flow">
                            <div className="card_new__content--container | flow">
                              <h2 className="card_new__title cardh2  px-2" style={{ lineHeight: '1.3rem' }}>
                                3 - Establecimiento de Controles
                              </h2>
                              <p className="card_new__description pt-4">
                                Podrás ayudar al equipo de Seguridad y Salud de tu empresa a establecer controles para mitigar los riesgos presentes.
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default EstructuraTematica;
