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
import Priority from './components/Priority';
import Switch from './components/Switch';
import { useTheme } from './Hook/ThemeContext';
import Tags from './components/Tags';

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('All');
	const [sortOrder, setSortOrder] = useState('');
	const [selectDate, setSelectDate] = useState('');
	const [selectPriority, setSelectPriority] = useState('');
	const [selectedTag, setSelectedTag] = useState('');

	//Theme
	const { theme } = useTheme();

	// Add Task
	const handleAddTask = (title, date, priority, tag) => {
		// if (title.trim() === '') {
		// 	alert('Please add a task and due date!');
		// 	return;
		// }
		setTasks([
			...tasks,
			{
				id: uuidv4(),
				title: title.trim(),
				completed: false,
				date: date,
				priority: priority,
				tag: tag,
			},
		]);
	};

	// handleTitleChange
	const handleTitleChange = (e) => {
		setTitle(e.target.value);
		validateInputEntered();
	};

	// check if all input fields are entered
	const validateInputEntered = () => {
		if (title && selectDate && selectPriority && selectedTag) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
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

	// select date and time
	const handleDateTimeChange = (date) => {
		setSelectDate(new Date(date));
		validateInputEntered();
	};

	// handle priorities
	const handlePriorityChange = (e) => {
		setSelectPriority(e.target.value);
		validateInputEntered();
	};

	// handle tags
	const handleTagChange = (e) => {
		setSelectedTag(e.target.value);
		validateInputEntered();
	};

	const handleSortChange = (e) => {
		console.log('Sort order changed:', e.target.value);
		setSortOrder(e.target.value);
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
		} else if (filter === 'Home') {
			return tasks.filter((task) => task.tag === 'Home');
		} else if (filter === 'School') {
			return tasks.filter((task) => task.tag === 'School');
		}
	};

	// sorting task
	const sortTask = () => {
		console.log('Sorting tasks...');
		console.log('Sort Order:', sortOrder); // Check sortOrder value
		console.log('Tasks before sorting:', tasks);

		if (!sortOrder) {
			return tasks;
		}
		// sorting criteria
		const sortedTasks = [...tasks].sort((a, b) => {
			if (sortOrder === 'asc') {
				return a.title.localeCompare(b.title);
			} else if (sortOrder === 'desc') {
				return b.title.localeCompare(a.title);
			} else if (sortOrder === 'first-date') {
				return new Date(a.date) - new Date(b.date);
			} else if (sortOrder === 'last-date') {
				return new Date(b.date) - new Date(a.date);
			} else if (sortOrder === 'High') {
				return a.priority === 'High' ? -1 : b.priority === 'High' ? 1 : 0;
			} else if (sortOrder === 'Medium') {
				return a.priority === 'Medium' ? -1 : b.priority === 'Medium' ? 1 : 0;
			} else if (sortOrder === 'Low') {
				return a.priority === 'Low' ? -1 : b.priority === 'Low' ? 1 : 0;
			} else if (sortOrder === 'Home') {
				return a.tag.localeCompare(b.tag);
			} else if (sortOrder === 'School') {
				return b.tag.localeCompare(a.tag);
			}
			return 0;
		});

		console.log('Sorted tasks:', sortedTasks);
		setTasks(sortedTasks);
	};

	// Sort the tasks when sortOrder changes
	useEffect(() => {
		sortTask();
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
		<div
			className="App"
			style={{
				backgroundColor: theme === 'light' ? 'white' : 'black',
			}}
		>
			<div id="todo-list">
				<Switch />
				<h1
					style={{
						color: theme === 'light' ? 'black' : 'white',
					}}
				>
					Todo List
				</h1>

				<AddTask
					title={title}
					handleTitleChange={handleTitleChange}
					setTitle={setTitle}
					onAddTask={handleAddTask}
					date={selectDate}
					setSelectDate={setSelectDate}
					priority={selectPriority}
					setSelectPriority={setSelectPriority}
					tag={selectedTag}
					setSelectedTag={setSelectedTag}
					isDisabled={isDisabled}
					setIsDisabled={setIsDisabled}
				/>
				<div className="select_input">
					<Priority
						onPriorityChange={handlePriorityChange}
						priority={selectPriority}
					/>
					<Tags onTagChange={handleTagChange} tag={selectedTag} />
					<DatePicker
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						dateFormat="dd/MM/yyyy"
						minDate={new Date()}
						className="form-control form-control-md mb-3"
						placeholderText="Select date"
						selected={selectDate}
						onChange={handleDateTimeChange}
						showYearDropdown
					/>
				</div>

				<FilterOption filter={filter} setFilter={setFilter} />
				<SortOption sortOrder={sortOrder} onSortChange={handleSortChange} />
				<SearchTask search={search} onSearch={handleSearchChange} />
				<TaskList
					tag={selectedTag}
					priority={selectPriority}
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
		</div>
	);
};

export default App;
