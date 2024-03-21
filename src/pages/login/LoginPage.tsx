import { Suspense, lazy } from 'react';

const LoginForm = lazy(() => import('../../components/login/LoginForm'));

const LoginPage = () => {
	const accountName = localStorage.getItem('account_name');

	return (
		<>
			<div className="vh-100">
				<Suspense fallback={<div>Loading...</div>}>
					{accountName ? (
						<div className="d-flex align-items-center justify-content-center mt-3">
							<div className="text-center">
								<h3 className="display-3">Xin chào {accountName}</h3>
								<p className="lead">Bạn đã đăng nhập thành công rồi!!!</p>
							</div>
						</div>
					) : (
						<LoginForm />
					)}
				</Suspense>
			</div>
		</>
	);
};

export default LoginPage;
