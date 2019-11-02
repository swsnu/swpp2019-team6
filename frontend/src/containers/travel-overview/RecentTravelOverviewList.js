import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

class RecentTravelOverviewList extends Component {
    state = {
      travelList: ['Recent 1', 'Recent 2', 'Recent 3', 'Recent 4', 'Recent 5', 'Recent 6'],
    }

    render() {
      return (
        <div className="recentTravelOverview">
          <Typography variant="h4">
            Recent
          </Typography>
          <TravelOverviewList travelList={this.state.travelList} />
        </div>
      );
    }
}

export default RecentTravelOverviewList;
