import React, { Component } from 'react';
import TravelSetting from '../../components/travel-settings/TravelSetting';

const tempIsPublic = true;
const tempAllowComments = true;

class TravelSettingContainer extends Component {
  // have to retrieve collaborators of travel by using this.props.travelId

  state = {
    isPublic: tempIsPublic,
    allowComments: tempAllowComments,
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
  }

  render() {
    return (
      <div>
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

export default TravelSettingContainer;
