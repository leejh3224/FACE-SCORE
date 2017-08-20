import { combineReducers } from "redux";
import facecards from './facecards'
import auth from "./auth";
import userscores from './userscores'
import confirm from './confirm'
import toast from './toast'
import search from './search'

const rootReducer = combineReducers({
  auth,
  facecards,
  userscores,
  confirm,
  toast,
  search
});

export default rootReducer;
