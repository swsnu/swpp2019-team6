import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

import * as actionCreators from '../../store/actions/index';

const tempTravelList = [{
  title: 'Pharetra diam sit amet nisl',
  author: 'Alice',
  summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
  period: '2019.10.01 ~ 2019.10.04',
  likes: 57,
  photo: '/images/1.jpeg',
},
{
  title: 'Imperdiet dui accumsan sit amet nulla facilisi',
  author: 'Bob',
  summary: 'Sagittis orci a scelerisque purus semper eget. Sed felis eget velit aliquet sagittis id consectetur. Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales.',
  period: '2019.02.03 ~ 2019.02.15',
  likes: 30,
  photo: '/images/2.jpeg',
},
{
  title: 'Arcu dui vivamus arcu felis bibendum ut',
  author: 'Catherine',
  summary: 'Sed ullamcorper morbi tincidunt ornare massa. Velit euismod in pellentesque massa placerat duis ultricies lacus.',
  period: '2019.07.29 ~ 2019.08.01',
  likes: 19,
  photo: '/images/3.jpeg',
}];

class PopularTravelOverviewList extends Component {
  componentDidMount() {
    this.props.onGetPopularTravels();
  }

  render() {
    return (
      <div className="popularTravelOverview">
        <Typography variant="h4" align="left" color="primary" style={{ marginTop: 8, padding: 16 }}>
            Popular
        </Typography>
        <TravelOverviewList travelList={this.props.popularTravels} is_mypage={false} />
        <Divider style={{ margin: 8 }} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPopularTravels: () => dispatch(actionCreators.getPopularTravels()),

  };
};

const mapStateToProps = (state) => {
  return {
    popularTravels: state.travel.popularTravels,

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PopularTravelOverviewList);
