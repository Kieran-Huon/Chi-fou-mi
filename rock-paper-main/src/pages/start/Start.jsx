import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Modal,
  Slide,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { errorToast, successToast } from '../../utils/toast';
import './Start.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
const Start = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <div className='startAppContainer'>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{''}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure you want to create the game
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              if (localStorage.getItem('user')) {
                const user = JSON.parse(localStorage.getItem('user'));
                api
                  .post('/matches', user)
                  .then((res) => {
                    successToast(res.data.message);
                    navigate(`/matches/${res.data.data._id}/play`);
                  })
                  .catch((err) => {
                    console.log(err);
                    errorToast(err?.response?.data.message);
                  });
              }
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        onClick={() => {
          navigate('/matches');
        }}
        variant='contained'
      >
        See all your matches
      </Button>
      <Button variant='contained' onClick={() => setOpen(true)}>
        Create Matches
      </Button>
    </div>
  );
};

export default Start;
