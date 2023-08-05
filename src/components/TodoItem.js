import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoItem = ({ task, onDeleteTask, onEditTask, onCompleteTask, date }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(task.title);
	const [error, setError] = useState('');
	const [editedDate, setEditedDate] = useState(new Date(date));

	const handleEditChange = (e) => {
		setEditedTitle(e.target.value);
		setError('');
	};

	const handleDateTimeChange = (date) => {
		setEditedDate(date);
	};

	const handleSave = () => {
		if (editedTitle.trim() === '') {
			setError('Title cannot be empty.');
		} else {
			onEditTask({
				...task,
				title: editedTitle,
				date: editedDate,
			});
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedTitle(task.title);
		setEditedDate(new Date(date));
	};

	const handleCompletedTask = () => {
		onCompleteTask(task.id);
	};

	return (
		<>
			<div className="border border-2" id="todo-text">
				<div className="form-check">
					<label className="form-check-label" htmlFor="flexCheckDefault">
						<input
							id="flexCheckChecked"
							type="checkbox"
							className="form-check-input"
							checked={task.completed}
							onChange={handleCompletedTask}
						/>

						{isEditing ? (
							<>
								<input
									type="text"
									className={`form-control ${
										editedTitle.trim() === '' ? 'is-invalid' : 'is-valid'
									}`}
									id="validationServer03"
									value={editedTitle}
									onChange={handleEditChange}
								/>

								{error && <div className="invalid-feedback">{error}</div>}

								<DatePicker
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={15}
									dateFormat="dd/MM/yyyy"
									selected={editedDate}
									onChange={handleDateTimeChange}
									showYearDropdown
								/>
							</>
						) : (
							<>
								<div
									style={{
										textDecoration: task.completed ? 'line-through' : '',
									}}
								>
									{task.title}
								</div>

								<div className='date-output' >
									<FontAwesomeIcon icon={faCalendarAlt} />
									<span style={{ marginLeft: '5px' }}>
										{date.toLocaleDateString()} - {date.toLocaleTimeString()}
									</span>
								</div>
							</>
						)}
					</label>
				</div>

				<div className="button-action">
					{isEditing ? (
						<>
							<button className="btn btn-primary btn-md" onClick={handleSave}>
								Save
							</button>
							<button className="btn btn-warning btn-md" onClick={handleCancel}>
								Cancel
							</button>
						</>
					) : (
						<>
							<button
								className="btn btn-success btn-md"
								onClick={() => setIsEditing(true)}
							>
								Edit
							</button>
							<button
								className="btn btn-danger btn-md"
								onClick={() => onDeleteTask(task.id)}
							>
								Delete
							</button>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default TodoItem;
