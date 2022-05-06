import React from 'react';
import {Button} from "@mui/material";
import variables from '../../assets/css/custom-variables.module.scss';

const style = {
    backgroundColor: variables.successColor,
    margin: "20px"
};

/**
 * Reusable Success Button component
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export const SuccessButton = React.forwardRef((props: any, ref: any) => {
    return (
        <Button className={props.className} style={style} variant="contained" color="primary" type={props.type}
                ref={ref} {...props}>
            {props.children}
        </Button>
    );
});
