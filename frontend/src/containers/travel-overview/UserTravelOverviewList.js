import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

const tempTravelList = [{
  title: 'Seoul Palace Tour 22 JSADFJE JAEFJAWE',
  author: 'Alice',
  summary: 'Exciting time warp to Chosun Dyasty. Feel the vivid color of Korea.afefas dfawefaw efawfawe faw',
  period: '2019.10.01 ~ 2019.10.04',
  likes: 57,
  photo: '/images/1.jpeg',
  is_public: false,
  allow_comment: false,
  is_forked: false,
  collaborators: ['iluvswpp'],
},
{
  title: 'B',
  author: 'Bob',
  summary: 'IT\'S NEW YORK.',
  period: '2019.01.03 ~ 2019.10.15',
  likes: 30,
  photo: '/images/2.jpeg',
  is_public: true,
  allow_comment: true,
  is_forked: false,
  collaborators: ['iluvswpp'],
},
{
  title: 'C',
  author: 'Catherine',
  summary: 'Welcome!',
  period: '2019.07.29 ~ 2019.08.01',
  likes: 19,
  photo: '/images/3.jpeg',
  is_public: true,
  allow_comment: false,
  is_forked: false,
  collaborators: ['iluvswpp'],
},
{
  title: 'D',
  author: 'Alice',
  summary: 'Exciting time warp to Chosun Dyasty. Feel the vivid color of Korea.',
  period: '2019.10.01 ~ 2019.10.04',
  likes: 57,
  photo: '/images/1.jpeg',
  is_public: false,
  allow_comment: false,
  is_forked: true,
  collaborators: ['iluvswpp', 'tom', 'mei'],
},
];

const emptyTravelList = [];

// somehow determine whether this page is of current user or not.
const is_mypage = true;

class UserTravelOverviewList extends Component {
  state = {
    travelList: tempTravelList,
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: 24 }} />
        {this.state.travelList.length ? (
          <div className="userTravelOverview">
            <TravelOverviewList travelList={this.state.travelList} is_mypage={is_mypage} />
            <Divider style={{ margin: 8 }} />
          </div>
        ) : (
          <Typography align="center" color="textSecondary" variant="h5" style={{ marginTop: 24 }}>
            Make your first plan for a travel, {this.props.nickname}!
          </Typography>
        )}
      </div>
    );
  }
}

export default UserTravelOverviewList;
