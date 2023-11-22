import axios, { AxiosResponse } from 'axios';
import { User } from '../features/user/User';
import { BASE_API_URL, USER_API_URL } from '../constants/ApiConstants';

/**
 * Utility class to get User information
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export class UserService {
	/**
	 * Get user profile information
	 *
	 * @author Pavan Kumar Jadda
	 * @since 1.0.0
	 */
	static getUserProfileInformation(username: string | undefined): Promise<AxiosResponse<User>> {
		return axios.get<User>(`${BASE_API_URL + USER_API_URL}/authenticate`);
	}
}
