import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

import * as actionCreators from '../../store/actions/index';

const tempTravelList = [{
  title: 'Ante metus dictum at tempor commodo ullamcorper a lacus',
  author: 'Jason',
  summary: 'Fringilla ut morbi tincidunt augue interdum velit euismod.',
  period: '2019.02.04 ~ 2019.02.06',
  likes: 41,
  photo: '/images/5.jpeg',
},
{
  title: 'Eros in cursus turpis massa tincidunt',
  author: 'Kacey',
  summary: 'Elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Id venenatis a condimentum vitae sapien pellentesque habitant.',
  period: '2019.11.03 ~ 2019.11.10',
  likes: 28,
  photo: null,
},
{
  title: 'Euismod quis viverra nibh cras',
  author: 'Lucy',
  summary: 'Sem nulla pharetra diam sit amet nisl suscipit. Lacus vestibulum sed arcu non.',
  period: '2019.12.23 ~ 2019.12.25',
  likes: 24,
  photo: '/images/7.jpeg',
},
{
  title: 'Mus mauris vitae ultricies leo integer',
  author: 'Matthew',
  summary: 'Eu sem integer vitae justo eget magna fermentum iaculis.',
  period: '2019.05.03 ~ 2019.05.05',
  likes: 15,
  photo: '/images/9.jpeg',
},
{
  title: 'Turpis tincidunt id aliquet risus. Congue eu consequat ac felis',
  author: 'Nicolas',
  summary: 'Ultricies tristique nulla aliquet enim tortor at. Tortor pretium viverra suspendisse potenti nullam.',
  period: '2019.07.25 ~ 2019.08.01',
  likes: 9,
  photo: '/images/10.jpeg',
},
{
  title: 'Ridiculus mus mauris vitae',
  author: 'Olivia',
  summary: 'Ac tortor vitae purus faucibus. Odio eu feugiat pretium nibh ipsumi.',
  period: '2019.07.29 ~ 2019.08.01',
  likes: 6,
  photo: null,
}];

class RecentTravelOverviewList extends Component {
  componentDidMount() {
    this.props.onGetRecentTravels();
  }

  render() {
    return (
      <div className="recentTravelOverview">
        <Typography variant="h4" gutterBottom align="left" color="primary" style={{ marginTop: 8, padding: 16 }}>
            Recent
        </Typography>
        <TravelOverviewList travelList={this.props.recentTravels} is_mypage={false} />
        <Divider style={{ margin: 8 }} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRecentTravels: () => dispatch(actionCreators.getRecentTravels()),

  };
};

const mapStateToProps = (state) => {
  return {
    recentTravels: state.travel.recentTravels,

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RecentTravelOverviewList);
