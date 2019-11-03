import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';


class PopularTravelOverviewList extends Component {
    state = {
      travelList: [{
        title: 'Seoul Palace Tour',
        author: 'Alice',
        summary: 'Exciting time warp to Chosun Dyasty. Feel the vivid color of Korea.',
        period: '2019.10.01 ~ 2019.10.04',
        likes: 57,
        photo: '/images/1.jpeg',
      },
      {
        title: 'New York Tour',
        author: 'Bob',
        summary: 'IT\'S NEW YORK.',
        period: '2019.01.03 ~ 2019.10.15',
        likes: 30,
        photo: '/images/2.jpeg',
      },
      {
        title: 'Fantasy in Florence',
        author: 'Catherine',
        summary: 'Welcome!',
        period: '2019.07.29 ~ 2019.08.01',
        likes: 19,
        photo: '/images/3.jpeg',
      }],
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
