import React from 'react';
import { withRouter } from 'react-router-dom';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    height: 240,
    [theme.breakpoints.down('sm')]: {
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
// for_collaborator: travel lists for collaborator
// onDeleteClicked: for author
// onQuitClicked: for collaborators
const TravelOverviewBlock = ({
  travelOverviewItem, is_mypage, history, for_collaborator, onDeleteClicked, onQuitClicked,
  onClickMerge,
}) => {
  const classes = useStyles();

  // Have to change onCardClicked to make a link to its detail page
  const onCardClicked = (e) => {
    if (history.location.pathname.startsWith('/travel/')) {
      history.push(`/travel/${travelOverviewItem.id}`);
      window.location.reload(); // other travel plan page to my page -> needs refreshing?
    } else {
      history.push(`/travel/${travelOverviewItem.id}`);
    }
  };

  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [quitOpen, setQuitOpen] = React.useState(false);

  const handleClickDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleClickQuitOpen = () => {
    setQuitOpen(true);
  };

  const handleQuitClose = () => {
    setQuitOpen(false);
  };


  return (
    <div>
      {travelOverviewItem ? (
        <div>
          <CardActionArea component="button" onClick={onCardClicked}>
            <Card className={classes.card}>
              {/* For image */}
              {travelOverviewItem.head.photo ? (
                <Hidden xsDown>
                  <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    image={travelOverviewItem.head.photo}
                    title={travelOverviewItem.head.title}
                  />
                </Hidden>
              ) : (null)}
              <div className={classes.cardDetails}>
                <CardContent align="left">
                  <Typography component="h2" variant="h5">
                    {travelOverviewItem.head.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {`${travelOverviewItem.head.start_date} ~ ${travelOverviewItem.head.end_date}`}
                  </Typography>
                  <Typography variant="subtitle2" color="primary" display="inline">
                    by {travelOverviewItem.author ? travelOverviewItem.author.nickname : null}
                  </Typography>
                  <Typography display="inline">
                    {' '}| {travelOverviewItem.likes.length} likes {' '}
                    {/* ->likes,length */}
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
                      {travelOverviewItem.allow_comments ? (
                        <Tooltip title="Comments allowed">
                          <CommentIcon className={classes.icons} />
                        </Tooltip>
                      ) : (
                        <span />
                      )}
                      {travelOverviewItem.fork_parent ? (
                        <Tooltip title="Forked">
                          <ForkedIcon className={classes.icons} />
                        </Tooltip>
                      ) : (
                        <span />
                      )}
                      {travelOverviewItem.collaborators.length > 0 ? (
                        <Tooltip title={travelOverviewItem.collaborators.length !== 1 ? (`${travelOverviewItem.collaborators.length} collaborators`) : ('1 collaborator')}>
                          <CollaboratorsIcon className={classes.icons} />
                        </Tooltip>
                      ) : (
                        <span />
                      )}
                    </span>
                  ) : (
                    <span />
                  )}
                  {travelOverviewItem.head.tags ? (
                    <div>
                      { travelOverviewItem.head.tags.map((tag, i) => {
                        return (
                          <Typography variant="body2" color="primary" key={i} style={{ display: 'inline' }}>
                            {' #'}{tag}
                          </Typography>
                        );
                      }) }
                    </div>
                  ) : (
                    <span />
                  )}
                  <Typography paragraph variant="body1">
                    {travelOverviewItem.head.summary}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </CardActionArea>
          <div>
            {/* for author */}
            {(is_mypage && !for_collaborator) ? (
              <div>
                {!travelOverviewItem.head.is_head ? (
                  <Grid container justify="space-between">
                    <Grid item xs={3}>
                      <Button
                        variant="outlined"
                        color="default"
                        fullWidth
                        onClick={() => { history.push(`/travel/${travelOverviewItem.id}/edit`); }}
                      >
                  Edit
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => { history.push(`/travel/${travelOverviewItem.id}/settings`); }}
                      >
                  Settings
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={handleClickDeleteOpen}
                      >
                  Delete
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => onClickMerge(travelOverviewItem.head.id)}
                      >
                  Merge
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container justify="space-between">
                    <Grid item xs={4}>
                      <Button
                        variant="outlined"
                        color="default"
                        fullWidth
                        onClick={() => { history.push(`/travel/${travelOverviewItem.id}/edit`); }}
                      >
                  Edit
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => { history.push(`/travel/${travelOverviewItem.id}/settings`); }}
                      >
                  Settings
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={handleClickDeleteOpen}
                      >
                  Delete
                      </Button>
                    </Grid>
                  </Grid>
                )}
                <Dialog
                  open={deleteOpen}
                  onClose={handleDeleteClose}
                  aria-labelledby="alert-dialog-title_delete"
                  aria-describedby="alert-dialog-description_delete"
                >
                  <DialogTitle id="alert-dialog-title_delete">Delete this travel plan?</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description_delete">
                      All data will be removed permanently.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDeleteClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={() => { handleDeleteClose(); onDeleteClicked(travelOverviewItem.id); }} color="primary" autoFocus>
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ) : (<span />)}
          </div>
          <div>
            {/* for collaborator */}
            {(is_mypage && for_collaborator) ? (
              <div>
                {travelOverviewItem.head.is_head ? (
                  <Grid container justify="space-between">
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        color="default"
                        fullWidth
                        onClick={() => { history.push(`/travel/${travelOverviewItem.id}/edit`); }}
                      >
                  Edit
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={handleClickQuitOpen}
                      >
                  Quit
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container justify="space-between">
                    <Grid item xs={4}>
                      <Button
                        variant="outlined"
                        color="default"
                        fullWidth
                        onClick={() => { history.push(`/travel/${travelOverviewItem.id}/edit`); }}
                      >
                  Edit
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={handleClickQuitOpen}
                      >
                  Quit
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => onClickMerge(travelOverviewItem.head.id)}
                      >
                  Merge
                      </Button>
                    </Grid>
                  </Grid>
                )}
                <Dialog
                  open={quitOpen}
                  onClose={handleQuitClose}
                  aria-labelledby="alert-dialog-title_quit"
                  aria-describedby="alert-dialog-description_quit"
                >
                  <DialogTitle id="alert-dialog-title_quit">Quit from this travel plan?</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description_delete">
                      You will be removed from the collaborators list of this plan.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleQuitClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={() => { handleQuitClose(); onQuitClicked(travelOverviewItem.id); }} color="primary" autoFocus>
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ) : (<span />)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(TravelOverviewBlock);
