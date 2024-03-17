import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { UserProvider } from './components/UserContext';

const App = () => {
	return (
		<UserProvider>
			<Router>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/home" element={<HomePage />} />
				</Routes>
			</Router>
		</UserProvider>
	);
};

export default App;
