const initialState = [];

const allApps = (state = initialState, action) => {
  switch (action.type) {
    case "addAllApps":
      return action.payload;
    default:
      return state;
  }
};

export default allApps;
