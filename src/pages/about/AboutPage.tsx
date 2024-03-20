import { Suspense, lazy } from 'react';
import About from '../../components/about/About';
const NavBarComponent = lazy(
	() => import('../../components/common/NavbarComponent'),
);
const AboutPage = () => {
	return (
		<>
			<div className="vh-100">
				<Suspense fallback={<div>Loading...</div>}>
					<NavBarComponent />
					<About/>
				</Suspense>
			</div>
		</>
	);
};

export default AboutPage;
