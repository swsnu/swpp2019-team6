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
      nickname: 'apple13',
    },
    content: 'I like this plan! You must have enjoyed it.',
    register_time: '2019.12.10. 17:54',
  },
  {
    user: {
      id: 6,
      nickname: 'pineapple14',
    },
    content: 'Could you tell me how much you spent? ',
    register_time: '2019.12.11. 00:02',
  },
];

class CommentsLikeContainer extends Component {
  state = {
    commentField: '',
  }

  componentDidMount() {
    // this.props.getComments(this.props.match.params.id);
    // console.log(this.props.match.params.id);
    // console.log(this.props.thisTravel);
  }

  onLikeButtonClicked = (user_id, travel_id) => {
    console.log(`user ${user_id} likes travel ${travel_id}!`);
    // this.props.likeTravel(user_id, travel_id);
  }

  onCommentFieldChanged = (e) => {
    this.setState({ commentField: e.target.value });
  }

  onCommentConfirmClicked = (e) => {
    console.log(`Confirmed: ${this.state.commentField}`);
  }

  render() {
    return (
      <div>
        {this.props.thisComments ? (
          <div className="commentsLike">
            <CommentsLike
              // travel={this.props.thisTravel}
              travel={this.props.thisTravel}
              // comments={this.props.thisComments}
              comments={tempComments}
              onLikeButtonClicked={this.onLikeButtonClicked}
              commentField={this.state.CommentField}
              onCommentFieldChanged={this.onCommentFieldChanged}
              onCommentConfirmClicked={this.onCommentConfirmClicked}
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
    likeTravel: (user_id, travel_id) => dispatch(actionCreators.likeTravel(user_id, travel_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentsLikeContainer));
