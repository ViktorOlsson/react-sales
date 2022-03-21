import axios from "axios";
const API_URL = "http://localhost:5000/";
class AuthService {
  login(email, password) {
    const item = {
      email: email,
      password: password
    };
    let form = new FormData();
    for (const key in item) {
      form.append(key, item[key]);
    };
    return axios
      .post(`${API_URL}login`, form)
      .then(response => {
        sessionStorage.setItem("user", JSON.stringify(response.data));
        // return response.data;
      });
  }
  logout() {
    sessionStorage.removeItem("user");
  }
  register(name, email, password) {
    const item = {
      name: name,
      email: email,
      password: password
    };
    let form = new FormData();
    for (const key in item) {
      form.append(key, item[key]);
    };
    return axios.post(`${API_URL}signup`, form);
  }
  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('user'));;
  }
}
export default new AuthService();