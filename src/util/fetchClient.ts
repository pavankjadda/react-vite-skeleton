/**
 * Tiny fetch wrapper for making HTTP requests with TypeScript support.
 * @template T - The expected response type.
 * @param {string} url - The URL to request.
 * @param {RequestInit} [options] - Options for the fetch request.
 * @returns {Promise<T>} - A promise that resolves to the JSON response of type T.
 * @throws {Error} - Throws an error if the response is not OK.
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export async function fetchClient<T>(url: string, options: RequestInit = {}): Promise<T> {
	// Initialize headers object
	const headers = new Headers(options.headers || {});

	// Check if the body is FormData, if not, handle as JSON
	if (options.body instanceof FormData) {
		// Do not set 'Content-Type': 'application/json' for FormData
		// Browser will set the correct headers for FormData
	} else if (typeof options.body === 'object') {
		// If there is a body, and it's an object, stringify it and set JSON header
		options.body = JSON.stringify(options.body);
		headers.set('Content-Type', 'application/json');
	}

	// Merge options with default settings
	const fetchOptions = {
		...options,
		headers,
	};

	// If there is a body, and it's an object, stringify it
	if (fetchOptions.body && typeof fetchOptions.body === 'object') {
		fetchOptions.body = JSON.stringify(fetchOptions.body);
	}

	// Make the fetch request
	const response = await fetch(url, fetchOptions);

	// Check if the response is OK
	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
	}

	// Parse and return the JSON response
	return (await response.json()) as Promise<T>;
}
