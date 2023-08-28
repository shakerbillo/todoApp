import React from 'react';

const Priority = ({ onPriorityChange, priority }) => {
	return (
		<div className="priority">
			<select
				onChange={onPriorityChange}
				className="form-select form-select-md mb-3"
				
				aria-label=".form-select-lg example"
				value={priority}
			>
				<option>Select Priority</option>
				<option value="High">High</option>
				<option value="Medium">Medium</option>
				<option value="Low">Low</option>
			</select>
		</div>
	);
};

export default Priority;
