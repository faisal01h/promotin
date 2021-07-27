import axios from "axios";

class AuthenticationService {
  signin = (email, password) => {
    return axios
      .post("//promotin.herokuapp.com/api/v1/auth/login", { email, password })
      .then((response) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          window.location.href = "/";
        }
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  signOut() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  register = async (name, email, password) => {
    return axios.post("//promotin.herokuapp.com/api/v1/auth/register", {
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
      axios.post("//promotin.herokuapp.com/api/v1/auth/user/find", {
        _id: JSON.parse(localStorage.getItem("user")).data.id
      })
      .then(result => {

      })
      .catch(err => {
        console.log(err)
        //this.signOut()
      })
    }
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthenticationService();
