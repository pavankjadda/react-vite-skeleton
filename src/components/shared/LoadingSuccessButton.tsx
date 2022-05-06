import React from 'react';
import variables from '../../assets/css/custom-variables.module.scss';
import {LoadingButton} from "@mui/lab";

const style = {
    backgroundColor: variables.successColor,
    margin: "20px"
};

/**
 * Reusable Success Loading Button
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const LoadingSuccessButton = React.forwardRef((props: any, ref?: any) => {
    return (
        <LoadingButton
            type={props.type}
            startIcon={props.startIcon}
            loading={props.loading}
            style={style}
            loadingPosition="start"
            variant="contained"
            ref={ref}
        >
            {props.children}
        </LoadingButton>
    );
});
