import {createAction, createReducer} from "@reduxjs/toolkit";

/**
 * Initialize the state
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
const initialState = {drawerOpen: true};


/**
 * Define Protocol Document Search Form Actions
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const toggleDrawerStatus = createAction('preferences/toggleDrawerStatus');


/**
 * Define Protocol Document Search Form Reducer that handles actions
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const preferencesReducer = createReducer(initialState, (builder) => {
    builder.addCase(toggleDrawerStatus, (state) => {
        state.drawerOpen = !state.drawerOpen;
    });
});
