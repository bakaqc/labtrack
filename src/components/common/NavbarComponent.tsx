import { Link } from 'react-router-dom';

const NavBarComponent = () => {
	const accountName = localStorage.getItem('account_name');

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<div className="navbar-brand">Quản lý laptop</div>
					<div className="collapse navbar-collapse">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className="nav-link" to="/product">
									Danh sách sản phẩm
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
