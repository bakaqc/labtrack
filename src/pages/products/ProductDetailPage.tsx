import { Suspense, lazy } from 'react';

const NavBarComponent = lazy(
	() => import('../../components/common/NavbarComponent'),
);

const ProductDetailPage = () => {
	return <><div className="vh-100">
	<Suspense fallback={<div>Loading...</div>}>
		<NavBarComponent />
	</Suspense>
</div></>;
};

export default ProductDetailPage;
