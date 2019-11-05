import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

class PopularTravelOverviewList extends Component {
    state = {
      travelList: [{
        title: 'Seoul City Tour',
        author: 'Alice',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
        period: '2019.10.01 ~ 2019.10.04',
        likes: 57,
        photo: '/images/1.jpeg',
      },
      {
        title: 'New York, it\'s NEW YORK!',
        author: 'Bob',
        summary: 'Felis donec et odio pellentesque diam volutpat.',
        period: '2019.02.03 ~ 2019.02.15',
        likes: 30,
        photo: '/images/2.jpeg',
      },
      {
        title: '3 days in Ha Noi',
        author: 'Catherine',
        summary: 'Non pulvinar neque laoreet suspendisse interdum consectetur.',
        period: '2019.07.29 ~ 2019.08.01',
        likes: 19,
        photo: '/images/3.jpeg',
      }],
    }

    render() {
      return (
        <div className="popularTravelOverview">
          <Typography variant="h4" gutterBottom align="left" color="textPrimary" style={{ marginTop: 8, padding: 16 }}>
            Popular
          </Typography>
          <TravelOverviewList travelList={this.state.travelList} is_mypage={false} />
          <Divider style={{ margin: 8 }} />
        </div>
      );
    }
}

export default PopularTravelOverviewList;
