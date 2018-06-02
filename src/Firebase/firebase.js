// The file where all the configuration goes that you have seen previously on your Firebase dashboard. In addition, Firebase itself will be instantiated in this file.

import firebase from 'firebase/app'
import * as auth from './auth'

const config = {
  apiKey: "AIzaSyA68pItP0U-uSDF9nUE_XJKowbbTpaPNbA",
  authDomain: "sos-search-open-source.firebaseapp.com",
  databaseURL: "https://sos-search-open-source.firebaseio.com",
  projectId: "sos-search-open-source",
  storageBucket: "sos-search-open-source.appspot.com",
  messagingSenderId: "16809252461",
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()

export {
  auth,
  firebase,
}