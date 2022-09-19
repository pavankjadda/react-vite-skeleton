/**
 * Returns `true` if the provided string is `undefined`, `null` or empty '' string otherwise returns false
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const isUndefinedOrNullOrEmpty = (value: string | null | undefined): boolean =>
	value === undefined || value === 'undefined' || value === 'null' || value === null || value === '';
