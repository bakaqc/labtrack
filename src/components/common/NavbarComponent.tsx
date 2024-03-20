import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const NavBarComponent = () => {
	const accountName = localStorage.getItem('account_name');
	const navigate = useNavigate();

	const handleManageClick = () => {
		if (accountName) {
			navigate('/products');
		} else {
			Swal.fire({
				title: 'Vui lòng đăng nhập để tiếp tục!',
				icon: 'question',
			}).then(() => {
				navigate('/login');
			});
		}
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
								<Link className="nav-link" to="/">
									Danh sách sản phẩm
								</Link>
							</div>
							<div className="nav-item">
								<button className="nav-link" onClick={handleManageClick}>
									Quản lý sản phẩm
								</button>
							</div>
							<div className="nav-item">
								<Link className="nav-link" to="/about">
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
									<FontAwesomeIcon icon={faUser} /> {accountName}
								</a>
								<div className="dropdown-menu p-1">
									<div>
										<button
											onClick={() => {
												localStorage.removeItem('account_name');
												navigate('/');
											}}
											className="dropdown-item"
										>
											Đăng xuất
										</button>
									</div>
								</div>
							</div>
						) : (
							<div className="nav-item">
								<Link className="nav-link" to="/login">
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
