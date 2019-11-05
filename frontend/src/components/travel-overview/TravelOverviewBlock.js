import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import PublicIcon from '@material-ui/icons/Public';
import PrivateIcon from '@material-ui/icons/Lock';
import CommentIcon from '@material-ui/icons/ForumRounded';
import CollaboratorsIcon from '@material-ui/icons/People';
import ForkedIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    height: 240,
    [theme.breakpoints.down('xs')]: {
      height: 180,
    },
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    objectFit: 'cover',
    width: 160,
    height: 240,
  },
  icons: {
    fontSize: 'large',
    color: 'grey',
  },
}));

// travelOverviewItem(.title .author .summary .period .likes .photo
// .is_public, .allow_comment, .is_forked, .collaborators)
// is_mypage: should detailed option be shown?
const TravelOverviewBlock = ({ travelOverviewItem, is_mypage }) => {
  const classes = useStyles();

  // Have to change onCardClicked to make a link to its detail page
  const onCardClicked = (e) => {
    // console.log('onCardClicked!');
  };

  return (
    <div>
      {travelOverviewItem ? (
        <div>
          <CardActionArea component="button" onClick={onCardClicked}>
            <Card className={classes.card}>
              {/* For image */}
              {travelOverviewItem.photo ? (
                <Hidden xsDown>
                  <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    image={travelOverviewItem.photo}
                    title={travelOverviewItem.title}
                  />
                </Hidden>
              ) : (null)}
              <div className={classes.cardDetails}>
                <CardContent align="left">
                  <Typography component="h2" variant="h5">
                    {travelOverviewItem.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {travelOverviewItem.period}
                  </Typography>
                  <Typography variant="subtitle2" color="primary" display="inline">
                    by {travelOverviewItem.author}
                  </Typography>
                  <Typography display="inline">
                    {' '}| {travelOverviewItem.likes} likes {' '}
                  </Typography>
                  {is_mypage ? (
                    <span>
                      {travelOverviewItem.is_public ? (
                        <Tooltip title="Public">
                          <PublicIcon className={classes.icons} />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Private">
                          <PrivateIcon className={classes.icons} />
                        </Tooltip>
                      )}
                      {travelOverviewItem.allow_comment ? (
                        <Tooltip title="Comments allowed">
                          <CommentIcon className={classes.icons} />
                        </Tooltip>
                      ) : (
                        <span />
                      )}
                      {travelOverviewItem.is_forked ? (
                        <Tooltip title="Forked">
                          <ForkedIcon className={classes.icons} />
                        </Tooltip>
                      ) : (
                        <span />
                      )}
                      {travelOverviewItem.collaborators.length > 1 ? (
                        <Tooltip title={`${travelOverviewItem.collaborators.length - 1} collaborators`}>
                          <CollaboratorsIcon className={classes.icons} />
                        </Tooltip>
                      ) : (
                        <span />
                      )}
                    </span>
                  ) : (
                    <span />
                  )}
                  <Typography paragraph variant="body1">
                    {travelOverviewItem.summary}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </CardActionArea>
          <Grid container xs justify="space-between">
            <Grid item xs={4}>
              <Button variant="outlined" color="default" fullWidth>
                Edit
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" color="primary" fullWidth>
                Settings
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" color="secondary" fullWidth>
                Delete
              </Button>
            </Grid>
          </Grid>
        </div>
      ) : null}
    </div>
  );
};

export default TravelOverviewBlock;
