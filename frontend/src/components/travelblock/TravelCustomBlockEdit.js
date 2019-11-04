import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const useCardStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 720,
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

  const [selectedDate0, setSelectedDate0] = React.useState(new Date('2020-01-01T09:00:00'));
  const [selectedDate1, setSelectedDate1] = React.useState(new Date('2020-01-01T09:00:00'));

  const [name, setName] = React.useState('Travel Title');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange0 = (date) => {
    setSelectedDate0(date);
  };
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };

  const handleDateChangeList = [handleDateChange0, handleDateChange1];
  const selectedDateList = [selectedDate0, selectedDate1];

  const containerId = [0, 1];
  const labelList = ['Start Time', 'End Time'];

  return (
    <Card className={cardClasses.card}>
      <CardHeader
        // title="Transportation"
        id="title"
        subheader="Custom"
      />
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
              {containerId.map((i) => {
                return (
                  <TimePicker
                    key={i}
                    margin="normal"
                    id="time-picker"
                    label={labelList[i]}
                    value={selectedDateList[i]}
                    onChange={handleDateChangeList[i]}
                    KeyboardButtonProps={{ 'aria-label': 'change time' }}
                  />
                );
              })}
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  );
}
