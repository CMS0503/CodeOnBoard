import { combineReducers } from 'redux';
import problem from './problem.reducer';
import match from './match.reducer'
import replay from './replay.reducer'
import rankingProblem from './rankingProblem.reducer'
import auth from "../../store/reducers/auth.react"
import addProblem from "../reducers/addProblem.reducer"
import submitRegister from "./register.reducer";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage/session'

const appReducer = combineReducers({
  auth,
  problem,
  match,
  replay,
  // rankingProblem,
  addProblem,
  submitRegister
});

const rootReducer = (state, action) => {
  if(action.type === 'LOGOUT_USER'){
    storage.removeItem('persist:root')
    state = undefined
  }
  else if(action.type === 'CLEAR'){
    state = undefined
  }
  return appReducer(state, action)
}

const persistConfig = {
  key: "root",
  storage: storage,
}

export default persistReducer(persistConfig, rootReducer);