import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { blue } from '@material-ui/core/colors';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';

import GoogleMapSearch from '../common/GoogleMapSearch';
import TimePickerWrapper from '../common/TimePicker';
import TravelBlockCloseButton from '../common/TravelBlockCloseButton';
import TravelBlockExpandButton from '../common/TravelBlockExpandButton';


const useCardStyles = makeStyles((theme) => ({
  card: {
    minWidth: 720,
    maxWidth: 720,
    '&:hover': {
      background: blue[50],
    },
  },
  remove: {
    marginLeft: 'auto',
  },
  header: {
    marginLeft: theme.spacing(1),
  },
}));

const useTextStyles = makeStyles((theme) => ({
  textField: {
    margin: 0,
    marginLeft: theme.spacing(2),
    marginButtom: theme.spacing(1),
    width: 500,
  },
}));


export default function TravelUnitBlockEdit(props) {
  const cardClasses = useCardStyles();
  const textClasses = useTextStyles();
  const {
    items, index, handleRemove, handleBlockInfo,
  } = props;
  const {
    expand, title, description, startTime, endTime, startPoint, endPoint,
  } = items[index].info;

  const handleStartPoint = (point) => {
    handleBlockInfo(index, 'startPoint', point);
  };

  // const handleEndPoint = (point) => {
  //   handleBlockInfo(index, 'endPoint', point);
  // };

  const handleStartTime = (date) => {
    handleBlockInfo(index, 'startTime', date);
  };

  const handleEndTime = (date) => {
    handleBlockInfo(index, 'endTime', date);
  };

  const removeHandler = () => {
    handleRemove(index);
  };

  const clickExpandHandler = () => {
    handleBlockInfo(index, 'expand', !expand);
  };

  const handleDescription = (e) => {
    handleBlockInfo(index, 'description', e.target.value);
  };

  const handleTitle = (e) => {
    handleBlockInfo(index, 'title', e.target.value);
  };

  return (
    <Card className={cardClasses.card}>
      <CardActions disableSpacing>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid contianer direction="col">
            <Grid container>
              <TextField
                id="standard-multiline-flexible"
                label="Title"
                rowsMax="4"
                value={title}
                onChange={handleTitle}
                className={textClasses.textField}
              />
            </Grid>
            <Grid container direction="row" className={cardClasses.header}>
              <TimePickerWrapper
                label="Start Time"
                value={startTime}
                onChange={handleStartTime}
              />
              <GoogleMapSearch value={startPoint} searchHandler={handleStartPoint} />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
        <TravelBlockExpandButton expand={expand} clickExpandHandler={clickExpandHandler} />
        <TravelBlockCloseButton removeHandler={removeHandler} />
      </CardActions>
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <CardContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container direction="row">
              <TimePickerWrapper
                label="End Time"
                value={endTime}
                onChange={handleEndTime}
              />
              <GoogleMapSearch value={endPoint} searchHandler={props.searchHandler} />
            </Grid>
          </MuiPickersUtilsProvider>
          <TextField
            id="standard-multiline-flexible"
            label="Description"
            multiline
            rowsMax="4"
            value={description}
            onChange={handleDescription}
            className={textClasses.textField}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
