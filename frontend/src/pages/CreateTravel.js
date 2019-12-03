import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import CreateTravel from '../containers/createTravel/CreateTravel';

class CreateTravelPage extends Component {
  render() {
    return (
      <div className="CreateTravel">
        <HeaderContainer />
        <CreateTravel />
      </div>
    );
  }
}

export default CreateTravelPage;
