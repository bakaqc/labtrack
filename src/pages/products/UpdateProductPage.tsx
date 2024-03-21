import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../components/common/LoadingComponent';

const NavBarComponent = lazy(
	() => import('../../components/common/NavbarComponent'),
);

const UpdateProductForm = lazy(
	() => import('../../components/product/UpdateProductForm'),
);

const UpdateProductPage = () => {
	const param = useParams();

	return (
		<>
			<div className="vh-100">
				<Suspense fallback={<LoadingComponent />}>
					<NavBarComponent />

					<UpdateProductForm id={param.id as unknown as number} />
				</Suspense>
			</div>
		</>
	);
};

export default UpdateProductPage;
