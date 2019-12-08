import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import TravelOverviewBlock from '../../components/travel-overview/TravelOverviewBlock';

const tempTravel = {
  id: 1,
  head: {
    title: 'Pharetra diam sit amet nisl',
    author: 'Alice',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
    start_date: '2019.10.01',
    end_date: '2019.10.12',
  },
  likes: [1, 2],
  collaborators: [3, 4],
  photo: '/images/1.jpeg',
};


class OneTravelOverview extends Component {
  // have to retrieve travel by using this.props.travelId
  state = {
    travel: tempTravel,
  }

  render() {
    return (
      <div className="oneTravelOverview">
        <TravelOverviewBlock
          travelOverviewItem={this.state.travel}
          is_mypage={false}
        />
        {this.props.travelId}
      </div>
    );
  }
}

export default OneTravelOverview;
