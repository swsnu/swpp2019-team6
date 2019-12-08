import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  leftMargin: {
    marginLeft: theme.spacing(1),
  },
  allMargin: {
    margin: theme.spacing(1),
  },
}));

// props
// data: collaborators(list)
// function: onAddButtonClicked, onCollaboratorFieldChanged
// input field: collaborator_field
const CollaboratorSetting = ({
  collaborators, onAddButtonClicked, collaborator_field, onCollaboratorFieldChanged,history,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="h5" align="left" color="textPrimary" style={{ marginTop: 16, marginLeft: 8 }}>
          Collaborators
      </Typography>
      <Typography variant="subtitle1" align="left" color="textSecondary" style={{ paddingLeft: 8 }}>
        {collaborators.length} users
      </Typography>
      <div>
        {collaborators.map((collaborator, i) => (
          <ButtonBase
            key={i}
            onClick={() => { history.push(`/user/${collaborator.id}`); }}
            className={classes.leftMargin}
          >
            <Typography variant="body1" align="left" display="inline" color="primary" key={i}>
                @{collaborator.nickname}
            </Typography>
          </ButtonBase>
        ))}
      </div>
      <Button
        size="medium"
        variant="contained"
        color="secondary"
        className={classes.allMargin}
        onClick={handleClickOpen}
      >
        Add
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Collaborators</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a user&apos;s nickname you want to add as a new collaborator.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nickname"
            label="Nickname"
            value={collaborator_field}
            onChange={onCollaboratorFieldChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { handleClose(); onAddButtonClicked(); }} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withRouter(CollaboratorSetting);
