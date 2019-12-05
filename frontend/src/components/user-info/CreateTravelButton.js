import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardDetails: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  addCircleIcon: {
    width: 70,
    height: 70,
    [theme.breakpoints.down('xs')]: {
      width: 50,
      height: 50,
    },
  },
}));

const CreateTravelButton = ({ handleClickCreate }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container style={{ marginBottom: 16 }}>
        <CardActionArea component="button" onClick={handleClickCreate}>
          <Card className="card">
            <div className={classes.cardDetails}>
              <CardContent align="center">
                <AddCircleIcon className={classes.addCircleIcon} color="disabled" />
                <Typography color="textSecondary">
                    CREATE A NEW PLAN!
                </Typography>
              </CardContent>
            </div>
          </Card>
        </CardActionArea>
      </Grid>
    </div>
  );
};

export default CreateTravelButton;
