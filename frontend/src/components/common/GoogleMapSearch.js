import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useMapStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 375,
    margin: theme.spacing(1),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

/*
 * Search Maps APIs tab. Search map keyword and list the results.
 */
export default function GoogleMapSearch(props) {
  const mapClasses = useMapStyles();

  return (
    <Paper className={mapClasses.root}>
      <IconButton className={mapClasses.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={mapClasses.input}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton
        className={mapClasses.iconButton}
        id="search"
        aria-label="search"
        onClick={() => props.searchHandler()}
      >
        <SearchIcon />
      </IconButton>
      <Divider className={mapClasses.divider} orientation="vertical" />
      <IconButton color="primary" className={mapClasses.iconButton} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}
