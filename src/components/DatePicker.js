import React, { useState } from 'react';

const DatePicker = () => {
	const [selectDate, setSelectDate] = useState('')
	return (
		<div className='date-picker'>
			<label htmlFor="date">
				<input id="date" className="form-control" type="date" />
			</label>
		</div>
	);
};

export default DatePicker;
