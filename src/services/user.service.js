import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:5000/";
class UserService {

  getSalesData(start_date, end_date, hierarchy1_id) {
    return axios.get(`${API_URL}getSales/totalQtAndRev`, 
    { 
      params : {
        start_date: start_date,
        end_date: end_date,
        hierarchy1_id: hierarchy1_id
      },
      headers: authHeader()
    });
  }

  getAggregatedSalesData(start_date, end_date, city_id) {
    return axios.get(`${API_URL}getSales/aggregated`, 
    { 
      params : {
        start_date: start_date,
        end_date: end_date,
        city_id: city_id
      },
      headers: authHeader()
    });
  }
}
export default new UserService();
