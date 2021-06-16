import axios from "axios";

class AuthenticationService {
  signin = (email, password) => {
      return axios.post("//promotin.herokuapp.com/api/v1/auth/login", {email, password})
        .then(response => {
            console.log(response.data);
          if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data;
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
  }

  signOut() {
    localStorage.removeItem("user");
  }

  register = async(name, email, password) => {
    return axios.post("//promotin.herokuapp.com/api/v1/auth/register", {
      name,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthenticationService();