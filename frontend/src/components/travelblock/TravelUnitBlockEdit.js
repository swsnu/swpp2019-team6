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

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

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

const useMapStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function TravelUnitBlockEdit(props) {
  const cardClasses = useCardStyles();
  const mapClasses = useMapStyles();

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

  const containerId = [0, 1];

  return (
    <Card className={cardClasses.card}>
      <CardHeader
        // title="Transportation"
        subheader="Transportation"
      />

      <CardContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container direction="column" justify="space-around" alignItems="center">
            {containerId.map((i) => {
              return (
                <Grid container direction="row" justify="space-around" alignItems="center" key={i}>
                  <TimePicker
                    margin="normal"
                    id="time-picker"
                    label="Start Time"
                    value={selectedDateList[i]}
                    onChange={handleDateChangeList[i]}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                  <Paper className={mapClasses.root}>
                    <IconButton className={mapClasses.iconButton} aria-label="menu">
                      <MenuIcon />
                    </IconButton>
                    <InputBase
                      className={mapClasses.input}
                      placeholder="Search Google Maps"
                      inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton
                      className={mapClasses.iconButton}
                      id="search"
                      aria-label="search"
                      onClick={() => props.searchHandler()}
                    >
                      <SearchIcon />
                    </IconButton>
                    <Divider className={mapClasses.divider} orientation="vertical" />
                    <IconButton color="primary" className={mapClasses.iconButton} aria-label="directions">
                      <DirectionsIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  );
}
