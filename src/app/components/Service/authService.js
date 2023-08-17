import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '@src/app/components/Firebase/firebase';
import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = auth;
  }
  isAuthenticated() {
    return !!this.auth.currentUser;
  }
  async login() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(this.auth, provider);
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      throw error;
    }
  }

  async _saveUIDToDatabase(uid) {
    try {
      await axios.post('/api/v1/auth/saveUid', { uid: uid });
    } catch (error) {
      throw error;
    }
  }

  async getUserInfo() {
    try {
      if (!this.auth.currentUser)
        throw new Error('로그인한 사용자가 아닙니다.');

      const idToken = await this.auth.currentUser.getIdToken(true);

      const response = await axios.get('/api/v1/auth/getUserInfo', {
        headers: {
          Authorization: 'Bearer ' + idToken,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('사용자 정보를 가져오는 중 문제가 발생했습니다.');
    }
  }
}

const authService = new AuthService();
export default authService;
