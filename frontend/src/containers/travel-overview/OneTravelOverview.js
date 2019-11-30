import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import TravelOverviewBlock from '../../components/travel-overview/TravelOverviewBlock';

const tempTravel = {
  title: 'Pharetra diam sit amet nisl',
  author: 'Alice',
  summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
  period: '2019.10.01 ~ 2019.10.04',
  likes: 57,
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
      </div>
    );
  }
}

export default OneTravelOverview;
