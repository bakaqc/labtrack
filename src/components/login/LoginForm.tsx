import { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../api/config';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();

	const isValidated = () => {
		if (username.trim().length == 0) return false;
		if (password.trim().length == 0) return false;

		const pattern: RegExp = /\b[qQ][eE]\d{6}\b/i;

		return pattern.test(username);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isValidated()) {
			const response = await axios.get<Account[]>(`${SERVER_URL}/accounts`);

			if (response.status == 200) {
				const account = response.data.find(
					(acc) =>
						acc.username == username.toLocaleUpperCase() &&
						acc.password == password,
				);

				if (account) {
					localStorage.setItem('account_name', account.name);
					navigate('/products');
				}
			}
		}
	};

	return (
		<>
			<div className="container mt-5">
				<div className="mx-5">
					<h1 className="display-1 mb-4">Đăng nhập</h1>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="input-username" className="form-label">
								Nhập mã số sinh viên
							</label>
							<input
								type="text"
								className="form-control"
								id="input-username"
								value={username}
								onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))}
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="input-password" className="form-label">
								Nhập mật khẩu
							</label>
							<input
								type="password"
								className="form-control"
								id="input-password"
								value={password}
								onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
								required
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Đăng nhập
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
