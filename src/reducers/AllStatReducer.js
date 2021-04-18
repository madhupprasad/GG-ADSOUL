const initialState = [];

const allStats = (state = initialState, action) => {
  switch (action.type) {
    case "addAllStats":
      return action.payload;
    default:
      return state;
  }
};

export default allStats;
