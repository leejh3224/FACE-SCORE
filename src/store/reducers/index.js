import { combineReducers } from "redux";
import articles from "./articles";
import facecards from './facecards'
import auth from "./auth";
import feedback from "./feedback";
import userscores from './userscores'
import confirm from './confirm'
import toast from './toast'
import search from './search'

const rootReducer = combineReducers({
  articles,
  auth,
  feedback,
  facecards,
  userscores,
  confirm,
  toast,
  search
});

export default rootReducer;
