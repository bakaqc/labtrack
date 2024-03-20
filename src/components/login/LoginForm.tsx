import { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../api/config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
					Swal.fire({
						title: 'Đăng nhập thành công!',
						text: 'Chào mừng bạn đến với hệ thống quản lý laptop!',
						icon: 'success',
					}).then(() => {
						localStorage.setItem('account_name', account.name);
						navigate('/');
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Đăng nhập thất bại',
						text: 'Mã số sinh viên hoặc mật khẩu không chính xác!',
					}).then(() => {
						navigate('/login');
					});
				}
			}
		}
	};

	return (
		<>
			<div
				className="d-flex align-items-center justify-content-center"
				style={{ height: '100vh', overflow: 'hidden' }}
			>
				<div className="container w-50 shadow-lg p-5">
					<div className="mx-5">
						<h6 className="display-6 mb-5 text-center">Đăng nhập LabTrack</h6>
						<form onSubmit={handleSubmit}>
							<div className="d-flex flex-column align-items-center mb-3">
								<label
									htmlFor="input-username"
									className="form-label w-50 text-start"
								>
									Nhập mã số sinh viên
								</label>
								<input
									type="text"
									className="form-control w-50 mb-2"
									id="input-username"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value.replace(/\s/g, ''))
									}
									required
								/>
							</div>
							<div className="d-flex flex-column align-items-center mb-3">
								<label
									htmlFor="input-password"
									className="form-label w-50 text-start"
								>
									Nhập mật khẩu
								</label>
								<input
									type="password"
									className="form-control w-50 mb-2"
									id="input-password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value.replace(/\s/g, ''))
									}
									required
								/>
							</div>
							<div className="d-flex justify-content-center mt-4">
								<button type="submit" className="btn btn-primary w-50">
									Đăng nhập
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
