import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExploreIcon from '@material-ui/icons/Explore';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avartar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import DetailIcon from '@material-ui/icons/DetailsRounded';

// Set styles of different classes here,
// and use them by setting className={classes....}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
  searchField: {
    padding: theme.spacing(1),
  },
  userMenu: {
    marginRight: theme.spacing(2),
  },
  searchButton: {
  },
  avatar: {
  },
  wrapper: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 40,
    right: 0,
    left: -40,
    width: 100,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    'flex-grow': 1,
  },
}));


const Header = ({ user, onLogout }) => {
  const classes = useStyles();

  // for dropdown menu
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    // left side: logo and our service name
    <Toolbar className={[classes.toolbar, classes.root].join(' ')}>
      <Grid container spacing={1} wrap="nowrap">
        <Grid item xs="true" container direction="row" justify="center" alignItems="center" wrap="nowrap">
          <Grid item>
            <Link to="/main">
              <IconButton>
                <ExploreIcon />
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Typography
              component="h3"
              variant="h6"
              color="inherit"
              align="left"
              className={classes.toolbarTitle}
            >
              Triplannet
            </Typography>
          </Grid>
        </Grid>
        {/* center: search field */}
        <Grid item xs={8} container direction="row" justify="center" alignItems="center" wrap="nowrap">
          <Grid item>
            <TextField
              id="searchField"
              align="center"
              placeholder="Search..."
              className={classes.searchField}
            />
          </Grid>
          <Grid item>
            <IconButton className={classes.searchButton}>
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
        {/* right side: user profile, dropdown menu for mypage, logout */}
        <Grid item xs="true" container spacing={1} direction="row" justify="center" alignItems="center" wrap="nowrap">
          <Grid item>
            <Avartar alt={user.nickname} src={user.profile} className={classes.avartar} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              {user.nickname}
            </Typography>
          </Grid>
          <Grid item>
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className={classes.wrapper}>
                <IconButton onClick={handleClick}>
                  <DetailIcon />
                </IconButton>
                {open
                  ? (
                    <div className={classes.paper}>
                      <Button size="small" onClick={onLogout}>
                        My Page
                      </Button>
                      <Button size="small" onClick={onLogout}>
                        Logout
                      </Button>
                    </div>
                  )
                  : null}
              </div>
            </ClickAwayListener>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default Header;
