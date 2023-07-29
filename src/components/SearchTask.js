const SearchTask = ({ search, onSearch }) => {
	return (
		<>
			<div className="input-group mb-3">
				<input
					value={search}
					onChange={onSearch}
					type="text"
					className="form-control"
					placeholder="Search Task..."
					style={{ maxWidth: '400px' }}
				/>
				
			</div>
		</>
	);
};

export default SearchTask;
