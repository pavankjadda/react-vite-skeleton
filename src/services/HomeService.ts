import axios, { AxiosResponse } from "axios";
import { User } from "../components/user/User";
import { USER_API_URL } from "../constants/ApiConstants";

/**
 * Utility class for Home Page operations
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export class HomeService {
  /**
   * Get user information
   *
   * @author Pavan Kumar Jadda
   * @since 1.0.0
   */
  static getUserInformation(): Promise<AxiosResponse<User>> {
    return axios.get<User>(process.env.REACT_APP_BASE_URL + USER_API_URL + "/home");
  }
}
