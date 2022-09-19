/**
 * Contains utility methods for {@link ProgressState}
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
import { ProgressState } from '../components/ProgressState';

/**
 * Initialize Loading or Update UpdateState
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const initializeState = (): ProgressState => {
	return {
		loading: false,
		success: false,
		error: false,
		complete: false,
		message: '',
	};
};

/**
 * Initialize Loading or Update UpdateState
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const markLoading = (progressState: ProgressState): ProgressState => {
	progressState.loading = true;
	progressState.success = false;
	progressState.error = false;
	progressState.complete = false;
	progressState.message = '';
	return progressState;
};

/**
 * Initialize Loading or Update UpdateState
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const markSuccess = (progressState: ProgressState, message?: string): ProgressState => {
	progressState.loading = false;
	progressState.success = true;
	progressState.error = false;
	progressState.complete = true;
	progressState.message = message ?? '';
	return progressState;
};

/**
 * Initialize Loading or Update UpdateState
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const markError = (progressState: ProgressState, message?: string): ProgressState => {
	progressState.loading = false;
	progressState.success = false;
	progressState.error = true;
	progressState.complete = true;
	progressState.message = message ?? '';
	return progressState;
};
