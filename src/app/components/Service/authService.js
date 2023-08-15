import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import firebaseApp from '../Firebase/firebase';

class AuthService {
  login() {
    console.log('Attempting login...');
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(auth, provider);
  }
  getLoginResult() {
    console.log('Fetching login result...');
    const auth = getAuth(firebaseApp);
    return getRedirectResult(auth)
      .then((result) => {
        console.log('Login result received:', result);
        return result;
      })
      .catch((error) => {
        console.error('Error getting login result:', error);
        throw error;
      });
  }
  getCurrentUserToken() {
    const auth = getAuth(firebaseApp);
    return auth.currentUser.getIdToken(true);
  }
}

export default AuthService;
