import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const SortOption = () => {
	return (
		<div className="sort">
			<DropdownButton id="dropdown-basic-button" title="Sort by">
				<Dropdown.Item href="#/alphabetical">Alphabetical Order</Dropdown.Item>
				<Dropdown.Item href="#/date">Due Date</Dropdown.Item>
				<Dropdown.Item href="#/priority">Priority</Dropdown.Item>
			</DropdownButton>
		</div>
	);
};

export default SortOption;
