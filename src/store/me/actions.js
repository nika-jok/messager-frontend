const ACTION_SET_EMAIL = 'ACTION_SET_EMAIL';
const ACTION_SET_USERNAME = 'ACTION_SET_USERNAME';
const ACTION_SET_FIRSTNAME = 'ACTION_SET_FIRSTNAME';
const ACTION_SET_LASTNAME = 'ACTION_SET_LASTNAME';
const ACTION_SET_PHONE = 'ACTION_SET_PHONE';
const ACTION_SET_ABOUT = 'ACTION_SET_ABOUT';
const ACTION_SET_AVATAR = 'ACTION_SET_AVATAR';


export const setEmail = (el) => ({
  type: ACTION_SET_EMAIL,
  payload: el,
});

export const setUsername = (el) => ({
  type: ACTION_SET_USERNAME,
  payload: el,
});

export const setFirstname = (el) => ({
  type: ACTION_SET_FIRSTNAME,
  payload: el,
});

export const setLastname = (el) => ({
  type: ACTION_SET_LASTNAME,
  payload: el,
});

export const setPhone = (el) => ({
  type: ACTION_SET_PHONE,
  payload: el,
});

export const setAbout = (el) => ({
  type: ACTION_SET_ABOUT,
  payload: el,
});

export const setAvatar = (el) => ({
  type: ACTION_SET_AVATAR,
  payload: el,
});
