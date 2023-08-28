import React from 'react';

const Tags = ({ onTagChange, tag }) => {
	return (
		<div className='tag'>
			<select
				onChange={onTagChange}
				className="form-select form-select-md mb-3"
				
				aria-label=".form-select-lg example"
				value={tag}
			>
				<option>Select Tag</option>
				<option value="Home">Home</option>
				<option value="School">School</option>
			</select>
		</div>
	);
};

export default Tags;
