import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 720,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function TagBlock(props) {
  const classes = useStyles();
  const [options, setOptions] = React.useState(['test', 'test1']);
  const [input, setInput] = React.useState();

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const postHandler = (option) => {
    (async () => {
      axios.post(`/api/travel/tag/${input}/`)
        .then((res) => {
          // console.log(res);
        });
      sleep(1e3);
    })();
    setInput('');
  };


  React.useEffect(() => {
    let active = true;

    if (input === '') {
      setOptions([]);
      return undefined;
    }

    (async () => {
      axios.get(`/api/travel/tag/${input}/`)
        .then((res) => {
          const newOption = res.data;
          if (newOption.indexOf(input) < 0) {
            newOption.splice(0, 0, input);
          }
          setOptions(newOption);
        });
      sleep(1e3);
    })();

    return () => {
      active = false;
    };
  }, [input]);

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={options}
        defaultValue={[]}
        renderTags={(value, getTagProps) => {
          // console.log(value);
          return (
            value.map((option, index) => (
              <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          );
        }}
        renderInput={(params) => {
          params.inputProps.value = input;
          return (
            <TextField
              {...params}
              variant="filled"
              label="Tags"
              placeholder="#Tag"
              onChange={handleChange}
              fullWidth
            />
          );
        }}
        renderOption={(option) => {
          return (
            <Grid id="option" container alignItems="center">
              <Grid item xs>
                <Typography variant="body2" color="textSecondary" onClick={() => postHandler(option)}>
                  {option}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
    </div>
  );
}
