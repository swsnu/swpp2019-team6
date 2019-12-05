import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const useCardStyles = makeStyles({
  card: {
    minWidth: 720,
    maxWidth: 720,
    minHeight: 100,
    margin: 10,
  },
  box: {
    background: 'red',
    opacity: 0.7,
    border: '2px solid black',
    borderRadius: 8,
    minWidth: 720,
    minHeight: 100,
  },
});

export default function TravelRemoveBlock(props) {
  const cardClasses = useCardStyles();

  return (
    <Card className={cardClasses.card}>
      <Box
        className={cardClasses.box}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <DeleteForeverIcon />
      </Box>
    </Card>
  );
}
