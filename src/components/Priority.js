import React from 'react';

const Priority = ({ onPriorityChange, priority }) => {
	return (
		<div className="priority">
			<select
				onChange={onPriorityChange}
				className="form-select form-select-lg mb-3"
				style={{ width: '40%' }}
				aria-label=".form-select-lg example"
				value={priority}
			>
				<option>Priority:</option>
				<option value="High">High</option>
				<option value="Medium">Medium</option>
				<option value="Low">Low</option>
			</select>
		</div>
	);
};

export default Priority;
