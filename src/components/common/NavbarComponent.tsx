import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
				<div className="container-fluid">
					<div className="navbar-brand">Quản lý laptop</div>
					<div className="collapse navbar-collapse">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className="nav-link" to="/">
									Danh sách sản phẩm
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									onClick={handleManageClick}
								>
									Quản lí
								</Link>
							</li>
							{accountName ? (
								<li className="nav-item dropdown">
									<a
										className="nav-link dropdown-toggle"
										href="#"
										role="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										{accountName}
									</a>
									<ul className="dropdown-menu">
										<li>
											<button
												onClick={() => {
													localStorage.removeItem('account_name');
													window.location.reload();
												}}
												className="dropdown-item"
											>
												Đăng xuất
											</button>
										</li>
									</ul>
								</li>
							) : (
								<li className="nav-item">
									<Link className="nav-link" to="/login">
										Đăng nhập
									</Link>
								</li>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default NavBarComponent;
