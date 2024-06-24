import { USER_TOKEN_KEY } from "./authService";

const authHeader = {
  accessToken: '',

  initializeToken: (accessToken: string) => {
    authHeader.accessToken = accessToken;
  },

  clearToken: () => {
    authHeader.accessToken = '';
  },

  getToken: () => {
    return localStorage.getItem(USER_TOKEN_KEY);
  },

  getAuthHeader: () => {
    if (!authHeader.accessToken) {
      const token = authHeader.getToken();

      if (token) {
        authHeader.initializeToken(token);
      }
    }

    if (authHeader.accessToken) {
      return {Authorization: 'Bearer ' + authHeader.accessToken};
    } else {
      return {};
    }
  },
};

export default authHeader;
