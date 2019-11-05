import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import TravelOverviewBlock from './TravelOverviewBlock';

const useStyles = makeStyles((theme) => ({
  travelList: {
    padding: theme.spacing(2),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  addCircleIcon: {
    width: 70,
    height: 70,
    [theme.breakpoints.down('xs')]: {
      width: 50,
      height: 50,
    },
  },
}));

const TravelOverviewList = ({ travelList, is_mypage }) => {
  const classes = useStyles();

  const onCreateButtonClicked = (e) => {
    // console.log('createButtonClicked!');
  };

  return (
    <div>
      <div>
        {is_mypage ? (
          <Grid container style={{ marginBottom: 16 }}>
            <CardActionArea component="button" onClick={onCreateButtonClicked}>
              <Card className="card">
                <div className={classes.cardDetails}>
                  <CardContent align="center">
                    <AddCircleIcon className={classes.addCircleIcon} color="disabled" />
                    <Typography color="textSecondary">
                      CREATE A NEW PLAN!
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </CardActionArea>
          </Grid>
        ) : (
          <span />
        )}
      </div>
      <div>
        {travelList ? (
          <Grid container spacing={3}>
            {travelList.map((travelOverviewItem) => (
              <Grid key={travelOverviewItem.id} item xs={12} md={6}>
                <TravelOverviewBlock
                  key={travelOverviewItem.id}
                  travelOverviewItem={travelOverviewItem}
                  is_mypage={is_mypage}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          'No results were found'
        )}
      </div>
    </div>
  );
};

export default TravelOverviewList;
