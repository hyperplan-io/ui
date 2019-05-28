import { createStore, combineReducers, applyMiddleware } from "redux";
import { loadState, saveState } from "./utils/localStorage";
import { userReducer } from './reducers/UserReducer'

import { asyncDispatchMiddleware } from './middlewares/UserMiddleware';
import { logger } from './middlewares/LoggingMiddleware';

export const foundaMlStore = () => {
  const reducers = combineReducers({
    user: userReducer
  });
  const persistedState = loadState();
  const store = createStore(reducers, persistedState, applyMiddleware(asyncDispatchMiddleware, logger));
  store.subscribe(() => {
    saveState({
      user: store.getState().user
    });
  });
  return store;
};
