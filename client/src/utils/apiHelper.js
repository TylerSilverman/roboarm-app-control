import axios from "axios";

const userController = {
  // Get the current user
  getUser: () => {
    return axios.get(`/api/users/me`);
  },

  // Gets all robot motions
  getRobotMotions: () => {
    return axios.get(`/api/users/robotmotions`);
  },

  // Gets all favorites
  getFavorites: () => {
    return axios.get(`/api/users/favorites`);
  },

  // Post a favorite
  postFavorite: (data) => {
    return axios.post(`/api/users/favorites`, data);
  },
};

export default userController;
