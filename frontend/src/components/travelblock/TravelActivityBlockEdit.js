import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import GoogleMapSearch from '../common/GoogleMapSearch';
import TimePickerWrapper from '../common/TimePicker';

const useCardStyles = makeStyles({
  card: {
    minWidth: 720,
    maxWidth: 720,
    margin: 10,
    backgroundColor: '#F5DAFC',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TravelActivityBlockEdit(props) {
  const cardClasses = useCardStyles();

  const [startTime, setStartTime] = React.useState(new Date('2030-01-01T09:00:00'));
  const [endTime, setEndTime] = React.useState(new Date('2030-01-01T09:00:00'));

  const handleStartTime = (date) => {
    setStartTime(date);
  };
  const handleEndTime = (date) => {
    setEndTime(date);
  };

  return (
    <Card className={cardClasses.card}>
      {/* <CardHeader
        // title="Transportation"
        id="title"
        subheader={props.title}
      /> */}
      <CardContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container direction="column" justify="space-around">
            <Grid container direction="row" justify="space-around" alignItems="center">
              <GoogleMapSearch searchHandler={props.searchHandler} />
            </Grid>
            <Grid container direction="row" justify="space-around" alignItems="center">
              <TimePickerWrapper
                label="Start Time"
                value={startTime}
                onChange={handleStartTime}
              />
              <TimePickerWrapper
                label="End Time"
                value={endTime}
                onChange={handleEndTime}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  );
}
