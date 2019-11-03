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

const TravelOverviewBlock = ({ travelOverviewItem }) => {
  const classes = useStyles();

  return (
    <div>
      {travelOverviewItem ? (
        <CardActionArea component="a" href="#">
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
              <CardContent>
                <Typography component="h2" variant="h5">
                  {travelOverviewItem.title}
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
