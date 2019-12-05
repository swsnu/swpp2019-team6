import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  leftMargin: {
    marginLeft: theme.spacing(1),
  },
  allMargin: {
    margin: theme.spacing(1),
  },
  formControl: {
    marginLeft: theme.spacing(2),
  },
  settingSection: {
    border: '2px solid grey',
    margin: theme.spacing(1),
  },
}));

const TravelSetting = ({
  isPublic, allowComments, handleVisibilityChange, handleAllowCommentsChange, onApplyButtonClicked,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.settingSection}>
        <Typography variant="subtitle2" align="left" color="textPrimary" style={{ marginTop: 16, marginLeft: 8 }}>
            Visibility
        </Typography>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup aria-label="Visibility" name="visibility" value={String(isPublic)} onChange={handleVisibilityChange}>
            <FormControlLabel value="true" control={<Radio />} label="Public" />
            <FormControlLabel value="false" control={<Radio />} label="Private" />
          </RadioGroup>
        </FormControl>

        <Typography variant="subtitle2" align="left" color="textPrimary" style={{ marginTop: 16, marginLeft: 8 }}>
            Comments
        </Typography>

        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup aria-label="Comments" name="comments" value={String(allowComments)} onChange={handleAllowCommentsChange}>
            <FormControlLabel value="true" control={<Radio />} label="Allow" />
            <FormControlLabel value="false" control={<Radio />} label="Disallow" />
          </RadioGroup>
        </FormControl>
        <div>
          <Button
            size="medium"
            variant="contained"
            color="secondary"
            className={classes.allMargin}
            onClick={onApplyButtonClicked}
          >
            Apply
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default TravelSetting;
