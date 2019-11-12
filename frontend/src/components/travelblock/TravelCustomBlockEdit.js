import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import TimePickerWrapper from '../common/TimePicker';

const useCardStyles = makeStyles({
  card: {
    minWidth: 720,
    maxWidth: 720,
    margin: 10,
    backgroundColor: '#FFFBD2',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const useTextStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));

export default function TravelActivityBlockEdit(props) {
  const cardClasses = useCardStyles();
  const textClasses = useTextStyles();

  const [name, setName] = React.useState('Travel Title');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const [startDate, setStartDate] = React.useState(new Date('2020-01-01T09:00:00'));
  const [endDate, setEndDate] = React.useState(new Date('2020-01-01T09:00:00'));

  const handleStartDate = (date) => {
    setStartDate(date);
  };
  const handleEndDate = (date) => {
    setEndDate(date);
  };

  return (
    <Card className={cardClasses.card}>
      {/* <CardHeader
        // title="Transportation"
        id="title"
        subheader="Custom"
      /> */}
      <CardContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container direction="column" justify="space-around">
            <Grid container direction="row" justify="space-around" alignItems="center">
              <FormControl className={textClasses.formControl}>
                <InputLabel htmlFor="component-title">Title</InputLabel>
                <Input id="component-title" value={name} onChange={handleChange} />
              </FormControl>
            </Grid>
            <Grid container direction="row" justify="space-around" alignItems="center">
              <TimePickerWrapper
                label="Start Time"
                value={startDate}
                onChange={handleStartDate}
              />
              <TimePickerWrapper
                label="End Time"
                value={endDate}
                onChange={handleEndDate}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  );
}
