import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth/reducers';
import me from './me/reducers';
import contacts from './contacts/reducers';
import users from './users/reducers';
import privateMessages from './private_messages/reducers';
import chatsList from './chats_list/reducers';
import userProfile from './user_profile/reducers';

export default combineReducers({
  routing: routerReducer,
  auth,
  me,
  contacts,
  users,
  privateMessages,
  chatsList,
  userProfile,
});
