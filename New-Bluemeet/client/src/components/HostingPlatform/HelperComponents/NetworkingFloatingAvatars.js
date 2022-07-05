import React from 'react';
import './../Styles/networking.scss';

import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ReactFloaterJs from 'react-floaterjs';

import Faker from 'faker';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  large3: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },

  large4: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },

  large5: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

const FloatingAvatars = () => {
  const classes = useStyles();
  return (
    <div className="floating-avatars-wrapper pt-5 mb-5">
      <div className={`${classes.root} d-flex flex-row justify-content-between`}>
        <div className="mt-5 pt-5">
          <ReactFloaterJs>
            <Avatar
              alt="Travis Howard"
              src={Faker.image.avatar()}
              className={classes.large3}
            />
          </ReactFloaterJs>
        </div>

        <div className="mt-5 pt-5">
          <ReactFloaterJs>
            <Avatar
              alt="Travis Howard"
              src={Faker.image.avatar()}
              className={classes.large}
            />
          </ReactFloaterJs>
        </div>

        <div className="mt-1 pt-5">
          <ReactFloaterJs>
            <Avatar
              alt="Travis Howard"
              src={Faker.image.avatar()}
              className={classes.large4}
            />
          </ReactFloaterJs>
        </div>

        <div className="mt-5 pt-5">
          <ReactFloaterJs>
            <Avatar
              alt="Travis Howard"
              src={Faker.image.avatar()}
              className={classes.large5}
            />
          </ReactFloaterJs>
        </div>

        <div>
          <ReactFloaterJs>
            <Avatar
              alt="Travis Howard"
              src={Faker.image.avatar()}
              className={classes.large3}
            />
          </ReactFloaterJs>
        </div>
      </div>
    </div>
  );
};

export default FloatingAvatars;
