import { combineReducers } from "redux";

import allApps from "./AllAppReducer";
import allStats from "./AllStatReducer";
import stats from "./StatReducer";
const allReducers = combineReducers({
  allApps: allApps,
  allStats: allStats,
  stats: stats,
});

export default allReducers;
