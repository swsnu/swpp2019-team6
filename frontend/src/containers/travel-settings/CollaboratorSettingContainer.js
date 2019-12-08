import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actionCreators from '../../store/actions/index';

import CollaboratorSetting from '../../components/travel-settings/CollaboratorSetting';

const tempCollaborators = [
  {
    nickname: 'dfkjeksl',
  },
  {
    nickname: 'a',
  },
  {
    nickname: 'jitskdj24',
  },
];

class CollaboratorSettingContainer extends Component {
  // have to retrieve collaborators of travel by using this.props.travelId


  state = {
    nickname_collaborators: [],
  }

  async componentDidMount() {
    await this.props.getOneRawTravel(this.props.travelId);
    if (this.props.thisTravel && this.props.thisTravel.collaborators) {
      const promises = this.props.thisTravel.collaborators.map(async (user_id) => {
        const response = await axios.get(`/api/user/${user_id}/`);
        return response;
      });
      const results = await Promise.all(promises);
      const nickname_collaborators = results.map((res) => {
        return { id: res.data.id, nickname: res.data.nickname };
      });
      this.setState({ nickname_collaborators: nickname_collaborators });
    }
  }

  onAddButtonClicked = (e) => {
  }


  render() {
    return (
      <div>
        {this.props.thisTravel && ('id' in this.props.thisTravel) ? (
          <div className="collaboratorSettingContainer">
            <CollaboratorSetting
              collaborators={this.state.nickname_collaborators}
              onAddButtonClicked={this.onAddButtonClicked}
            />
          </div>
        ) : (
          <span />
        )}
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getOneRawTravel: (travel_id) => dispatch(actionCreators.getOneRawTravel(travel_id)),
  };
};


const mapStateToProps = (state) => {
  return {
    thisTravel: state.travel.oneRawTravel,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorSettingContainer);
