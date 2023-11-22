import React from 'react';

export default function Unauthorized(): React.JSX.Element {
	return (
		<div>
			<h2 className="text-danger">You are not authorized to view this page</h2>
		</div>
	);
}
