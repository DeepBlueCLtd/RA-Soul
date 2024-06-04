import axios from "axios";
import { AuthProvider } from "ra-core";

const refreshToken = async (apiUrl: string) => {
  const url = `${apiUrl}/auth/token/refresh`;
  await axios.get(url, { withCredentials: true });
};

export const authProvider = (apiUrl: any): AuthProvider => ({
  login: ({ username, password }) => {
    const url = `${apiUrl}/auth/token/obtain`;

    return axios
      .post(url, { fields: { username, password } }, { withCredentials: true })
      .then((response) => {
        return Promise.resolve();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  logout: () => {
    const url = `${apiUrl}/auth/logout`;

    return axios
      .get(url, { withCredentials: true })
      .then((response) => {
        return Promise.resolve();
      })
      .catch((error) => {
        return Promise.resolve();
      });
  },

  checkAuth: () => {
    return Promise.resolve();
  },

  checkError: async (error) => {
    const status = error.response.status;

    if (status === 401 || status === 403) {
      //if access token is expired then send a request to refresh the access token
      try {
        await refreshToken(apiUrl);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject();
      }
    }

    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),

  changePassword: (currentPassword: string, newPassword: string) => {
    const url = `${apiUrl}/auth/change-password`;

    return axios
      .put(
        url,
        { fields: { currentPassword, newPassword } },
        { withCredentials: true },
      )
      .then((response) => {
        return { success: true, message: "Password changed successfully" };
      })
      .catch((error) => {
        return { success: false, message: "Password change failed" };
      });
  },
});
