import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import TravelSetting from '../../components/travel-settings/TravelSetting';

class TravelSettingContainer extends Component {
  // have to retrieve collaborators of travel by using this.props.travelId

  state = {
    isPublic: null,
    allowComments: null,
  }

  async componentDidMount() {
    // may not be a good idea
    await this.props.getOneRawTravel(this.props.travelId);
    this.setState({
      isPublic: this.props.thisTravel.is_public,
      allowComments: this.props.thisTravel.allow_comments,
    });
  }

  handleVisibilityChange = (e) => {
    const value = e.target.value === 'true';
    this.setState({ isPublic: value });
  }

  handleAllowCommentsChange = (e) => {
    const value = e.target.value === 'true';
    this.setState({ allowComments: value });
  }

  onApplyButtonClicked = (e) => {
    console.log(this.props);
  }

  render() {
    return (
      <div className="travelSettingContainer">
        <TravelSetting
          isPublic={this.state.isPublic}
          allowComments={this.state.allowComments}
          handleVisibilityChange={this.handleVisibilityChange}
          handleAllowCommentsChange={this.handleAllowCommentsChange}
          onApplyButtonClicked={this.onApplyButtonClicked}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    thisTravel: state.travel.oneRawTravel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneRawTravel: (travel_id) => dispatch(actionCreators.getOneRawTravel(travel_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelSettingContainer);
