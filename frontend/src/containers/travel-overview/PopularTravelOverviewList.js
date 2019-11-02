import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

class PopularTravelOverviewList extends Component {
    state = {
      travelList: ['Popular 1', 'Popular 2', 'Popular 3'],
    }

    render() {
      return (
        <div className="popularTravelOverview">
          <Typography variant="h4">
            Popular
          </Typography>
          <TravelOverviewList travelList={this.state.travelList} />
        </div>
      );
    }
}

export default PopularTravelOverviewList;
