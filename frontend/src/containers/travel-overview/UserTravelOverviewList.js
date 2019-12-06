import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { push } from 'connected-react-router';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

const tempTravelList = [{
  title: 'Curabitur gravida arcu ac tortor dignissim',
  author: 'iluvswpp',
  summary: 'Habitasse platea dictumst quisque sagittis. Mattis aliquam faucibus purus in massa tempor nec feugiat.',
  period: '2019.10.01 ~ 2019.10.04',
  likes: 57,
  photo: '/images/8.jpeg',
  is_public: false,
  allow_comment: false,
  is_forked: false,
  collaborators: ['iluvswpp'],
},
{
  title: 'Quis viverra nibh cras pulvinar mattis',
  author: 'iluvswpp',
  summary: 'Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Pellentesque pulvinar pellentesque habitant morbi tristique.',
  period: '2019.01.03 ~ 2019.10.15',
  likes: 30,
  photo: '/images/9.jpeg',
  is_public: true,
  allow_comment: true,
  is_forked: false,
  collaborators: ['iluvswpp'],
},
{
  title: 'Velit aliquet sagittis id consectetur purus ut',
  author: 'iluvswpp',
  summary: 'Eget mauris pharetra et ultrices neque ornare. Faucibus et molestie ac feugiat sed lectus vestibulum.',
  period: '2019.07.29 ~ 2019.08.01',
  likes: 19,
  photo: '/images/10.jpeg',
  is_public: true,
  allow_comment: false,
  is_forked: false,
  collaborators: ['iluvswpp'],
},
{
  title: 'Ultricies lacus sed turpis tincidunt',
  author: 'iluvswpp',
  summary: 'Pharetra magna ac placerat vestibulum lectus. Pretium viverra suspendisse potenti nullam ac..',
  period: '2019.03.04 ~ 2019.03.08',
  likes: 7,
  photo: '/images/11.jpeg',
  is_public: false,
  allow_comment: false,
  is_forked: true,
  collaborators: ['iluvswpp', 'Alice', 'George'],
},
];

const emptyTravelList = [];

// somehow determine whether this page is of current user or not.
const is_mypage = true;

class UserTravelOverviewList extends Component {
  state = {
    travelList: [],
  }

  handleClickCreate = (e) => {
    this.props.history.push('/travel/create/');
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
        <Grid container alignItems="center" direction="column" justify="space-around">
          <Button variant="contained" color="secondary" onClick={this.handleClickCreate}>
            Create
          </Button>
        </Grid>
      </div>
    );
  }
}

export default withRouter(UserTravelOverviewList);
