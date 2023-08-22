import React from 'react';

const Tags = ({ onTagChange, tag }) => {
	return (
		<div className='tag'>
			<select
				onChange={onTagChange}
				className="form-select form-select-lg mb-3"
				style={{ width: '40%' }}
				aria-label=".form-select-lg example"
				value={tag}
			>
				<option>Tag:</option>
				<option value="Home">Home</option>
				<option value="School">School</option>
			</select>
		</div>
	);
};

export default Tags;
