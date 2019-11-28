import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';

class TravelSettingsPage extends Component {
  render() {
    return (
      <div className="TravelSettingsPage">
        <HeaderContainer />
        {this.props.match.params.id}
      </div>
    );
  }
}

export default TravelSettingsPage;
