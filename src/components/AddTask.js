import React, { useState } from 'react';

const AddTask = ({
	title,
	setTitle,
	handleTitleChange,
	onAddTask,
	date,
	setSelectDate,
	priority,
	setSelectPriority,
	tag,
	setSelectedTag,
	isDisabled,
	setIsDisabled,
}) => {
	const handleButtonClick = () => {
		onAddTask(title, date, priority, tag);
		setTitle('');
		setSelectDate('');
		setSelectPriority('');
		setSelectedTag('');
		setIsDisabled(true);
	};

	return (
		<>
			<div className="input-group mb-3 row">
				<input
					type="text"
					value={title}
					onChange={handleTitleChange}
					className="form-control"
					placeholder="Add Task..."
					style={{ maxWidth: '400px' }}
				/>
				<div className='col-auto'>
					<button
						className="btn btn-success"
						style={{ borderRadius: '5px' }}
						onClick={handleButtonClick}
						disabled={isDisabled}
					>
						Add
					</button>
				</div>
			</div>
		</>
	);
};

export default AddTask;
