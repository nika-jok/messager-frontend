const ACTION_SET_EMAIL = 'ACTION_SET_EMAIL';
const ACTION_SET_CODE = 'ACTION_SET_CODE';
const ACTION_SET_TOKEN = 'ACTION_SET_TOKEN';
const ACTION_SET_ID = 'ACTION_SET_ID';
export const setEmail = (email) => ({
  type: ACTION_SET_EMAIL,
  payload: email,
});
export const setId = (id) => ({
  type: ACTION_SET_ID,
  payload: id,
});

export const setCode = (code) => ({
  type: ACTION_SET_CODE,
  payload: code,
});

export const setToken = (token) => ({
  type: ACTION_SET_TOKEN,
  payload: token,
});
