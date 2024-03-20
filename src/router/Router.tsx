import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import Error404 from '../pages/error/Error404';
import ProductListPage from '../pages/products/ProductListPage';
import AddProductPage from '../pages/products/AddProductPage';
import UpdateProductPage from '../pages/products/UpdateProductPage';
import ProductDetailPage from '../pages/products/ProductDetailPage';
import HomePage from '../pages/home/HomePage';
import AboutPage from '../pages/about/AboutPage';

export const router = createBrowserRouter([
	{ path: '/', element: <HomePage /> },
	{ path: '/login', element: <LoginPage /> },
	{ path: '/about', element: <AboutPage /> },
	{ path: '/products', element: <ProductListPage /> },
	{ path: '/add-product', element: <AddProductPage /> },
	{ path: '/update-product/:id', element: <UpdateProductPage /> },
	{ path: '/detail-product/:id', element: <ProductDetailPage /> },
	{ path: '*', element: <Error404 /> },
]);
