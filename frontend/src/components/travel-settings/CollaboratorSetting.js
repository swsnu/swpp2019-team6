import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
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
// function: onAddButtonClicked
const CollaboratorSetting = ({
  collaborators, onAddButtonClicked, history,
}) => {
  const classes = useStyles();

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
            onClick={() => { history.push(`/user/${collaborator.nickname}`); }}
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
        onClick={onAddButtonClicked}
      >
        Add
      </Button>
    </div>
  );
};

export default withRouter(CollaboratorSetting);
