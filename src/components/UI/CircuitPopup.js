import React, { useState } from 'react';
import { Dialog, DialogContent, Button } from '@mui/material';

const CircuitPopup = ({ imageUrl }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <img src={'./img/navigation.svg'} width={'20'} />
      </Button>
      <Dialog maxWidth={'920'} open={open} onClose={handleClose}>
        <DialogContent>
          <img src={imageUrl} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CircuitPopup;
