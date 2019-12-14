import React from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
}));

const CommentsLike = ({ travel, comments, history }) => {
  const classes = useStyles();

  const resultComments = comments.map((comment, i) => {
    return (
      <Comment key={i} />
    );
  });

  return (
    <div>
      {comments ? (
        <div className={classes.commentsSection}>
          <Typography variant="h5">
            Comments
          </Typography>
        </div>
      ) : (
        <span />
      )}
    </div>
  );
};

export default withRouter(CommentsLike);
