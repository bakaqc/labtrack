import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext({
	name: '',
	setName: () => {},
});

export const UserProvider = ({ children }) => {
	const [name, setName] = useState(localStorage.getItem('name') || '');

	useEffect(() => {
		localStorage.setItem('name', name);
	}, [name]);

	return (
		<UserContext.Provider value={{ name, setName }}>
			{children}
		</UserContext.Provider>
	);
};