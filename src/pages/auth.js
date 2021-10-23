import axios from "axios";

class AuthenticationService {
  constructor() {
    this.HOST_URI = process.env.REACT_APP_HOST_URI
  }

  signin = (email, password) => {
    return axios
      .post(this.HOST_URI+"/api/v1/auth/login", { email, password })
      .then((response) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  signOut() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  register = async (name, email, password) => {
    return axios.post(this.HOST_URI+"/api/v1/auth/register", {
      name,
      email,
      password,
    })
    .then((response) => {
      this.signin(email, password);
    })
    .catch(er => {
      console.log(er)
    })
  };

  getCurrentUser() {
    if(localStorage.getItem("user") != null) {
      axios.post(this.HOST_URI+"/api/v1/auth/user/find", {
        _id: JSON.parse(localStorage.getItem("user")).data.id
      })
      .then(result => {

      })
      .catch(err => {
        this.signOut()
      })
    }
    return JSON.parse(localStorage.getItem("user"));
  }

  getLocalCurrentuser() {
    if(localStorage.getItem("user") != null) {
      return JSON.parse(localStorage.getItem("user"));
    }
  }
}

export default new AuthenticationService();
