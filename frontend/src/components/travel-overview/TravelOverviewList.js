import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import TravelOverviewBlock from './TravelOverviewBlock';

const useStyles = makeStyles((theme) => ({

}));

const TravelOverviewList = ({ travelList, is_mypage }) => {
  const classes = useStyles();
  console.log(travelList);

  return (
    <div>
      <div>
        {travelList ? (
          <Grid container spacing={3}>
            {travelList.map((travelOverviewItem, i) => (
              <Grid key={i} item xs={12} md={6}>
                <TravelOverviewBlock
                  key={i}
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

export default withRouter(TravelOverviewList);
