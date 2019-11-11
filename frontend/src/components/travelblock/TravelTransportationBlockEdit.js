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

import GoogleMapSearch from '../common/GoogleMapSearch';

const useCardStyles = makeStyles({
  card: {
    minWidth: 720,
    maxWidth: 900,
    margin: 10,
    backgroundColor: '#DBFBFF',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function TravelUnitBlockEdit(props) {
  const cardClasses = useCardStyles();

  const [selectedDate0, setSelectedDate0] = React.useState(new Date('2020-01-01T09:00:00'));
  const [selectedDate1, setSelectedDate1] = React.useState(new Date('2020-01-01T09:00:00'));

  const handleDateChange0 = (date) => {
    setSelectedDate0(date);
  };
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };

  const handleDateChangeList = [handleDateChange0, handleDateChange1];
  const selectedDateList = [selectedDate0, selectedDate1];
  const labelList = ['Start Time', 'End Time'];

  const containerId = [0, 1];

  return (
    <Card className={cardClasses.card}>
      {/* <CardHeader
        // title="Transportation"
        subheader="Transportation"
      /> */}

      <CardContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container direction="column" justify="space-around" alignItems="center">
            {containerId.map((i) => {
              return (
                <Grid container direction="row" justify="space-around" alignItems="center" key={i}>
                  <TimePicker
                    margin="normal"
                    id="time-picker"
                    label={labelList[i]}
                    value={selectedDateList[i]}
                    onChange={handleDateChangeList[i]}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                  <GoogleMapSearch searchHandler={props.searchHandler} />
                </Grid>
              );
            })}
          </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  );
}
