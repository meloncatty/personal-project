import { db } from './firebase'

//user is created as an object with the username and email properties, stored on the users/${id} resource path
export const doCreateUser = (id, username, email) => 
  db.ref(`users/${id}`).set({
    username,
    email
  })

//write user data to db
export const postArticle = (id, username, email, articleData, postKey) => {
  db().ref(`users/${id}`).update({
    username,
    email,
    articleData,
    postKey
  })
}

//users are retrieved from the general user’s entity resource path
export const onceGetUsers = () => 
  db.ref('users').once('value')