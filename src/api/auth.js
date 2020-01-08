import firebase from 'firebase';

import { OAuthProvider } from 'constant';
import app from './app';

const firebaseAuth = app.auth();

const { FACEBOOK, GOOGLE, TWITTER, GITHUB } = OAuthProvider;

export const auth = {
  loginWithOAuth: (type) => {
    const getOAuthProvider = () => {
      switch (type) {
        case FACEBOOK:
          return new firebase.auth.FacebookAuthProvider();
        case GOOGLE:
          return new firebase.auth.GoogleAuthProvider();
        case TWITTER:
          return new firebase.auth.TwitterAuthProvider();
        case GITHUB:
          return new firebase.auth.GithubAuthProvider();
        default:
          throw new Error('Provider is not supported.');
      }
    };

    return firebaseAuth.signInWithPopup(getOAuthProvider());
  },

  logout: () => firebaseAuth.signOut(),

  onAuthStateChanged: () => new Promise((resolve, reject) => {
    firebaseAuth.onAuthStateChanged(
      user => resolve(user),
      error => reject(error)
    );
  }),

  loginWithEmail: (email, password) => firebaseAuth.signInWithEmailAndPassword(email, password),

  registerWithEmail: (email, password) => firebaseAuth.createUserWithEmailAndPassword(email, password),

  updatePassword: newPassword => firebaseAuth.currentUser.updatePassword(newPassword),

  updateUserProfile: u => firebaseAuth.currentUser.updateProfile(u).then(
    () => firebaseAuth.currentUser,
    error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })
  ),

  resetPasswordEmail: email => firebaseAuth.sendPasswordResetEmail(email).then(
    () => ({ message: 'Email sent' }),
    error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })
  ),

  sendEmailVerification: () => firebaseAuth.currentUser.sendEmailVerification().then(
    () => ({ message: 'Email sent' }),
    error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })
  )
};
