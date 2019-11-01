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

// Set styles of different classes here,
// and use them by setting className={classes....}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    marginRight: theme.spacing(2),
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
    flex: 2,
  },
  userMenu: {
    marginRight: theme.spacing(2),
  },
  searchButton: {
    marginRight: theme.spacing(3),
  },
}));


const Header = ({ user, onLogout }) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolbar}>
      <Link to="/main">
        <IconButton>
          <ExploreIcon />
        </IconButton>
      </Link>
      <Typography
        component="h3"
        variant="h6"
        color="inherit"
        align="left"
        className={classes.toolbarTitle}
      >
        Triplannet
      </Typography>
      <TextField
        id="searchField"
        align="center"
        placeholder="Search..."
        className={classes.searchField}
      />
      <span className={classes.userMenu}>
        <IconButton className={classes.searchButton}>
          <SearchIcon />
        </IconButton>
        {user ? (
          <>
            {user.nickname}
            <Button variant="outlined" size="small" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="outlined" size="small">
              Login
            </Button>
          </>
        )}
      </span>
    </Toolbar>
  );
};

export default Header;
