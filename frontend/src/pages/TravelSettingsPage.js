import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import HeaderContainer from '../containers/common/HeaderContainer';
import OneTravelOverview from '../containers/travel-overview/OneTravelOverview';
import CollaboratorSettingContainer from '../containers/travel-settings/CollaboratorSettingContainer';
import TravelSettingContainer from '../containers/travel-settings/TravelSettingContainer';

class TravelSettingsPage extends Component {
  render() {
    return (
      <div className="TravelSettingsPage">
        <HeaderContainer />
        <div
          style={{
            marginLeft: 24,
            marginRight: 24,
          }}
        >
          <Typography variant="h4" gutterBottom align="left" color="textPrimary" style={{ marginTop: 8, padding: 16 }}>
              Travel Settings
          </Typography>
          <OneTravelOverview travelId={this.props.match.params.id} />
          <CollaboratorSettingContainer
            travelId={this.props.match.params.id}
          />
          <TravelSettingContainer travelId={this.props.match.params.id} />
        </div>
      </div>
    );
  }
}

export default TravelSettingsPage;
