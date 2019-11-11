import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TimePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

/*
 * Wrapper of material-ui TimePicker
 */
export default function TimePickerWrapper(props) {
  const classes = useStyles();

  return (
    <TimePicker
      className={classes.root}
      id="time-picker"
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      KeyboardButtonProps={{ 'aria-label': 'change time' }}
    />
  );
}
