import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import UserInfoSection from '../../components/user-info/UserInfoSection';

const tempUser = {
  nickname: 'iluvswpp',
  register_date: '2019.10.10',
  status_message: 'I love swpp. Believe it or not!',
  num_plans: 6,
  num_likes: 45,
  num_forked: 3,
  user_photo: '/images/1.jpeg',
};

class UserInfoSectionContainer extends Component {
  state = {
    currentUser: tempUser,
  };

  render() {
    return (
      <div>
        {this.state.currentUser ? (
          <div className="userInfoSection">
            <UserInfoSection
              nickname={this.state.currentUser.nickname}
              register_date={this.state.currentUser.register_date}
              status_message={this.state.currentUser.status_message}
              num_plans={this.state.currentUser.num_plans}
              num_likes={this.state.currentUser.num_likes}
              num_forked={this.state.currentUser.num_forked}
              user_photo={this.state.currentUser.user_photo}
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

export default UserInfoSectionContainer;
