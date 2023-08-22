import React, { useState } from 'react';


const AddTask = ({ onAddTask , date, setSelectDate,priority, setSelectPriority, tag, setSelectedTag}) => {
	const [title, setTitle] = useState('');

	// handleTodoChange
	const handleTodoChange = (e) => {
		setTitle(e.target.value);
	};

	const handleButtonClick = () => {
		onAddTask(title, date, priority, tag);
		setTitle('');
		setSelectDate('')
		setSelectPriority('')
		setSelectedTag('')

	};
	return (
		<>
			<div className="input-group mb-3">
				<input
					type="text"
					value={title}
					onChange={handleTodoChange}
					className="form-control"
					placeholder="Add Task..."
					style={{ maxWidth: '400px' }}
				/>

				<button
					className="btn btn-success"
					style={{ borderRadius: '5px' }}
					onClick={handleButtonClick}
				>
					Add
				</button>
				
			</div>
			
		</>
	);
};

export default AddTask;
