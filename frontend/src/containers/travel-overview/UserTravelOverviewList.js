import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

const tempTravelList = [{
  head: {
    title: 'Curabitur gravida arcu ac tortor dignissim',
    summary: 'Habitasse platea dictumst quisque sagittis. Mattis aliquam faucibus purus in massa tempor nec feugiat.',
    start_date: '2019-10-01',
    end_date: '2019-10-04',
    photo: '/images/8.jpeg',
  },
  author: 3,
  likes: 57,
  is_public: false,
  allow_comments: false,
  fork_parent: null,
  collaborators: [],
},
{
  author: 3,
  head: {
    title: 'Quis viverra nibh cras pulvinar mattis',
    summary: 'Magnis dis parturients vitae. Pellentesque habitant morbi tristique.',
    start_date: '2019-01-03',
    end_date: '2019-10-15',
    photo: '/images/9.jpeg',

  },
  likes: 30,
  is_public: true,
  allow_comments: true,
  fork_parent: null,
  collaborators: [1],
},

// {
//   title: 'Velit aliquet sagittis id consectetur purus ut',
//   author: 'iluvswpp',
//   summary: 'Eget mauris pharetra et feugiat sed lectus vestibulum.',
//   period: '2019.07.29 ~ 2019.08.01',
//   likes: 19,
//   photo: '/images/10.jpeg',
//   is_public: true,
//   allow_comment: false,
//   is_forked: false,
//   collaborators: ['iluvswpp'],
// },
// {
//   title: 'Ultricies lacus sed turpis tincidunt',
//   author: 'iluvswpp',
//   summary: 'Pharetra magna suspendisse potenti nullam ac..',
//   period: '2019.03.04 ~ 2019.03.08',
//   likes: 7,
//   photo: '/images/11.jpeg',
//   is_public: false,
//   allow_comment: false,
//   is_forked: true,
//   collaborators: ['iluvswpp', 'Alice', 'George'],
// },
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
