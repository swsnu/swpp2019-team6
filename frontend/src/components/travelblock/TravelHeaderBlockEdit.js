import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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

import DatePickerWrapper from '../common/DatePicker';

const useCardStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 720,
    margin: 10,
    backgroundColor: '#83BFFF',
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

export default function TravelHeaderBlockEdit() {
  const cardClasses = useCardStyles();
  const textClasses = useTextStyles();

  const [startDate, setStartDate] = React.useState(new Date().getTime());
  const [endDate, setEndDate] = React.useState(new Date().getTime());

  const [name, setName] = React.useState('Travel Title');

  const handleChange = (event) => {
    setName(event.target.value);
  };

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
        subheader="Travel"
      /> */}
      <CardContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container direction="row" justify="space-around" alignItems="baseline">
            <Grid item>
              <FormControl className={textClasses.formControl}>
                <InputLabel htmlFor="component-title">Title</InputLabel>
                <Input id="component-title" value={name} onChange={handleChange} />
              </FormControl>
            </Grid>
            <Grid item>
              <DatePickerWrapper
                label="Start Date"
                value={startDate}
                onChange={handleStartDate}
              />
              <DatePickerWrapper
                label="End Date"
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
