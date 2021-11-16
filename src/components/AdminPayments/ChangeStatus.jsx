import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ApiHelper from '../../helpers/api/admin';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 600,
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    flexWrap: 'wrap'
  },
  mainInfo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',

  },
  element: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',

  }
}));

const translate = {
  'requested': 'В обработке',
  'approved': 'Проведен',
  'declined': 'Отменен',
};

export default function AdminPayments(props) {
  const { changeStatus, el } = props;
  const { id } = el;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const localChange = (status) => {
    changeStatus(id, status);
    setAnchorEl(null);
    return;
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.mainInfo}>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {translate[el.status]}
      </Button>
      {
        el.status === 'requested' ? <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => localChange('requested')}>В обработке</MenuItem>
          <MenuItem onClick={() => localChange('approved')}>Проведен</MenuItem>
          <MenuItem onClick={() => localChange('declined')}>Отменен</MenuItem>
        </Menu> :
          null
      }
      
    </div>
  );
}
