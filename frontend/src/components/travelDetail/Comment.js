import React from 'react';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';

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
        {comment.author.nickname}
      </Typography>
      {' '}
      <Typography variant="caption" className={classes.inline}>
        <Moment format="YYYY-MM-DD HH:mm">{comment.register_time}</Moment>
      </Typography>
      <Typography variant="body1">
        {comment.content}
      </Typography>
      <hr />
    </div>
  );
};

export default Comment;
