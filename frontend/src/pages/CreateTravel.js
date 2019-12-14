import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import CreateTravel from '../containers/createTravel/CreateTravel';

class CreateTravelPage extends Component {
  render() {
    return (
      <div className="CreateTravel">
        <HeaderContainer />
        <CreateTravel mode="create" />
      </div>
    );
  }
}

export default CreateTravelPage;
