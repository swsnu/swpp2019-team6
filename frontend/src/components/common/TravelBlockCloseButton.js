import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


/*
 * Wrapper of close button in travel block
 */
export default function TravelBlockCloseButton(props) {
  return (
    <IconButton
      onClick={props.removeHandler}
      aria-label="remove"
    >
      <CloseIcon />
    </IconButton>
  );
}
