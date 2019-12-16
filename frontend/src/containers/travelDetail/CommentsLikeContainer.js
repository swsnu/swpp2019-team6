import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../store/actions/index';
import CommentsLike from '../../components/travelDetail/CommentsLike';


class CommentsLikeContainer extends Component {
  state = {
    commentField: '',
  }

  componentDidMount() {
    this.props.getComments(this.props.match.params.id);
  }

  onLikeButtonClicked = (user_id, travel_id) => {
    this.props.likeTravel(user_id, travel_id);
  }

  onCommentFieldChanged = (e) => {
    this.setState({ commentField: e.target.value });
  }

  onCommentConfirmClicked = (e) => {
    this.props.postComment(this.props.match.params.id, { content: this.state.commentField });
  }

  render() {
    return (
      <div>
        {this.props.comments ? (
          <div className="commentsLike">
            <CommentsLike
              travel={this.props.thisTravel}
              comments={this.props.comments}
              // comments={tempComments}
              onLikeButtonClicked={this.onLikeButtonClicked}
              commentField={this.state.commentField}
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
    comments: state.travel.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    likeTravel: (user_id, travel_id) => dispatch(actionCreators.likeTravel(user_id, travel_id)),
    getComments: (travel_id) => dispatch(actionCreators.getComments(travel_id)),
    postComment: (travel_id, comment) => dispatch(actionCreators.postComment(travel_id, comment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentsLikeContainer));
