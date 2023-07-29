import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SearchTask from './components/SearchTask';

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [search, setSearch] = useState('');
	

	// Add Task
	const handleAddTask = (title) => {
		if (title.trim() === '') {
			alert('Please add a task!');
			return;
		}
		setTasks([
			...tasks,
			{ id: uuidv4(), title: title.trim(), completed: false },
		]);
	};

	// hanldeEdit
	const handleEditTask = (nextTask) => {
		setTasks(
			tasks.map((task) => {
				if (task.id === nextTask.id) {
					return nextTask;
				} else {
					return task;
				}
			})
		);
	};

	// handleDelete
	const handleDeleteTask = (id) => {
		setTasks(
			tasks.filter((task) => {
				return task.id !== id;
			})
		);
	};

	// function to toggle the selection status of all tasks
	const handleSelectAll = (selected) => {
		const updatedTasks = tasks.map((task) => {
			return { ...task, completed: selected };
		});
		setTasks(updatedTasks);
	};


	


	// clear completed tasks
	const clearCompletedTasks = () => {
		// const confirmed = window.confirm(
		// 	'Are you sure you want to clear completed tasks?'
		// );
		// if (confirmed) {
			const updatedTasks = tasks.filter((task) => !task.completed);
			setTasks(updatedTasks);

			localStorage.setItem('tasks', JSON.stringify(updatedTasks));
		
	};

	// handleComplete
	const handleCompleteTask = (id) => {
		setTasks(
			tasks.map((task) => {
				if (task.id === id) {
					return { ...task, completed: !task.completed };
					// task.completed = !task.completed;
				}
				return task;
			})
		);
	};

	// handle search
	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	// Search Filter
	const filteredTasks = tasks.filter((task) => {
		return search.toLowerCase() === ''
			? task
			: task.title.toLowerCase().includes(search);
	});

	// task counter
	const remaining = filteredTasks.filter((task) => !task.completed).length;

	// let remaining = 0;
	// for (let i = 0; i < tasks.length; i++) {
	// 	if (tasks[i].completed === false) {
	// 		remaining = remaining + 1;
	// 	}
	// }

	// Save todos to local storage
	useEffect(() => {
		if (tasks.length > 0) {
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
	}, [tasks]);

	// Load todos from local storage
	useEffect(() => {
		const items = JSON.parse(localStorage.getItem('tasks'));
		if (items) {
			setTasks(items);
		}
	}, []);

	return (
		<div className="container" id="todo-list">
			<h1>Todo List</h1>
			<SearchTask search={search} onSearch={handleSearchChange} />
			<AddTask onAddTask={handleAddTask} />
			<TaskList
				onSelectAll={handleSelectAll}
				onClearCompleted={clearCompletedTasks}
				tasks={filteredTasks}
				onDelete={handleDeleteTask}
				onEdit={handleEditTask}
				onComplete={handleCompleteTask}
				remaining={remaining}
			/>
		</div>
	);
};

export default App;
