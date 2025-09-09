import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API_URL, USER_API_URL } from '../constants/ApiConstants';
import { User } from '../features/user/User';

/**
 * Get user profile information
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const useGetUserProfileInformation = () =>
	useQuery({
		queryKey: ['userProfile'],
		queryFn: () => axios.get<User>(`${BASE_API_URL + USER_API_URL}/authenticate`).then((response) => response.data),
	});
