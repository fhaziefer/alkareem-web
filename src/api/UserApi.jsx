import axios from "axios";

const apiUrl = process.env.REACT_APP_BASE_URL;

export const searchUser = async (query, page) => {
  try {
    const userData = JSON.parse(window.localStorage.getItem("LOGIN_DATA"));
    const user = await axios.get(
      `${apiUrl}/user/search?keyword=%${query}&page=${page}`,
      {
        headers: {
          Authorization: userData.token,
        },
      }
    );
    return user;
  } catch (error) {
    const errorMessage = error.response.data.errors;
    return errorMessage;
  }
};
