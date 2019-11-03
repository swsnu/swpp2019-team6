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
import Grid from '@material-ui/core/Grid';
import DetailIcon from '@material-ui/icons/DetailsRounded';
import 'typeface-roboto';
// Set styles of different classes here,
// and use them by setting className={classes....}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    '@media (max-width:600px)': {
      visibility: 'hidden',
      width: 0,
    },
  },
  searchInput: {
    padding: theme.spacing(1),
  },
  userMenu: {
    marginRight: theme.spacing(1),
  },
  searchButton: {
  },
  avatar: {
    width: 35,
    height: 35,
    '@media (max-width:600px)': {
      width: 30,
      height: 30,
      margin: 0,
    },
  },
  wrapper: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 45,
    right: 0,
    left: -45,
    width: 100,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    'flex-grow': 1,
  },
  userNickname: {
    '@media (max-width:600px)': {
      visibility: 'hidden',
      width: 0,
    },
  },
}));

// props
// data: user(.nickname, .profile, .id), searchText
// function: onLogoutClicked, onMyPageClicked, onSearchInputChanged, onSearchButtonClicked
const Header = ({
  user, searchText, onLogoutClicked, onMyPageClicked, onSearchInputChanged, onSearchButtonClicked,
}) => {
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
    <Toolbar className={[classes.toolbar, classes.root, 'Header'].join(' ')}>
      <Grid container spacing={1} wrap="nowrap">
        <Grid item xs container direction="row" justify="center" alignItems="center" wrap="nowrap">
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
              id="searchInput"
              align="center"
              placeholder="Search..."
              onChange={onSearchInputChanged}
              value={searchText}
              className={classes.searchInput}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={onSearchButtonClicked} className={classes.searchButton} id="searchButton">
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
        {/* right side: user profile, dropdown menu for mypage, logout */}
        <Grid item xs container spacing={1} direction="row" justify="center" alignItems="center" wrap="nowrap">
          <Grid item>
            <Avartar alt={user.nickname} src={user.profile} className={classes.avatar} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" className={classes.userNickname}>
              {user.nickname}
            </Typography>
          </Grid>
          <Grid item>
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className={classes.wrapper}>
                <IconButton onClick={handleClick} id="dropdownButton">
                  <DetailIcon />
                </IconButton>
                {open
                  ? (
                    <div className={classes.paper}>
                      <Button size="small" onClick={onMyPageClicked}>
                        My Page
                      </Button>
                      <Button size="small" onClick={onLogoutClicked}>
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
