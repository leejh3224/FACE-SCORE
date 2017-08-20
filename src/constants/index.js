import auth from "./auth";
import firebase from "./firebase";
import facecard from './facecard'
import userscore from './userscore'
import confirm from './confirm'
import toast from './toast'
import search from './search'

export default {
  ...auth,
  ...firebase,
  ...facecard,
  ...userscore,
  ...confirm,
  ...toast,
  ...search
};
