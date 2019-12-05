import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

/*
 * Wrapper of expand button in travel block
 */
export default function TravelBlockExpandButton(props) {
  const classes = useStyles();
  return (
    <IconButton
      className={clsx(classes.expand, {
        [classes.expandOpen]: props.expand,
      })}
      onClick={props.clickExpandHandler}
      aria-expanded={props.expand}
      aria-label="show more"
    >
      <ExpandMoreIcon />
    </IconButton>
  );
}
