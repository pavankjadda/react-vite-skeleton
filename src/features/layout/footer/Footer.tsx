import React from 'react';
import styled from '@emotion/styled';
import theme from '../../../theme';

const FooterWrapper = styled.footer`
  padding: ${theme.spacing(3, 2)}
  margin-top: auto;
`;

export default function Footer(): React.JSX.Element {
	return (
		<FooterWrapper>
			<div className="row">
				<h6 className="app-flex-justify-center">Developed by CCR OIT</h6>
			</div>
		</FooterWrapper>
	);
}
