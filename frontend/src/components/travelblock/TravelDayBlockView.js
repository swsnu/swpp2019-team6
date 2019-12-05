import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';


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
    marginLeft: theme.spacing(2),
    fontSize: 16,
  },
}));


export default function TravelDayBlock(props) {
  const cardClasses = useCardStyles();

  const { title, day } = props.item;

  return (
    <Card className={cardClasses.card}>
      <CardActions disableSpacing>
        <Typography className={cardClasses.text}>
          {day}
        </Typography>
        <Typography className={cardClasses.text}>
          {title}
        </Typography>
      </CardActions>
    </Card>
  );
}
