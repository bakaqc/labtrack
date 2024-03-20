/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoadingComponent from '../components/common/LoadingComponent';
import Error404 from '../pages/error/Error404';

const HomePage = lazy(() => import('../pages/home/HomePage'));
const LoginPage = lazy(() => import('../pages/login/LoginPage'));
const AboutPage = lazy(() => import('../pages/about/AboutPage'));
const ProductListPage = lazy(() => import('../pages/products/ProductListPage'));
const AddProductPage = lazy(() => import('../pages/products/AddProductPage'));
const UpdateProductPage = lazy(
	() => import('../pages/products/UpdateProductPage'),
);
const ProductDetailPage = lazy(
	() => import('../pages/products/ProductDetailPage'),
);

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<LoadingComponent />}>
				<HomePage />
			</Suspense>
		),
	},
	{
		path: '/login',
		element: (
			<Suspense fallback={<LoadingComponent />}>
				<LoginPage />
			</Suspense>
		),
	},
	{
		path: '/about',
		element: (
			<Suspense fallback={<LoadingComponent />}>
				<AboutPage />
			</Suspense>
		),
	},
	{
		path: '/products',
		element: (
			<Suspense fallback={<LoadingComponent />}>
				<ProductListPage />
			</Suspense>
		),
	},
	{
		path: '/add-product',
		element: (
			<Suspense fallback={<LoadingComponent />}>
				<AddProductPage />
			</Suspense>
		),
	},
	{
		path: '/update-product/:id',
		element: (
			<Suspense fallback={<LoadingComponent />}>
				<UpdateProductPage />
			</Suspense>
		),
	},
	{
		path: '/detail-product/:id',
		element: (
			<Suspense fallback={<LoadingComponent />}>
				<ProductDetailPage />
			</Suspense>
		),
	},
	{ path: '*', element: <Error404 /> },
]);
