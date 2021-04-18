const initialState = [];

const stats = (state = initialState, action) => {
  switch (action.type) {
    case "addStats":
      return action.payload;
    default:
      return state;
  }
};

export default stats;
