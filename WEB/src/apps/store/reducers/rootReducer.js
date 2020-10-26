import { combineReducers } from 'redux';
import problem from './problem.reducer';
import match from './match.reducer'
import replay from './replay.reducer'
import rankingProblem from './rankingProblem.reducer'
import auth from "../../redux/reducers/auth"
import addProblem from "../reducers/addProblem.reducer"
import submitRegister from "./register.reducer";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage/session'


const rootReducer = combineReducers({
  auth,
  problem,
  match,
  replay,
  // rankingProblem,
  addProblem,
  submitRegister
});

const persistConfig = {
  key: "root",
  storage: storage,
}

export default persistReducer(persistConfig, rootReducer);