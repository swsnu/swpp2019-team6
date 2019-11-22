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
import TimePickerWrapper from '../common/TimePicker';

const useCardStyles = makeStyles({
  card: {
    minWidth: 720,
    maxWidth: 900,
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
        subheader="Transportation"
      /> */}

      <CardContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container direction="column" justify="space-around" alignItems="center">
            <Grid container direction="row" justify="space-around" alignItems="center">
              <TimePickerWrapper
                label="Start Time"
                value={startDate}
                onChange={handleStartDate}
              />
              <GoogleMapSearch searchHandler={props.searchHandler} />
            </Grid>
            <Grid container direction="row" justify="space-around" alignItems="center">
              <TimePickerWrapper
                label="End Time"
                value={endDate}
                onChange={handleEndDate}
              />
              <GoogleMapSearch searchHandler={props.searchHandler} />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  );
}
