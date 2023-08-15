import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseApp from './firebase';

class AuthService {
  login() {
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
}

export default AuthService;
