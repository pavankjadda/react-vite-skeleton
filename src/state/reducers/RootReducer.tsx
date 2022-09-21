import { AnyAction, combineReducers, Reducer } from 'redux';
import { preferencesReducer } from './PreferencesReducer';
import { userReducer } from './UserReducer';
import { createAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { bookApi } from '../api/bookApi';
import { bookManagerSlice } from './BookEntityReducer';

/**
 * Combine all reducers into Root Reducer
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
const allReducers = combineReducers({
	user: userReducer,
	bookManager: bookManagerSlice.reducer,
	preferences: preferencesReducer,
	[bookApi.reducerPath]: bookApi.reducer,
});

/**
 * Define Reset Store Form Action
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const resetReduxStore = createAction('core/resetReduxStore');

/**
 * Reset Store when loaded login page
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
	if (action.type === resetReduxStore.type) {
		state = undefined;
	}
	return allReducers(state, action);
};
