import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));


function FormControl(props) {
    return props.validated !== false ?
        UncontrolledTextField(props) :
        ValidationTextFields(props)

}

function ValidationTextFields(props) {
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <div className='ValidationTextFields'>
                <TextField
                    error
                    label={props.label}
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    helperText={props.helperText}
                    onChange={props.onChange}
                    className={classes.textField}
                    margin="normal"
                />
            </div>

        </form>
    );
}

function UncontrolledTextField(props) {
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <div className='UncontrolledTextField'>
                <TextField
                    required
                    label={props.label}
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    helperText={props.helperText}
                    onChange={props.onChange}
                    className={classes.textField}
                    margin="normal"
                />
            </div>
        </form>
    )
}
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

export {
    FormControl,
    Footer
}

