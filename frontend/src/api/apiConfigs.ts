import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

interface IApi {
  http: AxiosInstance | undefined;
  token: string | undefined;
}

class Api implements IApi {
  http: AxiosInstance | undefined;
  token: string | undefined;

  constructor() {
    console.log('api url', process.env.NEXT_PUBLIC_BACKEND_BASE_URL);
    this.http = axios.create({
      baseURL: 'http://localhost:8000/api',
      withCredentials: true,
    });
    this.handleError = this.handleError.bind(this);

    this.http.interceptors.response.use(this.handleSuccess, this.handleError);
    this.token = Cookies.get('accessToken');
  }

  handleSuccess(response: any) {
    return response;
  }

  async handleError(error: any) {
    const errorObj = {
      response: error?.response?.data,
      statusCode: error?.response?.status,
    };
    return Promise.reject(errorObj);
  }
}
const ApiClient = new Api();
export default ApiClient;
