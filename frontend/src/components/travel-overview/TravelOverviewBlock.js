import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
}));

const TravelOverviewBlock = ({ travelOverviewItem }) => {
  const classes = useStyles();

  return (
    <div>
      {travelOverviewItem ? (
        <CardActionArea component="a" href="#">
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {travelOverviewItem}
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
