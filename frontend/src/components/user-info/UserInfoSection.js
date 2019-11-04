import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  travelList: {
    padding: theme.spacing(2),
  },
}));

const UserInfoSection = ({
  nickname, register_date, status_message, num_plans, num_likes, num_forked, user_photo,
}) => {
  const classes = useStyles();

  return (
    <div>
      UserInfoSection
    </div>
  );
};

export default UserInfoSection;
