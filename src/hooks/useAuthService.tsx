import useCookies from '@js-smart/react-cookie-service';
import { ROLE_DATA_USER, ROLE_READONLY_USER, ROLE_SYS_ADMIN } from '../constants/AuthorityConstants';
import { User } from '../features/user/User';

export default function useAuthService(): {
	getCurrentUser: () => User | undefined;
	isDataUser: () => boolean;
	isUserLoggedIn: () => boolean;
	isLoggedIn: () => boolean;
	isReadOnlyUser: () => boolean;
	isSysAdmin: () => boolean;
} {
	const { check, getCookie } = useCookies();

	/**
	 * Returns `true` if the user Logged In otherwise returns false
	 *
	 * @author Pavan Kumar Jadda
	 * @since 1.0.0
	 */
	function isUserLoggedIn(): boolean {
		return getCookie('isLoggedIn') === 'true';
	}

	/**
	 * Returns `true` if the user Logged In otherwise returns false
	 *
	 * @author Pavan Kumar Jadda
	 * @since 1.0.0
	 */
	function isLoggedIn(): boolean {
		return getCookie('isLoggedIn') === 'true';
	}

	/**
	 * Returns true if the user has Read-Only Role
	 *
	 * @author Pavan Kumar Jadda
	 * @since 1.0.0
	 */
	function isReadOnlyUser(): boolean {
		return getCurrentUser()?.authorities.find((authority) => authority.name === ROLE_READONLY_USER) !== undefined;
	}

	/**
	 * Returns true if the user has Data User Role
	 *
	 * @author Pavan Kumar Jadda
	 * @since 1.0.0
	 */
	function isDataUser(): boolean {
		return getCurrentUser()?.authorities.find((authority) => authority.name === ROLE_DATA_USER) !== undefined;
	}

	/**
	 * Returns true if the user is Sys Admin Role
	 *
	 * @author Pavan Kumar Jadda
	 * @since 1.0.0
	 */
	function isSysAdmin(): boolean {
		return getCurrentUser()?.authorities.find((authority) => authority.name === ROLE_SYS_ADMIN) !== undefined;
	}

	/**
	 * Returns User object if exists
	 *
	 * @author Pavan Kumar Jadda
	 * @since 1.0.0
	 */
	function getCurrentUser(): User | undefined {
		return check('currentUser') ? (JSON.parse(getCookie('currentUser')) as User) : undefined;
	}

	return { getCurrentUser, isLoggedIn, isUserLoggedIn, isReadOnlyUser, isDataUser, isSysAdmin };
}
