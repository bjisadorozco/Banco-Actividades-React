import imgSlide2 from "../../assets/img/slides/m6slide2.png";

function SlideTemplate() {
  return (
    <div className="container">
      <div
        className="row mx-auto w-full my-auto h-screen"
        style={{ maxWidth: "1000px" }}
      >
        <div className="col-lg-6 col-md-12 my-auto px-12">
          <h1 className="text-4xl font-bold text-main-color mb-4 mt-12 bg:mt-0">
            Bienvenidos al módulo Prevención y control del
          </h1>
          <h1 className="text-title-size font-bold text-secondary-color mb-6">
            RIESGO QUIMICO
          </h1>
          <p className="mb-2">
            Bienvenidos a este módulo virtual, en el cual queremos sensibilizar
            a los responsables del manejo de sustancias químicas en nuestra
            operación, acerca del buen uso y aplicación del SGA (sistema
            Globalmente Armonizado) para una correcta manipulación de las
            sustancias químicas más usadas en nuestros procesos.
          </p>
          <p>
            Recordaremos la regulación que nos rige en Colombia, y las
            recomendaciones para un correcto transporte de mercancías peligrosas
            dentro y fuera de nuestra operación.
          </p>
        </div>
        <div className="col-lg-6 col-md-12 my-auto p-12 ">
          <div className="image-container">
            <img
              src={imgSlide2}
              alt="sample67"
              className="animated-image pt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideTemplate;
