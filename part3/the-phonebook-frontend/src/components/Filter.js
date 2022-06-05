import React from 'react';

// eslint-disable-next-line react/prop-types
const Filter = ({ value, setter }) => {
	return (
		<div>
            filter shown with
			<input onChange={(e) => setter(e.target.value)} value={value} />
		</div>
	);
};

export default Filter;