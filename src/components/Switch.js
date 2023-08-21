import React from 'react';
import { useTheme } from '../Hook/ThemeContext';

const Switch = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div
			style={{
				color: theme === 'light' ? 'black' : 'white',
			}}
		>
			<label className="form-check">
				<input
                className='form-check-input'
					type="checkbox"
					checked={theme === 'dark'}
					onChange={toggleTheme}
				/>
				Use dark mode
			</label>
		</div>
	);
};

export default Switch;
