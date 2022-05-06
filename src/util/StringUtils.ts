/**
 * Contains utility methods for String values and related operations
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export class StringUtils {
    /**
     * Returns `true` if the provided string is `undefined`, `null` or empty '' string otherwise returns false
     *
     * @author Pavan Kumar Jadda
     * @since 1.0.0
     */
    static isUndefinedOrNullOrEmpty(value: string | null | undefined): boolean {
        return (
            value === undefined ||
            value === "undefined" ||
            value === "null" ||
            value === null ||
            value === ""
        );
    }
}
