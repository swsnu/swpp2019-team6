import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';


class SearchTravelOverviewList extends Component {
  state = {
    travelList: [],
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
              Results for #{this.props.tag}
            </Typography>
            <TravelOverviewList travelList={this.state.travelList} is_mypage={false} />
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
