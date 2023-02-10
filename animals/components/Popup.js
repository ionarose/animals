import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DOMPurify from 'dompurify';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);

  

  const sanitizedDesc = DOMPurify.sanitize(props.desc);
  const desc = {__html: sanitizedDesc};
  const sanitizedBio = DOMPurify.sanitize(props.biology);
  const bio = {__html: sanitizedBio};
  const sanitizedHab = DOMPurify.sanitize(props.Habitat);
  const hab = {__html: sanitizedHab};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Info
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.name} <span style={{ float: "right", "font-size": '0.9rem', "color" : "grey"}}> £{props.cost} per week</span> </DialogTitle>
        
        <DialogContent>
        <img style={{ maxWidth: "100%", height: 'auto' }} alt="fish illustration" src={props.illustration}/>
          <DialogContentText id="alert-dialog-slide-description">
            <h4>Physical Description:</h4>
            <div style={{ "padding-left": "30px" }} dangerouslySetInnerHTML={desc} />
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            <h4>Biology:</h4>
            <div style={{ "padding-left": "30px" }} dangerouslySetInnerHTML={bio} />
            <h4>Habitat:</h4>
           <div style={{ "padding-left": "30px" }}  dangerouslySetInnerHTML={hab} /> 
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}