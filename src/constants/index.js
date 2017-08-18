import articles from "./articles";
import auth from "./auth";
import feedback from "./feedback";
import firebase from "./firebase";
import facecard from './facecard'
import userscore from './userscore'
import confirm from './confirm'
import toast from './toast'

export default {
  ...articles,
  ...auth,
  ...feedback,
  ...firebase,
  ...facecard,
  ...userscore,
  ...confirm,
  ...toast
};
