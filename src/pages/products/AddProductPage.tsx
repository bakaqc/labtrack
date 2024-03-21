import { Suspense, lazy } from 'react';

const NavBarComponent = lazy(
	() => import('../../components/common/NavbarComponent'),
);

const AddProductForm = lazy(
	() => import('../../components/product/AddProductForm'),
);

const AddProductPage = () => {
	return (
		<>
			<div className="vh-100">
				<Suspense fallback={<div>Loading...</div>}>
					<NavBarComponent />

					<AddProductForm />
				</Suspense>
			</div>
		</>
	);
};

export default AddProductPage;
