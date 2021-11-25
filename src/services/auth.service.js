import { BaseService } from './base.service';
import { setRefreshToken, setToken } from '@/utils/storage.util';

class AuthService extends BaseService {
  async login(payload) {
    const { data } = await this.axios.post('/api/auth/login', payload);
    setToken(data?.data?.accessToken);
    setRefreshToken(data?.data?.refreshToken);

    return data;
  }

  async profile() {
    const { data } = await this.axios.get('/api/me');
    return data;
  }

  async logout() {
    setToken('');
    setRefreshToken('');
  }
}

export const authService = new AuthService();
