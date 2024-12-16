/* eslint-disable react/prop-types */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from '@mui/icons-material/Check';

/*

Componente AccordionComponent

Propiedades:
- title: Título del acordeón.
- content: Contenido del acordeón.
- Icon: Icono que se mostrará a la izquierda del título.

*/

function AccordionComponent({title = '', content = '', Icon}) {
  return (
        <div className='py-1 px-24'>
      <Accordion
        sx={{
          transition: 'all 0.3s ease',
          '&:hover' : {
            backgroundColor: 'rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
          },
        }}
        className='my-2'
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {Icon ? <Icon className='mr-2'/> : <CheckIcon />}
          {title}
        </AccordionSummary>
        <AccordionDetails>
          {content}
        </AccordionDetails>
      </Accordion>
    </div>

  )
}

export default AccordionComponent