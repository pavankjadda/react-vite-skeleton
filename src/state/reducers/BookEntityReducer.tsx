import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Book } from '../../types/Book';

/**
 * Define Books Adapter that stores all books entities
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const bookManagerAdapter = createEntityAdapter<Book>({
	// Assume IDs are stored in a field other than `book.id`
	selectId: (book) => book.id,
	// Keep the "all IDs" array sorted based on Protocol Number
	sortComparer: (a, b) => a.isbn.localeCompare(b.isbn),
});

/**
 * Define Books Slice
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const bookManagerSlice = createSlice({
	name: 'books',
	initialState: bookManagerAdapter.getInitialState(),
	reducers: {
		// Can pass adapter functions directly as case reducers.  Because we're passing this as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
		bookAdded: bookManagerAdapter.addOne,
		bookUpdated: bookManagerAdapter.updateOne,
		bookAddedOrUpdated: bookManagerAdapter.upsertOne,
	},
});

/**
 * Export all {@link bookManagerSlice} actions
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const { bookAdded, bookUpdated, bookAddedOrUpdated } = bookManagerSlice.actions;
