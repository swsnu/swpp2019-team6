/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1),
  },
  allMargin: {
    margin: theme.spacing(1),
  },
  fieldSection: {
    margin: theme.spacing(2),
  },
  inputField: {
    padding: theme.spacing(1),
  },
  helperText: {
    marginTop: theme.spacing(1),
  },
  bigAvatar: {
    width: 200,
    height: 200,
  },
}));

// current user info: email, nickname, message
// text fields: currentPasswordField, newPasswordField,
// confirmNewPasswordField, newNicknameField, newMessageField
// for section status: passwordExpanded, nicknameExpanded, messageExpanded
// for closing sections: onOpenClicked, onCloseClicked
// for changing fields: onInputChanged
// function: onPasswordConfirmed, onNicknameConfirmed, onMessageConfirmed
// for validation: password_checked, password_helperText, nickname_checked, nickname_helperText
// clickCheckNickname
const EditUserInfo = ({
  email, nickname, message,
  passwordExpanded, nicknameExpanded, messageExpanded,
  onOpenClicked, onCloseClicked,
  onPasswordConfirmed, onNicknameConfirmed, onMessageConfirmed,
  currentPasswordField, newPasswordField,
  confirmNewPasswordField, newNicknameField, newMessageField,
  onInputChanged,
  password_checked, password_helperText, nickname_checked, nickname_helperText,
  clickCheckNickname,
  profilePhotoChanged,
  imagePreviewUrl,
  onChangeProfilePhoto,
  onClickProfilePhotoConfirm,
}) => {
  const classes = useStyles();
  const imgsrc = imagePreviewUrl || '/images/default_profile_image.png';
  return (
    <div>
      <Typography variant="h5" align="left" color="textPrimary" className={classes.section}>
        Profile Photo
      </Typography>
      <label htmlFor="icon-button-file">
        <IconButton color="primary" className={classes.button} component="span">
          <Avatar
            alt="IMAGE NOT FOUND"
            src={imgsrc}
            className={classes.bigAvatar}
          />
        </IconButton>
      </label>
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        style={{ visibility: 'hidden' }}
        onChange={onChangeProfilePhoto}
      />
      <br />
      <Button
        id="profilePhotoConfirmButton"
        size="medium"
        variant="contained"
        color="primary"
        className={classes.allMargin}
        disabled={!profilePhotoChanged}
        onClick={() => onClickProfilePhotoConfirm()}
      >
        Confirm
      </Button>
      <Divider className={classes.divider} />
      <Typography variant="h5" align="left" color="textPrimary" className={classes.section}>
        Email
      </Typography>
      <Typography variant="body1" align="left" className={classes.section}>
        {email}
      </Typography>
      <Divider className={classes.divider} />

      <Typography variant="h5" align="left" color="textPrimary" className={classes.section}>
        Password
      </Typography>
      {passwordExpanded ? (
        <>
          <div className={classes.fieldSection}>
            <div>
              <Typography variant="body2" align="left" color="textPrimary" className={classes.helperText}>
                Current Password
              </Typography>
              <TextField
                id="currentPasswordField"
                onChange={(e) => onInputChanged(e, 'currentPasswordField')}
                value={currentPasswordField}
                className={classes.inputField}
                type="password"
              />
            </div>
            <div>
              <Typography variant="body2" align="left" color="textPrimary" className={classes.helperText}>
                New Password
              </Typography>
              <TextField
                id="newPasswordField"
                onChange={(e) => onInputChanged(e, 'newPasswordField')}
                value={newPasswordField}
                className={classes.inputField}
                type="password"
              />
            </div>
            <div>
              <Typography variant="body2" align="left" color="textPrimary" className={classes.helperText}>
                New Password Confirmation
              </Typography>
              <TextField
                id="confirmNewPasswordField"
                onChange={(e) => onInputChanged(e, 'confirmNewPasswordField')}
                value={confirmNewPasswordField}
                className={classes.inputField}
                helperText={password_helperText}
                type="password"
              />
            </div>
          </div>
          <Button
            id="passwordConfirmButton"
            size="medium"
            color="primary"
            variant="contained"
            className={classes.allMargin}
            onClick={onPasswordConfirmed}
            disabled={!currentPasswordField || !password_checked}
          >
            Confirm
          </Button>
          <Button
            id="passwordCancelButton"
            size="medium"
            variant="contained"
            className={classes.allMargin}
            onClick={() => onCloseClicked('passwordExpanded')}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button
          id="passwordChangeButton"
          size="medium"
          variant="contained"
          color="primary"
          className={classes.allMargin}
          onClick={() => onOpenClicked('passwordExpanded')}
        >
            Change
        </Button>
      )}
      <Divider className={classes.divider} />

      <Typography variant="h5" align="left" color="textPrimary" className={classes.section}>
        Nickname
      </Typography>
      {nicknameExpanded ? (
        <>
          <div className={classes.fieldSection}>
            <TextField
              id="newNicknameField"
              onChange={(e) => onInputChanged(e, 'newNicknameField')}
              value={newNicknameField}
              className={classes.inputField}
              helperText={nickname_helperText}
            />
            <Button
              id="nicknameCheckButton"
              size="small"
              variant="contained"
              onClick={clickCheckNickname}
            >
              Check Nickname
            </Button>
          </div>
          <Button
            id="nicknameConfirmButton"
            size="medium"
            color="primary"
            variant="contained"
            className={classes.allMargin}
            onClick={onNicknameConfirmed}
            disabled={!nickname_checked}
          >
            Confirm
          </Button>
          <Button
            id="nicknameCancelButton"
            size="medium"
            variant="contained"
            className={classes.allMargin}
            onClick={() => onCloseClicked('nicknameExpanded')}
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" align="left" className={classes.section}>
            {nickname}
          </Typography>
          <Button
            id="nicknameChangeButton"
            size="medium"
            variant="contained"
            color="primary"
            className={classes.allMargin}
            onClick={() => onOpenClicked('nicknameExpanded')}
          >
              Change
          </Button>
        </>
      )}
      <Divider className={classes.divider} />

      <Typography variant="h5" align="left" color="textPrimary" className={classes.section}>
        Message
      </Typography>
      {messageExpanded ? (
        <>
          <div className={classes.fieldSection}>
            <TextField
              id="newMessageField"
              onChange={(e) => onInputChanged(e, 'newMessageField')}
              value={newMessageField}
              className={classes.inputField}
              multiline
              fullWidth
            />
          </div>
          <Button
            id="messageConfirmButton"
            size="medium"
            color="primary"
            variant="contained"
            className={classes.allMargin}
            onClick={onMessageConfirmed}
          >
            Confirm
          </Button>
          <Button
            id="messageCancelButton"
            size="medium"
            variant="contained"
            className={classes.allMargin}
            onClick={() => onCloseClicked('messageExpanded')}
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" align="left" className={classes.section}>
            {message}
          </Typography>
          <Button
            id="messageChangeButton"
            size="medium"
            variant="contained"
            color="primary"
            className={classes.allMargin}
            onClick={() => onOpenClicked('messageExpanded')}
          >
              Change
          </Button>
        </>
      )}
      <Divider className={classes.divider} />

    </div>
  );
};

export default EditUserInfo;
