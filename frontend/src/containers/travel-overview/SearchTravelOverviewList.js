import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

class SearchTravelOverviewList extends Component {
  state = {
    travelList: [{
      title: 'A',
      author: 'Alice',
      summary: 'Exciting time warp to Chosun Dyasty. Feel the vivid color of Korea.',
      period: '2019.10.01 ~ 2019.10.04',
      likes: 57,
      photo: '/images/1.jpeg',
    },
    {
      title: 'B',
      author: 'Bob',
      summary: 'IT\'S NEW YORK.',
      period: '2019.01.03 ~ 2019.10.15',
      likes: 30,
      photo: '/images/2.jpeg',
    },
    {
      title: 'C',
      author: 'Catherine',
      summary: 'Welcome!',
      period: '2019.07.29 ~ 2019.08.01',
      likes: 19,
      photo: '/images/3.jpeg',
    },
    {
      title: 'D',
      author: 'Alice',
      summary: 'Exciting time warp to Chosun Dyasty. Feel the vivid color of Korea.',
      period: '2019.10.01 ~ 2019.10.04',
      likes: 57,
      photo: '/images/1.jpeg',
    },
    {
      title: 'E',
      author: 'Bob',
      summary: 'IT\'S NEW YORK.',
      period: '2019.01.03 ~ 2019.10.15',
      likes: 30,
      photo: '/images/2.jpeg',
    },
    {
      title: 'F',
      author: 'Catherine',
      summary: 'Welcome!',
      period: '2019.07.29 ~ 2019.08.01',
      likes: 19,
      photo: '/images/3.jpeg',
    }],
  }
  // query keyword will be served in this.props.tag
  // need to make function that gets query result form DB,
  // and store resulting list in state.travelList

  render() {
    return (
      <div>
        {this.props.tag ? (
          <div className="SearchTravelOverview">
            <Typography variant="h4" gutterBottom align="left" color="textPrimary" style={{ marginTop: 8, padding: 16 }}>
              Result for #{this.props.tag}
            </Typography>
            <TravelOverviewList travelList={this.state.travelList} />
            <Divider style={{ margin: 8 }} />
          </div>
        ) : (
          <Typography variant="h4" style={{ marginTop: 8, padding: 16 }}>
            No search tag
          </Typography>
        )}
      </div>
    );
  }
}

export default SearchTravelOverviewList;
