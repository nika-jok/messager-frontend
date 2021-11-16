const ACTION_SET_SEARCHED_LIST = 'ACTION_SET_SEARCHED_LIST';

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_SET_SEARCHED_LIST:
    return {
      ...state,
      list: action.payload,
    };
  default:
    return state;
  }
};
