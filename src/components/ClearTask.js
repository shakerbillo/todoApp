import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
const ClearTask = ({ tasks, onClearCompleted, onSelectAll, remaining }) => {
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [selectAllChecked, setSelectAllChecked] = useState(false);
	// Add an event handler to the button
	const handleClearCompleted = () => {
		if (remaining === tasks.length) {
			// There are no completed tasks to clear
			alert('There are no completed tasks to clear.');
		} else {
			// Show the confirmation dialog
			setShowConfirmation(true);
		}
	};
	const handleClearConfirmation = () => {
		// Clear the completed tasks
		onClearCompleted();
		// Close the confirmation dialog
		setShowConfirmation(false);
		// uncheck Select All checkbox after confirmation
		setSelectAllChecked(false);
	};

	const handleCloseConfirmation = () => {
		// Close the confirmation dialog
		setShowConfirmation(false);
	};

	const handleSelectAll = (e) => {
		const isChecked = e.target.checked;
		setSelectAllChecked(isChecked);
		onSelectAll(isChecked);
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
						checked={selectAllChecked}
						onChange={handleSelectAll}
					/>
					<span className="form-check-label">Select All</span>
				</label>

				{/* Render the Modal for the confirmation dialog */}
				<Modal show={showConfirmation} onHide={handleCloseConfirmation}>
					<Modal.Header closeButton>
						<Modal.Title>Confirm Clear</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Are you sure you want to clear completed tasks?
					</Modal.Body>
					<Modal.Footer>
						<Button variant="warning" onClick={handleCloseConfirmation}>
							Cancel
						</Button>
						<Button variant="danger" onClick={handleClearConfirmation}>
							Confirm
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	);
};

export default ClearTask;
