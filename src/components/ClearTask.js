import React from 'react';

const ClearTask = ({ onClearCompleted, onSelectAll }) => {
	// Add an event handler to the button
	const handleClearCompleted = () => {
		// Call the onClearCompleted function when the button is clicked
		onClearCompleted();
	};

	const handleSelectAll = (e) => {
		onSelectAll(e.target.checked);
	};
	return (
		<>
			<div>
				<div className="clear">
					<button
						className="btn btn-danger btn-md"
						onClick={handleClearCompleted}
					>
						Clear Completed
					</button>
				</div>
				{/* "Select All" Checkbox */}
				<label className="form-check" htmlFor="flexCheckDefault">
					<input
						id="flexCheckChecked"
						type="checkbox"
						className="form-check-input"
						onChange={handleSelectAll}
					/>
					<span className="form-check-label">Select All</span>
				</label>
			</div>
		</>
	);
};

export default ClearTask;
