import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect, useState } from 'react';

const NavBarComponent = () => {
	const accountName = localStorage.getItem('account_name');
	const username_github = localStorage.getItem('username_github');
	const [avatarUrl, setAvatarUrl] = useState('');
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (accountName && username_github) {
			axios
				.get(`https://api.github.com/users/${username_github}`, {

				})
				.then((response) => {
					console.log('GitHub API response:', response);
					setAvatarUrl(response.data.avatar_url);
					console.log('Avatar URL:', response.data.avatar_url);
				})
				.catch((error) => {
					console.error('Cannot fetch GitHub avatar', error);
					Swal.fire({
						title: 'Error',
						text: 'Cannot fetch GitHub avatar. Please try again later.',
						icon: 'error',
					});
				});
		}
	}, [accountName, username_github]);

	const handleManageClick = () => {
		if (accountName) {
			navigate('/labtrack/products');
		} else {
			Swal.fire({
				title: 'Vui lòng đăng nhập để tiếp tục!',
				icon: 'question',
			}).then(() => {
				navigate('/labtrack/login');
			});
		}
	};

	const activeStyle = {
		color: '#bb2d3b',
		fontWeight: 'bold',
	};
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container">
					<div className="navbar-brand">Labtrack</div>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbar-id"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbar-id">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<div className="nav-item">
								<Link
									className="nav-link"
									style={location.pathname === '/labtrack/' ? activeStyle : {}}
									to="/labtrack/"
								>
									Danh sách sản phẩm
								</Link>
							</div>
							<div className="nav-item">
								<button
									className="nav-link"
									style={location.pathname === '/labtrack/products' ? activeStyle : {}}
									onClick={handleManageClick}
								>
									Quản lý sản phẩm
								</button>
							</div>
							<div className="nav-item">
								<Link
									className="nav-link"
									style={location.pathname === '/labtrack/about' ? activeStyle : {}}
									to="/labtrack/about"
								>
									Giới thiệu
								</Link>
							</div>
						</ul>
						{accountName ? (
							<div className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="#"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<img
										src={avatarUrl}
										alt="avatar"
										style={{
											width: '30px',
											borderRadius: '50%',
											marginRight: '5px',
										}}
									/>{' '}
									{accountName}
								</a>
								<div className="dropdown-menu p-1">
									<div>
										<button
											onClick={() => {
												localStorage.removeItem('account_name');
												navigate('/labtrack/');
											}}
											className="dropdown-item text-center"
										>
											Đăng xuất
										</button>
									</div>
								</div>
							</div>
						) : (
							<div className="nav-item">
								<Link className="nav-link" to="/labtrack/login">
									Đăng nhập
								</Link>
							</div>
						)}
					</div>
				</div>
			</nav>
		</>
	);
};

export default NavBarComponent;
