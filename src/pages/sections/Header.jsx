// import Drawer from "./MenuDrawer.jsx";
import useStore from "../../store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { COURSE_NAME } from "../../constants";

import Logo from "../../assets/img/artes-morelco/logo_morelco_color.webp";

/*
* El componente header mostrará el logo de la compañía, el botón de home,
* el número de la diapositiva actual y el botón de menú.

* ASPECTOS CONFIGURABLES:
* - El logo de la compañía, arriba hay un import Logo con el directorio de la imagen que se importa, si se desea cambiar el logo,
*  se debe cambiar la imagen en el directorio assets/img, y si el nombre es diferente, se debe corregir en la línea del import.
* - Colores: Tenemos el ícono de la casita color negro, y el ícono del menú como "main-color". Todo esto se cambia desde el className,
*  Si se desea profundizar más, consultar la documentación de TailwindCSS. Adicionalmente tentemos el fondo del header, declarado como "bg-header-color"

* FUNCIONAMIENTO DEL COMPONENTE:
* Lo que hace el archivo es importar logo e íconos. Se configura un display flex para los elementos, se añade un 
* manejador del evento de clic en el ícono de la casita y del menú, que irán a la página principal o abrirán el drawer, respectivamente.
*/

function Header() {
  const slideIndex = useStore((state) => state.slideIndex);
  const totalSlides = useStore((state) => state.totalSlides);
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const currentProgress = useStore((state) => state.currentProgress);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className=" bg-header-color flex justify-between items-center px-4 py-2 m-0">
      <div className="flex justify-start gap-6 items-center">
        <div className="flex items-center gap-4 content-center p-2">
          <img src={Logo} alt="Morelco" className="h-8 my-auto mr-2" />
        </div>
        <p className="w-fit hidden md:block text-[#7a7a7a] text-[18px] font-medium">
          {COURSE_NAME}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faHome}
          size="x"
          className="text-black mr-4 hover:cursor-pointer"
          onClick={handleHomeClick}
        />
        <span className="mr-4 font-bold">
          {slideIndex + 1} / {totalSlides}
        </span>
        <span className="mr-4 font-bold text-secondary-color"><span className="hidden sm:inline">Progreso: </span>{currentProgress}%</span>
        {/* // Se quitó temporalmente el botón de menú de la parte superior derecha.  */}
        {/* <FontAwesomeIcon
          icon={faBars}
          size="2x"
          className="text-main-color cursor-pointer"
          onClick={toggleDrawer}
        /> */}
      </div>
      {/* <Drawer isOpen={isDrawerOpen} closeDrawer={toggleDrawer} /> */}
    </div>
  );
}

export default Header;
