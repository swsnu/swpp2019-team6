import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import CreateTravel from '../containers/createTravel/CreateTravel';

class CreateTravelPage extends Component {
  render() {
    return (
      <>
        <HeaderContainer />
        <CreateTravel />
      </>
    );
  }
}

export default CreateTravelPage;
