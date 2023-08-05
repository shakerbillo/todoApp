import React from 'react';

const SortOption = ({ sortOrder, onSortChange }) => {
	return (
		<div className="sort">
			<select
				onChange={onSortChange}
				className="form-select form-select-lg mb-3"
				style={{ width: '40%' }}
				aria-label=".form-select-lg example"
				value={sortOrder}
			>
				<option>Sort by:</option>
				<option value="asc">Ascending</option>
				<option value="desc">Descending</option>
				<option value="date">Date</option>
			</select>
		</div>
	);
};

export default SortOption;
