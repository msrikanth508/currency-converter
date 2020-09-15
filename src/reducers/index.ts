import { combineReducers } from "redux";
import pockets from "./pockets";
import exchangeRates from "./exchangeRates";

const rootReducer = combineReducers({
  pockets,
  exchangeRates,
});

export default rootReducer;
