import React from 'react';
import TodoItem from './TodoItem';

const TaskList = ({ tasks, onDelete, onEdit, onComplete, remaining}) => {
	return (
		<div>
			<div className="task-counter">
				{remaining} remaining out of {tasks.length} tasks
			</div>

			{tasks.map((task) => (
				<div className="" style={{ maxWidth: '550px' }} id="todo" key={task.id}>
					<TodoItem
						task={task}
						onDeleteTask={onDelete}
						onEditTask={onEdit}
						onCompleteTask={onComplete}
						remaining={remaining}
					/>
				</div>
			))}
		</div>
	);
};

export default TaskList;
