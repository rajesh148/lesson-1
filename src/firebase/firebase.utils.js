import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBpBb47B9i0OTD-gru4SIpsWJy0rYnGVEI",
    authDomain: "e-commers-db.firebaseapp.com",
    databaseURL: "https://e-commers-db.firebaseio.com",
    projectId: "e-commers-db",
    storageBucket: "e-commers-db.appspot.com",
    messagingSenderId: "324894895031",
    appId: "1:324894895031:web:22c1ad43d1ca9e0b07d632",
    measurementId: "G-RBPFF2XS8G"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;