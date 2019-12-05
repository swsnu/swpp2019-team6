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
  header: {
    ...theme.typography.button,
    fontSize: 18,
    marginLeft: theme.spacing(3),
    color: blue[200],
  },
  text: {
    ...theme.typography.button,
    fontSize: 18,
    marginLeft: theme.spacing(3),
  },
}));


export default function TravelActivityBlockView(props) {
  const cardClasses = useCardStyles();

  const {
    title,
    description,
    start_location,
    end_location,
    time,
    block_type,
  } = props.item;

  let header;
  switch (block_type) {
    case 'CUS':
      header = 'CUSTOM';
      break;
    case 'ACT':
      header = 'ACTIVITY';
      break;
    case 'ACM':
      header = 'ACCOMODATION';
      break;
    case 'TRN':
      header = 'TRANSPORTATION';
      break;
    case 'RST':
      header = 'RESTAURANT';
      break;
    default:
      header = 'UNDEFINDED';
  }

  return (
    <Card className={cardClasses.card}>
      <CardActions disableSpacing>
        <Typography className={cardClasses.header}>
          {header}
        </Typography>
        <Typography className={cardClasses.text}>
          {time}
        </Typography>
        <Typography className={cardClasses.text}>
          {title}
        </Typography>
        <Typography className={cardClasses.text}>
          {description}
        </Typography>
        <Typography className={cardClasses.text}>
          {start_location}
        </Typography>
        <Typography className={cardClasses.text}>
          {end_location}
        </Typography>
      </CardActions>
    </Card>
  );
}
