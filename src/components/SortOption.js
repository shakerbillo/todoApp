import React from 'react';

const SortOption = ({ sortOrder, onSortChange }) => {
	return (
		<div className="sort">
			<button className="btn btn-outline-primary" onClick={onSortChange}>
				Sort {sortOrder === 'ascending' ? 'Descending' : 'Ascending'}
			</button>
		</div>
	);
};

export default SortOption;
