import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import TravelOverviewBlock from './TravelOverviewBlock';

const useStyles = makeStyles((theme) => ({
  travelList: {
    padding: theme.spacing(2),
  },
}));

const TravelOverviewList = ({ travelList, is_mypage }) => {
  const classes = useStyles();

  return (
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
  );
};

export default TravelOverviewList;
