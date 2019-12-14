import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../store/actions/index';
import CommentsLike from '../../components/travelDetail/CommentsLike';

const tempTravel = {
  id: 1,
  author: {
    id: 1,
    email: 'test@test.io',
    nickname: 'test',
    status_message: 'status',
    profile_photo: '/media/user/1/profile.png',
  },
  likes: [2, 3, 4],
  is_public: true,
  allow_comments: true,
  fork_parent: true,
  collaborators: [2, 3, 4],
  head: {
    title: 'Ultricies lacus sed turpis tincidunt',
    summary: 'Pharetra magna ac placerat vestibulum lectus. Pretium viverra suspendisse potenti nullam ac..',
    start_date: '2019.03.04',
    end_date: '2019.03.08',
    photo: null,
  },
};

const tempComments = [
  {
    user: {
      id: 4,
      nickname: 'test',
    },
    content: 'hello from here!',
    register_time: '2019.12.10. 10:00',
  },
  {
    user: {
      id: 6,
      nickname: 'test32',
    },
    content: 'asg ag ag!',
    register_time: '2019.11.30. 20:00',
  },
];

class CommentsLikeContainer extends Component {
  componentDidMount() {
    // this.props.getComments(this.props.match.params.id);
    console.log(this.props.match.params.id);
    console.log(this.props.thisTravel);
  }

  render() {
    return (
      <div>
        {this.props.thisComments ? (
          <div className="commentsLike">
            <CommentsLike
              // travel={this.props.thisTravel}
              travel={tempTravel}
              // comments={this.props.thisComments}
              comments={tempComments}
            />
          </div>
        ) : (
          <span />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    thisTravel: state.travel.oneRawTravel,
    thisComments: true,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentsLikeContainer));
