import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    display: 'inline',
  },
}));

export default function PageName(props) {
  const classes = useStyles();
  const { text } = props;
  return <div className={classes.root}>{text}</div>;
}