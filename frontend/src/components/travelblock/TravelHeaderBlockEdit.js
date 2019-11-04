import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
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

export default function TravelHeaderBlockEdit() {
  const cardClasses = useCardStyles();
  const textClasses = useTextStyles();

  const [selectedDate0, setSelectedDate0] = React.useState(new Date().getTime());
  const [selectedDate1, setSelectedDate1] = React.useState(new Date().getTime());

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
  const labelList = ['Start Date', 'End Date'];

  return (
    <Card className={cardClasses.card}>
      {/* <CardHeader
        // title="Transportation"
        id="title"
        subheader="Travel"
      /> */}
      <CardContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container direction="row" justify="space-around" alignItems="base-line">
            <Grid item>
              <FormControl className={textClasses.formControl}>
                <InputLabel htmlFor="component-title">Title</InputLabel>
                <Input id="component-title" value={name} onChange={handleChange} />
              </FormControl>
            </Grid>
            <Grid item>
              {containerId.map((i) => {
                return (
                  <DatePicker
                    key={i}
                    disableToolbar
                    className={textClasses.formControl}
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label={labelList[i]}
                    value={selectedDateList[i]}
                    onChange={handleDateChangeList[i]}
                    KeyboardButtonProps={{ 'aria-label': 'change date' }}
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
