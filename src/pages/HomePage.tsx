import { useContext, useEffect } from 'react';
import { UserContext } from '../components/UserContext';
const HomePage = () => {
	const { name } = useContext(UserContext);
	useEffect(() => {
		console.log(name);
	}, [name]);
	return (
		<div>
			<h4>Login Successful!</h4>
			<h1>Welcome, {name}</h1>
			<h2> This is Home Page</h2>
		</div>
	);
};

export default HomePage;
