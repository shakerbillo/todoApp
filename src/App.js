import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SearchTask from './components/SearchTask';
import FilterOption from './components/FilterOption';
import SortOption from './components/SortOption';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('All');
	const [sortOrder, setSortOrder] = useState('');
	const [selectDate, setSelectDate] = useState('');

	// Add Task
	const handleAddTask = (title, date) => {
		if (title.trim() === '' && date === '') {
			alert('Please add a task and due date!');
			return;
		}
		setTasks([
			...tasks,
			{
				id: uuidv4(),
				title: title.trim(),
				completed: false,
				date: date,
			},
		]);
	};

	// hanldeEdit
	const handleEditTask = (nextTask, date) => {
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
		const updatedTasks = tasks.filter((task) => {
			return task.id !== id;
		});
		setTasks(updatedTasks);
		localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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

	// Filter tasks based on the selected filter
	const applyFilter = () => {
		if (filter === 'All') {
			return tasks;
		} else if (filter === 'Active') {
			return tasks.filter((task) => !task.completed);
		} else if (filter === 'Completed') {
			return tasks.filter((task) => task.completed);
		}
	};

	// select date and time
	const handleDateTimeChange = (date) => {
		setSelectDate(new Date(date));
	};

	// sorting task
	const sortTask = () => {
		if (!sortOrder) {
			return tasks;
		}

		// sorting criteria
		const sortedTasks = [...tasks].sort((a, b) => {
			if (sortOrder === 'asc') {
				return a.title.localeCompare(b.title);
			} else if (sortOrder === 'desc') {
				return b.title.localeCompare(a.title);
			} else if (sortOrder === 'date') {
				return new Date(a.date) - new Date(b.date);
			}
			return 0;
		});

		setTasks(sortedTasks);
	};
	const handleSortChange = (e) => {
		setSortOrder(e.target.value);
	};

	useEffect(() => {
		sortTask(); // Sort the tasks when sortOrder changes
	}, [sortOrder]);

	// Search Filter
	const filteredTasks = applyFilter().filter((task) => {
		const searchText = search.toLowerCase().trim();
		if (searchText === '') return true;
		const titleIncludesSearch = task.title.toLowerCase().includes(searchText);
		const descriptionIncludesSearch = task.description
			? task.description.toLowerCase().includes(searchText)
			: false;

		return titleIncludesSearch || descriptionIncludesSearch;
	});

	// task counter
	const remaining = filteredTasks.filter((task) => !task.completed).length;

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
			<AddTask
				onAddTask={handleAddTask}
				date={selectDate}
				setSelectDate={setSelectDate}
			/>
			<DatePicker
				showTimeSelect
				timeFormat="HH:mm"
				timeIntervals={15}
				dateFormat="dd/MM/yyyy"
				minDate={new Date()}
				className="form-control date-picker"
				placeholderText="select date"
				selected={selectDate}
				onChange={handleDateTimeChange}
				showYearDropdown
			/>
			<FilterOption filter={filter} setFilter={setFilter} />
			<SortOption sortOrder={sortOrder} onSortChange={handleSortChange} />
			<TaskList
				date={selectDate}
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
