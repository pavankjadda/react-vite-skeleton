import { createAction, createReducer, Draft } from '@reduxjs/toolkit';
import { User } from '../../features/user/User';

/**
 * Initialize the state
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
const initialState: User = {
	id: 0,
	username: '',
	firstName: '',
	lastName: '',
	email: '',
	authorities: [],
	token: '',
	active: false,
	displayName: '',
	credentialsNonExpired: false,
	accountNonLocked: false,
	accountNonExpired: false,
	tokenExpirationDate: new Date(),
};

/**
 * Define User Actions
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const createUser = createAction<User>('user/createUser');
export const updateUser = createAction<User>('user/updateUser');
export const clearUser = createAction('user/clearUser');

/**
 * Update User in Redux Store with new payload
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
function updateUserInState(state: Draft<User>, payload: User) {
	state.id = payload?.id;
	state.username = payload?.username;
	state.firstName = payload?.firstName;
	state.lastName = payload?.lastName;
	state.email = payload?.email;
	state.authorities = payload?.authorities;
	state.token = payload?.token;
	state.active = payload?.active;
	state.displayName = payload?.displayName;
	state.credentialsNonExpired = payload?.credentialsNonExpired;
	state.accountNonLocked = payload?.accountNonLocked;
	state.accountNonExpired = payload?.accountNonExpired;
	state.tokenExpirationDate = payload?.tokenExpirationDate;
}

/**
 * Define User Reducer that handles actions
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const userReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(createUser, (state, action) => {
			updateUserInState(state, action.payload);
		})
		.addCase(updateUser, (state, action) => {
			updateUserInState(state, action.payload);
		})
		.addCase(clearUser, (state) => {
			updateUserInState(state, initialState);
		});
});
