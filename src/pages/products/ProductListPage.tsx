import { Suspense, lazy} from 'react';
const NavBarComponent = lazy(
	() => import('../../components/common/NavbarComponent'),
);
const ProductListTable = lazy(
	() => import('../../components/productslist/ProductList'),
);

const ProductListPage = () => {

	return (
		<>
			<div className="vh-100">
				<Suspense fallback={<div>Loading...</div>}>
					<NavBarComponent />
					<ProductListTable />
				</Suspense>
			</div>
		</>
	);
};

export default ProductListPage;
