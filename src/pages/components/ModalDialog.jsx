import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalDialog = ({ open, handleClose, title, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {
            xs: 350,  // Ancho cuando el max-width es 600px o menos (pantallas pequeñas)
            sm: 400   // Ancho estándar (pantallas más grandes)
          },
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'main-color',
            p: 1,
            borderRadius: '8px 8px 0 0',
          }}
          className="bg-main-color"
        >
          <Typography id="modal-title" variant="h6" component="h2" color="white">
            {title}
          </Typography>
          <IconButton onClick={handleClose} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {children}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDialog;