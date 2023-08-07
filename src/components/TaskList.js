import React from 'react';
import TodoItem from './TodoItem';
import ClearTask from './ClearTask';

const TaskList = ({
	tasks,
	onDelete,
	onEdit,
	onComplete,
	remaining,
	onClearCompleted,
	onSelectAll,
	date,
	priority,
}) => {
	return (
		<div>
			<div className="task-counter">
				{remaining} remaining out of {tasks.length} tasks
			</div>
			<div className="clear">
				<ClearTask
					tasks={tasks}
					remaining={remaining}
					onSelectAll={onSelectAll}
					onClearCompleted={onClearCompleted}
				/>
			</div>
			{tasks.map((task) => (
				<div className="" style={{ maxWidth: '550px' }} id="todo" key={task.id}>
					<TodoItem
						priority={priority}
						date={new Date(task.date)}
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
