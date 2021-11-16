import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: 300,
    flexDirection: 'row-reverse'
  },
  icon: {
    fontSize: 40,
  }
}));
function Me(props) {
  const classes = useStyles();
  const { callback } = props;
  return (
    <div className={classes.root}>
      <AddCircleIcon 
        className={classes.icon}
        onClick={callback}
        color='primary'
      />
    </div>
  );
}

export default Me;
