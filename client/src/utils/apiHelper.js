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

  //Send the selected motions to the backend to send it to the robot through the socket.io connection.
  postRobotMotions: (data) => {
    return axios.post(`/api/users/robotmotions`, data);
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
