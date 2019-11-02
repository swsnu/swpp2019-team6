import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import TravelOverviewBlock from './TravelOverviewBlock';

const useStyles = makeStyles((theme) => ({
  travelList: {
    padding: theme.spacing(2),
  },
}));

const TravelOverviewList = ({ travelList }) => {
  const classes = useStyles();

  return (
    <div>
      {travelList ? (
        <Grid container spacing={2}>
          {travelList.map((travelOverviewItem) => (
            <Grid key={travelOverviewItem.id} item xs={12} sm={6} lg={4}>
              <TravelOverviewBlock travelOverviewItem={travelOverviewItem} />
            </Grid>
          ))}
        </Grid>
      ) : (
        'No Contents found'
      )}
    </div>
  );
};

export default TravelOverviewList;
