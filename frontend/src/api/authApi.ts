import ApiClient from './apiConfigs';

class AuthApi {
  endPoints = {
    signIn: '/login',
    signUp: '/register',
  };
  async signIn(data: any) {
    return await ApiClient?.http?.post(this.endPoints.signIn, data);
  }
  async signUp(data: any) {
    console.log('data', data);
    return await ApiClient?.http?.post(this.endPoints.signUp, data);
  }
}

export default new AuthApi();
