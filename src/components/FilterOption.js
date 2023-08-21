const FilterOption = ({ filter, setFilter }) => {
	// handle All
	const handleAllClick = () => {
		setFilter('All');
	};
	const handleActiveClick = () => {
		setFilter('Active');
	};

	const handleCompletedClick = () => {
		setFilter('Completed');
	};
	return (
		<div className="filter">
			<button
				type="button"
				className={`btn btn-outline-primary ${
					filter === 'All' ? 'active' : ''
				}`}
				onClick={handleAllClick}
			>
				All
			</button>
			<button
				type="button"
				className={`btn btn-outline-success ${
					filter === 'Active' ? 'active' : ''
				}`}
				onClick={handleActiveClick}
			>
				Active
			</button>
			<button
				type="button"
				className={`btn btn-outline-danger ${
					filter === 'Completed' ? 'active' : ''
				}`}
				onClick={handleCompletedClick}
			>
				Completed
			</button>
		</div>
	);
};

export default FilterOption;
