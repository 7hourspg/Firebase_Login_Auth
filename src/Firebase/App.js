import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey:process.env.REACT_APP_SECRET_KEY,
  authDomain:process.env.REACT_APP_authDomain ,
  projectId: process.env.REACT_APP_projectId,
  storageBucket:process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
