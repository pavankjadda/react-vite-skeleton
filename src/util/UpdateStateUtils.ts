/**
 * Contains utility methods for {@link UpdateState}
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
import { UpdateState } from "../components/shared/UpdateState";

export class UpdateStateUtils {
    /**
     * Initialize Loading or Update UpdateState
     *
     * @author Pavan Kumar Jadda
     * @since 1.0.0
     */
    static startLoadingOrUpdating(updateState: UpdateState): UpdateState {
        updateState.loading = true;
        updateState.status = undefined;
        updateState.message = "";
        return updateState;
    }

    /**
     * Initialize Loading or Update UpdateState
     *
     * @author Pavan Kumar Jadda
     * @since 1.0.0
     */
    static initializeState(updateState: UpdateState): void {
        updateState.loading = false;
        updateState.status = undefined;
        updateState.message = '';
    }
}
