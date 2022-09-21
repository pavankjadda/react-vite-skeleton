import { configureStore } from '@reduxjs/toolkit';
import { crmsApi } from './api/crmsApi';
import { rootReducer } from './reducers/RootReducer';

/**
 * Configure Global Redux store
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(crmsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
