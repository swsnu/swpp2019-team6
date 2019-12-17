import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';


import TravelBlockExpandButton from '../common/TravelBlockExpandButton';

const useTextStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: 0,
    marginLeft: theme.spacing(4),
    width: 400,
  },
}));

const useCardStyles = makeStyles((theme) => ({
  card: {
    minWidth: 720,
    maxWidth: 720,
    marginTop: 5,
    marginBottom: 5,
    '&:hover': {
      background: blue[50],
    },
  },
  text: {
    ...theme.typography.button,
    fontSize: 20,
  },
}));

const dateFormat = (datetime) => {
  const dayNames = ['(SUN)', '(MON)', '(TUE)', '(WED)', '(THU)', '(FRI)', '(SAT)'];
  const day = dayNames[datetime.getDay()];
  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  const date = datetime.getDate();

  const now = `${year}/${month}/${date} ${day}`;
  return now;
};

export default function TravelDayBlock(props) {
  const cardClasses = useCardStyles();
  const textClasses = useTextStyles();
  const {
    items, index, handleBlockInfo,
  } = props;
  const { expand, title, datetime } = items[index].info;


  const clickHandler = () => {
    handleBlockInfo(index, 'expand', !expand);
  };

  const handleTitle = (e) => {
    handleBlockInfo(index, 'title', e.target.value);
  };

  return (
    <Card className={cardClasses.card}>
      <CardActions disableSpacing>
        <Typography className={cardClasses.text}>
          {dateFormat(datetime)}
        </Typography>
        {!expand
          ? (
            <Typography className={cardClasses.text}>
              {title}
            </Typography>
          )
          : (
            <TextField
              label="Description"
              className={textClasses.textField}
              margin="normal"
              variant="outlined"
              value={title}
              onChange={handleTitle}
            />
          )}
        <TravelBlockExpandButton expand={expand} clickExpandHandler={clickHandler} />
      </CardActions>
    </Card>
  );
}
