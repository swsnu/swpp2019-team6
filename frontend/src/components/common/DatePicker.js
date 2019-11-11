import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));

/*
 * Wrapper of material-ui DatePicker
 */
export default function DatePickerWrapper(props) {
  const classes = useStyles();

  return (
    <DatePicker
      disableToolbar
      className={classes.formControl}
      variant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      id="date-picker-inline"
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      KeyboardButtonProps={{ 'aria-label': 'change date' }}
    />
  );
}
