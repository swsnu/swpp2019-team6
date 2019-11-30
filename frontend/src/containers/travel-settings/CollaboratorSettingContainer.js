import React, { Component } from 'react';
import CollaboratorSetting from '../../components/travel-settings/CollaboratorSetting';

const tempCollaborators = [
  {
    nickname: 'dfkjeksl',
  },
  {
    nickname: 'askfj234',
  },
  {
    nickname: 'jitskdj24',
  },
];

class CollaboratorSettingContainer extends Component {
  // have to retrieve collaborators of travel by using this.props.travelId


  state = {
    collaborators: tempCollaborators,
  }

  onAddButtonClicked = (e) => {
  }

  render() {
    return (
      <div className="collaboratorSettingContainer">
        <CollaboratorSetting
          collaborators={this.state.collaborators}
          onAddButtonClicked={this.onAddButtonClicked}
        />
      </div>
    );
  }
}

export default CollaboratorSettingContainer;
