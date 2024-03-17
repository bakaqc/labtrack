import { useContext, useReducer } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import favicon from '../../../public/favicon.ico';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import './LoginForm.scss';
import { UserContext } from '../UserContext';

const initialState = {
	passwordVisible: false,
	username: '',
	password: '',
	error: '',
};

function reducer(state, action) {
	switch (action.type) {
		case 'setUsername':
			return { ...state, username: action.payload };
		case 'setPassword':
			return { ...state, password: action.payload };
		case 'togglePasswordVisibility':
			return { ...state, passwordVisible: !state.passwordVisible };
		case 'setError':
			return { ...state, error: action.payload };
		default:
			throw new Error();
	}
}

const LoginForm = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { setName } = useContext(UserContext);
	const navigate = useNavigate();

	const submitForm = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.get('http://localhost:5555/accounts');
			const validAccount = response.data.find(
				(account) =>
					account.username.toLowerCase() === state.username.toLowerCase() &&
					account.password === state.password,
			);
			if (validAccount) {
				setName(validAccount.name);
				navigate('/home');
			} else {
				dispatch({ type: 'setError', payload: 'Invalid username or password' });
			}
		} catch (error) {
			console.error('Failed to fetch accounts', error);
		}
	};

	const handleUsernameChange = (event) => {
		dispatch({ type: 'setUsername', payload: event.target.value });
	};

	const handlePasswordChange = (event) => {
		dispatch({ type: 'setPassword', payload: event.target.value });
	};

	const togglePasswordVisibility = () => {
		dispatch({ type: 'togglePasswordVisibility' });
	};

	return (
		<div className="min-vh-100 d-flex align-items-center">
			<div className="container">
				<div className="row">
					<div className="col-sm-7 mx-auto">
						<div className="shadow-lg">
							<div className="d-flex align-items-center">
								<div className="d-none d-md-block d-lg-block">
									<img src={favicon} className="objectFit" />
								</div>
								<div className="p-4" id="formPanel">
									<div className="text-center mb-5">
										<h1 className="customHeading h3 text-uppercase brand">
											LabTrack
										</h1>
									</div>
									<form onSubmit={submitForm}>
										<div className="custom-form-group">
											<label className="text-uppercase" htmlFor="username">
												Username
											</label>
											<input
												type="text"
												id="username"
												className="pb-1"
												value={state.username}
												onChange={handleUsernameChange}
											/>
											<span className="pb-1">
												<FontAwesomeIcon icon={faUser} />
											</span>
										</div>
										<div className="custom-form-group mt-3">
											<label className="text-uppercase" htmlFor="password">
												Password
											</label>
											<input
												type={state.passwordVisible ? 'text' : 'password'}
												id="password"
												className="pb-1"
												value={state.password}
												onChange={handlePasswordChange}
											/>
											<span className="pb-1">
												<FontAwesomeIcon
													id="showCursor"
													icon={state.passwordVisible ? faEye : faEyeSlash}
													onClick={togglePasswordVisibility}
												/>
											</span>
										</div>
										{state.error && <p>{state.error}</p>}
										<div className="mt-5">
											<button className="w-50 p-2 d-block custom-btn">
												Login
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
