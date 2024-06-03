import React from 'react';
import { Link, Link as MuiLink } from '@mui/material';

/**
 * Reusable custom React Router Link component.
 *
 * @param props Properties of the React Node
 *
 * @author Pavan Kumar Jadda
 * @since 0.3.2
 */
export default function NextLink(props: { href: string; linkText: string; target?: string }): React.JSX.Element {
	return (
		<MuiLink component={Link} href={props.href} className={'next-btn-link'} target={props.target ?? '_self'} underline="hover">
			{props.linkText}
		</MuiLink>
	);
}
