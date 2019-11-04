import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  userInfoSection: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
    },
    backgroundColor: 'lightgrey',
  },
  avatar: {
    width: 100,
    height: 100,
    [theme.breakpoints.up('md')]: {
      width: 200,
      height: 200,
    },
    marginLeft: 'auto',
    marginRight: 'auto',
  },

}));

// data: nickname, register_date, status_messaage, num_plans, num_likes, num_forked, user_photo
// boolean check: is_mypage
// function: onEditButtonClicked
const UserInfoSection = ({
  nickname, register_date, status_message, num_plans, num_likes, num_forked,
  user_photo, is_mypage, onEditButtonClicked,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.userInfoSection}>
        <Grid container spacing={3}>
          {/* For Avartar */}
          <Grid item xs={4}>
            <Avatar className={classes.avatar} alt={nickname} src={user_photo} />
          </Grid>
          {/* For other components */}
          <Grid item xs container direction="column">
            <Grid item container dirction="row" wrap="nowrap">
              <Grid xs={10} item zeroMinWidth>
                <Typography variant="h5" gutterBottom nowrap>
                  @{nickname}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  since {register_date}
                </Typography>
                <Typography variaint="subtitle2" color="primary" gutterBottom>
                  {num_plans} plans, {num_likes} likes, forked {num_forked} times
                </Typography>
              </Grid>
              <Grid item xs>
                {is_mypage ? (
                  <Button size="medium" variant="contained" color="secondary" onClick={onEditButtonClicked}>
                  Edit
                  </Button>
                ) : (<div />)}
              </Grid>
            </Grid>
            <Grid item xs>
              <Typography variaint="body1">
                {status_message}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default UserInfoSection;
