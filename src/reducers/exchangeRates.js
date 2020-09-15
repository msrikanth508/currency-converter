import { UPDATE_RATES } from "../constants";

const initialState = {};

export default function exchangeRates(state = initialState, action) {
  switch (action.type) {
    case UPDATE_RATES:
      return {
        ...action.value,
      };
    default:
      return state;
  }
}
