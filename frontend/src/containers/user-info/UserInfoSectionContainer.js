import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import UserInfoSection from '../../components/user-info/UserInfoSection';
import * as actionCreators from '../../store/actions/index';


class UserInfoSectionContainer extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  onEditButtonClicked = () => {
    this.props.history.push(`/user/${this.props.user.id}/edit`);
  }

  render() {
    return (
      <div>
        {this.props.user ? (
          <div className="userInfo">
            <UserInfoSection
              user={this.props.user}
              is_mypage={this.props.is_mypage}
              onEditButtonClicked={this.onEditButtonClicked}
              userTravelsLength={!this.props.userTravels ? 0 : this.props.userTravels.length}
            />
          </div>
        ) : (
          <div>
            <Typography variant="h4" style={{ marginTop: 8, padding: 16 }}>
              No user found
            </Typography>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    userTravels: state.travel.userTravels,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(actionCreators.getUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserInfoSectionContainer));
