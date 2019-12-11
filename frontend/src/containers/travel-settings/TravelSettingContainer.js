import React, { Component } from 'react';
import { connect } from 'react-redux';
import TravelSetting from '../../components/travel-settings/TravelSetting';

class TravelSettingContainer extends Component {
  // have to retrieve collaborators of travel by using this.props.travelId

  state = {
    isPublic: null,
    allowComments: null,
  }

  // for updating current state
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.thisTravel.is_public !== prevState.isPublic
      || nextProps.thisTravel.allow_comments !== prevState.allowComments) {
      return {
        isPublic: nextProps.thisTravel.is_public, allowComments: nextProps.thisTravel.allow_comments,
      };
    }
    return null;
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelSettingContainer);
