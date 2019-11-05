import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    height: 240,
    '@media (max-width:600px)': {
      height: 180,
    },
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    objectFit: 'cover',
    width: 160,
    height: 240,
  },
}));

// travelOverviewItem(.title .author .summary .period .likes .photo)
// is_mypage: should detailed option be shown?
const TravelOverviewBlock = ({ travelOverviewItem, is_mypage }) => {
  const classes = useStyles();

  // Have to change onCardClicked to make a link to its detail page
  const onCardClicked = (e) => {
    // console.log('onCardClicked!');
  };

  return (
    <div>
      {travelOverviewItem ? (
        <CardActionArea component="button" onClick={onCardClicked}>
          <Card className={classes.card}>
            {/* For image */}
            {travelOverviewItem.photo ? (
              <Hidden xsDown>
                <CardMedia
                  component="img"
                  className={classes.cardMedia}
                  image={travelOverviewItem.photo}
                  title={travelOverviewItem.title}
                />
              </Hidden>
            ) : (null)}
            <div className={classes.cardDetails}>
              <CardContent align="left">
                <Typography component="h2" variant="h5" gutterBottom>
                  {travelOverviewItem.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {travelOverviewItem.period}
                </Typography>
                <Typography variant="subtitle2" color="primary" display="inline">
                  by {travelOverviewItem.author}
                </Typography>
                <Typography display="inline">
                  {' '}| {travelOverviewItem.likes} likes
                </Typography>
                <Typography paragraph variant="body1">
                  {travelOverviewItem.summary}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </CardActionArea>
      ) : null}
    </div>
  );
};

export default TravelOverviewBlock;
