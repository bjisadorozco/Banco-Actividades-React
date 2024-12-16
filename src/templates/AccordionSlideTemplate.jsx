import AccordionComponent from "../pages/components/AccordionComponent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DiamondIcon from "@mui/icons-material/Diamond";

/* 

Para configurar los Iconos, necesitaremos primero importarlos y luego ponerlos
como propiedades del componente.

La URL desde donde se importan los iconos es:	

https://mui.com/material-ui/material-icons/

*/

function AccordionSlideTemplate() {
  return (
    <div>
      <AccordionComponent
        title="titulo 1"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
        Icon={CloudUploadIcon}
      />
      <AccordionComponent
        title="titulo 2"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
        Icon={DiamondIcon}
      />
    </div>
  );
}

export default AccordionSlideTemplate;
