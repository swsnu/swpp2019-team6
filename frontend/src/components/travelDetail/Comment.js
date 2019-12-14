import React from 'react';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}));

const Comment = ({ comment }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="subtitle2" className={classes.inline}>
        {comment.user.nickname}
      </Typography>
      {' '}
      <Typography variant="caption" className={classes.inline}>
        {comment.register_time}
      </Typography>
      <Typography variant="body1">
        {comment.content}
      </Typography>
      <hr />
    </div>
  );
};

export default Comment;
