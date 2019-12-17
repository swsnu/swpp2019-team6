import React from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Comment from './Comment';

const useStyles = makeStyles((theme) => ({
  commentsSection: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
    },
    backgroundColor: 'white',
  },
  likeSection: {
    position: 'relative',
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(6),
      paddingLeft: theme.spacing(6),
    },
    backgroundColor: 'white',
  },
}));

const CommentsLike = ({
  travel, comments, history, onLikeButtonClicked,
  commentField, onCommentFieldChanged, onCommentConfirmClicked,
}) => {
  const classes = useStyles();

  const thisUser = JSON.parse(localStorage.getItem('user'));
  const resultComments = comments.map((comment, i) => {
    return (
      <Comment key={i} comment={comment} />
    );
  });

  return (
    <div>
      <div className={classes.likeSection}>
        {travel.likes ? (
          <div>
            <Typography variant="h6">
              {travel.likes.length} likes
            </Typography>
            <Button variant="contained" color="primary" id="likeButton" onClick={() => { onLikeButtonClicked(thisUser.id, travel.id); }}>
              Like
            </Button>
          </div>
        ) : (
          <span />
        )}
      </div>
      <div className={classes.commentsSection}>
        <Typography variant="h5">
          Comments
        </Typography>
        <hr />
        {comments ? (
          <div>
            {resultComments}
          </div>
        ) : (
          <span />
        )}
        <Grid container spacing={1}>
          <Grid item xs={11}>
            <TextField
              autoFocus
              fullWidth
              id="CommentField"
              label="Your Comment"
              value={commentField}
              onChange={onCommentFieldChanged}
            />
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="primary" id="ConfirmButton" onClick={onCommentConfirmClicked}>
              Confirm
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default withRouter(CommentsLike);
