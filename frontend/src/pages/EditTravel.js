import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import CreateTravel from '../containers/createTravel/CreateTravel';

class EditTravelPage extends Component {
  render() {
    return (
      <div className="editTravel">
        <HeaderContainer />
        <CreateTravel mode="edit" />
      </div>
    );
  }
}

export default EditTravelPage;
