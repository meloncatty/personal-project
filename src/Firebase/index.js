// Grouping and exposing all the functionalities from the module to other modules in one file. Thus it shouldn’t be necessary for other modules in your application to access any other file than this one to use its functionalities.

import * as auth from './auth'
import * as firebase from './firebase'
import * as db from './db'

export {
  auth,
  firebase,
  db
}