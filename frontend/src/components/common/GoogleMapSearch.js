import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import axios from 'axios';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function GoogleMapsSearch(props) {
  const classes = useStyles();
  const [options, setOptions] = React.useState([]);

  const handleChange = (event) => {
    props.searchHandler(event.target.value);
  };

  React.useEffect(() => {
    let active = true;

    if (props.value === '') {
      setOptions([]);
      return undefined;
    }

    (async () => {
      axios.get(`/api/maps/autocomplete/${props.value}/`)
        .then((res) => setOptions(res.data));
      sleep(1e3);
    })();

    return () => {
      active = false;
    };
  }, [props.value]);

  return (
    <Autocomplete
      id="google-map"
      style={{ width: 300 }}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      freeSolo
      disableOpenOnFocus
      renderInput={(params) => {
        params.inputProps.value = props.value;
        return (
          <TextField
            {...params}
            label="Search Location"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        );
      }}
      renderOption={(option) => {
        if (option.structured_formatting) {
          const matches = option.structured_formatting.main_text_matched_substrings;
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length]),
          );

          return (
            <Grid id="option" container alignItems="center" onClick={() => props.searchHandler(option.structured_formatting.main_text)}>
              <Grid item>
                <LocationOnIcon className={classes.icon} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="textSecondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          );
        }

        return (
          <Grid id="option" container alignItems="center" onClick={() => props.searchHandler(option.description)}>
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              <span>{option.description}</span>
              <Typography variant="body2" color="textSecondary">
                {option.description}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
