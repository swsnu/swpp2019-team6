import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';


const useStyles = makeStyles((theme) => ({
  infoTravelSection: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
    },
    backgroundColor: 'lightgrey',
  },
  infoTravelSection2: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
    },
    backgroundColor: 'white',
    marginBottom: theme.spacing(2),
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
  img: {
    objectFit: 'cover',
    width: 400,
    height: 400,
  },
  button: {
    marginTop: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
}));

const InfoTravelDetail = ({ travel, onForkButtonClicked, history }) => {
  const classes = useStyles();
  const thisUser = JSON.parse(localStorage.getItem('user'));

  const onAuthorClicked = (user_id) => {
    history.push(`/user/${user_id}`);
  };

  return (
    <div>
      {(travel && travel.head) ? (
        <div>
          <Paper className={classes.infoTravelSection}>
            <Grid container direction="column">
              {travel.head.image ? (
                <Grid item>
                  <img src={travel.head.image} className={classes.img} alt="travel" />
                </Grid>
              ) : (
                <span />
              )}
              <Grid item>
                <Typography variant="h4" className={classes.title}>
                  {travel.head.title}
                </Typography>
                <Typography variant="subtitle2">
                  {travel.head.start_date} ~ {travel.head.end_date}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {travel.head.summary}
                  summary comes here
                </Typography>
                <ButtonBase onClick={() => { onAuthorClicked(travel.author.id); }}>
                  <Grid item container direction="row" alignItems="center">
                    <Avatar
                      className={classes.avartar}
                      alt="IMAGE NOT FOUND"
                      src={travel.author.profile_photo || '/images/default_profile_image.png'}
                    />
                    <Typography variant="subtitle1" style={{ paddingLeft: 8 }}>
                      by {travel.author.nickname}
                    </Typography>
                  </Grid>
                </ButtonBase>
                <Typography variant="h6">
                  Tags
                </Typography>
                {travel.head.tags ? (
                  <div>
                    { travel.head.tags.map((tag, i) => {
                      return (
                        <Typography variant="body1" color="primary" key={i} style={{ display: 'inline' }}>
                          {' #'}{tag}
                        </Typography>
                      );
                    }) }
                  </div>
                ) : (
                  <Typography variant="body1" color="primary">
                    No tags found
                  </Typography>
                )}
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => {
                    onForkButtonClicked(thisUser.id, travel.id);
                  }}
                >
                  Fork
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <div className={classes.infoTravelSection2}>
            <Typography variant="h5">
              Description
            </Typography>
            <Typography variant="body1">
              {travel.head.description}
              description comes here
            </Typography>
          </div>
        </div>
      ) : (
        <span />
      )}
    </div>
  );
};

export default withRouter(InfoTravelDetail);
