import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const providerGithub = new firebase.auth.GithubAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signInWithGithub = () => auth.signInWithPopup(providerGithub);

export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const database = getFirestore(app);

export const getUsers = () => {
  const userRef = collection(database, "users");
  return new Promise((resolve, reject) => {
    onSnapshot(userRef, (result) => {
      const data =
        result.docs.reduce((acc, doc) => {
          return [...acc, { ...doc.data() }];
        }, []) || [];
      resolve(data);
    });
  });
};


export async function sendMessage(roomId, user, text) {
  try {
      await addDoc(collection(database, 'chat-rooms', roomId, 'messages'), {
          uid: user.uid,
          displayName: user.displayName,
          text: text.trim(),
          timestamp: serverTimestamp(),
      });
  } catch (error) {
      console.error(error);
  }
}

export function getMessages(roomId, callback) {
  return onSnapshot(
      query(
          collection(database, 'chat-rooms', roomId, 'messages'),
          orderBy('timestamp', 'asc')
      ),
      (querySnapshot) => {
          const messages = querySnapshot.docs.map((x) => ({
              id: x.id,
              ...x.data(),
          }));

          callback(messages);
      }
  );
}
