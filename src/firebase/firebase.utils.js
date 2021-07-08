import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDkaXgLGnTXqXC4uS79A18AwsDeRriH_3U",
    authDomain: "crwn-db-3001f.firebaseapp.com",
    projectId: "crwn-db-3001f",
    storageBucket: "crwn-db-3001f.appspot.com",
    messagingSenderId: "984534593061",
    appId: "1:984534593061:web:5a8227e1bb40aa7892d9cc",
    measurementId: "G-WE9FBYYZJD"
}



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`/users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        console.log('additionalData ',additionalData);

        try {
            await userRef.set({
                displayName: displayName,
                email: email,
                createdAt: createdAt,
                ...additionalData
            })
        } catch (e) {
            console.log('error creating user ',e.message);
        }
    }

    return userRef;
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;



