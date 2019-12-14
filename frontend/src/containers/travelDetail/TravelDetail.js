import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import * as actionCreators from '../../store/actions/index';
import TravelDayBlockView from '../../components/travelblock/TravelDayBlockView';
import TravelActivityBlockView from '../../components/travelblock/TravelActivityBlockView';

class TravelDetail extends Component {
  componentDidMount() {
    this.props.getTravel(this.props.match.params.id);
  }

  render() {
    const items = (this.props.items || []).map((item, index) => {
      if (!item.info) {
        return (
          <Grid
            key={index}
            container
            alignItems="center"
            direction="column"
            justify="space-around"
          >
            { item.block_type.startsWith('DAY')
              && (
              <TravelDayBlockView
                item={this.props.items[index]}
              />
              )}
            { !item.block_type.startsWith('DAY')
              && (
              <TravelActivityBlockView
                item={this.props.items[index]}
              />
              )}
          </Grid>
        );
      }
      return <div key={index} />;
    });
    return (
      <Grid container alignItems="center" direction="column" justify="space-around">
        <Grid container alignItems="center" direction="column" justify="space-around">
          {items}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    header: state.travel.header,
    items: state.travel.items,
    tags: state.travel.tags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTravel: (id) => dispatch(actionCreators.getTravel(id, false)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TravelDetail));
