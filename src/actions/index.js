export const addAllApps = (data) => {
  return {
    type: "addAllApps",
    payload: data,
  };
};

export const addAllStats = (data) => {
  return {
    type: "addAllStats",
    payload: data,
  };
};

export const addStats = (data) => {
  return {
    type: "addStats",
    payload: data,
  };
};
