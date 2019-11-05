import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

class RecentTravelOverviewList extends Component {
  state = {
    travelList: [{
      title: 'A',
      author: 'David',
      summary: 'Tortor dignissim convallis aenean et tortor. Euismod lacinia at quis risus sed.',
      period: '2019.10.01 ~ 2019.10.04',
      likes: 57,
      photo: null,
    },
    {
      title: 'B',
      author: 'Emily',
      summary: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
      period: '2019.01.03 ~ 2019.10.15',
      likes: 30,
      photo: '/images/4.jpeg',
    },
    {
      title: 'C',
      author: 'Fred',
      summary: 'Integer quis auctor elit sed vulputate mi sit. Cum sociis natoque penatibus et magnis dis parturient montes nascetur.',
      period: '2019.07.29 ~ 2019.08.01',
      likes: 19,
      photo: '/images/5.jpeg',
    },
    {
      title: 'D',
      author: 'George',
      summary: 'Habitasse platea dictumst vestibulum rhoncus est pellentesque.',
      period: '2019.10.01 ~ 2019.10.04',
      likes: 57,
      photo: '/images/6.jpeg',
    },
    {
      title: 'E',
      author: 'Harry',
      summary: 'Et leo duis ut diam quam.',
      period: '2019.01.03 ~ 2019.10.15',
      likes: 30,
      photo: null,
    },
    {
      title: 'F',
      author: 'Catherine',
      summary: 'Ac tortor vitae purus faucibus. Odio eu feugiat pretium nibh ipsum.',
      period: '2019.07.29 ~ 2019.08.01',
      likes: 19,
      photo: '/images/7.jpeg',
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
