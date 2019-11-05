import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

class RecentTravelOverviewList extends Component {
  state = {
    travelList: [{
      title: 'A',
      author: 'Alice',
      summary: 'Exciting time warp to Chosun Dyasty. Feel the vivid color of Korea.',
      period: '2019.10.01 ~ 2019.10.04',
      likes: 57,
      photo: null,
    },
    {
      title: 'B',
      author: 'Bob',
      summary: 'IT\'S NEW YORK.',
      period: '2019.01.03 ~ 2019.10.15',
      likes: 30,
      photo: null,
    },
    {
      title: 'C',
      author: 'Catherine',
      summary: 'Welcome!',
      period: '2019.07.29 ~ 2019.08.01',
      likes: 19,
      photo: null,
    },
    {
      title: 'D',
      author: 'Alice',
      summary: 'Exciting time warp to Chosun Dyasty. Feel the vivid color of Korea.',
      period: '2019.10.01 ~ 2019.10.04',
      likes: 57,
      photo: null,
    },
    {
      title: 'E',
      author: 'Bob',
      summary: 'IT\'S NEW YORK.',
      period: '2019.01.03 ~ 2019.10.15',
      likes: 30,
      photo: null,
    },
    {
      title: 'F',
      author: 'Catherine',
      summary: 'Welcome!',
      period: '2019.07.29 ~ 2019.08.01',
      likes: 19,
      photo: null,
    }],
  }

  render() {
    return (
      <div className="recentTravelOverview">
        <Typography variant="h4" gutterBottom align="left" color="textPrimary" style={{ marginTop: 8, padding: 16 }}>
            Recent
        </Typography>
        <TravelOverviewList travelList={this.state.travelList} is_mypage={false} />
        <Divider style={{ margin: 8 }} />
      </div>
    );
  }
}

export default RecentTravelOverviewList;
